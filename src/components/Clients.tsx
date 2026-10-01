import { clients } from "@/data/content";

export function Clients() {
  return (
    <section className="border-y border-border bg-background py-12">
      <p className="mb-8 text-center text-xs font-semibold tracking-[0.22em] text-muted-foreground uppercase">
        Trusted by creators, brands & teams
      </p>
      <div className="marquee-paused overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]">
        <div
          className="animate-marquee flex w-max items-center gap-14 pr-14"
          style={{ "--marquee-duration": "32s" } as React.CSSProperties}
        >
          {[...clients, ...clients].map((c, i) => (
            <div key={i} className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary text-sm font-bold text-primary">
                {c.name.charAt(0)}
              </span>
              <span className="text-base font-bold text-foreground">{c.name}</span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-muted-foreground">
                {c.tag}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
