import { motion } from "framer-motion";
import { aboutImg } from "@/assets/about";
import { Mascot } from "@/components/Mascot";

const AUDIENCES = ["Creators", "Brands", "Businesses"];

export function About() {
  return (
    <section id="about" className="section-pad bg-secondary">
      <div className="shell grid items-center gap-12 px-6 md:grid-cols-2 md:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="card-surface overflow-hidden rounded-3xl"
        >
          <img
            src={aboutImg}
            alt="Unix at his editing desk"
            loading="lazy"
            width={1024}
            height={1024}
            className="h-auto w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="eyebrow mb-4">About</div>
          <h2 className="text-4xl font-bold tracking-tight md:text-6xl">
            The guy behind the <span className="font-accent text-primary">cuts</span>.
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            I'm Unix — a professional video editor who works with creators, brands and
            businesses. I don't just cut clips; I build videos people actually finish.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            My approach is simple: storytelling first, retention always. Every hook, every
            cut, every sound exists to keep your audience watching — and coming back.
          </p>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {AUDIENCES.map((a) => (
              <span
                key={a}
                className="rounded-full border border-border bg-card px-4 py-1.5 text-sm font-semibold"
              >
                {a}
              </span>
            ))}
          </div>
          <div className="mt-10 flex items-end gap-4">
            <div className="w-16">
              <Mascot variant="sky" className="h-auto w-full" />
            </div>
            <p className="pb-2 text-sm font-medium text-muted-foreground">
              "Send me your raw footage. I'll send you back the version people share."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
