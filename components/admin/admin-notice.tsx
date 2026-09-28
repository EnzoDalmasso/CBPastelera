import type { ReactNode } from "react";
import { BrandLogo } from "@/components/layout/brand-logo";

type AdminNoticeProps = {
  title: string;
  children: ReactNode;
  action?: () => Promise<void>;
  actionLabel?: string;
};

export function AdminNotice({ title, children, action, actionLabel }: AdminNoticeProps) {
  return (
    <main id="contenido" className="flex min-h-svh items-center justify-center px-5 py-16">
      <div className="w-full max-w-md rounded-[1.5rem] bg-cream-50 p-8 text-center shadow-soft ring-1 ring-cocoa-900/5">
        <BrandLogo className="text-3xl" />
        <h1 className="mt-6 font-display text-3xl font-medium">{title}</h1>
        <p className="mt-3 text-sm leading-relaxed text-cocoa-600 [&_code]:rounded [&_code]:bg-cream-200 [&_code]:px-1">
          {children}
        </p>
        {action && actionLabel && (
          <form action={action} className="mt-6">
            <button
              type="submit"
              className="h-11 rounded-full border border-cocoa-900/15 px-5 text-sm font-semibold hover:border-cocoa-900/40"
            >
              {actionLabel}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
