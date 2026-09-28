import type {
  Category,
  InstagramPost,
  Location,
  Product,
  SiteContent,
  ValueItem,
} from "@/lib/content/types";
import type { ImageAsset } from "@/lib/types";

/**
 * Valida el contenido recibido (desde el panel o desde Supabase) antes de usarlo.
 * Lanza un error descriptivo si algo no tiene el formato esperado.
 */
export class ContentError extends Error {}

type Obj = Record<string, unknown>;

function obj(value: unknown, path: string): Obj {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    throw new ContentError(`${path}: formato inválido`);
  }
  return value as Obj;
}

function text(value: unknown, path: string, max = 600, required = false): string {
  if (typeof value !== "string") throw new ContentError(`${path}: debe ser texto`);
  const trimmed = value.trim();
  if (trimmed.length > max) throw new ContentError(`${path}: máximo ${max} caracteres`);
  if (required && !trimmed) throw new ContentError(`${path}: no puede estar vacío`);
  return trimmed;
}

function list<T>(value: unknown, path: string, max: number, item: (v: unknown, p: string) => T): T[] {
  if (!Array.isArray(value)) throw new ContentError(`${path}: debe ser una lista`);
  if (value.length > max) throw new ContentError(`${path}: máximo ${max} elementos`);
  return value.map((entry, index) => item(entry, `${path}[${index + 1}]`));
}

function httpsUrl(value: unknown, path: string, allowEmpty = false): string {
  const url = text(value, path, 1000);
  if (!url && allowEmpty) return "";
  if (!/^https:\/\/[^\s]+$/i.test(url)) throw new ContentError(`${path}: debe ser un link https://`);
  return url;
}

function image(value: unknown, path: string): ImageAsset {
  const o = obj(value, path);
  const src = text(o.src, `${path}.src`, 1000, true);
  if (!/^https:\/\/[^\s]+$/i.test(src) && !/^\/[^\s/][^\s]*$/.test(src)) {
    throw new ContentError(`${path}: la imagen debe ser un link https:// o una ruta local`);
  }
  return { src, alt: text(o.alt, `${path}.alt`, 200) };
}

function category(value: unknown, path: string): Category {
  const o = obj(value, path);
  const id = text(o.id, `${path}.id`, 60, true);
  if (!/^[a-z0-9-]+$/.test(id)) throw new ContentError(`${path}.id: formato inválido`);
  return { id, name: text(o.name, `${path}.name`, 40, true) };
}

function product(value: unknown, path: string): Product {
  const o = obj(value, path);
  const price = o.price;
  if (price !== null && (typeof price !== "number" || !Number.isFinite(price) || price < 0)) {
    throw new ContentError(`${path}.price: precio inválido`);
  }
  return {
    id: text(o.id, `${path}.id`, 80, true),
    name: text(o.name, `${path}.name`, 80, true),
    category: text(o.category, `${path}.category`, 60, true),
    description: text(o.description, `${path}.description`, 300),
    image: image(o.image, `${path}.image`),
    price: price === null ? null : Math.round(price),
  };
}

function valueItem(value: unknown, path: string): ValueItem {
  const o = obj(value, path);
  return { title: text(o.title, `${path}.title`, 60), text: text(o.text, `${path}.text`, 200) };
}

function instagramPost(value: unknown, path: string): InstagramPost {
  const o = obj(value, path);
  return { image: image(o.image, `${path}.image`), url: httpsUrl(o.url, `${path}.url`, true) };
}

function location(value: unknown, path: string): Location | null {
  if (value === null) return null;
  const o = obj(value, path);
  return {
    label: text(o.label, `${path}.label`, 120, true),
    address: text(o.address, `${path}.address`, 160),
    mapsUrl: httpsUrl(o.mapsUrl, `${path}.mapsUrl`, true),
    city: text(o.city, `${path}.city`, 80),
    region: text(o.region, `${path}.region`, 80),
  };
}

export function parseSiteContent(input: unknown): SiteContent {
  const root = obj(input, "contenido");
  const hero = obj(root.hero, "Portada");
  const intro = obj(root.intro, "Propuesta");
  const products = obj(root.products, "Productos");
  const gallery = obj(root.gallery, "Galería");
  const about = obj(root.about, "Nosotros");
  const cta = obj(root.cta, "Pedidos");
  const instagram = obj(root.instagram, "Instagram");
  const contact = obj(root.contact, "Contacto");

  const categories = list(products.categories, "Categorías", 20, category);
  const categoryIds = new Set(categories.map((c) => c.id));
  const items = list(products.items, "Productos", 60, product);
  for (const item of items) {
    if (!categoryIds.has(item.category)) {
      throw new ContentError(`El producto "${item.name}" tiene una categoría que no existe`);
    }
  }

  return {
    hero: {
      eyebrow: text(hero.eyebrow, "Portada.eyebrow", 60),
      titleStart: text(hero.titleStart, "Portada.titleStart", 60, true),
      titleAccent: text(hero.titleAccent, "Portada.titleAccent", 60),
      subtitle: text(hero.subtitle, "Portada.subtitle", 300),
      image: image(hero.image, "Portada.image"),
      detailImage: image(hero.detailImage, "Portada.detailImage"),
    },
    intro: {
      eyebrow: text(intro.eyebrow, "Propuesta.eyebrow", 60),
      statement: text(intro.statement, "Propuesta.statement", 240),
      values: list(intro.values, "Propuesta.values", 3, valueItem),
    },
    products: {
      eyebrow: text(products.eyebrow, "Productos.eyebrow", 60),
      title: text(products.title, "Productos.title", 80, true),
      text: text(products.text, "Productos.text", 300),
      categories,
      items,
    },
    gallery: {
      eyebrow: text(gallery.eyebrow, "Galería.eyebrow", 60),
      title: text(gallery.title, "Galería.title", 80, true),
      images: list(gallery.images, "Galería.images", 24, image),
    },
    about: {
      eyebrow: text(about.eyebrow, "Nosotros.eyebrow", 60),
      title: text(about.title, "Nosotros.title", 100, true),
      paragraphs: list(about.paragraphs, "Nosotros.paragraphs", 6, (v, p) => text(v, p, 900)).filter(Boolean),
      signature: text(about.signature, "Nosotros.signature", 60),
      image: image(about.image, "Nosotros.image"),
      detailImage: image(about.detailImage, "Nosotros.detailImage"),
    },
    cta: {
      eyebrow: text(cta.eyebrow, "Pedidos.eyebrow", 60),
      title: text(cta.title, "Pedidos.title", 100, true),
      text: text(cta.text, "Pedidos.text", 300),
      button: text(cta.button, "Pedidos.button", 40, true),
    },
    instagram: {
      eyebrow: text(instagram.eyebrow, "Instagram.eyebrow", 60),
      text: text(instagram.text, "Instagram.text", 200),
      button: text(instagram.button, "Instagram.button", 40, true),
      posts: list(instagram.posts, "Instagram.posts", 12, instagramPost),
    },
    contact: {
      eyebrow: text(contact.eyebrow, "Contacto.eyebrow", 60),
      title: text(contact.title, "Contacto.title", 100, true),
      text: text(contact.text, "Contacto.text", 300),
      location: location(contact.location, "Contacto.location"),
    },
  };
}
