import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import { instagramContent } from "@/data/content";
import { instagramImages } from "@/data/gallery";

export function Instagram() {
  const handle = `@${business.instagram.handle}`;

  return (
    <section aria-labelledby="instagram-title" className="section-space">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{instagramContent.eyebrow}</Eyebrow>
            <h2
              id="instagram-title"
              className="mt-5 font-display text-[2.5rem] font-medium leading-none tracking-[-0.015em] sm:text-5xl lg:text-6xl"
            >
              {handle}
            </h2>
            <p className="mt-4 text-base text-cocoa-600 sm:text-lg">{instagramContent.text}</p>
          </div>
          <ButtonLink href={business.instagram.url} external variant="secondary" className="self-start sm:self-auto">
            <InstagramIcon className="size-5" />
            {instagramContent.button}
          </ButtonLink>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 lg:mt-14">
          <a
            href={business.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ver publicaciones de ${handle} en Instagram`}
            className="grid grid-cols-3 gap-2 rounded-2xl sm:gap-3 lg:grid-cols-6"
          >
            {instagramImages.map((image) => (
              <span
                key={image.src}
                className="group relative block aspect-square overflow-hidden rounded-xl bg-cream-200 sm:rounded-2xl"
              >
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, 32vw"
                  className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-cocoa-950/0 text-cream-50 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-cocoa-950/30 group-hover:opacity-100">
                  <InstagramIcon className="size-7" />
                </span>
              </span>
            ))}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
