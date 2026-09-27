import { business } from "@/data/business";
import { cn } from "@/lib/cn";

export function DemoNote({ children, className }: { children: string; className?: string }) {
  if (!business.showDemoNotice) return null;

  return (
    <p
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-dashed border-caramel-500/50 px-3 py-1 text-xs font-medium text-caramel-600",
        className,
      )}
    >
      <span aria-hidden="true" className="size-1.5 rounded-full bg-caramel-500" />
      {children}
    </p>
  );
}
