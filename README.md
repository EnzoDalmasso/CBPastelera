# CB Pastelera — sitio web

Sitio one-page para **CB Pastelera** (pastelería artesanal) con **panel de administración** en `/admin`, desde el que la dueña edita textos, productos, categorías y fotos, también desde el celular.

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Motion · Supabase (Auth, Postgres y Storage) · Vercel

## Uso

```bash
npm install
npm run dev        # http://localhost:3000
npm run build
npm start
npm run lint
npm run typecheck
```

Requiere Node.js 20.9 o superior. Sin Supabase configurado, el sitio funciona con el contenido inicial de `data/` y `/admin` se abre en modo vista previa (solo en desarrollo, sin guardar).

## Configurar Supabase (una sola vez)

1. Crear un proyecto en [supabase.com](https://supabase.com).
2. **SQL Editor → New query**: pegar el contenido de [`supabase/schema.sql`](supabase/schema.sql) y ejecutarlo. Crea la tabla del contenido, la tabla de administradores, el bucket de fotos `site-images` y las reglas de seguridad (RLS).
3. **Authentication → Sign In / Providers → Email**: desactivar **Allow new users to sign up**, para que nadie más pueda crearse una cuenta.
4. **Authentication → Users → Add user**: crear el usuario de la dueña (email y contraseña, con *Auto Confirm User*).
5. Darle permisos de edición, en el SQL Editor:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'email-de-la-duena@ejemplo.com';
   ```
6. **Project Settings → API**: copiar la *Project URL* y la clave *anon public* (o *publishable*) en las variables de entorno:
   - Local: copiar `.env.example` a `.env.local` y completar.
   - Vercel: **Settings → Environment Variables**, y después **Redeploy**.

| Variable | Valor |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anon/publishable (nunca la `service_role`/secret) |
| `NEXT_PUBLIC_SITE_URL` | Opcional: dominio definitivo |

## Panel de administración

`https://tu-dominio/admin` → iniciar sesión con el usuario de la dueña.

- Secciones: Portada, Propuesta, Productos (categorías y productos), Galería, Nosotros, Pedidos, Instagram y Contacto (incluida la ubicación).
- Las fotos se eligen desde la galería o la cámara del celular, se comprimen en el navegador (máx. 2000 px, WebP) y se suben a Supabase Storage.
- **Guardar cambios** actualiza el sitio publicado al instante.
- La primera vez que se guarda, el contenido inicial de `data/` pasa a Supabase. Desde ese momento, lo que manda es lo guardado en el panel.

**Instagram:** Instagram no permite mostrar el feed sin su API oficial (requiere cuenta profesional y un token de Meta). Por eso la dueña sube las fotos de sus publicaciones desde el panel y, si quiere, pega el link de cada post.

## Contenido inicial y datos fijos

| Archivo | Contenido |
| --- | --- |
| `data/business.ts` | Nombre, WhatsApp, Instagram, links del menú y créditos (no se editan desde el panel) |
| `data/default-content.ts` | Textos y fotos iniciales de cada sección |
| `data/products.ts`, `data/categories.ts`, `data/gallery.ts` | Productos, categorías y fotos iniciales |

Las fotos iniciales son imágenes de referencia de Unsplash y no pertenecen a CB Pastelera: se reemplazan desde el panel.

## Estructura

```
app/               página, SEO, /admin (panel, login y server actions)
components/
  admin/           editor del panel
  layout/          navbar, menú mobile, footer, botón de WhatsApp
  sections/        secciones del sitio
  ui/              piezas reutilizables
data/              datos fijos y contenido inicial
lib/
  content/         tipos, validación y lectura del contenido
  supabase/        clientes de Supabase
  admin/           sesión, subida de fotos y helpers del panel
proxy.ts           mantiene la sesión del panel
supabase/          esquema SQL
```

Sitio desarrollado por [Enzo Dalmasso](https://porfolio-enzo-dalmasso.vercel.app/) - [Infinity Code](https://web-coorporativa-infinity-code.vercel.app/).
