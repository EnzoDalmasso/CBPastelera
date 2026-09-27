"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/cn";
import { useScrolledPast } from "@/lib/use-scrolled-past";
import { whatsappUrl } from "@/lib/whatsapp";

export function FloatingWhatsApp() {
  const visible = useScrolledPast(700);

  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Consultar por WhatsApp"
      tabIndex={visible ? undefined : -1}
      aria-hidden={visible ? undefined : true}
      className={cn(
        "fixed bottom-5 right-5 z-30 flex size-14 items-center justify-center rounded-full bg-cocoa-800 text-cream-50 shadow-lifted",
        "transition-[opacity,transform,background-color] duration-300 ease-out hover:bg-cocoa-900 active:scale-95 sm:bottom-8 sm:right-8",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}
