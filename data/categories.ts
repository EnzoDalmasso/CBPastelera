import type { Category } from "@/lib/content/types";

/**
 * Categorías iniciales. Una vez configurado Supabase, se editan desde /admin.
 * En el filtro solo aparecen las categorías que tienen al menos un producto.
 */
export const categories: Category[] = [
  { id: "tortas", name: "Tortas" },
  { id: "box-dulces", name: "Box dulces" },
  { id: "budines", name: "Budines" },
  { id: "cookies", name: "Cookies" },
  { id: "alfajores", name: "Alfajores" },
  { id: "postres", name: "Postres" },
  { id: "especiales", name: "Especiales" },
];
