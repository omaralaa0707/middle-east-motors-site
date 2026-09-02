"use client";

import { useState } from "react";
import { useMem } from "@/content/schema-ext";
import { LISTINGS, PHOTOGRAPHED, type CarId } from "@/content/media";
import { Haze, HeatRule } from "@/components/motion/haze";

function Gallery({ id, label }: { id: CarId; label: string }) {
  const c = useMem();
  const entry = PHOTOGRAPHED.find((p) => p.id === id);
  const [i, setI] = useState(0);
  if (!entry) return null;
  const frames = entry.frames;
  const cur = frames[Math.min(i, frames.length - 1)];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden bg-asphalt-3">
        <img
          key={cur.src}
          src={cur.src}
          alt={`${label} — ${c.listings.roleLabels[cur.role]}`}
          className="h-full w-full object-cover"
          loading="lazy"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-asphalt/85 to-transparent p-3">
          <span className="plate text-sand-2">{c.listings.roleLabels[cur.role]}</span>
          <span className="tnum text-[0.7rem] text-sand-3">
            {c.listings.positionLabel
              .replace("{n}", String(Math.min(i, frames.length - 1) + 1))
              .replace("{total}", String(frames.length))}
          </span>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {frames.map((f, n) => (
          <button
            key={f.src}
            onClick={() => setI(n)}
            aria-label={`${c.listings.roleLabels[f.role]} ${n + 1}`}
            className={`h-1 transition-all ${
              n === Math.min(i, frames.length - 1) ? "w-7 bg-heat" : "w-3.5 bg-sand-3/50 hover:bg-sand-2"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export function Listings() {
  const c = useMem();

  return (
    <section id="listings" className="relative bg-asphalt-2 py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Haze as="div" className="max-w-[46rem]">
          <p className="plate text-ochre">{c.listings.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-sand">
            {c.listings.heading}
          </h2>
          <HeatRule className="mt-5 max-w-[8rem]" delay={100} />
          <p className="mt-6 text-lead leading-relaxed text-sand-2">{c.listings.intro}</p>
        </Haze>

        <div className="mt-14 space-y-px bg-sand-3/25">
          {LISTINGS.map((l, i) => (
            <Haze
              key={l.id}
              as="article"
              delay={Math.min(i, 4) * 70}
              className="bg-asphalt-2 py-9"
            >
              <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-12">
                <div>
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <span className="plate text-sand-3">{l.marque}</span>
                    <h3 className="latin font-display text-[clamp(1.5rem,3vw,2.3rem)] leading-none text-sand">
                      {l.model}
                    </h3>
                    {l.year !== "—" && (
                      <span className="tnum font-display text-[1.2rem] text-heat">{l.year}</span>
                    )}
                  </div>

                  {l.lines.length > 0 ? (
                    <>
                      <p className="plate mt-6 text-sand-3">{c.listings.theirWords}</p>
                      {/* Their lines, in the language they wrote them in. The
                          Arabic ones are forced RTL even inside the English
                          locale, or they render reversed. */}
                      <ul
                        className="mt-3 space-y-1.5"
                        dir={l.wrote === "ar" ? "rtl" : "ltr"}
                      >
                        {l.lines.map((line) => (
                          <li
                            key={line}
                            className={`text-[1.02rem] leading-relaxed text-sand ${
                              l.wrote === "ar" ? "term font-normal" : ""
                            }`}
                          >
                            {line}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-4 text-[0.74rem] text-sand-3">
                        {l.wrote === "ar" ? c.listings.wroteAr : c.listings.wroteEn}
                      </p>
                    </>
                  ) : (
                    <p className="mt-4 text-[0.86rem] text-sand-3">{c.listings.noLines}</p>
                  )}
                </div>

                <div>
                  {l.photos ? (
                    <Gallery id={l.photos} label={`${l.marque} ${l.model}`} />
                  ) : (
                    // A quiet one-line note, not a large empty plate: the
                    // absence of a photograph should not outweigh the listing
                    // that is actually there.
                    <p className="border-s-2 border-sand-3/40 ps-4 text-[0.8rem] leading-relaxed text-sand-3">
                      {c.listings.noPhotos}
                    </p>
                  )}
                </div>
              </div>
            </Haze>
          ))}
        </div>
      </div>
    </section>
  );
}
