"use client";

import { MessageCircle } from "lucide-react";
import { AnimatePresence, m } from "motion/react";
import { useEffect } from "react";
import { ButtonLink } from "@/components/ui/button-link";
import { InstagramIcon } from "@/components/ui/icons";
import { business, navLinks } from "@/data/business";
import { useScrollLock } from "@/lib/use-scroll-lock";
import { whatsappUrl } from "@/lib/whatsapp";

type MobileMenuProps = {
  id: string;
  open: boolean;
  onClose: () => void;
};

const ease = [0.22, 1, 0.36, 1] as const;
const DESKTOP_QUERY = "(min-width: 64rem)";

export function MobileMenu({ id, open, onClose }: MobileMenuProps) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    const desktop = window.matchMedia(DESKTOP_QUERY);
    const onViewportChange = () => {
      if (desktop.matches) onClose();
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onViewportChange);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onViewportChange);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          id={id}
          key="mobile-menu"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.35, ease }}
          className="fixed inset-x-0 bottom-0 top-16 z-40 overflow-y-auto bg-cream-50 text-cocoa-900 lg:hidden"
        >
          <div className="container-page flex min-h-full flex-col pb-10 pt-8">
            <ul className="border-t border-cocoa-900/10">
              {navLinks.map((link, index) => (
                <m.li
                  key={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: 0.06 + index * 0.05 }}
                  className="border-b border-cocoa-900/10"
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="flex items-baseline justify-between py-5 font-display text-4xl font-medium"
                  >
                    {link.label}
                    <span className="font-sans text-xs font-semibold tracking-[0.2em] text-caramel-600">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </a>
                </m.li>
              ))}
            </ul>

            <div className="mt-auto flex flex-col gap-3 pt-10">
              <ButtonLink href={whatsappUrl()} external onClick={onClose}>
                <MessageCircle className="size-5" aria-hidden="true" />
                Consultar por WhatsApp
              </ButtonLink>
              <ButtonLink href={business.instagram.url} external variant="secondary" onClick={onClose}>
                <InstagramIcon className="size-5" />@{business.instagram.handle}
              </ButtonLink>
            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
