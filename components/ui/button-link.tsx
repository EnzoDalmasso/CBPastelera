import type { ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary: "bg-cocoa-800 text-cream-50 shadow-soft hover:bg-cocoa-900",
  secondary:
    "border border-cocoa-900/15 bg-transparent text-cocoa-900 hover:border-cocoa-900/40 hover:bg-cocoa-900/[0.03]",
  light: "bg-cream-50 text-cocoa-900 shadow-soft hover:bg-white",
  heroPrimary:
    "bg-cream-50 text-cocoa-900 hover:bg-white lg:bg-cocoa-800 lg:text-cream-50 lg:shadow-soft lg:hover:bg-cocoa-900",
  heroSecondary:
    "border border-cream-50/45 text-cream-50 hover:bg-cream-50/10 lg:border-cocoa-900/15 lg:text-cocoa-900 lg:hover:border-cocoa-900/40 lg:hover:bg-cocoa-900/[0.03]",
} as const;

const sizes = {
  md: "h-12 px-6 text-[0.9375rem]",
  sm: "h-10 px-4 text-sm",
} as const;

type ButtonLinkProps = ComponentPropsWithoutRef<"a"> & {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  external?: boolean;
};

export function ButtonLink({
  variant = "primary",
  size = "md",
  external = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      {...props}
      className={cn(
        "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold tracking-[-0.005em]",
        "transition-[background-color,border-color,color,box-shadow,transform] duration-200 ease-out",
        "hover:-translate-y-px active:translate-y-0 active:scale-[0.98]",
        "aria-disabled:pointer-events-none aria-disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </a>
  );
}
