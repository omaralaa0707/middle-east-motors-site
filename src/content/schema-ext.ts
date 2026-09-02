import type { SiteContent } from "@/i18n/schema";
import { useContent } from "@/i18n/locale-provider";

/**
 * Middle East Motors' listings are written in the Egyptian used-car trade's
 * own condition vocabulary, and that vocabulary — not a spec table — is what
 * this site is built around. The shared schema has no room for a glossary, a
 * published model-year range, or a listing whose lines must stay in the
 * language they were written in, so this extension carries all three.
 */
export type MemContent = SiteContent & {
  hero: SiteContent["hero"] & {
    headlineLead: string;
    headlineAccent: string;
    hazeHint: string;
    hazeAlt: string;
    /** Reads out the temperature and odometer from their own dash frame. */
    clusterNote: string;
  };
  range: {
    eyebrow: string;
    heading: string;
    intro: string;
    /** Their bio line, quoted. */
    quote: string;
    fromLabel: string;
    toLabel: string;
    spanLabel: string;
  };
  glossary: {
    eyebrow: string;
    heading: string;
    intro: string;
    seenInLabel: string;
    /** Keyed by the Arabic term itself. */
    glosses: Record<string, { gloss: string; detail: string }>;
  };
  listings: {
    eyebrow: string;
    heading: string;
    intro: string;
    theirWords: string;
    wroteAr: string;
    wroteEn: string;
    noPhotos: string;
    noLines: string;
    photosLabel: string;
    roleLabels: Record<FrameRoleKey, string>;
    positionLabel: string;
  };
  visit: {
    eyebrow: string;
    heading: string;
    body: string[];
    kerbAlt: string;
    followersLabel: string;
    cta: string;
    facebookCta: string;
  };
};

type FrameRoleKey = "ext" | "rear" | "int" | "det";

export function useMem() {
  return useContent() as MemContent;
}
