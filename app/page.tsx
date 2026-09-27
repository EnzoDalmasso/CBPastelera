import { FloatingWhatsApp } from "@/components/layout/floating-whatsapp";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Instagram } from "@/components/sections/instagram";
import { Intro } from "@/components/sections/intro";
import { Products } from "@/components/sections/products";
import { WhatsAppCta } from "@/components/sections/whatsapp-cta";
import { bakeryJsonLd } from "@/lib/structured-data";

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bakeryJsonLd()).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="contenido">
        <Hero />
        <Intro />
        <Products />
        <Gallery />
        <About />
        <WhatsAppCta />
        <Instagram />
        <Contact />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
