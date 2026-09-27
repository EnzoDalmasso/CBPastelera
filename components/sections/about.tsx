import Image from "next/image";
import { DemoNote } from "@/components/ui/demo-note";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { aboutContent } from "@/data/content";

export function About() {
  const { eyebrow, title, paragraphs, signature, image, detailImage } = aboutContent;

  return (
    <section id="nosotros" aria-labelledby="nosotros-title" className="section-space overflow-hidden bg-cream-100">
      <div className="container-page grid items-center gap-16 lg:grid-cols-12 lg:gap-10">
        <Reveal className="relative pb-10 pr-10 sm:pb-14 sm:pr-16 lg:col-span-6 lg:pb-16">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-cream-200 lg:rounded-[2rem]">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(min-width: 1024px) 42vw, 85vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-0 right-0 aspect-square w-[46%] overflow-hidden rounded-[1.5rem] bg-cream-200 shadow-lifted ring-8 ring-cream-100">
            <Image
              src={detailImage.src}
              alt={detailImage.alt}
              fill
              sizes="(min-width: 1024px) 20vw, 40vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <SectionHeading id="nosotros-title" eyebrow={eyebrow} title={title} />
          <div className="mt-6 space-y-5 text-pretty text-base leading-relaxed text-cocoa-600 sm:text-lg">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <p className="mt-8 font-display text-3xl italic text-caramel-600">{signature}</p>
          <DemoNote className="mt-8">Texto provisorio</DemoNote>
        </Reveal>
      </div>
    </section>
  );
}
