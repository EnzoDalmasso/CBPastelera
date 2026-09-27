import { tempPhoto } from "@/lib/images";
import type { ImageAsset } from "@/lib/types";

/**
 * GALERÍA — fotos TEMPORALES de referencia.
 * Reemplazar por fotos reales en /public/images/gallery (ej: "/images/gallery/01.webp").
 */
export const galleryImages: ImageAsset[] = [
  tempPhoto("photo-1586985289906-406988974504", "Torta sobre una base de vidrio"),
  tempPhoto("photo-1606313564200-e75d5e30476c", "Chocolate derretido sobre brownies"),
  tempPhoto("photo-1558326567-98ae2405596b", "Macarons sobre la mesa"),
  tempPhoto("photo-1571115177098-24ec42ed204d", "Torta en capas con crema y cacao"),
  tempPhoto("photo-1517427294546-5aa121f68e8a", "Porción de torta de chocolate con tenedor"),
  tempPhoto("photo-1567171466295-4afa63d45416", "Torta con frutos rojos cortada en porciones"),
];

/** Sección Instagram — reemplazar por fotos de publicaciones reales del perfil. */
export const instagramImages: ImageAsset[] = [
  tempPhoto("photo-1603532648955-039310d9ed75", "Cupcake de chocolate con crema"),
  tempPhoto("photo-1670819916757-e8d5935a6c65", "Tartas de frutas"),
  tempPhoto("photo-1558961363-fa8fdf82db35", "Cookies en un bowl"),
  tempPhoto("photo-1606890737304-57a1ca8a5b62", "Torta de chocolate con cerezas"),
  tempPhoto("photo-1540660290370-8aa90e451e8a", "Bowl con huevos y harina"),
  tempPhoto("photo-1597528662465-55ece5734101", "Facturas sobre una tabla de madera"),
];
