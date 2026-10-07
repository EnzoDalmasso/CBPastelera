# CB Pastelera

Web para CB Pastelera, una pastelería artesanal de Las Parejas (Santa Fe). Es una one-page sin carrito: muestra los productos y manda las consultas a WhatsApp, porque así trabaja hoy la dueña y no tenía sentido meter un checkout.

Además tiene un panel en `/admin` para que ella cambie textos, productos y fotos desde el celular sin depender de mí.

Next.js 16 (App Router), TypeScript, Tailwind 4, Motion para las animaciones y Supabase para auth, base de datos y storage. Deploy en Vercel.

## Correrlo local

```bash
npm install
npm run dev
```

Con Node 20.9 o más nuevo. `npm run lint` y `npm run typecheck` están separados del build.

Sin variables de entorno el sitio levanta igual con el contenido de `data/`, y `/admin` se abre en modo vista previa (se puede navegar pero no guarda). Lo dejé así para poder trabajar en el diseño sin tocar la base.

## Cómo está armado el contenido

Todo lo editable vive en una sola fila de la tabla `site_content`, como JSON. Lo pensé un rato y para un sitio de una página con un solo usuario editando, armar tablas para productos, categorías y galería era complicarse por nada; con un JSON validado alcanza y el panel guarda todo de una vez.

La validación está en `lib/content/parse.ts` y corre en el servidor antes de cada guardado: largos máximos, links que tienen que ser `https://`, productos con categorías que existan. Si algo viene mal de la base, el sitio cae al contenido por defecto en vez de romperse.

La home se genera estática. Cuando se guarda desde el panel, la server action llama a `updateTag` y `revalidatePath("/")`, así que el cambio aparece enseguida sin rebuild.

Las fotos se achican en el navegador antes de subir (máximo 2000 px, WebP). Las del celular pesan varios MB y no quería que la dueña esperara una subida de 8 MB con 4G.

Los permisos los resuelve Supabase con RLS: cualquiera puede leer el contenido, pero solo escriben los usuarios que están en la tabla `admins`. El panel igual chequea la sesión en el servidor antes de guardar.

## Supabase

1. Crear el proyecto y correr `supabase/schema.sql` en el SQL Editor. Crea las tablas, el bucket `site-images` y las policies.
2. En Authentication, desactivar el registro de usuarios nuevos y crear a mano el usuario de la dueña.
3. Darle permisos:
   ```sql
   insert into public.admins (user_id)
   select id from auth.users where email = 'mail@ejemplo.com';
   ```
4. Cargar `NEXT_PUBLIC_SUPABASE_URL` y `NEXT_PUBLIC_SUPABASE_ANON_KEY` (la anon o la publishable, nunca la service role) en `.env.local` y en Vercel. Hay un `.env.example` de referencia; `NEXT_PUBLIC_SITE_URL` es opcional y sirve para el canonical y el sitemap cuando haya dominio propio.

## Cosas que quedaron pendientes

- Instagram no deja traer el feed sin la Graph API, que pide cuenta profesional y un token de Meta. Por ahora la dueña sube las fotos de sus posts a mano desde el panel y puede pegar el link de cada uno.
- Las fotos que están ahora son de Unsplash, de referencia, hasta que tenga las propias.
- Cuando se reemplaza una foto, la vieja queda en el bucket. Con el volumen que va a tener no es un problema, pero en algún momento conviene limpiar.

## Estructura

```
app/            home, SEO y /admin (login, panel, server actions)
components/     admin/, layout/, sections/ y ui/
data/           datos fijos de la marca y contenido inicial
lib/            contenido, clientes de Supabase y helpers del panel
supabase/       schema.sql
proxy.ts        refresca la sesión en /admin
```

---

Hecho por [Enzo Dalmasso](https://porfolio-enzo-dalmasso.vercel.app/) · [Infinity Code](https://web-coorporativa-infinity-code.vercel.app/)
