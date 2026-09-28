import type { ImageAsset } from "@/lib/types";

export type Category = {
  id: string;
  name: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  description: string;
  image: ImageAsset;
  /** En pesos argentinos. `null` muestra solo el botón "Consultar". */
  price: number | null;
};

export type ValueItem = {
  title: string;
  text: string;
};

export type InstagramPost = {
  image: ImageAsset;
  /** Link a la publicación. Vacío = abre el perfil. */
  url: string;
};

export type Location = {
  /** Texto visible, ej: "Las Parejas, Santa Fe" */
  label: string;
  /** Calle y número, opcional */
  address: string;
  mapsUrl: string;
  city: string;
  region: string;
};

export type SiteContent = {
  hero: {
    eyebrow: string;
    titleStart: string;
    titleAccent: string;
    subtitle: string;
    image: ImageAsset;
    detailImage: ImageAsset;
  };
  intro: {
    eyebrow: string;
    statement: string;
    values: ValueItem[];
  };
  products: {
    eyebrow: string;
    title: string;
    text: string;
    categories: Category[];
    items: Product[];
  };
  gallery: {
    eyebrow: string;
    title: string;
    images: ImageAsset[];
  };
  about: {
    eyebrow: string;
    title: string;
    paragraphs: string[];
    signature: string;
    image: ImageAsset;
    detailImage: ImageAsset;
  };
  cta: {
    eyebrow: string;
    title: string;
    text: string;
    button: string;
  };
  instagram: {
    eyebrow: string;
    text: string;
    button: string;
    posts: InstagramPost[];
  };
  contact: {
    eyebrow: string;
    title: string;
    text: string;
    location: Location | null;
  };
};
