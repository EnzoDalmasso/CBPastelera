import { MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button-link";
import { Reveal } from "@/components/ui/reveal";
import { ctaContent } from "@/data/content";
import { whatsappUrl } from "@/lib/whatsapp";

export function WhatsAppCta() {
  return (
    <section aria-labelledby="cta-title" className="section-space pb-0 md:pb-0">
      <div className="container-page">
        <Reveal className="relative overflow-hidden rounded-[2rem] bg-cocoa-900 px-6 py-16 text-center text-cream-50 sm:px-12 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 rounded-[1.6rem] border border-cream-50/10 sm:inset-4"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -right-24 -top-24 size-72 rounded-full bg-caramel-500/15 blur-3xl"
          />

          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-caramel-400">
            {ctaContent.eyebrow}
          </p>
          <h2
            id="cta-title"
            className="mx-auto mt-5 max-w-3xl text-balance font-display text-[2.6rem] font-medium leading-[1.02] tracking-[-0.015em] sm:text-6xl lg:text-7xl"
          >
            {ctaContent.title}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-relaxed text-cream-100/80 sm:text-lg">
            {ctaContent.text}
          </p>
          <ButtonLink href={whatsappUrl()} external variant="light" className="mt-10">
            <MessageCircle className="size-5" aria-hidden="true" />
            {ctaContent.button}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
