"use client";

import { MessageCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ButtonLink } from "@/components/ui/button-link";
import { navLinks } from "@/data/business";
import { cn } from "@/lib/cn";
import { useScrolledPast } from "@/lib/use-scrolled-past";
import { whatsappUrl } from "@/lib/whatsapp";

const MOBILE_MENU_ID = "menu-mobile";

export function Navbar() {
  const scrolled = useScrolledPast(24);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  const solid = scrolled || menuOpen;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,color] duration-500 ease-out",
          solid
            ? "bg-cream-50/[0.97] text-cocoa-900 shadow-[0_1px_0_rgb(46_30_23/0.07)]"
            : "bg-transparent text-cream-50 lg:text-cocoa-900",
        )}
      >
        <nav
          aria-label="Principal"
          className={cn(
            "container-page flex items-center justify-between transition-[height] duration-500 ease-out",
            scrolled ? "h-16" : "h-16 lg:h-24",
          )}
        >
          <a href="#inicio" aria-label="CB Pastelera, ir al inicio" className="rounded-sm">
            <BrandLogo />
          </a>

          <ul className="hidden items-center gap-10 lg:flex">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="group relative py-2 text-[0.9375rem] font-medium text-cocoa-800 transition-colors hover:text-cocoa-950"
                >
                  {link.label}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-px origin-left scale-x-0 bg-current transition-transform duration-300 ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:block">
            <ButtonLink href={whatsappUrl()} external size="sm">
              <MessageCircle className="size-4" aria-hidden="true" />
              WhatsApp
            </ButtonLink>
          </div>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls={MOBILE_MENU_ID}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="-mr-2 flex size-11 items-center justify-center rounded-full lg:hidden"
          >
            <span aria-hidden="true" className="relative block h-3 w-6">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out",
                  menuOpen && "translate-y-[5.25px] rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[1.5px] w-full rounded-full bg-current transition-transform duration-300 ease-out",
                  menuOpen && "-translate-y-[5.25px] -rotate-45",
                )}
              />
            </span>
          </button>
        </nav>
      </header>

      <MobileMenu id={MOBILE_MENU_ID} open={menuOpen} onClose={closeMenu} />
    </>
  );
}
