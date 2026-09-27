import { cn } from "@/lib/cn";

export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("font-display text-[1.65rem] leading-none tracking-[-0.01em]", className)}>
      <span className="font-semibold">CB</span> <span className="italic">Pastelera</span>
    </span>
  );
}
