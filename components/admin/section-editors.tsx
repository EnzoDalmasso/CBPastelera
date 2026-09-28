"use client";

import Image from "next/image";
import { Card, ImageField, ItemControls, TextField, UploadButton } from "@/components/admin/fields";
import { move, removeAt, replaceAt } from "@/lib/admin/list";
import type { SiteContent } from "@/lib/content/types";

type EditorProps<K extends keyof SiteContent> = {
  value: SiteContent[K];
  onChange: (value: SiteContent[K]) => void;
};

export function HeroEditor({ value, onChange }: EditorProps<"hero">) {
  return (
    <>
      <Card title="Textos">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Título (primera línea)" value={value.titleStart} maxLength={60} onChange={(titleStart) => onChange({ ...value, titleStart })} />
        <TextField label="Título (línea destacada en cursiva)" value={value.titleAccent} maxLength={60} onChange={(titleAccent) => onChange({ ...value, titleAccent })} />
        <TextField label="Subtítulo" rows={3} value={value.subtitle} maxLength={300} onChange={(subtitle) => onChange({ ...value, subtitle })} />
      </Card>
      <Card title="Fotos">
        <ImageField label="Foto principal" folder="hero" value={value.image} onChange={(image) => onChange({ ...value, image })} />
        <ImageField label="Foto de detalle (solo en computadora)" folder="hero" aspect="square" value={value.detailImage} onChange={(detailImage) => onChange({ ...value, detailImage })} />
      </Card>
    </>
  );
}

export function IntroEditor({ value, onChange }: EditorProps<"intro">) {
  return (
    <>
      <Card title="Frase principal">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Frase" rows={3} value={value.statement} maxLength={240} onChange={(statement) => onChange({ ...value, statement })} />
      </Card>
      {value.values.map((item, index) => (
        <Card key={index} title={`Valor ${index + 1}`}>
          <TextField label="Título" value={item.title} maxLength={60} onChange={(title) => onChange({ ...value, values: replaceAt(value.values, index, { ...item, title }) })} />
          <TextField label="Texto" rows={2} value={item.text} maxLength={200} onChange={(text) => onChange({ ...value, values: replaceAt(value.values, index, { ...item, text }) })} />
        </Card>
      ))}
    </>
  );
}

export function GalleryEditor({ value, onChange }: EditorProps<"gallery">) {
  const images = value.images;
  return (
    <>
      <Card title="Encabezado">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Título" value={value.title} maxLength={80} onChange={(title) => onChange({ ...value, title })} />
      </Card>
      <Card
        title={`Fotos (${images.length})`}
        actions={
          images.length < 24 && (
            <UploadButton
              folder="gallery"
              label="Agregar"
              variant="solid"
              onUploaded={(src) => onChange({ ...value, images: [...images, { src, alt: "" }] })}
            />
          )
        }
      >
        {images.length === 0 && <p className="text-sm text-cocoa-600">Sin fotos: la galería no se muestra.</p>}
        {images.map((image, index) => (
          <div key={`${image.src}-${index}`} className="border-t border-cocoa-900/10 pt-4 first:border-0 first:pt-0">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm font-semibold text-cocoa-700">Foto {index + 1}</p>
              <ItemControls
                index={index}
                total={images.length}
                itemLabel={`la foto ${index + 1}`}
                onMove={(offset) => onChange({ ...value, images: move(images, index, offset) })}
                onRemove={() => onChange({ ...value, images: removeAt(images, index) })}
              />
            </div>
            <ImageField label="" folder="gallery" value={image} onChange={(next) => onChange({ ...value, images: replaceAt(images, index, next) })} />
          </div>
        ))}
      </Card>
    </>
  );
}

export function AboutEditor({ value, onChange }: EditorProps<"about">) {
  const paragraphs = value.paragraphs;
  return (
    <>
      <Card title="Textos">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Título" value={value.title} maxLength={100} onChange={(title) => onChange({ ...value, title })} />
        {paragraphs.map((paragraph, index) => (
          <div key={index}>
            <TextField
              label={`Párrafo ${index + 1}`}
              rows={5}
              maxLength={900}
              value={paragraph}
              onChange={(text) => onChange({ ...value, paragraphs: replaceAt(paragraphs, index, text) })}
            />
            {paragraphs.length > 1 && (
              <button
                type="button"
                onClick={() => onChange({ ...value, paragraphs: removeAt(paragraphs, index) })}
                className="mt-1 text-xs font-semibold text-red-700 underline-offset-4 hover:underline"
              >
                Quitar párrafo
              </button>
            )}
          </div>
        ))}
        {paragraphs.length < 6 && (
          <button
            type="button"
            onClick={() => onChange({ ...value, paragraphs: [...paragraphs, ""] })}
            className="h-10 rounded-full border border-dashed border-cocoa-900/25 px-4 text-sm font-semibold text-cocoa-700 hover:border-cocoa-900/50"
          >
            + Agregar párrafo
          </button>
        )}
        <TextField label="Firma" value={value.signature} maxLength={60} onChange={(signature) => onChange({ ...value, signature })} />
      </Card>
      <Card title="Fotos">
        <ImageField label="Foto principal" folder="about" value={value.image} onChange={(image) => onChange({ ...value, image })} />
        <ImageField label="Foto secundaria" folder="about" aspect="square" value={value.detailImage} onChange={(detailImage) => onChange({ ...value, detailImage })} />
      </Card>
    </>
  );
}

export function CtaEditor({ value, onChange }: EditorProps<"cta">) {
  return (
    <Card title="Bloque de pedidos">
      <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
      <TextField label="Título" value={value.title} maxLength={100} onChange={(title) => onChange({ ...value, title })} />
      <TextField label="Texto" rows={3} value={value.text} maxLength={300} onChange={(text) => onChange({ ...value, text })} />
      <TextField label="Texto del botón" value={value.button} maxLength={40} onChange={(button) => onChange({ ...value, button })} />
    </Card>
  );
}

export function InstagramEditor({ value, onChange }: EditorProps<"instagram">) {
  const posts = value.posts;
  return (
    <>
      <Card title="Textos">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Texto" value={value.text} maxLength={200} onChange={(text) => onChange({ ...value, text })} />
        <TextField label="Texto del botón" value={value.button} maxLength={40} onChange={(button) => onChange({ ...value, button })} />
      </Card>
      <Card
        title={`Fotos del feed (${posts.length})`}
        actions={
          posts.length < 12 && (
            <UploadButton
              folder="instagram"
              label="Agregar"
              variant="solid"
              onUploaded={(src) => onChange({ ...value, posts: [...posts, { image: { src, alt: "" }, url: "" }] })}
            />
          )
        }
      >
        <p className="text-sm text-cocoa-600">
          Subí fotos de tus publicaciones. Si pegás el link de la publicación, al tocar la foto se abre ese post; si no, se abre tu perfil. Se ven mejor de a 6.
        </p>
        {posts.map((post, index) => (
          <div key={`${post.image.src}-${index}`} className="flex gap-4 border-t border-cocoa-900/10 pt-4">
            <div className="relative aspect-square w-20 shrink-0 overflow-hidden rounded-xl bg-cream-200">
              <Image src={post.image.src} alt="" fill sizes="80px" className="object-cover" />
            </div>
            <div className="min-w-0 flex-1 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <UploadButton
                  folder="instagram"
                  label="Cambiar"
                  onUploaded={(src) => onChange({ ...value, posts: replaceAt(posts, index, { ...post, image: { ...post.image, src } }) })}
                />
                <ItemControls
                  index={index}
                  total={posts.length}
                  itemLabel={`la foto ${index + 1}`}
                  onMove={(offset) => onChange({ ...value, posts: move(posts, index, offset) })}
                  onRemove={() => onChange({ ...value, posts: removeAt(posts, index) })}
                />
              </div>
              <TextField
                label="Link de la publicación (opcional)"
                type="url"
                placeholder="https://www.instagram.com/p/..."
                maxLength={300}
                value={post.url}
                onChange={(url) => onChange({ ...value, posts: replaceAt(posts, index, { ...post, url }) })}
              />
              <TextField
                label="Descripción de la foto"
                maxLength={200}
                value={post.image.alt}
                onChange={(alt) => onChange({ ...value, posts: replaceAt(posts, index, { ...post, image: { ...post.image, alt } }) })}
              />
            </div>
          </div>
        ))}
      </Card>
    </>
  );
}

export function ContactEditor({ value, onChange }: EditorProps<"contact">) {
  const location = value.location ?? { label: "", address: "", mapsUrl: "", city: "", region: "" };
  const setLocation = (patch: Partial<typeof location>) => onChange({ ...value, location: { ...location, ...patch } });

  return (
    <>
      <Card title="Textos">
        <TextField label="Texto pequeño superior" value={value.eyebrow} maxLength={60} onChange={(eyebrow) => onChange({ ...value, eyebrow })} />
        <TextField label="Título" value={value.title} maxLength={100} onChange={(title) => onChange({ ...value, title })} />
        <TextField label="Texto" rows={2} value={value.text} maxLength={300} onChange={(text) => onChange({ ...value, text })} />
      </Card>
      <Card title="Ubicación">
        <label className="flex items-center gap-3 text-sm font-medium">
          <input
            type="checkbox"
            checked={value.location !== null}
            onChange={(event) => onChange({ ...value, location: event.target.checked ? location : null })}
            className="size-5 accent-cocoa-800"
          />
          Mostrar ubicación en el sitio
        </label>
        {value.location && (
          <>
            <TextField label="Texto visible" hint='Ej: "Las Parejas, Santa Fe"' value={location.label} maxLength={120} onChange={(label) => setLocation({ label })} />
            <TextField label="Calle y número (opcional)" value={location.address} maxLength={160} onChange={(address) => setLocation({ address })} />
            <TextField label="Link de Google Maps" type="url" value={location.mapsUrl} maxLength={1000} onChange={(mapsUrl) => setLocation({ mapsUrl })} />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField label="Ciudad" value={location.city} maxLength={80} onChange={(city) => setLocation({ city })} />
              <TextField label="Provincia" value={location.region} maxLength={80} onChange={(region) => setLocation({ region })} />
            </div>
          </>
        )}
      </Card>
    </>
  );
}
