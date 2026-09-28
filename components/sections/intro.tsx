import { ChefHat, Heart, Sparkles } from "lucide-react";
import { Reveal, RevealItem, RevealList } from "@/components/ui/reveal";
import { Eyebrow } from "@/components/ui/section-heading";
import type { SiteContent } from "@/lib/content/types";

const icons = [ChefHat, Sparkles, Heart];

export function Intro({ content }: { content: SiteContent["intro"] }) {
  const values = content.values.filter((value) => value.title || value.text);

  return (
    <section aria-labelledby="intro-title" className="section-space">
      <div className="container-page">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow className="justify-center">{content.eyebrow}</Eyebrow>
          <h2
            id="intro-title"
            className="mt-6 text-balance font-display text-[2rem] font-medium leading-[1.12] tracking-[-0.01em] sm:text-5xl lg:text-[3.5rem]"
          >
            {content.statement}
          </h2>
        </Reveal>

        {values.length > 0 && (
          <RevealList className="mx-auto mt-16 grid max-w-5xl gap-10 border-t border-cocoa-900/10 pt-12 sm:grid-cols-3 sm:gap-8 lg:mt-20">
            {values.map((value, index) => {
              const Icon = icons[index % icons.length] ?? Heart;
              return (
                <RevealItem key={index} className="text-center sm:text-left">
                  <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-cream-200 text-cocoa-700 sm:mx-0">
                    <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-2xl font-medium">{value.title}</h3>
                  <p className="mx-auto mt-2 max-w-xs text-[0.9375rem] leading-relaxed text-cocoa-600 sm:mx-0">
                    {value.text}
                  </p>
                </RevealItem>
              );
            })}
          </RevealList>
        )}
      </div>
    </section>
  );
}
