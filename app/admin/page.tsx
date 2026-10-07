import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/admin/admin-editor";
import { AdminNotice } from "@/components/admin/admin-notice";
import { defaultContent } from "@/data/default-content";
import { signOut } from "@/app/admin/actions";
import { getAdminSession } from "@/lib/admin/session";
import { parseSiteContent } from "@/lib/content/parse";
import type { SiteContent } from "@/lib/content/types";
import { CONTENT_ROW_ID, CONTENT_TABLE, isSupabaseConfigured } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

async function loadEditableContent(): Promise<SiteContent> {
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from(CONTENT_TABLE)
    .select("content")
    .eq("id", CONTENT_ROW_ID)
    .maybeSingle();

  if (!data) return defaultContent;
  try {
    return parseSiteContent(data.content);
  } catch {
    return defaultContent;
  }
}

export default async function AdminPage() {
  if (!isSupabaseConfigured) {
    if (process.env.NODE_ENV === "development") {
      return <AdminEditor initialContent={defaultContent} previewOnly />;
    }
    return (
      <AdminNotice title="Panel no disponible">El panel todavía no está habilitado.</AdminNotice>
    );
  }

  const session = await getAdminSession();
  if (session.status === "anonymous") redirect("/admin/login");
  if (session.status === "forbidden") {
    return (
      <AdminNotice title="Sin permisos" action={signOut} actionLabel="Cerrar sesión">
        La cuenta {session.user.email} no tiene permisos para editar el sitio.
      </AdminNotice>
    );
  }

  return <AdminEditor initialContent={await loadEditableContent()} userEmail={session.user.email} />;
}
