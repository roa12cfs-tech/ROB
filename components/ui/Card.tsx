import { cn } from "@/lib/utils";

export function Card({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-slate-200 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.03),0_12px_28px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {children}
    </section>
  );
}
