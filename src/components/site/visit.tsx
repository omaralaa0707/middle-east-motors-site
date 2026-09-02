"use client";

import { useMem } from "@/content/schema-ext";
import { KERB_FRAME, CLUSTER_FRAME, PROFILE, CLUSTER } from "@/content/media";
import { Haze, HeatRule } from "@/components/motion/haze";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="border-t border-sand-3/35 py-5">
      <dt className="plate text-sand-3">{label}</dt>
      <dd className="mt-2.5 text-[clamp(1rem,1.5vw,1.15rem)] leading-snug text-sand">{children}</dd>
    </div>
  );
}

export function Visit() {
  const c = useMem();

  return (
    <section id="visit" className="relative bg-asphalt py-24 sm:py-32">
      <div className="mx-auto max-w-[86rem] px-5 sm:px-8">
        <Haze as="div" className="max-w-[46rem]">
          <p className="plate text-ochre">{c.visit.eyebrow}</p>
          <h2 className="mt-4 font-display text-display font-bold text-sand">{c.visit.heading}</h2>
          <HeatRule className="mt-5 max-w-[8rem]" delay={100} />
        </Haze>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,26rem)] lg:gap-14">
          <Haze as="div" delay={110}>
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-asphalt-3">
              <img
                src={KERB_FRAME}
                alt={c.visit.kerbAlt}
                className="h-full w-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-3 grid gap-3 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
              <div className="relative aspect-[4/3] overflow-hidden bg-asphalt-3">
                <img
                  src={CLUSTER_FRAME}
                  alt={c.hero.clusterNote}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <p className="self-center text-[0.86rem] leading-relaxed text-sand-2">
                <span className="tnum font-display text-[1.6rem] font-bold leading-none text-heat">
                  {CLUSTER.temp}°
                </span>
                <span className="mx-2 text-sand-3">·</span>
                <span className="tnum">{CLUSTER.km} km</span>
                <span className="mt-2 block text-sand-3">{c.hero.clusterNote}</span>
              </p>
            </div>
          </Haze>

          <Haze as="div" delay={60}>
            <div className="space-y-4 text-[0.98rem] leading-relaxed text-sand-2">
              {c.visit.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {c.about.body.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
            </div>

            <dl className="mt-8">
              <Row label={c.contact.addressLabel}>{c.contact.address}</Row>
              <Row label={c.contact.phoneLabel}>
                <span className="flex flex-col gap-1">
                  {c.contact.phones.map((p) => (
                    <a
                      key={p}
                      href={`tel:+2${p}`}
                      className="latin tnum transition-colors hover:text-heat"
                    >
                      {p}
                    </a>
                  ))}
                </span>
              </Row>
              <Row label={c.visit.followersLabel}>
                <span className="tnum font-display text-[1.6rem] font-bold text-sand">
                  {PROFILE.followers}
                </span>
              </Row>
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-heat px-6 py-3.5 font-display text-[0.92rem] font-bold text-asphalt transition-opacity hover:opacity-90"
              >
                {c.visit.cta}
              </a>
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-sand-3/60 px-6 py-3.5 font-display text-[0.92rem] font-bold text-sand transition-colors hover:border-heat hover:text-heat"
              >
                {c.visit.facebookCta}
              </a>
            </div>
          </Haze>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  const c = useMem();

  return (
    <footer className="bg-asphalt-2 text-sand">
      <span aria-hidden="true" className="heat-rule block h-[3px] w-full" />
      <div className="mx-auto max-w-[86rem] px-5 py-12 sm:px-8 sm:py-14">
        <div className="grid gap-10 md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)] md:gap-16">
          <div>
            <div className="flex items-center gap-2.5">
              <img src="/mark.svg" alt="" className="h-6 w-6" />
              <span className="font-display text-[0.98rem] font-bold text-sand">
                {c.brand.name}
              </span>
            </div>
            <p className="mt-5 max-w-[18rem] text-[0.9rem] leading-relaxed text-sand-2">
              {c.brand.tagline}
            </p>
            <p className="mt-5 text-[0.86rem] leading-relaxed text-sand-2">{c.contact.address}</p>
            <a
              href={PROFILE.phoneHref}
              className="latin tnum mt-2 inline-block text-[0.95rem] font-semibold text-sand transition-colors hover:text-heat"
            >
              {c.contact.phones[0]}
            </a>
          </div>
          <div className="space-y-6">
            <nav className="flex flex-wrap gap-x-7 gap-y-3">
              {c.nav.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  className="plate text-sand-2 transition-colors hover:text-heat"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={c.contact.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="plate text-sand-2 transition-colors hover:text-heat"
              >
                {c.visit.facebookCta}
              </a>
              <a
                href={c.contact.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="plate text-sand-2 transition-colors hover:text-heat"
              >
                {c.visit.cta}
              </a>
            </nav>
            <div className="max-w-2xl space-y-3 border-t border-sand-3/35 pt-6">
              <p className="text-[0.82rem] leading-relaxed text-sand-2">{c.footer.disclaimer}</p>
              <p className="plate text-sand-3">{c.footer.rights}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
