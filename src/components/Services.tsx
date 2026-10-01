import { motion } from "framer-motion";
import {
  Clapperboard,
  Film,
  Megaphone,
  MonitorPlay,
  Repeat2,
  Youtube,
} from "lucide-react";
import { services } from "@/data/content";

const ICONS = [Clapperboard, Film, MonitorPlay, Megaphone, Youtube, Repeat2];

export function Services() {
  return (
    <section id="services" className="section-pad">
      <div className="shell px-6 md:px-10">
        <div className="eyebrow mb-4">Services</div>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          Everything your content <span className="font-accent text-primary">needs</span>.
        </h2>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length] ?? Clapperboard;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="group card-surface rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1"
              >
                <span className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-secondary text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <h3 className="text-lg font-bold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{s.line}</p>
                <div className="grid grid-rows-[0fr] transition-[grid-template-rows] duration-300 group-hover:grid-rows-[1fr]">
                  <p className="overflow-hidden text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-3 block border-t border-border pt-3">{s.detail}</span>
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
