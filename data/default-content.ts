import { categories } from "@/data/categories";
import { galleryImages, instagramImages } from "@/data/gallery";
import { products } from "@/data/products";
import type { SiteContent } from "@/lib/content/types";
import { tempPhoto } from "@/lib/images";

/**
 * Contenido inicial del sitio. Se usa hasta que la dueña guarde cambios desde /admin
 * (o si Supabase no está configurado). A partir de ese momento manda lo guardado en Supabase.
 */
export const defaultContent: SiteContent = {
  hero: {
    eyebrow: "Pastelería artesanal",
    titleStart: "Momentos dulces,",
    titleAccent: "hechos a mano.",
    subtitle:
      "Pastelería artesanal elaborada con dedicación y atención al detalle. Descubrí nuestras propuestas y hacé tu consulta por WhatsApp.",
    image: tempPhoto("photo-1602351447937-745cb720612f", "Torta de chocolate con ganache"),
    detailImage: tempPhoto("photo-1558961363-fa8fdf82db35", "Cookies caseras en un bowl"),
  },
  intro: {
    eyebrow: "Nuestra propuesta",
    statement:
      "Creemos que lo dulce se disfruta más cuando está hecho con tiempo, cuidado y dedicación.",
    values: [
      {
        title: "Elaboración artesanal",
        text: "Cada preparación se hace a mano, cuidando cada paso del proceso.",
      },
      {
        title: "Atención al detalle",
        text: "Del sabor a la presentación, cada terminación importa.",
      },
      {
        title: "Hecho con dedicación",
        text: "Propuestas pensadas para acompañar celebraciones y días comunes.",
      },
    ],
  },
  products: {
    eyebrow: "Nuestras propuestas",
    title: "Dulces para cada ocasión",
    text: "Una selección de nuestras preparaciones. Consultanos por sabores, tamaños y disponibilidad.",
    categories,
    items: products,
  },
  gallery: {
    eyebrow: "Galería",
    title: "Detalles que se disfrutan",
    images: galleryImages,
  },
  about: {
    eyebrow: "Sobre CB Pastelera",
    title: "Pastelería hecha con tiempo y dedicación",
    paragraphs: [
      "En CB Pastelera creemos que un buen postre es mucho más que algo dulce: es parte de los momentos que compartimos con quienes queremos. Por eso cada preparación se elabora de forma artesanal, con el tiempo y el cuidado que merece.",
      "Cada pedido lo pensamos junto a vos. Te asesoramos con sabores, tamaños y presentación para que el resultado sea exactamente lo que imaginabas, y llegue a tu mesa tan lindo como rico.",
    ],
    signature: "CB Pastelera",
    image: tempPhoto("photo-1517686469429-8bdb88b9f907", "Manos amasando sobre una mesada con harina"),
    detailImage: tempPhoto("photo-1514435390218-898a0e01517a", "Porción de torta sobre plato blanco"),
  },
  cta: {
    eyebrow: "Pedidos y consultas",
    title: "¿Tenés algo dulce en mente?",
    text: "Escribinos y consultanos por disponibilidad, sabores y pedidos personalizados.",
    button: "Hablar por WhatsApp",
  },
  instagram: {
    eyebrow: "Seguinos en Instagram",
    text: "Novedades, preparaciones y propuestas de temporada.",
    button: "Ver Instagram",
    posts: instagramImages.map((image) => ({ image, url: "" })),
  },
  contact: {
    eyebrow: "Contacto",
    title: "Hablemos de tu próximo pedido",
    text: "Respondemos consultas por WhatsApp e Instagram.",
    location: {
      label: "Las Parejas, Santa Fe",
      address: "",
      mapsUrl: "https://maps.app.goo.gl/3HorXU9G9gd8SXeL9",
      city: "Las Parejas",
      region: "Santa Fe",
    },
  },
};
