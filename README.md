# Middle East Motors — site 11 of 46

A concept site built entirely from this dealership's own published material.
**Not affiliated with Middle East Motors, and not an official site.**

- **Live:** https://middle-east-motors-site.vercel.app
- **Repo:** [middle-east-motors-site](https://github.com/omaralaa0707/middle-east-motors-site)

## What this page is about

Every site in this series is built around something true and checkable about
the dealer's own account — a pattern in what they publish, a contradiction
between two of their channels, or a fact about their showroom — rather than
around a generic template. The palette, type, 3D piece and motion below were
all chosen to serve that finding.

## Design record

**Palette**
: Cairo dust, sampled from their own kerbside frames: warm asphalt #1B1712 under sand #E8DCC8, the interlock-tile ochre #916E4A their cars actually stand on, and the amber #FAA65E off the one dashboard photo they posted — which reads 33.5°C

**Type pairing**
: **Arabic-first**: Zain + Mada leading, Anton + Figtree as the *override* — the only site in the set where the Latin pass is the correction

**3D / signature technique**
: Heat mirage in a single fragment program: a temperature field weighted to the road surface refracts their own street photograph, with two scales of advecting convection noise, wavelength-split sampling, and a faint sky-mirror term low in frame; the pointer adds local turbulence rather than carrying an effect

**Motion language**
: The shimmer: content resolves out of haze — blurred and horizontally displaced, one waver, then settled

## Sources

Everything on the page was sourced from:

- Instagram: https://www.instagram.com/mem_middle_east_motors/
- Facebook: https://www.facebook.com/MiddleEastMotors.eg/
- Google Maps: https://www.google.com/maps/place/Middle+East+Motors/data=!4m2!3m1!1s0x0:0xd170cd60524fff8b

Photography belongs to the dealership (or, where their frames are watermarked
by an outside studio, to that studio) and is used here only to document their
own published material. No figure on the page is invented: anything the dealer
did not publish is marked as unpublished rather than estimated.

## Running it

```bash
pnpm install
pnpm dev      # http://localhost:3000
pnpm build    # production build — must pass before shipping
pnpm lint     # eslint, zero warnings
```

Requires `node-linker=hoisted` in `.npmrc` (already present) or three.js peer
deps fail to resolve.

## Structure

```
src/content/media.ts      verified facts and figures — the data layer
src/content/en.ts|ar.ts   all copy, both locales, identical shapes
src/content/schema-ext.ts the page-specific content contract
src/components/webgl/     the 3D piece
src/components/site/      the page composition
src/app/globals.css       palette tokens, type, RTL overrides, motion
```

Arabic/English toggle with full RTL. All CSS direction overrides key off
`[dir="rtl"]` (never `[lang]`) and live outside `@layer`. Every Latin or
numeric fragment inside Arabic copy is wrapped in `.latin` for correct bidi.

---

Part of a 46-site series. See the [top-level README](../README.md) for the full
index and [`TRACKING.md`](../TRACKING.md) for the differentiation log.
