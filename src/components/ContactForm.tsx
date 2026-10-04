import { useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { STUDIO } from "@/data/content";
import { cn } from "@/utils/cn";
import { Button, EASE } from "./ui";

const TYPES = ["Brand", "Website", "Web App", "App", "Game", "Social", "Creative", "Something else"];
const BUDGETS = ["Under ₹2L", "₹2L – ₹5L", "₹5L – ₹15L", "₹15L+", "Not sure yet"];
const TIMELINES = ["As soon as possible", "1 – 3 months", "3 – 6 months", "Flexible"];

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "group relative h-12 md:h-14 px-5 md:px-6 border text-[15px] md:text-[17px] tracking-[-0.01em] transition-colors duration-300 overflow-hidden",
        active ? "border-amber bg-amber text-black" : "border-white/25 text-white hover:border-white"
      )}
    >
      <span className="relative flex items-center gap-2">
        {active && <span aria-hidden>✓</span>}
        {children}
      </span>
    </button>
  );
}

function Block({ n, title, children, id }: { n: string; title: string; children: ReactNode; id?: string }) {
  return (
    <fieldset className="g gap-y-6 border-t border-white/15 pt-6 pb-14 md:pb-20" id={id}>
      <legend className="sr-only">{title}</legend>
      <div className="col-span-4 md:col-span-2 lg:col-span-3 flex md:flex-col gap-3 justify-between" aria-hidden>
        <span className="t-label t-num text-amber">{n}</span>
        <span className="t-label text-white/60">{title}</span>
      </div>
      <div className="col-span-4 md:col-span-6 lg:col-span-9">{children}</div>
    </fieldset>
  );
}

export default function ContactForm({ initialType }: { initialType?: string }) {
  const [types, setTypes] = useState<string[]>(initialType && TYPES.includes(initialType) ? [initialType] : []);
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [values, setValues] = useState({ name: "", company: "", email: "", phone: "", description: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.value }));
  const toggle = (t: string) => setTypes((ts) => (ts.includes(t) ? ts.filter((x) => x !== t) : [...ts, t]));

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!values.name.trim()) errs.name = "Please tell us your name.";
    if (!/^\S+@\S+\.\S+$/.test(values.email)) errs.email = "Please enter a valid email address.";
    if (values.description.trim().length < 10) errs.description = "A sentence or two is enough.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    const body = [
      `Name: ${values.name}`,
      `Company: ${values.company || "—"}`,
      `Email: ${values.email}`,
      `Phone: ${values.phone || "—"}`,
      `Project type: ${types.join(", ") || "—"}`,
      `Budget: ${budget || "—"}`,
      `Timeline: ${timeline || "—"}`,
      "",
      values.description,
    ].join("\n");
    const subject = `New project — ${values.company || values.name}`;
    window.location.href = `mailto:${STUDIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const field = (k: keyof typeof values, label: string, opts: { type?: string; required?: boolean; auto?: string } = {}) => (
    <div>
      <label htmlFor={`f-${k}`} className="t-label text-white/50 flex justify-between">
        <span>{label}</span>
        <span>{opts.required ? "Required" : "Optional"}</span>
      </label>
      <input
        id={`f-${k}`}
        type={opts.type ?? "text"}
        autoComplete={opts.auto}
        value={values[k]}
        onChange={set(k)}
        required={opts.required}
        aria-invalid={!!errors[k]}
        aria-describedby={errors[k] ? `e-${k}` : undefined}
        className="field"
      />
      {errors[k] && (
        <p id={`e-${k}`} className="t-label text-coral mt-2" role="alert">
          {errors[k]}
        </p>
      )}
    </div>
  );

  return (
    <AnimatePresence mode="wait">
      {sent ? (
        <motion.div
          key="sent"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="border-t border-white/15 pt-10 pb-24"
          role="status"
        >
          <p className="t-label text-amber">Received — Thank you</p>
          <p className="t-display uppercase mt-8">
            Talk soon<span className="text-amber">.</span>
          </p>
          <p className="t-lead text-white/70 mt-8 max-w-xl">
            Your email app should have opened with the brief ready to send. If it didn't, write to us directly at{" "}
            <a className="u-link-static text-white" href={`mailto:${STUDIO.email}`}>
              {STUDIO.email}
            </a>
            .
          </p>
          <button className="t-label u-link mt-10 text-white/70" onClick={() => setSent(false)}>
            ← Edit the brief
          </button>
        </motion.div>
      ) : (
        <motion.form key="form" onSubmit={submit} noValidate exit={{ opacity: 0 }} aria-label="Project enquiry">
          <Block n="01" title="What are you building?">
            <p className="t-h2 mb-8">What are you building?</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Project type — select all that apply">
              {TYPES.map((t) => (
                <Chip key={t} active={types.includes(t)} onClick={() => toggle(t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Block>

          <Block n="02" title="About you">
            <div className="grid md:grid-cols-2 gap-x-[var(--gutter)] gap-y-10">
              {field("name", "Name", { required: true, auto: "name" })}
              {field("company", "Company", { auto: "organization" })}
              {field("email", "Email", { type: "email", required: true, auto: "email" })}
              {field("phone", "Phone", { type: "tel", auto: "tel" })}
            </div>
          </Block>

          <Block n="03" title="Scope">
            <p className="t-label text-white/50 mb-4">Budget</p>
            <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Budget">
              {BUDGETS.map((b) => (
                <Chip key={b} active={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                  {b}
                </Chip>
              ))}
            </div>
            <p className="t-label text-white/50 mb-4">Timeline</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label="Timeline">
              {TIMELINES.map((t) => (
                <Chip key={t} active={timeline === t} onClick={() => setTimeline(timeline === t ? "" : t)}>
                  {t}
                </Chip>
              ))}
            </div>
          </Block>

          <Block n="04" title="The project">
            <label htmlFor="f-description" className="t-label text-white/50 flex justify-between">
              <span>Project description</span>
              <span>Required</span>
            </label>
            <textarea
              id="f-description"
              rows={5}
              value={values.description}
              onChange={set("description")}
              aria-invalid={!!errors.description}
              aria-describedby={errors.description ? "e-description" : undefined}
              placeholder="What is it, who is it for, and what does success look like?"
              className="field resize-y min-h-[160px]"
            />
            {errors.description && (
              <p id="e-description" className="t-label text-coral mt-2" role="alert">
                {errors.description}
              </p>
            )}
            <div className="mt-12 flex flex-col md:flex-row md:items-center gap-6 md:justify-between">
              <Button type="submit" variant="light" size="lg" className="md:min-w-[340px]">
                Start the conversation
              </Button>
              <p className="t-label text-white/45 max-w-xs">
                We read every brief personally. Nothing is shared or added to a mailing list.
              </p>
            </div>
          </Block>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
