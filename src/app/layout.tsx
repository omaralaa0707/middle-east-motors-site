import type { Metadata } from "next";
import { Zain, Mada, Anton, Figtree } from "next/font/google";
import "./globals.css";
import { LocaleProvider } from "@/i18n/locale-provider";
import { ar } from "@/content/ar";
import { en } from "@/content/en";

// This dealership writes in Arabic, so the Arabic face leads and the Latin
// one follows it, rather than the other way round.
const zain = Zain({
  subsets: ["arabic", "latin"],
  weight: ["400", "700", "800"],
  variable: "--font-zain",
});
const mada = Mada({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mada",
});
const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
});
const figtree = Figtree({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  title: "الشرق الأوسط للسيارات — Middle East Motors | Heliopolis",
  description:
    "Used cars in every model from 2006 to this year, financed on the lowest deposit. Photographed at the kerb on Ahmed Mohamed Ali Street, Heliopolis.",
  metadataBase: new URL("https://middle-east-motors-site.vercel.app"),
  icons: { icon: "/mark.svg" },
  openGraph: {
    title: "الشرق الأوسط للسيارات — Middle East Motors",
    description: "Every model from 2006 to this year, on the lowest deposit.",
    images: ["/media/hero-wide.jpg"],
    locale: "ar_EG",
    type: "website",
  },
  other: { "theme-color": "#1b1712" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    // translate="no": the page ships hand-written Arabic and English, and
    // Chrome's auto-translate rewrites `lang`, which would also break every
    // [dir="rtl"] correction if the CSS were keyed off language instead.
    <html
      lang="ar"
      dir="rtl"
      translate="no"
      className={`notranslate ${zain.variable} ${mada.variable} ${anton.variable} ${figtree.variable}`}
    >
      <body className="bg-asphalt text-sand antialiased">
        {/* Sections resolve out of haze with an intersection observer, so
            without scripting every one of them would stay at opacity 0. */}
        <noscript>
          <style>{`[data-haze],[data-rule]{opacity:1!important;transform:none!important;filter:none!important;animation:none!important}`}</style>
        </noscript>
        <LocaleProvider dictionaries={{ ar, en }} defaultLocale="ar">
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
