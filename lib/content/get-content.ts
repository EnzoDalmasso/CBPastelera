import { defaultContent } from "@/data/default-content";
import { parseSiteContent } from "@/lib/content/parse";
import type { SiteContent } from "@/lib/content/types";
import {
  CONTENT_CACHE_TAG,
  CONTENT_ROW_ID,
  CONTENT_TABLE,
  isSupabaseConfigured,
  supabaseConfig,
} from "@/lib/supabase/config";

/**
 * Contenido público del sitio. Se cachea y se revalida cuando la dueña guarda cambios
 * desde /admin. Si Supabase no está configurado o falla, se usa el contenido inicial.
 */
export async function getSiteContent(): Promise<SiteContent> {
  if (!isSupabaseConfigured) return defaultContent;

  try {
    const response = await fetch(
      `${supabaseConfig.url}/rest/v1/${CONTENT_TABLE}?id=eq.${CONTENT_ROW_ID}&select=content`,
      {
        headers: {
          apikey: supabaseConfig.anonKey,
          Authorization: `Bearer ${supabaseConfig.anonKey}`,
        },
        next: { tags: [CONTENT_CACHE_TAG], revalidate: 3600 },
      },
    );
    if (!response.ok) throw new Error(`Supabase respondió ${response.status}`);

    const rows = (await response.json()) as Array<{ content: unknown }>;
    const row = rows[0];
    return row ? parseSiteContent(row.content) : defaultContent;
  } catch (error) {
    console.error("No se pudo leer el contenido desde Supabase:", error);
    return defaultContent;
  }
}
