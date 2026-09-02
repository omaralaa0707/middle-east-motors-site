"use client";

import { useMem } from "@/content/schema-ext";
import { HERO_FRAME, PROFILE, CLUSTER } from "@/content/media";
import { HeatHaze } from "@/components/webgl/heat-haze";
import { Haze, HeatRule } from "@/components/motion/haze";

export function Hero() {
  const c = useMem();

  return (
    <section id="top" className="relative flex min-h-svh w-full flex-col overflow-hidden">
      <HeatHaze src={HERO_FRAME} alt={c.hero.hazeAlt} className="absolute inset-0 h-full w-full" />

      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-asphalt via-asphalt/70 to-asphalt/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-asphalt/90 to-transparent"
      />

      <div className="relative z-10 mx-auto flex w-full max-w-[92rem] flex-1 flex-col justify-end px-5 pb-14 pt-28 sm:px-8">
        <Haze as="div" className="max-w-[46rem]">
          <p className="plate text-heat">{c.hero.eyebrow}</p>

          <h1 className="mt-4 font-display text-hero font-bold leading-[1.05] text-sand">
            <span className="block">{c.hero.headlineLead}</span>
            <span className="block text-heat">{c.hero.headlineAccent}</span>
          </h1>

          <HeatRule className="mt-7 max-w-[22rem]" delay={180} />

          <p className="mt-6 max-w-[38rem] text-lead leading-relaxed text-sand-2">{c.hero.sub}</p>

          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={PROFILE.phoneHref}
              className="inline-flex items-center gap-2.5 bg-heat px-7 py-3.5 font-display text-[0.95rem] font-bold text-asphalt transition-opacity hover:opacity-90"
            >
              {c.hero.primaryCta}
            </a>
            <a
              href="#listings"
              className="inline-flex items-center gap-2 border border-sand-3/60 px-7 py-3.5 font-display text-[0.95rem] font-bold text-sand transition-colors hover:border-heat hover:text-heat"
            >
              {c.hero.secondaryCta}
            </a>
          </div>

          {/* The temperature is not decoration: it is the reading on the
              dashboard in their own photograph, and it is why the road in
              this frame moves. */}
          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.8rem] text-sand-2">
            <span className="tnum font-display text-[1.5rem] font-bold leading-none text-heat">
              {CLUSTER.temp}°
            </span>
            <span className="max-w-[26rem]">{c.hero.clusterNote}</span>
          </p>
          <p className="mt-2 text-[0.76rem] text-sand-3">{c.hero.hazeHint}</p>
        </Haze>
      </div>
    </section>
  );
}
