"use client";

import { useMem } from "@/content/schema-ext";
import { GLOSSARY, LISTINGS } from "@/content/media";
import { Haze, HeatRule } from "@/components/motion/haze";

/**
 * The heart of this site. Their listings are written in four terms, and the
 * terms stay Arabic in both locales — translating "كسر زيرو" into "nearly
 * new" throws away the actual word the trade uses, which is the thing worth
 * showing. The English side glosses them instead.
 */
export function Glossary() {
  const c = useMem();
  const nameOf = (id: string) => {
    const l = LISTINGS.find((x) => x.id === id);
    return l ? `${l.marque} ${l.model}` : id;
  };

  return (
    <section id="glossary" className="relative bg-asphalt py-24 sm:py-32">
      <div className="mx-auto max-w-[80rem] px-5 sm:px-8">
        <Haze as="div" className="max-w-[46rem]">
          <p className="plate text-ochre">{c.glossary.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-sand">
            {c.glossary.heading}
          </h2>
          <HeatRule className="mt-5 max-w-[8rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-sand-2">{c.glossary.intro}</p>
        </Haze>

        <div className="mt-14 grid gap-px overflow-hidden border border-sand-3/30 bg-sand-3/30 sm:grid-cols-2">
          {GLOSSARY.map((g, i) => {
            const gl = c.glossary.glosses[g.term];
            return (
              <Haze
                key={g.term}
                as="article"
                delay={i * 90}
                className="bg-asphalt p-7 sm:p-9"
              >
                <p className="term text-[clamp(1.9rem,4vw,3rem)] leading-none text-heat">
                  {g.term}
                </p>
                <p className="mt-3 text-[0.86rem] italic text-sand-2 rtl:not-italic">
                  {gl?.gloss}
                </p>
                <p className="mt-4 text-[0.95rem] leading-relaxed text-sand-2">{gl?.detail}</p>
                <p className="plate mt-6 text-sand-3">{c.glossary.seenInLabel}</p>
                <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                  {g.seenIn.map((id) => (
                    <li key={id} className="latin text-[0.78rem] text-ochre">
                      {nameOf(id)}
                    </li>
                  ))}
                </ul>
              </Haze>
            );
          })}
        </div>
      </div>
    </section>
  );
}
