-- CB Pastelera: esquema para el panel /admin.
-- Ejecutar completo en Supabase → SQL Editor → New query → Run.

-- Contenido del sitio (una sola fila con todo el contenido en JSON)
create table if not exists public.site_content (
  id int primary key default 1 check (id = 1),
  content jsonb not null,
  updated_at timestamptz not null default now()
);

-- Usuarios con permiso para editar
create table if not exists public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade
);

alter table public.site_content enable row level security;
alter table public.admins enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (select 1 from public.admins where user_id = auth.uid());
$$;

drop policy if exists "Lectura pública del contenido" on public.site_content;
create policy "Lectura pública del contenido" on public.site_content
  for select using (true);

drop policy if exists "Admins crean contenido" on public.site_content;
create policy "Admins crean contenido" on public.site_content
  for insert to authenticated with check (public.is_admin());

drop policy if exists "Admins editan contenido" on public.site_content;
create policy "Admins editan contenido" on public.site_content
  for update to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "Cada admin ve su fila" on public.admins;
create policy "Cada admin ve su fila" on public.admins
  for select to authenticated using (user_id = auth.uid());

-- Bucket público para las fotos (máx. 5 MB por archivo)
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('site-images', 'site-images', true, 5242880, array['image/webp', 'image/jpeg', 'image/png'])
on conflict (id) do nothing;

drop policy if exists "Admins suben fotos" on storage.objects;
create policy "Admins suben fotos" on storage.objects
  for insert to authenticated with check (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins reemplazan fotos" on storage.objects;
create policy "Admins reemplazan fotos" on storage.objects
  for update to authenticated using (bucket_id = 'site-images' and public.is_admin());

drop policy if exists "Admins borran fotos" on storage.objects;
create policy "Admins borran fotos" on storage.objects
  for delete to authenticated using (bucket_id = 'site-images' and public.is_admin());

-- Después de crear el usuario de la dueña (Authentication → Users → Add user),
-- darle permisos reemplazando el email:
--
-- insert into public.admins (user_id)
-- select id from auth.users where email = 'email-de-la-duena@ejemplo.com';
