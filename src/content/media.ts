/**
 * Middle East Motors post in Arabic, from the kerb outside their unit on
 * Ahmed Mohamed Ali Street in Heliopolis — the cars are photographed parked
 * at the pavement with the street's traffic, palms and interlock tile in
 * frame. There is no showroom wall in any of it.
 *
 * Their listings are written to a fixed template built out of the Egyptian
 * used-car condition vocabulary — كسر زيرو, فابريكا بالكامل, صيانات توكيل,
 * أعلى فئة — and that vocabulary is what this page is organised around.
 * Every line in LISTINGS is theirs, transcribed from the post, not
 * paraphrased.
 *
 * Only three of the seven cars have photographs here; the rest are listed on
 * their captions alone and carry no image, so a claim never outruns its
 * evidence.
 */

export type FrameRole = "ext" | "rear" | "int" | "det";
export type Frame = { src: string; role: FrameRole };

export type CarId = "renault-sandero" | "fiat-500x" | "mercedes-e200";

const f = (id: string, roles: Partial<Record<FrameRole, number>>): Frame[] =>
  (Object.entries(roles) as [FrameRole, number][]).flatMap(([role, n]) =>
    Array.from({ length: n }, (_, i) => ({
      src: `/media/${id}-${role}-${String(i + 1).padStart(2, "0")}.jpg`,
      role,
    })),
  );

/** The three cars there are photographs of. */
export const PHOTOGRAPHED: { id: CarId; frames: Frame[] }[] = [
  { id: "mercedes-e200", frames: f("mercedes-e200", { ext: 6, rear: 1, int: 4, det: 1 }) },
  { id: "renault-sandero", frames: f("renault-sandero", { ext: 4, int: 1, det: 1 }) },
  { id: "fiat-500x", frames: f("fiat-500x", { ext: 3, int: 1, det: 1 }) },
];

/**
 * The listings, in their own words. `lines` are transcribed verbatim from the
 * post — the Arabic ones stay Arabic in both locales of this site, because
 * translating "كسر زيرو" into "nearly new" throws away the actual term the
 * trade uses. The English copy explains them instead; it never replaces them.
 *
 * `wrote` records which language *they* wrote that listing in: the E200 is
 * the only one they posted in English.
 */
export type Listing = {
  id: string;
  marque: string;
  model: string;
  year: string;
  wrote: "ar" | "en";
  /** Verbatim lines from the caption, in order. */
  lines: string[];
  photos?: CarId;
};

export const LISTINGS: Listing[] = [
  {
    id: "nissan-juke",
    marque: "Nissan",
    model: "Juke",
    year: "2026",
    wrote: "ar",
    lines: [
      "عداد ١٥ الف كم فقط",
      "كسر زيرو",
      "اعلي فئة Tecna Sport",
      "فابريكا بالكامل",
      "صيانات توكيل",
    ],
  },
  {
    id: "renault-taliant",
    marque: "Renault",
    model: "Taliant",
    year: "2025",
    wrote: "ar",
    lines: [
      "عداد ٢٠ الف كم فقط",
      "كسر زيرو",
      "اعلي فئة بصمة",
      "فابريكا بالكامل",
      "صيانات توكيل بالفواتير",
    ],
  },
  {
    id: "mercedes-e200",
    marque: "Mercedes-Benz",
    model: "E200",
    year: "2025",
    wrote: "en",
    lines: ["KM: 5,000 only", "Category: Exclusive", "Fully Loaded", "All Fabrika", "Source: Europe"],
    photos: "mercedes-e200",
  },
  {
    id: "mg-rx5",
    marque: "MG",
    model: "RX5",
    year: "2024",
    wrote: "ar",
    lines: ["عداد ٤٢ الف كم", "فابريكا بالكامل", "صيانات توكيل", "بصمة داخلية و خارجية"],
  },
  {
    id: "citroen-c4x",
    marque: "Citroën",
    model: "C4X",
    year: "2022",
    wrote: "ar",
    lines: [
      "عداد ١٤٠ الف كم",
      "تاني فئة بصمة",
      "فابريكا بالكامل من برا و جوا",
      "صيانات توكيل كلها",
    ],
  },
  {
    id: "opel-astra",
    marque: "Opel",
    model: "Astra",
    year: "2016",
    wrote: "ar",
    lines: [
      "عداد ١٣٠ الف كم فقط",
      "اعلي فئة كوزمو",
      "فابريكا بالكامل من برا و جوا",
      "صيانات منتظمة",
    ],
  },
  {
    id: "renault-sandero",
    marque: "Renault",
    model: "Sandero Stepway",
    year: "—",
    wrote: "ar",
    lines: [],
    photos: "renault-sandero",
  },
  {
    id: "fiat-500x",
    marque: "Fiat",
    model: "500X",
    year: "—",
    wrote: "ar",
    lines: [],
    photos: "fiat-500x",
  },
];

/**
 * The vocabulary itself. Every term here appears verbatim in their captions;
 * the glosses explain what the trade means by it.
 */
export const GLOSSARY = [
  { term: "كسر زيرو", translit: "kasr zero", seenIn: ["nissan-juke", "renault-taliant"] },
  { term: "فابريكا بالكامل", translit: "fabrika bel-kamel", seenIn: ["nissan-juke", "citroen-c4x", "opel-astra"] },
  { term: "صيانات توكيل", translit: "seyanat tawkeel", seenIn: ["nissan-juke", "mg-rx5", "citroen-c4x"] },
  { term: "أعلى فئة", translit: "a'la fe'a", seenIn: ["nissan-juke", "opel-astra", "renault-taliant"] },
] as const;

/** Their published range, from the Instagram bio. */
export const YEAR_RANGE = { from: 2006, to: 2026 } as const;

export const HERO_FRAME = "/media/hero-wide.jpg";
export const HERO_FRAME_SM = "/media/hero-wide-sm.jpg";
/** Their own dashboard photograph: 62,936 km at 33.5°C. */
export const CLUSTER_FRAME = "/media/cluster.jpg";
export const KERB_FRAME = "/media/kerb.jpg";
/** Read off the cluster in that frame. */
export const CLUSTER = { km: "62,936", temp: "33.5" } as const;

export const PROFILE = {
  facebook: "https://www.facebook.com/MiddleEastMotors.eg/",
  instagram: "https://www.instagram.com/mem_middle_east_motors/",
  maps: "https://www.google.com/maps/search/?api=1&query=Middle+East+Motors+Heliopolis+Cairo",
  phones: ["01116686454", "01145003500"],
  phoneHref: "tel:+201116686454",
  whatsappHref: "https://wa.me/201116686454",
  email: "moh.eltayeb@hotmail.com",
  address: "4 Ahmed Mohamed Ali St, off Abdel Hamid Badawi — behind KFC Nadi El Shams, Heliopolis",
  addressAr: "٤ ش اللواء أحمد محمد علي، متفرع من عبد الحميد بدوي، خلف كنتاكي نادي الشمس، مصر الجديدة",
  followers: "38K",
} as const;
