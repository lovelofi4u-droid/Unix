import { motion, useMotionValue, useTransform } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { scrollTo } from "@/lib/scroll";

export function Hero() {
  /* subtle mouse depth */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const blob1x = useTransform(mx, (v) => v * 36);
  const blob1y = useTransform(my, (v) => v * 24);
  const blob2x = useTransform(mx, (v) => v * -28);
  const blob2y = useTransform(my, (v) => v * -18);
  const card1x = useTransform(mx, (v) => v * 52);
  const card1y = useTransform(my, (v) => v * 34);
  const card2x = useTransform(mx, (v) => v * -44);
  const card2y = useTransform(my, (v) => v * -28);

  return (
    <section
      className="relative flex min-h-screen items-center overflow-hidden"
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set((e.clientX - r.left) / r.width - 0.5);
        my.set((e.clientY - r.top) / r.height - 0.5);
      }}
    >
      {/* ambient background */}
      <motion.div
        style={{ x: blob1x, y: blob1y }}
        className="pointer-events-none absolute -top-32 -left-24 h-[420px] w-[420px] rounded-full bg-accent/50 blur-3xl"
      />
      <motion.div
        style={{ x: blob2x, y: blob2y }}
        className="pointer-events-none absolute right-[-120px] bottom-[-80px] h-[380px] w-[380px] rounded-full bg-sky-soft blur-3xl"
      />

      {/* floating mini video cards */}
      <motion.div
        style={{ x: card1x, y: card1y }}
        className="pointer-events-none absolute top-[22%] right-[10%] hidden w-40 rotate-6 lg:block"
      >
        <div className="card-surface flex aspect-video items-center justify-center rounded-2xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-4 w-4 fill-current" />
          </span>
        </div>
      </motion.div>
      <motion.div
        style={{ x: card2x, y: card2y }}
        className="pointer-events-none absolute bottom-[18%] left-[6%] hidden w-32 -rotate-6 lg:block"
      >
        <div className="card-surface flex aspect-video items-center justify-center rounded-2xl">
          <div className="flex w-full gap-1 px-3">
            <span className="h-2 flex-1 rounded-full bg-primary/60" />
            <span className="h-2 flex-[2] rounded-full bg-accent" />
            <span className="h-2 flex-1 rounded-full bg-border" />
          </div>
        </div>
      </motion.div>

      {/* hero content */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{ show: { transition: { staggerChildren: 0.12 } } }}
        className="shell relative z-10 px-6 py-32 text-center md:px-10"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mx-auto mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-muted-foreground"
        >
          <span className="h-2 w-2 rounded-full bg-primary" />
          Booking new projects
        </motion.div>

        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 30 },
            show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="text-balance mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl"
        >
          Turning Ideas Into <span className="font-accent text-primary">Scroll-Stopping</span>{" "}
          Videos.
        </motion.h1>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base font-medium text-muted-foreground md:text-lg"
        >
          <span>Short Form</span>
          <span className="text-primary">•</span>
          <span>Long Form</span>
          <span className="text-primary">•</span>
          <span>SaaS Videos</span>
          <span className="text-primary">•</span>
          <span>Content Systems</span>
        </motion.p>

        <motion.div
          variants={{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
          }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <button
            onClick={() => scrollTo("#work")}
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-12px_oklch(0.621_0.149_244.6/0.5)] transition-all duration-200 hover:scale-[1.03] hover:bg-primary-deep"
          >
            View Work
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => scrollTo("#book")}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-8 py-4 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
          >
            Book a Call
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
}
