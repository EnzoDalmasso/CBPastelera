import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import type { SiteContent } from "@/lib/content/types";

export function Instagram({ content }: { content: SiteContent["instagram"] }) {
  const handle = `@${business.instagram.handle}`;

  return (
    <section aria-labelledby="instagram-title" className="section-space">
      <div className="container-page">
        <Reveal className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{content.eyebrow}</Eyebrow>
            <h2
              id="instagram-title"
              className="mt-5 font-display text-[2.5rem] font-medium leading-none tracking-[-0.015em] sm:text-5xl lg:text-6xl"
            >
              {handle}
            </h2>
            {content.text && <p className="mt-4 text-base text-cocoa-600 sm:text-lg">{content.text}</p>}
          </div>
          <ButtonLink href={business.instagram.url} external variant="secondary" className="self-start sm:self-auto">
            <InstagramIcon className="size-5" />
            {content.button}
          </ButtonLink>
        </Reveal>

        {content.posts.length > 0 && (
          <Reveal delay={0.1} className="mt-10 lg:mt-14">
            <ul className="grid grid-cols-3 gap-2 sm:gap-3 lg:grid-cols-6">
              {content.posts.map((post, index) => (
                <li key={`${post.image.src}-${index}`}>
                  <a
                    href={post.url || business.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ver en Instagram${post.image.alt ? `: ${post.image.alt}` : ""}`}
                    className="group relative block aspect-square overflow-hidden rounded-xl bg-cream-200 sm:rounded-2xl"
                  >
                    <Image
                      src={post.image.src}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 16vw, 32vw"
                      className="object-cover transition-transform duration-700 ease-premium group-hover:scale-[1.05]"
                    />
                    <span className="absolute inset-0 flex items-center justify-center bg-cocoa-950/0 text-cream-50 opacity-0 transition-[background-color,opacity] duration-300 group-hover:bg-cocoa-950/30 group-hover:opacity-100 group-focus-visible:bg-cocoa-950/30 group-focus-visible:opacity-100">
                      <InstagramIcon className="size-7" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>
    </section>
  );
}
