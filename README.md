# CB Pastelera — sitio web

Sitio one-page para **CB Pastelera** (pastelería artesanal). Muestra productos, galería e información de contacto, y lleva las consultas a WhatsApp.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Lucide · `next/image` · `next/font`

## Uso

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
```

Requiere Node.js 20.9 o superior.

## Deploy en Vercel

1. Subir el repositorio a GitHub.
2. En Vercel: **Add New → Project** e importar el repositorio. No hace falta configuración extra.
3. (Opcional) Definir `NEXT_PUBLIC_SITE_URL` con el dominio definitivo (ver `.env.example`). Se usa para canonical, Open Graph y sitemap. Si no se define, se usa el dominio de producción de Vercel.

## Dónde editar el contenido

Todo el contenido está en `data/`, separado de los componentes:

| Archivo | Contenido |
| --- | --- |
| `data/business.ts` | Nombre, WhatsApp, Instagram, ubicación, horarios, links del menú y el aviso de demo |
| `data/products.ts` | Productos: nombre, categoría, descripción, imagen y precio |
| `data/categories.ts` | Categorías. En el filtro solo aparecen las que tienen productos |
| `data/gallery.ts` | Fotos de la galería y de la sección Instagram |
| `data/content.ts` | Textos de las secciones (hero, propuesta, nosotros, CTA, contacto) |

### Contenido provisorio

Esta versión es una **demo**: los productos, textos y fotos son de ejemplo.

- **Fotos:** son imágenes de referencia de Unsplash (función `tempPhoto`) y **no pertenecen a CB Pastelera**. Para reemplazarlas, guardar las fotos reales en `public/images/products`, `public/images/gallery`, `public/images/hero` o `public/images/about`, y usar la ruta local:
  ```ts
  image: { src: "/images/products/torta-chocolate.webp", alt: "Torta de chocolate con ganache" }
  ```
  Recomendado: WebP o JPG, de 1600–2000 px en el lado mayor. `next/image` genera automáticamente los tamaños optimizados.
- **Precios:** `price: null` muestra solo el botón "Consultar". Con un número (ej. `price: 25000`) se muestra el precio en pesos.
- **Horarios:** con `hours: []` se muestra "Horarios a confirmar". Hay un ejemplo comentado en `data/business.ts`.
- **Ubicación:** con `location: null` no se muestra. Al completarla también se agrega a los datos estructurados para SEO local (schema.org `Bakery`).
- **Aviso de demo:** con `showDemoNotice: false` en `data/business.ts` se ocultan las marcas de "contenido de ejemplo" y el aviso del footer. Hacerlo recién cuando se haya cargado el contenido real.

Cuando todas las fotos sean locales se puede quitar `images.unsplash.com` de `next.config.ts`.

## Estructura

```
app/            layout, página, estilos globales, SEO (OG image, icons, robots, sitemap)
components/
  layout/       navbar, menú mobile, footer, botón flotante de WhatsApp
  sections/     secciones de la página
  ui/           piezas reutilizables (botones, encabezados, lightbox, animaciones)
data/           contenido editable
lib/            helpers (links de WhatsApp, formato de precios, datos estructurados, hooks)
public/images/  fotos reales (products, gallery, hero, about)
```

Sitio desarrollado por Infinity Code.
