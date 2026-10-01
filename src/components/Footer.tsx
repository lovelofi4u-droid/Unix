import { navLinks } from "@/data/content";
import { scrollTo } from "@/lib/scroll";

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="shell flex flex-col gap-8 px-6 py-12 md:flex-row md:items-center md:justify-between md:px-10">
        <div>
          <div className="text-lg font-bold tracking-tight">
            Unix<span className="text-primary">.</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">
            Turning ideas into scroll-stopping videos.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-2">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </button>
          ))}
        </nav>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Unix. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
