export const supabaseConfig = {
  url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
};

export const isSupabaseConfigured = Boolean(supabaseConfig.url && supabaseConfig.anonKey);

/** Cookies de sesión: solo por HTTPS en producción (en localhost no hay HTTPS). */
export const sessionCookieOptions = {
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  path: "/",
} as const;

export const IMAGES_BUCKET = "site-images";
export const CONTENT_TABLE = "site_content";
export const CONTENT_ROW_ID = 1;
export const CONTENT_CACHE_TAG = "site-content";
