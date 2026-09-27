import { GalleryGrid } from "@/components/sections/gallery-grid";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { galleryContent } from "@/data/content";
import { galleryImages } from "@/data/gallery";

export function Gallery() {
  return (
    <section id="galeria" aria-labelledby="galeria-title" className="section-space">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            id="galeria-title"
            eyebrow={galleryContent.eyebrow}
            title={galleryContent.title}
            align="center"
          />
        </Reveal>

        <GalleryGrid images={galleryImages} />
      </div>
    </section>
  );
}
