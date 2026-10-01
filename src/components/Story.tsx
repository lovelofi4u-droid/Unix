import { useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { Heart, Play, TrendingUp } from "lucide-react";

const SCENES = [
  { n: "01", title: "Raw footage arrives", text: "Hours of unorganized clips. Audio everywhere. No story yet — just potential." },
  { n: "02", title: "The chaos of clips", text: "Every possible cut, angle and take. Somewhere in this mess is the video people will love." },
  { n: "03", title: "The editing process", text: "Story first, then pacing, motion and sound. Every second has to earn the next one." },
  { n: "04", title: "Final polished content", text: "Clean, tight and satisfying. The kind of edit people rewatch — and send to friends." },
  { n: "05", title: "Client results", text: "More views, longer watch times, actual conversions. That's the point, after all." },
];

function SceneArt({ index }: { index: number }) {
  if (index === 0)
    return (
      <div className="flex -rotate-3 gap-2">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="flex h-28 w-14 flex-col justify-between rounded-lg border border-border bg-secondary p-1.5">
            <div className="flex gap-1">{[0, 1].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-border" />)}</div>
            <div className={`h-12 rounded ${i === 2 ? "bg-accent" : "bg-card"}`} />
            <div className="flex gap-1">{[0, 1].map((d) => <span key={d} className="h-1.5 w-1.5 rounded-full bg-border" />)}</div>
          </div>
        ))}
      </div>
    );
  if (index === 1)
    return (
      <div className="relative h-32 w-64">
        {[
          { r: -18, x: 0, y: 8, c: "bg-accent" },
          { r: 12, x: 70, y: 0, c: "bg-border" },
          { r: -6, x: 140, y: 18, c: "bg-sky-soft" },
          { r: 24, x: 30, y: 60, c: "bg-border" },
          { r: -14, x: 110, y: 66, c: "bg-accent" },
        ].map((s, i) => (
          <div key={i} style={{ transform: `rotate(${s.r}deg)`, left: s.x, top: s.y }} className={`absolute h-14 w-16 rounded-lg ${s.c}`} />
        ))}
      </div>
    );
  if (index === 2)
    return (
      <div className="flex w-64 flex-col gap-3">
        {[
          { w: "w-full", c: "bg-primary/70" },
          { w: "w-3/4", c: "bg-accent" },
          { w: "w-5/6", c: "bg-primary/40" },
          { w: "w-1/2", c: "bg-accent/70" },
        ].map((b, i) => (
          <div key={i} className={`h-3.5 rounded-full ${b.w} ${b.c}`} />
        ))}
      </div>
    );
  if (index === 3)
    return (
      <div className="relative">
        <div className="flex h-28 w-48 items-center justify-center rounded-2xl border border-border bg-secondary shadow-[var(--shadow-card)]">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="h-5 w-5 fill-current" />
          </span>
        </div>
        <span className="absolute -top-3 -right-3 flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">✓</span>
      </div>
    );
  return (
    <div className="relative flex h-32 items-end gap-3">
      {[24, 38, 52, 74, 104].map((h, i) => (
        <div key={i} style={{ height: h }} className={`w-9 rounded-t-lg ${i === 4 ? "bg-primary" : "bg-accent"}`} />
      ))}
      <TrendingUp className="absolute -top-1 right-0 h-7 w-7 text-primary" />
    </div>
  );
}

export function Story() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [scene, setScene] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setScene(Math.min(SCENES.length - 1, Math.floor(v * SCENES.length)));
  });

  const sceneData = SCENES[scene] ?? SCENES[0]!;

  return (
    <div ref={ref} className="relative h-[400vh] bg-secondary">
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <div className="shell px-6 md:px-10">
          <div className="eyebrow mb-4">The journey</div>
          <h2 className="mb-8 text-4xl font-bold tracking-tight md:mb-14 md:text-6xl">
            From messy files to videos that <span className="font-accent text-primary">perform</span>.
          </h2>

          <div className="relative">
            <motion.div
              key={scene}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="grid items-center gap-6 md:grid-cols-2 md:gap-10"
            >
              <div className="card-surface flex min-h-44 items-center justify-center rounded-3xl p-4 md:h-56 md:p-0">
                <SceneArt index={scene} />
              </div>
              <div>
                <div className="mb-3 text-sm font-bold tracking-[0.2em] text-primary">SCENE {sceneData.n}</div>
                <h3 className="text-3xl font-bold tracking-tight md:text-4xl">{sceneData.title}</h3>
                <p className="mt-4 max-w-md text-base text-muted-foreground md:text-lg">{sceneData.text}</p>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="shell mt-8 flex items-center gap-4 px-6 md:mt-10 md:px-10">
          <span className="w-14 text-xs font-semibold tabular-nums text-muted-foreground">
            {sceneData.n} / 05
          </span>
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
            <motion.div style={{ scaleX: scrollYProgress }} className="h-full w-full origin-left rounded-full bg-primary" />
          </div>
          {scene === SCENES.length - 1 && (
            <Heart className="h-4 w-4 fill-primary text-primary" />
          )}
        </div>
      </div>
    </div>
  );
}
