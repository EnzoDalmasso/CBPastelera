import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { categoryName } from "@/data/categories";
import type { Product } from "@/data/products";
import { formatPrice } from "@/lib/format";
import { productInquiryUrl } from "@/lib/whatsapp";

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.25rem] bg-cream-50 p-2 shadow-soft ring-1 ring-cocoa-900/5 transition-[transform,box-shadow] duration-500 ease-premium hover:-translate-y-1 hover:shadow-lifted sm:rounded-[1.5rem] sm:p-2.5">
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-200 sm:rounded-[1.15rem]">
        <Image
          src={product.image.src}
          alt={product.image.alt}
          fill
          sizes="(min-width: 1280px) 22vw, (min-width: 1024px) 30vw, 48vw"
          className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
        />
        <span className="absolute left-2.5 top-2.5 rounded-full bg-cream-50/90 px-2.5 py-1 text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-cocoa-700 sm:left-3 sm:top-3 sm:px-3 sm:text-[0.6875rem]">
          {categoryName(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col px-1.5 pb-1.5 pt-4 sm:px-2.5 sm:pb-2.5">
        <h3 className="font-display text-xl font-medium leading-[1.1] sm:text-2xl">{product.name}</h3>
        <p className="mt-2 line-clamp-3 text-[0.8125rem] leading-relaxed text-cocoa-600 sm:text-sm">
          {product.description}
        </p>
        {product.price !== null && (
          <p className="mt-3 text-sm font-semibold text-cocoa-800">{formatPrice(product.price)}</p>
        )}

        <div className="mt-auto pt-4">
          <ButtonLink
            href={productInquiryUrl(product.name)}
            external
            size="sm"
            variant="secondary"
            aria-label={`Consultar por ${product.name} en WhatsApp`}
            className="w-full group-hover:border-cocoa-900/30"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            Consultar
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
