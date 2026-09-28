"use server";

import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/admin/session";
import { ContentError, parseSiteContent } from "@/lib/content/parse";
import { CONTENT_CACHE_TAG, CONTENT_ROW_ID, CONTENT_TABLE } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveResult = { ok: true; savedAt: string } | { ok: false; error: string };

export async function saveSiteContent(input: unknown): Promise<SaveResult> {
  const session = await getAdminSession();
  if (session.status !== "admin") {
    return { ok: false, error: "Tu sesión expiró o no tenés permisos. Volvé a iniciar sesión." };
  }

  let content;
  try {
    content = parseSiteContent(input);
  } catch (error) {
    if (error instanceof ContentError) return { ok: false, error: error.message };
    throw error;
  }

  const savedAt = new Date().toISOString();
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from(CONTENT_TABLE)
    .upsert({ id: CONTENT_ROW_ID, content, updated_at: savedAt });

  if (error) {
    console.error("Error guardando contenido:", error);
    return { ok: false, error: "No se pudieron guardar los cambios. Probá de nuevo en unos segundos." };
  }

  updateTag(CONTENT_CACHE_TAG);
  revalidatePath("/");
  return { ok: true, savedAt };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
