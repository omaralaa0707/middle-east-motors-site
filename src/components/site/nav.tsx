"use client";

import { useEffect, useState } from "react";
import { useLocale } from "@/i18n/locale-provider";
import { useMem } from "@/content/schema-ext";
import { PROFILE } from "@/content/media";

export function Nav() {
  const c = useMem();
  const { locale, toggleLocale } = useLocale();
  const [solid, setSolid] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const on = () => setSolid(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        solid
          ? "border-b border-sand-3/35 bg-asphalt/90 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center gap-5 px-5 sm:px-8">
        <a href="#top" className="flex shrink-0 items-center gap-2.5" aria-label={c.brand.name}>
          <img src="/mark.svg" alt="" className="h-7 w-7" />
          <span className="font-display text-[1rem] font-bold leading-none text-sand">
            {c.brand.name}
          </span>
        </a>

        <nav className="ms-auto hidden items-center gap-7 md:flex">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="group relative py-2 text-[0.9rem] text-sand-2 transition-colors hover:text-sand"
            >
              {l.label}
              <span className="absolute inset-x-0 bottom-1 h-px origin-center scale-x-0 bg-heat transition-transform duration-300 group-hover:scale-x-100" />
            </a>
          ))}
        </nav>

        <a
          href={PROFILE.phoneHref}
          className="ms-auto hidden shrink-0 items-center gap-2 border border-sand-3/50 px-4 py-2 text-[0.82rem] font-medium text-sand transition-colors hover:border-heat hover:text-heat md:flex"
        >
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 shrink-0 rounded-full bg-heat"
            style={{ animation: "idle-pulse 2.6s ease-in-out infinite" }}
          />
          {c.hero.primaryCta}
        </a>

        <button
          onClick={toggleLocale}
          className="shrink-0 border border-sand-3/50 px-3.5 py-1.5 text-[0.74rem] font-medium text-sand-2 transition-colors hover:border-heat hover:text-sand"
          aria-label={c.a11y.toggleLanguage}
        >
          {locale === "ar" ? "EN" : "ع"}
        </button>

        <button
          onClick={() => setOpen((v) => !v)}
          className="border border-sand-3/50 p-2 md:hidden"
          aria-expanded={open}
          aria-label={open ? c.a11y.closeMenu : c.a11y.openMenu}
        >
          <span className="block h-px w-4 bg-sand" />
          <span className="mt-1 block h-px w-4 bg-sand" />
        </button>
      </div>

      {open && (
        <nav className="border-t border-sand-3/35 bg-asphalt/97 px-5 pb-4 backdrop-blur-xl md:hidden">
          {c.nav.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block border-b border-sand-3/25 py-3 text-[0.98rem] text-sand last:border-0"
            >
              {l.label}
            </a>
          ))}
          <a
            href={PROFILE.phoneHref}
            className="mt-3 block bg-heat px-4 py-2.5 text-center text-[0.86rem] font-semibold text-asphalt"
          >
            {c.hero.primaryCta}
          </a>
        </nav>
      )}
    </header>
  );
}
