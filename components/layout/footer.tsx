import { MessageCircle } from "lucide-react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { InstagramIcon } from "@/components/ui/icons";
import { business, navLinks } from "@/data/business";
import { whatsappUrl } from "@/lib/whatsapp";

const socialLinkClass =
  "flex size-11 items-center justify-center rounded-full border border-cream-50/15 text-cream-100 transition-colors hover:border-cream-50/40 hover:bg-cream-50/5";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-cocoa-950 text-cream-100">
      <div className="container-page pb-10 pt-16 sm:pt-20">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <BrandLogo className="text-4xl text-cream-50" />
            <p className="mt-3 text-sm text-cream-100/70">{business.tagline}</p>
          </div>

          <nav aria-label="Pie de página">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-cream-100/80 transition-colors hover:text-cream-50">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex gap-3">
            <a
              href={business.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Instagram de ${business.name}`}
              className={socialLinkClass}
            >
              <InstagramIcon className="size-5" />
            </a>
            <a
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`WhatsApp de ${business.name}`}
              className={socialLinkClass}
            >
              <MessageCircle className="size-5" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-cream-50/10 pt-8 text-xs text-cream-100/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {business.name}. Todos los derechos reservados.
          </p>
          <p>Sitio desarrollado por Infinity Code</p>
        </div>

        {business.showDemoNotice && (
          <p className="mt-4 text-xs text-cream-100/55">
            Versión demo: las fotografías son imágenes de referencia (Unsplash) y los textos son provisorios.
          </p>
        )}
      </div>
    </footer>
  );
}
