import { MessageCircle } from "lucide-react";
import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import { heroContent } from "@/data/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function Hero() {
  const { eyebrow, titleStart, titleAccent, subtitle, image, detailImage } = heroContent;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate bg-cocoa-950 lg:bg-transparent">
      <div className="relative flex min-h-[100svh] flex-col justify-end lg:container-page lg:grid lg:min-h-0 lg:grid-cols-12 lg:items-center lg:gap-10 lg:pb-20 lg:pt-32 xl:gap-16">
        <div className="absolute inset-0 -z-10 lg:relative lg:inset-auto lg:z-0 lg:order-2 lg:col-span-5 lg:col-start-8">
          <div className="relative h-full overflow-hidden lg:aspect-[4/5] lg:h-auto lg:rounded-[2rem] lg:shadow-lifted">
            <Image
              src={image.src}
              alt={image.alt}
              fill
              preload
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="animate-settle object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-linear-to-t from-cocoa-950/90 via-cocoa-950/40 to-cocoa-950/30 lg:hidden"
            />
          </div>

          <div className="absolute -left-14 bottom-12 hidden aspect-square w-40 animate-rise overflow-hidden rounded-[1.5rem] shadow-lifted ring-8 ring-cream-50 [animation-delay:500ms] lg:block xl:w-48">
            <Image
              src={detailImage.src}
              alt={detailImage.alt}
              fill
              sizes="192px"
              className="object-cover"
            />
          </div>

          <HeroSeal />
        </div>

        <div className="px-5 pb-14 pt-32 text-cream-50 sm:px-8 sm:pb-20 lg:order-1 lg:col-span-7 lg:p-0 lg:text-cocoa-900">
          <p className="flex animate-rise items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-cream-200 lg:text-caramel-600">
            <span aria-hidden="true" className="h-px w-8 bg-current opacity-70" />
            {eyebrow}
          </p>

          <h1
            id="hero-title"
            className="mt-6 animate-rise font-display text-[3.25rem] font-medium leading-[0.95] tracking-[-0.025em] [animation-delay:120ms] sm:text-7xl lg:text-[4.75rem] xl:text-[5.75rem]"
          >
            {titleStart}
            <br />
            <em className="text-cream-200 lg:text-caramel-600">{titleAccent}</em>
          </h1>

          <p className="mt-6 max-w-md animate-rise text-pretty text-base leading-relaxed text-cream-100/85 [animation-delay:240ms] sm:text-lg lg:text-cocoa-600">
            {subtitle}
          </p>

          <div className="mt-9 flex animate-rise flex-col gap-3 [animation-delay:360ms] sm:flex-row">
            <ButtonLink href="#productos" variant="heroPrimary">
              Ver productos
            </ButtonLink>
            <ButtonLink href={whatsappUrl()} external variant="heroSecondary">
              <MessageCircle className="size-5" aria-hidden="true" />
              Consultar por WhatsApp
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroSeal() {
  return (
    <svg
      viewBox="0 0 120 120"
      aria-hidden="true"
      className="absolute -right-6 -top-8 hidden size-32 animate-rise text-cocoa-800 [animation-delay:650ms] lg:block"
    >
      <circle cx="60" cy="60" r="58" className="fill-cream-50" />
      <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeOpacity="0.15" />
      <defs>
        <path id="seal-path" d="M60,60 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
      </defs>
      <text className="fill-current font-sans text-[9.5px] font-semibold uppercase tracking-[0.32em]">
        <textPath href="#seal-path">Pastelería artesanal · Hecho a mano ·</textPath>
      </text>
      <text
        x="60"
        y="67"
        textAnchor="middle"
        className="fill-current font-display text-[22px] font-semibold italic"
      >
        CB
      </text>
    </svg>
  );
}
