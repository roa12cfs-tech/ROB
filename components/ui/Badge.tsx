import { cn } from "@/lib/utils";

type BadgeVariant = "neutral" | "success" | "danger" | "rating";

const variantMap: Record<BadgeVariant, string> = {
  neutral: "border-slate-200 bg-slate-100 text-slate-700",
  success: "border-emerald-200 bg-emerald-50 text-emerald-700",
  danger: "border-rose-200 bg-rose-50 text-rose-700",
  rating: "border-amber-200 bg-amber-50 text-amber-700",
};

export function Badge({
  children,
  variant = "neutral",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        variantMap[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
