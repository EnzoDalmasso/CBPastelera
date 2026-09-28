import { ProductCatalog } from "@/components/sections/product-catalog";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/content/types";

export function Products({ content }: { content: SiteContent["products"] }) {
  const availableCategories = content.categories.filter((category) =>
    content.items.some((product) => product.category === category.id),
  );

  return (
    <section id="productos" aria-labelledby="productos-title" className="section-space bg-cream-100">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="productos-title"
            eyebrow={content.eyebrow}
            title={content.title}
            text={content.text}
          />
        </Reveal>

        <ProductCatalog products={content.items} categories={availableCategories} />
      </div>
    </section>
  );
}
