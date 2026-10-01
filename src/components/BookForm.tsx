import { useState } from "react";
import { CalendarDays, MessageCircle, Send } from "lucide-react";
import { CALENDAR_URL, WHATSAPP_NUMBER } from "@/data/content";
import { Mascot } from "@/components/Mascot";

const PROJECT_TYPES = ["Short Form", "Long Form", "SaaS Video", "Ads / Creatives", "Something else"];
const BUDGETS = ["Under $500", "$500 – $1,000", "$1,000 – $3,000", "$3,000+", "Not sure yet"];

const INPUT_CLS =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground/60 focus:border-primary focus:ring-2 focus:ring-primary/20";

export function BookForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    projectType: "Short Form",
    budget: "$500 – $1,000",
    reference: "",
  });

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const msg = [
      `Hi Unix! 👋 I'd like to book a project.`,
      ``,
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Project type: ${form.projectType}`,
      `Budget: ${form.budget}`,
      form.reference ? `Reference: ${form.reference}` : null,
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${8889484701}?text=${encodeURIComponent(msg)}`, "_blank");
  };

  return (
    <section id="book" className="section-pad">
      <div className="shell px-6 md:px-10">
        <div className="card-surface grid overflow-hidden rounded-4xl md:grid-cols-2">
          {/* left panel */}
          <div className="relative flex flex-col justify-between bg-secondary p-10 md:p-12">
            <div>
              <div className="eyebrow mb-4">Book a project</div>
              <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
                Let's make your content{" "}
                <span className="font-accent text-primary">perform</span>.
              </h2>
              <p className="mt-5 max-w-sm text-muted-foreground">
                Tell me about your project and I'll get back within 24 hours. Prefer talking?
                Grab a slot on the calendar instead.
              </p>
            </div>

            <div className="mt-10 flex items-end gap-5">
              <div className="w-20 shrink-0">
                <Mascot variant="blue" className="h-auto w-full" />
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`https://wa.me/${8889484701}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-transform duration-200 hover:scale-[1.03]"
                >
                  <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
                </a>
                <a
                  href="https://calendar.app.google/chDrxuXBGvGRXqdb7"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold transition-colors hover:bg-accent/40"
                >
                  <CalendarDays className="h-4 w-4 text-primary" /> Book a call
                </a>
              </div>
            </div>
          </div>

          {/* form */}
          <form onSubmit={submit} className="grid gap-4 p-10 md:p-12">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Name</span>
                <input required value={form.name} onChange={set("name")} placeholder="Your name" className={INPUT_CLS} />
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Email</span>
                <input required type="email" value={form.email} onChange={set("email")} placeholder="you@email.com" className={INPUT_CLS} />
              </label>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Project type</span>
                <select value={form.projectType} onChange={set("projectType")} className={INPUT_CLS}>
                  {PROJECT_TYPES.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </label>
              <label className="grid gap-1.5">
                <span className="text-xs font-semibold text-muted-foreground">Budget</span>
                <select value={form.budget} onChange={set("budget")} className={INPUT_CLS}>
                  {BUDGETS.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </label>
            </div>
            <label className="grid gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground">Reference link (optional)</span>
              <input value={form.reference} onChange={set("reference")} placeholder="A video or style you like" className={INPUT_CLS} />
            </label>
            <button
              type="submit"
              className="group mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[0_16px_40px_-12px_oklch(0.621_0.149_244.6/0.5)] transition-all duration-200 hover:scale-[1.02] hover:bg-primary-deep"
            >
              Send project inquiry
              <Send className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            </button>
            <p className="text-center text-xs text-muted-foreground">
              This opens WhatsApp with your details pre-filled.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}