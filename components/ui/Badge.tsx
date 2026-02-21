import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "secondary" | "success" | "destructive" | "outline";

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-foreground text-background",
  secondary: "bg-secondary text-secondary-foreground",
  success: "bg-success/10 text-success",
  destructive: "bg-destructive/10 text-destructive",
  outline: "border border-border bg-transparent text-foreground",
};

export function Badge({
  variant = "secondary",
  className,
  children,
}: {
  variant?: BadgeVariant;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
