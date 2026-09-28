import { business } from "@/data/business";
import type { SiteContent } from "@/lib/content/types";
import { siteUrl } from "@/lib/site";

export function bakeryJsonLd(content: SiteContent) {
  const { location } = content.contact;

  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: business.name,
    description: business.description,
    url: siteUrl,
    image: content.hero.image.src,
    telephone: `+${business.whatsapp.number}`,
    sameAs: [business.instagram.url],
    ...(location && {
      address: {
        "@type": "PostalAddress",
        ...(location.address && { streetAddress: location.address }),
        addressLocality: location.city,
        addressRegion: location.region,
        addressCountry: "AR",
      },
      ...(location.mapsUrl && { hasMap: location.mapsUrl }),
    }),
  };
}
