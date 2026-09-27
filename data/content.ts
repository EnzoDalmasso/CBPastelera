import { tempPhoto } from "@/lib/images";

/**
 * TEXTOS E IMÁGENES DE LAS SECCIONES.
 * Todo lo marcado como PROVISORIO debe revisarse con CB Pastelera.
 */
export const heroContent = {
  eyebrow: "Pastelería artesanal",
  titleStart: "Momentos dulces,",
  titleAccent: "hechos a mano.",
  subtitle:
    "Pastelería artesanal elaborada con dedicación y atención al detalle. Descubrí nuestras propuestas y hacé tu consulta por WhatsApp.",
  // TEMPORAL: reemplazar por /images/hero/hero.webp
  image: tempPhoto("photo-1602351447937-745cb720612f", "Torta de chocolate con ganache"),
  // TEMPORAL: reemplazar por /images/hero/detalle.webp
  detailImage: tempPhoto("photo-1558961363-fa8fdf82db35", "Cookies caseras en un bowl"),
};

// PROVISORIO
export const introContent = {
  eyebrow: "Nuestra propuesta",
  statement:
    "Creemos que lo dulce se disfruta más cuando está hecho con tiempo, cuidado y dedicación.",
  values: [
    {
      icon: "chef",
      title: "Elaboración artesanal",
      text: "Cada preparación se hace a mano, cuidando cada paso del proceso.",
    },
    {
      icon: "sparkles",
      title: "Atención al detalle",
      text: "Del sabor a la presentación, cada terminación importa.",
    },
    {
      icon: "heart",
      title: "Hecho con dedicación",
      text: "Propuestas pensadas para acompañar celebraciones y días comunes.",
    },
  ],
} as const;

export type ValueIcon = (typeof introContent.values)[number]["icon"];

export const productsContent = {
  eyebrow: "Nuestras propuestas",
  title: "Dulces para cada ocasión",
  text: "Una selección de nuestras preparaciones. Consultanos por sabores, tamaños y disponibilidad.",
};

export const galleryContent = {
  eyebrow: "Galería",
  title: "Detalles que se disfrutan",
};

// PROVISORIO: reemplazar por la historia y la propuesta real de la marca.
export const aboutContent = {
  eyebrow: "Sobre CB Pastelera",
  title: "Pastelería hecha con tiempo y dedicación",
  paragraphs: [
    "En CB Pastelera cada preparación nace de la elaboración artesanal y del gusto por hacer las cosas bien, sin apuros.",
    "Nos importa que cada producto se vea tan bien como sabe: cuidamos cada ingrediente, cada terminación y cada presentación.",
  ],
  signature: "CB Pastelera",
  // TEMPORAL: reemplazar por /images/about/...
  image: tempPhoto("photo-1517686469429-8bdb88b9f907", "Manos amasando sobre una mesada con harina"),
  detailImage: tempPhoto("photo-1514435390218-898a0e01517a", "Porción de torta sobre plato blanco"),
};

export const ctaContent = {
  eyebrow: "Pedidos y consultas",
  title: "¿Tenés algo dulce en mente?",
  text: "Escribinos y consultanos por disponibilidad, sabores y pedidos personalizados.",
  button: "Hablar por WhatsApp",
};

export const instagramContent = {
  eyebrow: "Seguinos en Instagram",
  text: "Novedades, preparaciones y propuestas de temporada.",
  button: "Ver Instagram",
};

export const contactContent = {
  eyebrow: "Contacto",
  title: "Hablemos de tu próximo pedido",
  text: "Respondemos consultas por WhatsApp e Instagram.",
  hoursPlaceholder: "Horarios a confirmar",
};
