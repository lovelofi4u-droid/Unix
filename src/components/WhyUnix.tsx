import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { othersTraits, UnixTraits } from "@/data/content";

export function WhyUnix() {
  return (
    <section className="section-pad">
      <div className="shell px-6 md:px-10">
        <div className="eyebrow mb-4">Why Unix</div>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          The difference is <span className="font-accent text-primary">obvious</span>.
        </h2>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-border bg-muted p-8 md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-border/70 text-muted-foreground">
                <X className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold text-muted-foreground">Other editors</h3>
            </div>
            <ul className="mt-8 space-y-4">
              {othersTraits.map((t) => (
                <li key={t} className="flex items-center gap-3 text-muted-foreground">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-border/70">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="line-through decoration-border">{t}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-3xl border border-primary/25 bg-secondary p-8 shadow-[var(--shadow-card)] md:p-10"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Check className="h-5 w-5" />
              </span>
              <h3 className="text-xl font-bold">Unix</h3>
            </div>
            <ul className="mt-8 space-y-4">
              {UnixTraits.map((t) => (
                <li key={t} className="flex items-center gap-3 font-medium">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}