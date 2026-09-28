import type { User } from "@supabase/supabase-js";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSession =
  | { status: "anonymous" }
  | { status: "forbidden"; user: User }
  | { status: "admin"; user: User };

/** Usuario logueado y si figura en la tabla `admins` (la misma regla que aplica RLS). */
export async function getAdminSession(): Promise<AdminSession> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { status: "anonymous" };

  const { data } = await supabase.from("admins").select("user_id").eq("user_id", user.id).maybeSingle();
  return data ? { status: "admin", user } : { status: "forbidden", user };
}
