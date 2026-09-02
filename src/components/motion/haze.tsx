"use client";

import {
  useEffect,
  useRef,
  type CSSProperties,
  type ElementType,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";

/**
 * This site's arrival: the shimmer. Content resolves out of heat haze the way
 * the far end of a hot road does — blurred and horizontally displaced, one
 * waver, then settled. No slide, no wipe, no strike.
 *
 * Driven by a `data-seen` attribute written straight to the DOM rather than
 * React state, so the observer stays out of the render cycle. The animation
 * touches only opacity, filter and transform — never clip-path, which would
 * collapse the observed element's intersection rect to zero and stop the
 * observer firing at all.
 */
export function useOnScreen<T extends HTMLElement>(rootMargin = "-8% 0px -8% 0px") {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const reveal = () => node.setAttribute("data-seen", "");
    if (typeof IntersectionObserver === "undefined") {
      reveal();
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          reveal();
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.01 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [rootMargin]);

  return ref;
}

const delayVar = (delay: number) => ({ "--haze-delay": `${delay}ms` }) as CSSProperties;

export function Haze({
  children,
  className,
  delay = 0,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: ElementType;
  id?: string;
}) {
  const ref = useOnScreen<HTMLElement>();
  const Component = Tag as unknown as (props: Record<string, unknown>) => ReactElement;

  return (
    <Component ref={ref} id={id} data-haze="" className={className} style={delayVar(delay)}>
      {children}
    </Component>
  );
}

/** The hot rule under a heading, drawn from its leading edge. */
export function HeatRule({
  className,
  delay = 0,
  thickness = 2,
}: {
  className?: string;
  delay?: number;
  thickness?: number;
}) {
  const ref = useOnScreen<HTMLDivElement>();

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-rule=""
      className={cn("heat-rule w-full origin-[left_center] rtl:origin-[right_center]", className)}
      style={{ height: thickness, ...delayVar(delay) }}
    />
  );
}
