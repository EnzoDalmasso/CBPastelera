import type { NavLink } from "@/lib/types";

/** Datos fijos de la marca. Los textos, fotos, productos y ubicación se editan desde /admin. */
export const business = {
  name: "CB Pastelera",
  tagline: "Pastelería artesanal",
  description:
    "Descubrí las propuestas de CB Pastelera y consultá por nuestros productos y pedidos personalizados.",
  whatsapp: {
    number: "5493471523104",
    display: "+54 9 3471 52-3104",
    defaultMessage: "Hola! Vi la página de CB Pastelera y quería hacer una consulta.",
  },
  instagram: {
    handle: "cb_pastelera",
    url: "https://www.instagram.com/cb_pastelera/",
  },
};

export const credits = {
  author: { name: "Enzo Dalmasso", url: "https://porfolio-enzo-dalmasso.vercel.app/" },
  studio: { name: "Infinity Code", url: "https://web-coorporativa-infinity-code.vercel.app/" },
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];
