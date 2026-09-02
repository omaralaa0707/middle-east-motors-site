"use client";

import { useMem } from "@/content/schema-ext";
import { YEAR_RANGE, LISTINGS } from "@/content/media";
import { Haze, HeatRule } from "@/components/motion/haze";

/**
 * Their claim is a span of model years, not a marque list — so the section
 * that carries it is an axis, with every car they actually posted marked at
 * its own year. The listings prove the span rather than merely asserting it.
 */
export function Range() {
  const c = useMem();
  const { from, to } = YEAR_RANGE;
  const span = to - from;

  // Group by year first. Three of their cars are 2024–2026, and placing each
  // on its own tick puts five labels inside the last eighth of the axis,
  // where they simply overlap. One tick per year, models stacked under it.
  const byYear = new Map<number, string[]>();
  for (const l of LISTINGS) {
    if (l.year === "—") continue;
    const y = Number(l.year);
    byYear.set(y, [...(byYear.get(y) ?? []), `${l.marque} ${l.model}`]);
  }
  const marks = Array.from(byYear.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([year, labels]) => ({ year, labels, pct: ((year - from) / span) * 100 }));

  return (
    <section id="range" className="relative bg-asphalt-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Haze as="div" className="max-w-[44rem]">
          <p className="plate text-ochre">{c.range.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-sand">{c.range.heading}</h2>
          <HeatRule className="mt-5 max-w-[8rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-sand-2">{c.range.intro}</p>
        </Haze>

        <Haze as="div" delay={80} className="mt-14">
          <blockquote className="border-s-2 border-heat ps-5 font-display text-[clamp(1.15rem,2.2vw,1.7rem)] font-bold leading-snug text-sand">
            “{c.range.quote}”
          </blockquote>
        </Haze>

        <Haze as="div" delay={140} className="mt-14">
          <div className="flex items-end justify-between">
            <div>
              <p className="plate text-sand-3">{c.range.fromLabel}</p>
              <p className="tnum font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-none text-sand">
                {from}
              </p>
            </div>
            <div className="text-center">
              <p className="tnum font-display text-[clamp(1.6rem,3vw,2.4rem)] font-bold leading-none text-heat">
                {span}
              </p>
              <p className="plate mt-1 text-sand-3">{c.range.spanLabel}</p>
            </div>
            <div className="text-end">
              <p className="plate text-sand-3">{c.range.toLabel}</p>
              <p className="tnum font-display text-[clamp(2.2rem,5vw,4rem)] font-bold leading-none text-sand">
                {to}
              </p>
            </div>
          </div>

          {/* The axis itself: one tick per model year they have actually
              posted, with that year's cars listed under it. Ticks are placed
              by year across the published span, so the clustering at the
              recent end is the real shape of their stock. */}
          <div className="relative mt-10 hidden h-32 sm:block">
            <div className="absolute inset-x-0 top-8 h-px bg-sand-3/45" />
            {marks.map((m) => (
              <div
                key={m.year}
                className="absolute top-8"
                style={{ insetInlineStart: `${m.pct}%` }}
              >
                <span className="absolute -top-1.5 block h-3 w-3 -translate-x-1/2 rounded-full bg-heat rtl:translate-x-1/2" />
                <span className="tnum absolute -top-8 block -translate-x-1/2 font-display text-[0.9rem] font-bold text-ochre rtl:translate-x-1/2">
                  {m.year}
                </span>
                <ul className="absolute top-4 w-[5.4rem] -translate-x-1/2 space-y-0.5 rtl:translate-x-1/2">
                  {m.labels.map((l) => (
                    <li key={l} className="latin text-[0.72rem] leading-tight text-sand-2">
                      {l}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* On a phone the axis has nowhere to go, so the same data is a
              list. A 20-year span cannot be read at 390px wide. */}
          <ul className="mt-8 divide-y divide-sand-3/30 border-y border-sand-3/30 sm:hidden">
            {marks.map((m) => (
              <li key={m.year} className="flex items-baseline justify-between gap-4 py-3">
                <span className="tnum font-display text-[1.1rem] font-bold text-ochre">
                  {m.year}
                </span>
                <span className="latin flex-1 text-end text-[0.85rem] text-sand-2">
                  {m.labels.join(" · ")}
                </span>
              </li>
            ))}
          </ul>
        </Haze>
      </div>
    </section>
  );
}
