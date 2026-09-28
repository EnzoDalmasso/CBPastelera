import { redirect } from "next/navigation";
import { LoginForm } from "@/components/admin/login-form";
import { getAdminSession } from "@/lib/admin/session";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (!isSupabaseConfigured) redirect("/admin");
  if ((await getAdminSession()).status === "admin") redirect("/admin");
  return <LoginForm />;
}
