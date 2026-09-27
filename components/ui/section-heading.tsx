import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionHeadingProps = {
  id?: string;
  eyebrow: string;
  title: ReactNode;
  text?: string;
  align?: "left" | "center";
  className?: string;
};

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.26em] text-caramel-600",
        className,
      )}
    >
      <span aria-hidden="true" className="h-px w-8 bg-current opacity-60" />
      {children}
    </p>
  );
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  text,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("max-w-2xl", centered && "mx-auto text-center", className)}>
      <Eyebrow className={cn(centered && "justify-center")}>{eyebrow}</Eyebrow>
      <h2
        id={id}
        className="mt-5 text-balance font-display text-[2.5rem] font-medium leading-[1.02] tracking-[-0.015em] sm:text-5xl lg:text-6xl"
      >
        {title}
      </h2>
      {text && (
        <p className="mt-5 text-pretty text-base leading-relaxed text-cocoa-600 sm:text-lg">{text}</p>
      )}
    </div>
  );
}
