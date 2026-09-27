import { ArrowUpRight, Clock, MapPin, MessageCircle, type LucideIcon } from "lucide-react";
import type { ComponentType, ReactNode, SVGProps } from "react";
import { InstagramIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { business } from "@/data/business";
import { contactContent } from "@/data/content";
import { whatsappUrl } from "@/lib/whatsapp";

type ContactItem = {
  label: string;
  icon: LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;
  value: ReactNode;
  href?: string;
};

function contactItems(): ContactItem[] {
  const { whatsapp, instagram, hours, location } = business;

  const items: ContactItem[] = [
    { label: "WhatsApp", icon: MessageCircle, value: whatsapp.display, href: whatsappUrl() },
    { label: "Instagram", icon: InstagramIcon, value: `@${instagram.handle}`, href: instagram.url },
    {
      label: "Horarios",
      icon: Clock,
      value:
        hours.length > 0 ? (
          <span className="flex flex-col gap-1">
            {hours.map((entry) => (
              <span key={entry.label}>
                {entry.label}: {entry.time}
              </span>
            ))}
          </span>
        ) : (
          contactContent.hoursPlaceholder
        ),
    },
  ];

  if (location) {
    items.push({
      label: "Ubicación",
      icon: MapPin,
      value: [location.streetAddress, location.city, location.region].filter(Boolean).join(", "),
      href: location.mapsUrl,
    });
  }

  return items;
}

export function Contact() {
  return (
    <section id="contacto" aria-labelledby="contacto-title" className="section-space bg-cream-100">
      <div className="container-page grid gap-12 lg:grid-cols-12 lg:gap-10">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="contacto-title"
            eyebrow={contactContent.eyebrow}
            title={contactContent.title}
            text={contactContent.text}
          />
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
          <p className="font-display text-2xl font-medium">{business.name}</p>
          <ul className="mt-4 border-t border-cocoa-900/10">
            {contactItems().map((item) => (
              <li key={item.label} className="border-b border-cocoa-900/10">
                <ContactRow item={item} />
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function ContactRow({ item }: { item: ContactItem }) {
  const Icon = item.icon;
  const content = (
    <>
      <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-cream-200 text-cocoa-700">
        <Icon className="size-5" strokeWidth={1.6} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-caramel-600">
          {item.label}
        </span>
        <span className="mt-1 block break-words text-base font-medium text-cocoa-900 sm:text-lg">
          {item.value}
        </span>
      </span>
    </>
  );

  if (!item.href) return <div className="flex items-center gap-4 py-5 sm:gap-5">{content}</div>;

  return (
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center gap-4 py-5 sm:gap-5"
    >
      {content}
      <ArrowUpRight
        className="size-5 shrink-0 text-cocoa-500 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cocoa-900"
        aria-hidden="true"
      />
    </a>
  );
}
