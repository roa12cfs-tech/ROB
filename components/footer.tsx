import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:px-6">
        <div className="flex items-center gap-2">
          <Heart className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium text-foreground">PflegeFinder</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {"© 2026 PflegeFinder. Alle Rechte vorbehalten."}
        </p>
      </div>
    </footer>
  );
}
