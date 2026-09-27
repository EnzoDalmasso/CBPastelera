/**
 * CATEGORÍAS DE EJEMPLO — ajustar a las categorías reales de CB Pastelera.
 * En el filtro solo aparecen las categorías que tienen al menos un producto.
 */
export const categories = [
  { id: "tortas", name: "Tortas" },
  { id: "box-dulces", name: "Box dulces" },
  { id: "budines", name: "Budines" },
  { id: "cookies", name: "Cookies" },
  { id: "alfajores", name: "Alfajores" },
  { id: "postres", name: "Postres" },
  { id: "especiales", name: "Especiales" },
] as const;

export type Category = (typeof categories)[number];
export type CategoryId = Category["id"];

export function categoryName(id: CategoryId): string {
  return categories.find((category) => category.id === id)?.name ?? id;
}
