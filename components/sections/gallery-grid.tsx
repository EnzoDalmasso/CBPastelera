"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import { RevealItem, RevealList } from "@/components/ui/reveal";
import type { ImageAsset } from "@/lib/types";

export function GalleryGrid({ images }: { images: ImageAsset[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <RevealList className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:mt-16 md:grid-cols-3 md:pb-12 lg:gap-6 md:[&>li:nth-child(3n+2)]:translate-y-12">
        {images.map((image, index) => (
          <RevealItem key={image.src}>
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Ampliar foto: ${image.alt}`}
              className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream-200 lg:rounded-[1.5rem]"
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 768px) 32vw, 48vw"
                className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.04]"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 bg-cocoa-950/0 transition-colors duration-500 group-hover:bg-cocoa-950/15"
              />
              <span
                aria-hidden="true"
                className="absolute bottom-3 right-3 flex size-10 translate-y-2 items-center justify-center rounded-full bg-cream-50/95 text-cocoa-900 opacity-0 transition-[opacity,transform] duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100"
              >
                <Plus className="size-4" />
              </span>
            </button>
          </RevealItem>
        ))}
      </RevealList>

      <Lightbox
        images={images}
        index={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
    </>
  );
}
