import { motion } from "framer-motion";
import { processSteps } from "@/data/content";

export function Process() {
  return (
    <section id="process" className="section-pad bg-secondary">
      <div className="shell px-6 md:px-10">
        <div className="eyebrow mb-4">Process</div>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          How working together <span className="font-accent text-primary">looks</span>.
        </h2>

        <div className="relative mx-auto mt-16 max-w-3xl">
          <div className="absolute top-4 bottom-4 left-[27px] w-px bg-border" />
          {processSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-6 flex gap-6 last:mb-0"
            >
              <div className="z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-border bg-card text-sm font-bold text-primary shadow-sm transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {s.step}
              </div>
              <div className="card-surface flex-1 rounded-2xl p-6 transition-transform duration-300 group-hover:translate-x-1.5">
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
