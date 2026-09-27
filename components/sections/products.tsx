import { ProductCatalog } from "@/components/sections/product-catalog";
import { DemoNote } from "@/components/ui/demo-note";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { categories } from "@/data/categories";
import { productsContent } from "@/data/content";
import { products } from "@/data/products";

export function Products() {
  const availableCategories = categories.filter((category) =>
    products.some((product) => product.category === category.id),
  );

  return (
    <section id="productos" aria-labelledby="productos-title" className="section-space bg-cream-100">
      <div className="container-page">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="productos-title"
            eyebrow={productsContent.eyebrow}
            title={productsContent.title}
            text={productsContent.text}
          />
          <DemoNote className="self-start lg:self-end">Productos y fotos de ejemplo</DemoNote>
        </Reveal>

        <ProductCatalog products={products} categories={availableCategories} />
      </div>
    </section>
  );
}
