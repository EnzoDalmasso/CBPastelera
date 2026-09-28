"use client";

import { useState } from "react";
import { ProductCard } from "@/components/sections/product-card";
import { RevealItem, RevealList } from "@/components/ui/reveal";
import type { Category, Product } from "@/lib/content/types";
import { cn } from "@/lib/cn";

const ALL = "__todos";

type ProductCatalogProps = {
  products: Product[];
  categories: Category[];
};

export function ProductCatalog({ products, categories }: ProductCatalogProps) {
  const [filter, setFilter] = useState<string>(ALL);
  const visibleProducts =
    filter === ALL ? products : products.filter((product) => product.category === filter);

  const filters = [{ id: ALL, name: "Todos" }, ...categories];
  const categoryName = (id: string) => categories.find((category) => category.id === id)?.name ?? "";

  return (
    <div className="mt-12 lg:mt-16">
      <div
        role="group"
        aria-label="Filtrar productos por categoría"
        className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {filters.map((item) => {
          const active = filter === item.id;
          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(item.id)}
              className={cn(
                "h-10 shrink-0 rounded-full px-5 text-sm font-medium transition-[background-color,color,border-color] duration-200",
                active
                  ? "bg-cocoa-800 text-cream-50"
                  : "border border-cocoa-900/12 text-cocoa-700 hover:border-cocoa-900/35 hover:text-cocoa-900",
              )}
            >
              {item.name}
            </button>
          );
        })}
      </div>

      <p className="sr-only" aria-live="polite">
        {visibleProducts.length} productos
        {filter !== ALL && ` en ${categoryName(filter)}`}
      </p>

      <RevealList
        key={filter}
        className="mt-8 grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-5 sm:gap-y-8 lg:grid-cols-3 xl:grid-cols-4"
      >
        {visibleProducts.map((product) => (
          <RevealItem key={product.id}>
            <ProductCard product={product} categoryName={categoryName(product.category)} />
          </RevealItem>
        ))}
      </RevealList>
    </div>
  );
}
