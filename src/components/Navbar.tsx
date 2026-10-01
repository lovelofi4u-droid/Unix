import { useEffect, useState } from "react";
import { navLinks } from "@/data/content";
import { scrollTo } from "@/lib/scroll";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/85 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="shell flex h-16 items-center justify-between px-6 md:px-10">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="text-lg font-bold tracking-tight text-foreground"
        >
          Unix<span className="text-primary">.</span>
        </button>

        <nav className="hidden items-center gap-8 md:flex">
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

        <button
          onClick={() => scrollTo("#book")}
          className="rounded-full bg-foreground px-5 py-2 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.03]"
        >
          Book a Call
        </button>
      </div>
    </header>
  );
}
