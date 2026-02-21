import { cn } from "@/lib/utils";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement>;

export function Select({ className, children, ...props }: SelectProps) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white",
        className,
      )}
      {...props}
    >
      {children}
    </select>
  );
}
