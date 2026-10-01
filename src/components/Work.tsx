import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { workSections, type VideoItem } from "@/data/content";

function VideoCard({
  item,
  vertical,
  onOpen,
}: {
  item: VideoItem;
  vertical: boolean;
  onOpen: () => void;
}) {
  const cardWidth = vertical ? 220 : 440;

  return (
    <div className="shrink-0" style={{ width: cardWidth }}>
      <button
        onClick={onOpen}
        aria-label={`Watch ${item.category} video`}
        className={`group relative block w-full overflow-hidden rounded-2xl border border-border bg-card text-left shadow-[var(--shadow-card)] transition-transform duration-300 hover:scale-[1.04] ${
          vertical ? "aspect-[9/16]" : "aspect-video"
        }`}
      >
        <video
          src={item.src}
          muted
          loop
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span className="inline-flex rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {item.category}
          </span>
        </div>
      </button>
    </div>
  );
}

function VideoMarquee({
  items,
  vertical,
  reverse,
  suspended,
  onOpen,
}: {
  items: VideoItem[];
  vertical: boolean;
  reverse: boolean;
  suspended: boolean;
  onOpen: (item: VideoItem) => void;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const firstGroupRef = useRef<HTMLDivElement>(null);
  const offset = useRef(0);
  const paused = useRef(false);

  useEffect(() => {
    let raf = 0;
    let last = performance.now();
    let lastPlaybackCheck = 0;
    let groupWidth = 0;
    let activeVideos = new Set<HTMLVideoElement>();
    const videos = Array.from(wrapRef.current?.querySelectorAll("video") ?? []);
    const measure = () => {
      const nextWidth = firstGroupRef.current?.getBoundingClientRect().width ?? 0;
      if (nextWidth > 0 && groupWidth > 0 && nextWidth !== groupWidth) {
        offset.current %= nextWidth;
      }
      groupWidth = nextWidth;
    };
    const group = firstGroupRef.current;
    if (group) {
      measure();
    }
    const resizeObserver = group ? new ResizeObserver(measure) : null;
    if (group) resizeObserver?.observe(group);

    const loop = (t: number) => {
      const dt = Math.min(50, t - last);
      last = t;
      const track = trackRef.current;
      const wrap = wrapRef.current;
      const wrapRect = wrap?.getBoundingClientRect();
      const isVisible = !!wrapRect && wrapRect.bottom > 0 && wrapRect.top < window.innerHeight;

      if (track && groupWidth > 0) {
        if (isVisible && !paused.current && !suspended) {
          offset.current = (offset.current + (dt / 1000) * (vertical ? 32 : 42)) % groupWidth;
        }
        const x = reverse ? -groupWidth + offset.current : -offset.current;
        track.style.transform = `translate3d(${x}px, 0, 0)`;
      }

      if (t - lastPlaybackCheck >= 250) {
        lastPlaybackCheck = t;
        const visibleVideos = new Set<HTMLVideoElement>();

        if (wrapRect && wrapRect.bottom > 0 && wrapRect.top < window.innerHeight) {
          for (const video of videos) {
            const rect = video.getBoundingClientRect();
            const visibleWidth = Math.max(
              0,
              Math.min(rect.right, wrapRect.right, window.innerWidth) -
                Math.max(rect.left, wrapRect.left, 0),
            );
            const visibleHeight = Math.max(
              0,
              Math.min(rect.bottom, wrapRect.bottom, window.innerHeight) -
                Math.max(rect.top, wrapRect.top, 0),
            );
            const ratio = (visibleWidth * visibleHeight) / Math.max(1, rect.width * rect.height);
            if (ratio >= 0.35) visibleVideos.add(video);
          }
        }

        if (suspended) visibleVideos.clear();
        for (const video of videos) {
          if (visibleVideos.has(video)) {
            if (video.paused) void video.play().catch(() => undefined);
          } else {
            video.pause();
          }
        }
        activeVideos = visibleVideos;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver?.disconnect();
      for (const video of activeVideos) video.pause();
    };
  }, [vertical, reverse, suspended]);

  return (
    <div
      ref={wrapRef}
      data-video-viewport
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      className="overflow-hidden py-4 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div ref={trackRef} className="flex w-max items-center will-change-transform">
        {[0, 1].map((groupIndex) => (
          <div
            key={groupIndex}
            ref={groupIndex === 0 ? firstGroupRef : undefined}
            className="flex shrink-0 items-center gap-6 pr-6"
          >
            {items.map((item) => (
              <VideoCard
                key={`${groupIndex}-${item.id}`}
                item={item}
                vertical={vertical}
                onOpen={() => onOpen(item)}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function ShowcaseModal({ item, onClose }: { item: VideoItem; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const isShortForm = item.category === "Short Form";

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
    >
      <div className="absolute inset-0 bg-foreground/45 backdrop-blur-sm" onClick={onClose} />
      <motion.div
        initial={{ y: 48, scale: 0.96, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 28, scale: 0.97, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 28 }}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-3xl border border-border bg-card shadow-2xl md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="flex items-center justify-center bg-foreground/95 p-4">
          <video
            src={item.src}
            controls
            autoPlay
            muted
            playsInline
            preload="auto"
            className={`w-full rounded-xl object-cover ${isShortForm ? "max-w-[260px] md:max-w-[300px]" : "max-w-full"}`}
            style={isShortForm ? { aspectRatio: "9 / 16" } : undefined}
          />
        </div>
        <div className="flex items-center justify-center p-8 md:p-10">
          <span className="inline-flex rounded-full bg-secondary px-4 py-2 text-sm font-semibold text-primary">
            {item.category}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 rounded-full border border-border bg-card p-2 text-foreground shadow-sm transition-colors hover:bg-secondary"
        >
          <X className="h-4 w-4" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Work() {
  const [active, setActive] = useState<VideoItem | null>(null);

  return (
    <section id="work" className="section-pad overflow-hidden">
      <div className="shell px-6 md:px-10">
        <div className="eyebrow mb-4">Work</div>
        <h2 className="max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          Videos built to be <span className="font-accent text-primary">watched</span>.
        </h2>
        <p className="mt-5 max-w-xl text-lg text-muted-foreground">
          Click any video to preview it.
        </p>
      </div>

      {workSections.map((s, i) => (
        <div key={s.key} className="mt-14">
          <div className="shell mb-4 flex items-baseline justify-between px-6 md:px-10">
            <h3 className="text-2xl font-bold tracking-tight">{s.label}</h3>
            <p className="hidden text-sm text-muted-foreground md:block">{s.note}</p>
          </div>
          <VideoMarquee
            items={[...s.videos]}
            vertical={s.key === "short"}
            reverse={i % 2 === 1}
            suspended={active !== null}
            onOpen={setActive}
          />
        </div>
      ))}

      <AnimatePresence>
        {active && <ShowcaseModal item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </section>
  );
}
