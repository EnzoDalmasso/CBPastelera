"use client";

import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setLoading(true);
    setError("");

    const { error: signInError } = await createSupabaseBrowserClient().auth.signInWithPassword({
      email: String(form.get("email")),
      password: String(form.get("password")),
    });

    if (signInError) {
      setError("Email o contraseña incorrectos.");
      setLoading(false);
      return;
    }
    router.replace("/admin");
    router.refresh();
  }

  return (
    <main id="contenido" className="flex min-h-svh items-center justify-center px-5 py-16">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-[1.5rem] bg-cream-50 p-7 shadow-soft ring-1 ring-cocoa-900/5 sm:p-8"
      >
        <BrandLogo className="text-3xl" />
        <h1 className="mt-6 font-display text-3xl font-medium">Panel de contenido</h1>
        <p className="mt-2 text-sm text-cocoa-600">Ingresá para editar textos, productos y fotos.</p>

        <label className="mt-7 block text-sm font-medium" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="mt-2 h-12 w-full rounded-xl border border-cocoa-900/15 bg-white px-4 text-base outline-none focus:border-cocoa-700"
        />

        <label className="mt-4 block text-sm font-medium" htmlFor="password">
          Contraseña
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="mt-2 h-12 w-full rounded-xl border border-cocoa-900/15 bg-white px-4 text-base outline-none focus:border-cocoa-700"
        />

        {error && (
          <p role="alert" className="mt-4 text-sm font-medium text-red-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-cocoa-800 font-semibold text-cream-50 transition-colors hover:bg-cocoa-900 disabled:opacity-60"
        >
          {loading && <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />}
          Ingresar
        </button>
      </form>
    </main>
  );
}
