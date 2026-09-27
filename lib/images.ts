import type { ImageAsset } from "@/lib/types";

/**
 * Fotografías TEMPORALES de referencia (Unsplash, uso libre).
 * No pertenecen a CB Pastelera: reemplazarlas por fotos reales guardadas en
 * /public/images/... usando rutas locales, por ejemplo "/images/products/torta.webp".
 */
export function tempPhoto(id: string, alt: string): ImageAsset {
  return {
    src: `https://images.unsplash.com/${id}?auto=format&fit=crop&w=2000&q=80`,
    alt,
  };
}
