import { useEffect, useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Mascot } from "@/components/Mascot";
import { testimonials, type Testimonial } from "@/data/content";

type Variant = "sky" | "blue" | "deep";
type Slot = { x: number; y: number; s: number; v: Variant };

const SLOTS: Slot[] = [
  { x: 23.8, y: 6, s: 44, v: "sky" },
  { x: 44.2, y: 10.6, s: 46, v: "blue" },
  { x: 63.1, y: 7.5, s: 42, v: "deep" },
  { x: 79.8, y: 4.7, s: 38, v: "blue" },
  { x: 15.5, y: 27, s: 46, v: "blue" },
  { x: 33.9, y: 32, s: 50, v: "deep" },
  { x: 53.5, y: 34.7, s: 48, v: "blue" },
  { x: 73.1, y: 30.5, s: 46, v: "sky" },
  { x: 21.1, y: 48.8, s: 42, v: "deep" },
  { x: 47.8, y: 51, s: 46, v: "sky" },
  { x: 61.8, y: 46, s: 42, v: "blue" },
  { x: 19.1, y: 69, s: 70, v: "deep" },
  { x: 40, y: 64.5, s: 68, v: "blue" },
  { x: 59.7, y: 67, s: 74, v: "sky" },
  { x: 78.5, y: 65.6, s: 64, v: "sky" },
  { x: 29, y: 90, s: 70, v: "sky" },
  { x: 50, y: 88.7, s: 74, v: "deep" },
  { x: 69.8, y: 91, s: 74, v: "blue" },
];

const TM_SLOTS = [11, 12, 13, 14, 15, 16, 17, 6];
const EMOJI_SLOTS: Record<number, string> = {
  1: "🔥",
  3: "🤯",
  5: "💯",
  8: "😍",
  10: "🚀",
};

type Item = Slot & { id: string; tm?: number; emoji?: string };

const ITEMS: Item[] = SLOTS.map((slot, i) => {
  const tmIndex = TM_SLOTS.indexOf(i);
  if (tmIndex !== -1 && testimonials[tmIndex]) {
    return { ...slot, id: `tm-${tmIndex}`, tm: tmIndex };
  }
  if (EMOJI_SLOTS[i]) return { ...slot, id: `em-${i}`, emoji: EMOJI_SLOTS[i] };
  return { ...slot, id: `fx-${i}` };
});

const alignStyle = (x: number): CSSProperties =>
  x <= 20 ? { left: 0 } : x >= 80 ? { right: 0 } : { left: "50%", transform: "translateX(-50%)" };

const cardBox: CSSProperties = {
  padding: 6,
  background: "#fff",
  borderRadius: 14,
  boxShadow: "0 18px 40px rgba(10,30,70,0.18)",
  border: "1px solid rgba(0,0,0,0.08)",
  overflow: "hidden",
};

function useIsDesktop() {
  const query = "(min-width: 768px)";
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const handler = () => setIsDesktop(mq.matches);
    handler();
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}

function ShotCard({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.96 }}
      transition={{ type: "spring", stiffness: 360, damping: 28 }}
      style={{ ...cardBox, width: 300, maxWidth: "calc(100vw - 32px)" }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          display: "block",
          width: "100%",
          height: "auto",
          maxHeight: 340,
          objectFit: "contain",
          borderRadius: 10,
        }}
      />
    </motion.div>
  );
}

function EmojiBubble({ emoji }: { emoji: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 6, scale: 0.85 }}
      transition={{ type: "spring", stiffness: 420, damping: 24 }}
      style={{
        padding: "8px 16px",
        fontSize: 32,
        lineHeight: 1,
        background: "#fff",
        borderRadius: 999,
        boxShadow: "0 12px 28px rgba(10,30,70,0.18)",
        border: "1px solid rgba(0,0,0,0.08)",
        whiteSpace: "nowrap",
      }}
    >
      {emoji}
    </motion.div>
  );
}

function TestimonialLightbox({
  testimonial,
  onClose,
}: {
  testimonial: Testimonial;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Testimonial from ${testimonial.name}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[70] flex items-center justify-center bg-foreground/75 p-4 backdrop-blur-sm"
    >
      <motion.div
        initial={{ y: 16, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 12, scale: 0.98 }}
        onClick={(event) => event.stopPropagation()}
        className="relative max-h-[92vh] max-w-[min(92vw,640px)] rounded-xl bg-card p-2 shadow-2xl"
      >
        <img
          src={testimonial.image}
          alt={`Message from ${testimonial.name}`}
          className="block max-h-[86vh] max-w-full rounded-lg object-contain"
        />
        <button
          type="button"
          onClick={onClose}
          aria-label="Close testimonial"
          className="absolute right-4 top-4 rounded-full bg-card p-2 text-foreground shadow-md"
        >
          <X className="h-5 w-5" />
        </button>
      </motion.div>
    </motion.div>
  );
}

export function Testimonials() {
  const isDesktop = useIsDesktop();
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [pinnedId, setPinnedId] = useState<string | null>(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const activeId = pinnedId ?? hoverId;

  const renderMinion = (item: Item, index: number, mobile = false) => {
    const isActive = activeId === item.id;
    const testimonial = item.tm !== undefined ? testimonials[item.tm] : null;
    const interactive = !!testimonial || !!item.emoji;
    const opensDown = !mobile && item.y < 45;

    const wrapStyle: CSSProperties = mobile
      ? { position: "relative", width: Math.min(item.s, 54), margin: "0 auto" }
      : {
          position: "absolute",
          left: `${item.x}%`,
          top: `${item.y}%`,
          width: item.s,
          transform: "translate(-50%, -50%)",
          zIndex: isActive ? 30 : 10,
        };

    const popStyle: CSSProperties = {
      position: "absolute",
      zIndex: 40,
      pointerEvents: "none",
      ...(opensDown ? { top: "calc(100% + 12px)" } : { bottom: "calc(100% + 12px)" }),
      ...(mobile ? { left: "50%", transform: "translateX(-50%)" } : alignStyle(item.x)),
    };

    return (
      <div key={`${mobile ? "m-" : ""}${item.id}`} style={wrapStyle}>
        <div>
          <button
            type="button"
            disabled={!interactive}
            onMouseEnter={() => interactive && setHoverId(item.id)}
            onMouseLeave={() => setHoverId((c) => (c === item.id ? null : c))}
            onClick={(e) => {
              e.stopPropagation();
              if (testimonial) {
                setSelectedTestimonial(testimonial);
                return;
              }
              if (interactive) setPinnedId((c) => (c === item.id ? null : item.id));
            }}
            onFocus={() => interactive && setHoverId(item.id)}
            onBlur={() => setHoverId((c) => (c === item.id ? null : c))}
            aria-label={testimonial ? `Testimonial from ${testimonial.name}` : "Happy client"}
            style={{
              display: "block",
              width: "100%",
              background: "none",
              border: 0,
              padding: 0,
              cursor: interactive ? "pointer" : "default",
            }}
          >
            <motion.span
              animate={isActive ? { y: -8, scale: 1.12 } : { y: [0, -5, 0], scale: 1 }}
              transition={
                isActive
                  ? { duration: 0.22, ease: "easeOut" }
                  : { duration: 2.6 + (index % 5) * 0.4, repeat: Infinity, ease: "easeInOut" }
              }
              className="block w-full"
            >
              <Mascot
                variant={item.v}
                className="h-auto w-full drop-shadow-[0_12px_18px_oklch(0.241_0.063_257.7/0.16)]"
              />
            </motion.span>
            <span
              style={{
                display: "block",
                margin: "4px auto 0",
                height: 5,
                width: isActive ? "75%" : "50%",
                borderRadius: 999,
                background: "rgba(10,30,70,0.12)",
                transition: "width .3s",
              }}
            />
          </button>
        </div>

        {interactive && !(mobile && testimonial) && (
          <div style={popStyle}>
            <AnimatePresence>
              {isActive && testimonial && (
                <ShotCard
                  key="shot"
                  src={testimonial.image}
                  alt={`Message from ${testimonial.name}`}
                />
              )}
              {isActive && item.emoji && <EmojiBubble key="emoji" emoji={item.emoji} />}
            </AnimatePresence>
          </div>
        )}
      </div>
    );
  };

  return (
    <section id="proof" className="section-pad bg-secondary" style={{ overflowX: "clip" }}>
      <div className="shell px-6 text-center md:px-10">
        <div className="eyebrow justify-center">Proof</div>
        <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-bold tracking-tight md:text-6xl">
          Don&apos;t take our word for it. Take{" "}
          <span className="font-accent text-primary">theirs</span>.
        </h2>
        <p className="mx-auto mt-5 max-w-lg text-lg text-muted-foreground">
          Hover or tap a little guy to see the real thing.
        </p>
      </div>

      {isDesktop ? (
        <div
          style={{
            position: "relative",
            margin: "32px auto 0",
            width: "100%",
            maxWidth: 1500,
            height: "clamp(560px, 70vh, 680px)",
          }}
          onClick={() => setPinnedId(null)}
        >
          {ITEMS.map((item, i) => renderMinion(item, i))}
        </div>
      ) : (
        <div style={{ padding: "0 16px" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
              columnGap: 8,
              rowGap: 28,
              padding: "24px 0",
              justifyItems: "center",
            }}
          >
            {ITEMS.map((item, i) => renderMinion(item, i, true))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedTestimonial && (
          <TestimonialLightbox
            testimonial={selectedTestimonial}
            onClose={() => setSelectedTestimonial(null)}
          />
        )}
      </AnimatePresence>

      <p
        className="text-center text-sm font-medium text-muted-foreground"
        style={{ marginTop: 56 }}
      >
        Every word above is a real message from a real client.
      </p>
    </section>
  );
}
