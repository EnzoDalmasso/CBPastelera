import { business } from "@/data/business";
import { siteUrl } from "@/lib/site";

export function bakeryJsonLd() {
  const { location, hours } = business;

  return {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: business.name,
    description: business.description,
    url: siteUrl,
    telephone: `+${business.whatsapp.number}`,
    sameAs: [business.instagram.url],
    ...(location && {
      address: {
        "@type": "PostalAddress",
        streetAddress: location.streetAddress,
        addressLocality: location.city,
        addressRegion: location.region,
        postalCode: location.postalCode,
        addressCountry: location.country,
      },
    }),
    ...(hours.length > 0 && {
      openingHoursSpecification: hours.map((entry) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: entry.schemaDays,
        opens: entry.opens,
        closes: entry.closes,
      })),
    }),
  };
}
