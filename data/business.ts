import type { NavLink } from "@/lib/types";

type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday"
  | "Sunday";

export type OpeningHours = {
  /** Texto visible, ej: "Lunes a viernes" */
  label: string;
  /** Texto visible, ej: "9:00 – 18:00" */
  time: string;
  /** Datos para SEO local (schema.org) */
  schemaDays: Weekday[];
  opens: string;
  closes: string;
};

export type BusinessLocation = {
  city: string;
  region: string;
  country: string;
  streetAddress?: string;
  postalCode?: string;
  mapsUrl?: string;
};

type Business = {
  name: string;
  tagline: string;
  description: string;
  whatsapp: { number: string; display: string; defaultMessage: string };
  instagram: { handle: string; url: string };
  /** Completar solo con datos confirmados. `null` oculta la ubicación en la web. */
  location: BusinessLocation | null;
  /** Vacío = se muestra "Horarios a confirmar". */
  hours: OpeningHours[];
  /** Muestra en el footer el aviso de que fotos y textos son provisorios. Poner en `false` al cargar el contenido real. */
  showDemoNotice: boolean;
};

export const business: Business = {
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
  // Ejemplo: { city: "Ciudad", region: "Santa Fe", country: "AR", streetAddress: "Calle 123" }
  location: null,
  // Ejemplo cuando haya horarios confirmados:
  // { label: "Lunes a viernes", time: "9:00 – 18:00", schemaDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "09:00", closes: "18:00" },
  hours: [],
  showDemoNotice: true,
};

export const navLinks: NavLink[] = [
  { label: "Inicio", href: "#inicio" },
  { label: "Productos", href: "#productos" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Contacto", href: "#contacto" },
];
