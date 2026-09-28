"use client";

import { Check, ExternalLink, LoaderCircle, LogOut } from "lucide-react";
import { useEffect, useState, useTransition } from "react";
import { saveSiteContent, signOut } from "@/app/admin/actions";
import { AdminModeContext } from "@/components/admin/fields";
import { ProductsEditor } from "@/components/admin/products-editor";
import {
  AboutEditor,
  ContactEditor,
  CtaEditor,
  GalleryEditor,
  HeroEditor,
  InstagramEditor,
  IntroEditor,
} from "@/components/admin/section-editors";
import { BrandLogo } from "@/components/layout/brand-logo";
import { cn } from "@/lib/cn";
import type { SiteContent } from "@/lib/content/types";

const tabs = [
  { id: "hero", label: "Portada" },
  { id: "intro", label: "Propuesta" },
  { id: "products", label: "Productos" },
  { id: "gallery", label: "Galería" },
  { id: "about", label: "Nosotros" },
  { id: "cta", label: "Pedidos" },
  { id: "instagram", label: "Instagram" },
  { id: "contact", label: "Contacto" },
] as const satisfies ReadonlyArray<{ id: keyof SiteContent; label: string }>;

type TabId = (typeof tabs)[number]["id"];

type Status = { type: "idle" } | { type: "saved" } | { type: "error"; message: string };

type AdminEditorProps = {
  initialContent: SiteContent;
  userEmail?: string;
  /** Desarrollo local sin Supabase: se puede navegar el panel pero no guardar ni subir fotos. */
  previewOnly?: boolean;
};

export function AdminEditor({ initialContent, userEmail, previewOnly = false }: AdminEditorProps) {
  const [content, setContent] = useState(initialContent);
  const [savedSnapshot, setSavedSnapshot] = useState(() => JSON.stringify(initialContent));
  const [tab, setTab] = useState<TabId>("hero");
  const [status, setStatus] = useState<Status>({ type: "idle" });
  const [saving, startSaving] = useTransition();
  const dirty = JSON.stringify(content) !== savedSnapshot;

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  function update<K extends keyof SiteContent>(key: K, value: SiteContent[K]) {
    setContent((current) => ({ ...current, [key]: value }));
    setStatus({ type: "idle" });
  }

  function save() {
    startSaving(async () => {
      const result = await saveSiteContent(content);
      if (result.ok) {
        setSavedSnapshot(JSON.stringify(content));
        setStatus({ type: "saved" });
      } else {
        setStatus({ type: "error", message: result.error });
      }
    });
  }

  return (
    <AdminModeContext value={{ previewOnly }}>
      <header className="sticky top-0 z-20 border-b border-cocoa-900/10 bg-cream-50">
        <div className="mx-auto flex h-16 max-w-3xl items-center justify-between gap-3 px-4">
          <div className="min-w-0">
            <BrandLogo className="text-2xl" />
            {userEmail && <p className="truncate text-xs text-cocoa-500">{userEmail}</p>}
          </div>
          <div className="flex items-center gap-1">
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-10 items-center gap-1.5 rounded-full px-3 text-sm font-semibold text-cocoa-700 hover:bg-cream-200"
            >
              <ExternalLink className="size-4" aria-hidden="true" />
              Ver sitio
            </a>
            {!previewOnly && (
              <form action={signOut}>
                <button
                  type="submit"
                  aria-label="Cerrar sesión"
                  className="flex size-10 items-center justify-center rounded-full text-cocoa-700 hover:bg-cream-200"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>
        </div>
        <nav aria-label="Secciones" className="mx-auto max-w-3xl">
          <ul className="flex gap-1 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {tabs.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  aria-current={tab === item.id ? "page" : undefined}
                  onClick={() => {
                    setTab(item.id);
                    window.scrollTo({ top: 0 });
                  }}
                  className={cn(
                    "h-9 shrink-0 whitespace-nowrap rounded-full px-4 text-sm font-medium transition-colors",
                    tab === item.id ? "bg-cocoa-800 text-cream-50" : "text-cocoa-700 hover:bg-cream-200",
                  )}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      <main id="contenido" className="mx-auto max-w-3xl space-y-4 px-4 pb-32 pt-5">
        {previewOnly && (
          <p className="rounded-xl bg-caramel-400/20 px-4 py-3 text-sm text-cocoa-800">
            Vista previa local: Supabase no está configurado, así que no se pueden guardar cambios ni subir fotos.
          </p>
        )}
        {tab === "hero" && <HeroEditor value={content.hero} onChange={(v) => update("hero", v)} />}
        {tab === "intro" && <IntroEditor value={content.intro} onChange={(v) => update("intro", v)} />}
        {tab === "products" && <ProductsEditor value={content.products} onChange={(v) => update("products", v)} />}
        {tab === "gallery" && <GalleryEditor value={content.gallery} onChange={(v) => update("gallery", v)} />}
        {tab === "about" && <AboutEditor value={content.about} onChange={(v) => update("about", v)} />}
        {tab === "cta" && <CtaEditor value={content.cta} onChange={(v) => update("cta", v)} />}
        {tab === "instagram" && <InstagramEditor value={content.instagram} onChange={(v) => update("instagram", v)} />}
        {tab === "contact" && <ContactEditor value={content.contact} onChange={(v) => update("contact", v)} />}
      </main>

      <div className="fixed inset-x-0 bottom-0 z-20 border-t border-cocoa-900/10 bg-cream-50 pb-[env(safe-area-inset-bottom)]">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <p className="min-w-0 text-sm" role="status" aria-live="polite">
            {status.type === "error" ? (
              <span className="font-medium text-red-700">{status.message}</span>
            ) : status.type === "saved" && !dirty ? (
              <span className="inline-flex items-center gap-1.5 font-medium text-emerald-700">
                <Check className="size-4" aria-hidden="true" />
                Guardado. El sitio ya está actualizado.
              </span>
            ) : dirty ? (
              <span className="text-cocoa-700">Tenés cambios sin guardar</span>
            ) : (
              <span className="text-cocoa-500">Sin cambios</span>
            )}
          </p>
          <button
            type="button"
            onClick={save}
            disabled={!dirty || saving || previewOnly}
            className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-cocoa-800 px-5 text-sm font-semibold text-cream-50 transition-colors hover:bg-cocoa-900 disabled:opacity-40"
          >
            {saving && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
            Guardar cambios
          </button>
        </div>
      </div>
    </AdminModeContext>
  );
}
