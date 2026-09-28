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
import { getSiteContent } from "@/lib/content/get-content";
import { bakeryJsonLd } from "@/lib/structured-data";

export default async function HomePage() {
  const content = await getSiteContent();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(bakeryJsonLd(content)).replace(/</g, "\\u003c"),
        }}
      />
      <Navbar />
      <main id="contenido">
        <Hero content={content.hero} />
        <Intro content={content.intro} />
        <Products content={content.products} />
        <Gallery content={content.gallery} />
        <About content={content.about} />
        <WhatsAppCta content={content.cta} />
        <Instagram content={content.instagram} />
        <Contact content={content.contact} />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </>
  );
}
