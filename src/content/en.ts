import type { MemContent } from "./schema-ext";
import { PROFILE, CLUSTER, YEAR_RANGE } from "./media";

export const en: MemContent = {
  locale: "en",
  dir: "ltr",

  brand: {
    name: "Middle East Motors",
    shortName: "MEM",
    tagline: "Used cars, every model, on the lowest deposit",
  },

  nav: [
    { label: "The range", href: "#range" },
    { label: "The words", href: "#glossary" },
    { label: "Listings", href: "#listings" },
    { label: "The kerb", href: "#visit" },
  ],

  hero: {
    eyebrow: "Heliopolis · Cairo",
    headline: "Every model from 2006 to this year",
    headlineLead: "Every model from",
    headlineAccent: "2006 to this year",
    sub: "Middle East Motors sell and finance used cars from a unit on Ahmed Mohamed Ali Street. Their cars are photographed where they stand — at the kerb, in the traffic, in the heat.",
    primaryCta: "Call the showroom",
    secondaryCta: "See the listings",
    hazeHint: "Drag across the road.",
    hazeAlt: "A white Mercedes-Benz E200 parked at the kerb on Ahmed Mohamed Ali Street, Heliopolis.",
    clusterNote: `Their own dashboard photograph reads ${CLUSTER.km} km at ${CLUSTER.temp}°C.`,
  },

  about: {
    heading: "Middle East Motors",
    body: [
      "Middle East Motors work in selling and financing used cars, in every model, on the lowest deposit, through bank finance — that is their own description of the business, and it is the whole business.",
    ],
  },

  services: { heading: "Listings", items: [] },
  gallery: { heading: "Listings", items: [] },

  range: {
    eyebrow: "What they carry",
    heading: "Twenty model years, one lot",
    intro:
      "Not a marque list and not a segment — a span of years. Everything they have posted falls inside it, from a 2016 Astra to a 2026 Juke.",
    quote: "We finance every car, from 2006 models up to the current year.",
    fromLabel: "From",
    toLabel: "To",
    spanLabel: "Model years",
  },

  glossary: {
    eyebrow: "How they describe a car",
    heading: "Four words that do all the work",
    intro:
      "Every listing they write is built from the same handful of terms. They are the Egyptian used-car trade's own vocabulary, and they carry more information than a spec sheet does — so this page keeps them in Arabic and explains them, rather than translating them away.",
    seenInLabel: "Used on",
    glosses: {
      "كسر زيرو": {
        gloss: "kasr zero — “broken zero”",
        detail:
          "A car that has been registered and driven, but barely. The zero on the odometer has been broken and not much else has happened since.",
      },
      "فابريكا بالكامل": {
        gloss: "fabrika bel-kamel — “entirely factory”",
        detail:
          "Every panel still wears the paint it left the factory in. No filler, no respray, nothing straightened. Two of their listings extend it to من برا و جوا — outside and in.",
      },
      "صيانات توكيل": {
        gloss: "seyanat tawkeel — “agency servicing”",
        detail:
          "Serviced at the manufacturer's authorised centre rather than a street garage. On the Taliant they add بالفواتير — with the invoices to prove it.",
      },
      "أعلى فئة": {
        gloss: "a'la fe'a — “top trim”",
        detail:
          "The highest specification that model was sold in. They name it every time: Tecna Sport on the Juke, كوزمو on the Astra, بصمة on the Taliant.",
      },
    },
  },

  listings: {
    eyebrow: "On the lot",
    heading: "Eight cars, in their own words",
    intro:
      "Every line below is transcribed from that car's own post, in the language they wrote it in. Nothing is added, and where they published no photograph, none is shown.",
    theirWords: "Their listing",
    wroteAr: "Posted in Arabic",
    wroteEn: "Posted in English",
    noPhotos: "No photographs published with this listing",
    noLines: "They published photographs of this car but no written listing",
    photosLabel: "Photographs",
    roleLabels: { ext: "Exterior", rear: "Rear", int: "Cabin", det: "Detail" },
    positionLabel: "{n} / {total}",
  },

  visit: {
    eyebrow: "Where they are",
    heading: "Behind the KFC at Nadi El Shams",
    body: [
      "The address they publish is not a district or a mall — it is a turning and a landmark: off Abdel Hamid Badawi, behind the KFC at Nadi El Shams. That is how you actually find the place.",
      "It is also why every photograph on this page has a street in it. The cars are shot where they are parked, and the kerb is the showroom.",
    ],
    kerbAlt: "A black Renault Sandero Stepway parked at the kerb, Heliopolis.",
    followersLabel: "Followers",
    cta: "Open in Maps",
    facebookCta: "Facebook",
  },

  contact: {
    heading: "Talk to them",
    addressLabel: "Address",
    address: PROFILE.address,
    phoneLabel: "Call or WhatsApp",
    phones: [...PROFILE.phones],
    mapsUrl: PROFILE.maps,
    facebookUrl: PROFILE.facebook,
    instagramUrl: PROFILE.instagram,
    cta: "Call the showroom",
  },

  footer: {
    disclaimer:
      "A concept design, built as a demonstration. Not an official Middle East Motors site, and not affiliated with them. All photography, marks and quoted copy belong to Middle East Motors.",
    rights: "Concept by Claude",
  },

  a11y: {
    toggleLanguage: "التبديل إلى العربية",
    openMenu: "Open menu",
    closeMenu: "Close menu",
  },
};

export const RANGE = YEAR_RANGE;
