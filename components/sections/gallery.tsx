import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/content/types";

export function Gallery({ content }: { content: SiteContent["gallery"] }) {
  if (content.images.length === 0) return null;

  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="galeria-title"
            eyebrow={content.eyebrow}
            title={content.title}
            align="center"
          />
        </Reveal>

        <GalleryGrid images={content.images} />
      </div>
    </section>
  );
}
