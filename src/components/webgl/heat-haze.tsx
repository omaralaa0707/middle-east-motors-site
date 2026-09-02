"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { useWebglHealth } from "@/lib/use-webgl-health";

/**
 * Middle East Motors' signature piece: the road at 33.5°.
 *
 * Every car they publish is photographed at the kerb in Heliopolis, in
 * daylight, and the one dashboard frame they posted reads 33.5°C. So the
 * hero is their street photograph seen through the air above a hot road.
 *
 * This is a mirage, not a lens: there is no glass object and nothing is
 * carried around by the pointer. A temperature field rises off the road
 * surface and refracts what is behind it —
 *
 *   - a `heat` weight that is near zero at the top of the frame and strongest
 *     just above the tarmac, because that is where the air is hottest;
 *   - layered advecting noise standing in for convection cells, sampled at
 *     two scales and drifting upward at different rates;
 *   - the displacement applied to the *sample* coordinate, so the photograph
 *     itself shears — pooling near the road the way a real mirage does;
 *   - a wavelength-dependent offset, so the edges of the shimmer break into
 *     colour the way hot air does;
 *   - a faint sky-mirror term low in the frame, which is what actually sells
 *     a heat haze: the road picks up a wash of the sky above it.
 *
 * The pointer adds local turbulence — a hand through hot air — rather than
 * carrying an effect with it.
 */

const vertex = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Straight to clip space, ignoring the camera: under an orthographic
    // camera a quad sized from viewport units does not reliably fill the
    // canvas, and this quad is 2×2 so position.xy is already [-1, 1].
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragment = /* glsl */ `
  precision highp float;

  uniform sampler2D uTex;
  uniform vec2  uImg;
  uniform vec2  uRes;
  uniform float uTime;
  uniform float uHeat;
  uniform vec2  uPointer;   // in uv space
  uniform float uPointerAmt;
  uniform vec3  uSky;

  varying vec2 vUv;

  // Value noise — cheap, and convection does not need gradients.
  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
  }

  void main() {
    // Cover-fit the photograph so no viewport ratio letterboxes or squashes it.
    float canvasA = uRes.x / uRes.y;
    float imgA = uImg.x / uImg.y;
    vec2 s = canvasA > imgA ? vec2(1.0, imgA / canvasA) : vec2(canvasA / imgA, 1.0);
    vec2 uv = (vUv - 0.5) * s + 0.5;

    // Hot air sits on the road. This is strongest along the bottom of the
    // frame and gone by the horizon.
    float road = smoothstep(0.62, 0.0, vUv.y);
    float heat = road * uHeat;

    // A hand through the hot air: local turbulence, not a carried lens.
    float d = distance(vUv * vec2(uRes.x / uRes.y, 1.0), uPointer * vec2(uRes.x / uRes.y, 1.0));
    heat += smoothstep(0.34, 0.0, d) * uPointerAmt * 0.55;

    // Two scales of convection, drifting upward at different rates.
    float t = uTime;
    float n1 = noise(vec2(uv.x * 11.0, uv.y * 26.0 - t * 0.85));
    float n2 = noise(vec2(uv.x * 24.0 + 4.0, uv.y * 52.0 - t * 1.45));
    float cell = (n1 - 0.5) * 0.7 + (n2 - 0.5) * 0.3;

    // Mirages shear far more horizontally than vertically.
    vec2 disp = vec2(cell * 0.055, abs(cell) * 0.016) * heat;

    // Break the shimmer into colour at its edges, the way hot air does.
    float rIdx = 1.0;
    vec3 col;
    col.r = texture2D(uTex, uv + disp * 1.06).r;
    col.g = texture2D(uTex, uv + disp).g;
    col.b = texture2D(uTex, uv + disp * 0.94).b;

    // The road mirrors the sky — the actual tell of a hot road. Faint, and
    // only where the shimmer is already active.
    float mirror = road * road * uHeat * 0.20;
    col = mix(col, uSky, mirror * (0.45 + 0.55 * (0.5 + cell)));

    // A dry, dusty lift low in the frame so the tarmac never reads as clean.
    col += uSky * road * 0.05 * uHeat;

    gl_FragColor = vec4(col, 1.0);
  }
`;

function Field({ src, onReady }: { src: string; onReady: () => void }) {
  const tex = useTexture(src);
  const { size } = useThree();
  const mat = useRef<THREE.ShaderMaterial>(null);
  const pointer = useRef({ x: 0.5, y: 0.5, amt: 0 });

  const uniforms = useMemo(
    () => ({
      uTex: { value: tex },
      uImg: { value: new THREE.Vector2(1, 1) },
      uRes: { value: new THREE.Vector2(1, 1) },
      uTime: { value: 0 },
      uHeat: { value: 0 },
      uPointer: { value: new THREE.Vector2(0.5, 0.5) },
      uPointerAmt: { value: 0 },
      uSky: { value: new THREE.Color("#c9b391") },
    }),
    [tex],
  );

  useEffect(() => {
    onReady();
  }, [onReady]);

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = e.clientX / window.innerWidth;
      pointer.current.y = 1 - e.clientY / window.innerHeight;
      pointer.current.amt = 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state, delta) => {
    if (!mat.current) return;
    const u = mat.current.uniforms;
    u.uTime.value = state.clock.elapsedTime;
    u.uRes.value.set(size.width, size.height);
    const img = tex.image as { width?: number; height?: number } | undefined;
    u.uImg.value.set(img?.width ?? 3, img?.height ?? 2);

    // The haze comes up over the first couple of seconds rather than being on
    // at full strength in frame one.
    u.uHeat.value += (1 - u.uHeat.value) * (1 - Math.pow(0.25, delta));

    u.uPointer.value.set(pointer.current.x, pointer.current.y);
    pointer.current.amt *= Math.pow(0.12, delta);
    u.uPointerAmt.value += (pointer.current.amt - u.uPointerAmt.value) * (1 - Math.pow(0.02, delta));
  });

  return (
    <mesh frustumCulled={false}>
      {/* Written straight to clip space: under this camera, sizing a quad
          from viewport units does not reliably fill the canvas. */}
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={mat}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
}

/**
 * A context the browser refuses outright makes r3f throw on mount, which
 * use-webgl-health cannot see — it only reports a context created and then
 * lost. Probe before rendering the Canvas at all.
 */
function canRenderWebgl() {
  try {
    const c = document.createElement("canvas");
    return Boolean(
      c.getContext("webgl2") ?? c.getContext("webgl") ?? c.getContext("experimental-webgl"),
    );
  } catch {
    return false;
  }
}

export function HeatHaze({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const { lost, bind } = useWebglHealth();
  const [reduced, setReduced] = useState(false);
  const [supported, setSupported] = useState<boolean | null>(null);
  const [ready, setReady] = useState(false);
  const onReady = useCallback(() => setReady(true), []);

  useEffect(() => {
    // A browser-only capability answer cannot be known before an effect runs,
    // and a lazy initialiser reading `window` would desync hydration.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSupported(canRenderWebgl());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const on = () => setReduced(mq.matches);
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, []);

  if (lost || reduced || supported !== true) {
    return (
      <div className={className}>
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div className={className}>
      <img
        src={src}
        alt={alt}
        aria-hidden={ready}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />
      {/* Positioning lives on the wrapper: r3f sizes its buffer from the
          element it is handed, and an absolutely positioned Canvas measures
          before layout settles and renders into a thin band. */}
      <div className="absolute inset-0">
        <Canvas
          style={{ width: "100%", height: "100%" }}
          orthographic
          camera={{ position: [0, 0, 1], zoom: 1 }}
          dpr={[1, 1.75]}
          gl={{ antialias: false }}
          onCreated={({ gl }) => bind(gl.domElement)}
        >
          <Suspense fallback={null}>
            <Field src={src} onReady={onReady} />
          </Suspense>
        </Canvas>
      </div>
    </div>
  );
}
