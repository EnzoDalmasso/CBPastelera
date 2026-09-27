import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { MotionProvider } from "@/components/layout/motion-provider";
import { business } from "@/data/business";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const title = `${business.name} | ${business.tagline}`;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${business.name}` },
  description: business.description,
  applicationName: business.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_AR",
    url: "/",
    siteName: business.name,
    title,
    description: business.description,
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: business.description,
  },
  formatDetection: { telephone: false, address: false, email: false },
};

export const viewport: Viewport = {
  themeColor: "#fdfbf7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <a
          href="#contenido"
          className="fixed left-4 top-4 z-[70] -translate-y-24 rounded-full bg-cocoa-900 px-5 py-3 text-sm font-semibold text-cream-50 transition-transform focus:translate-y-0"
        >
          Saltar al contenido
        </a>
        <MotionProvider>{children}</MotionProvider>
      </body>
    </html>
  );
}
