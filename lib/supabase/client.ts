import { createBrowserClient } from "@supabase/ssr";
import { sessionCookieOptions, supabaseConfig } from "@/lib/supabase/config";

export function createSupabaseBrowserClient() {
  return createBrowserClient(supabaseConfig.url, supabaseConfig.anonKey, {
    cookieOptions: sessionCookieOptions,
  });
}
