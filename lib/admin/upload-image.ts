import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import { IMAGES_BUCKET } from "@/lib/supabase/config";

const MAX_SIDE = 2000;
const QUALITY = 0.85;

/** Achica la foto en el navegador (las fotos del celular suelen pesar 3–10 MB) y la pasa a WebP. */
async function compressImage(file: File): Promise<Blob> {
  const bitmap = await createImageBitmap(file).catch(() => {
    throw new Error("No se pudo leer la imagen. Probá con una foto JPG o PNG.");
  });
  const scale = Math.min(1, MAX_SIDE / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")?.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("No se pudo procesar la imagen."))),
      "image/webp",
      QUALITY,
    );
  });
}

export async function uploadImage(file: File, folder: string): Promise<string> {
  if (!file.type.startsWith("image/")) throw new Error("El archivo elegido no es una imagen.");

  const blob = await compressImage(file);
  const path = `${folder}/${Date.now()}-${crypto.randomUUID().slice(0, 8)}.webp`;
  const supabase = createSupabaseBrowserClient();

  const { error } = await supabase.storage.from(IMAGES_BUCKET).upload(path, blob, {
    contentType: "image/webp",
    cacheControl: "31536000",
  });
  if (error) throw new Error("No se pudo subir la imagen. Revisá tu conexión y probá de nuevo.");

  return supabase.storage.from(IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}
