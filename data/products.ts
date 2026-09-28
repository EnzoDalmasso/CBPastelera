import type { Product } from "@/lib/content/types";
import { tempPhoto } from "@/lib/images";

/**
 * Productos iniciales (de ejemplo). Una vez configurado Supabase, se editan desde /admin.
 */
export const products: Product[] = [
  {
    id: "torta-chocolate",
    name: "Torta de chocolate",
    category: "tortas",
    description: "Bizcochuelo húmedo de chocolate con relleno y cobertura a elección.",
    image: tempPhoto("photo-1605807646983-377bc5a76493", "Torta de chocolate sobre plato blanco"),
    price: null,
  },
  {
    id: "torta-frutillas",
    name: "Torta de frutillas y crema",
    category: "tortas",
    description: "Capas suaves de crema y frutillas frescas de estación.",
    image: tempPhoto("photo-1602663491496-73f07481dbea", "Torta decorada con crema y frutillas"),
    price: null,
  },
  {
    id: "box-cookies",
    name: "Box de cookies",
    category: "box-dulces",
    description: "Una selección de cookies surtidas, lista para regalar.",
    image: tempPhoto("photo-1772651392135-b891a5e4f8a3", "Caja de regalo con cookies surtidas"),
    price: null,
  },
  {
    id: "budin-limon",
    name: "Budín de limón",
    category: "budines",
    description: "Budín esponjoso con glaseado cítrico.",
    image: tempPhoto("photo-1534353875273-b5887cc1abf5", "Budín de limón en rodajas"),
    price: null,
  },
  {
    id: "budin-chocolate",
    name: "Budín de chocolate",
    category: "budines",
    description: "Budín de chocolate intenso, ideal para acompañar el café.",
    image: tempPhoto("photo-1541783245831-57d6fb0926d3", "Budín de chocolate con forma de corona"),
    price: null,
  },
  {
    id: "cookies-chips",
    name: "Cookies con chips",
    category: "cookies",
    description: "Cookies doradas por fuera y tiernas por dentro.",
    image: tempPhoto("photo-1499636136210-6f4ee915583e", "Cookies con chips de chocolate"),
    price: null,
  },
  {
    id: "cheesecake",
    name: "Cheesecake de frutos rojos",
    category: "postres",
    description: "Base crocante, crema suave y salsa de frutos rojos.",
    image: tempPhoto("photo-1533134242443-d4fd215305ad", "Porción de cheesecake con frutos rojos"),
    price: null,
  },
  {
    id: "torta-personalizada",
    name: "Torta personalizada",
    category: "especiales",
    description: "Diseñada a medida para cumpleaños y celebraciones.",
    image: tempPhoto("photo-1621303837174-89787a7d4729", "Torta decorada en tonos rosados"),
    price: null,
  },
];
