import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { MANIFESTO } from "@/data/content";
import { useMediaQuery } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import { EASE, MaskLines, Reveal } from "./ui";

/* ==========================================================
   PINNED LINES — each line activates independently on scroll
   ========================================================== */
export function PinnedLines({ lines, finale }: { lines: string[]; finale: ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const total = lines.length + 1;
  return (
    <section ref={ref} className="relative" style={{ height: reduce ? "auto" : `${total * 60 + 60}svh` }} aria-label="What we build">
      <div className={cn("wrap flex flex-col justify-center", reduce ? "py-32" : "sticky top-0 h-svh")}>
        <div className="flex justify-between t-label text-black/45 mb-10">
          <span>Interlude</span>
          <span>One studio / three scales</span>
        </div>
        <div className="space-y-1 md:space-y-2">
          {lines.map((l, i) => (
            <PinnedLine key={i} progress={scrollYProgress} index={i} total={total} reduce={!!reduce}>
              {l}
            </PinnedLine>
          ))}
          <PinnedLine progress={scrollYProgress} index={lines.length} total={total} reduce={!!reduce} finale>
            {finale}
          </PinnedLine>
        </div>
      </div>
    </section>
  );
}

function PinnedLine({
  children,
  progress,
  index,
  total,
  reduce,
  finale,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  index: number;
  total: number;
  reduce: boolean;
  finale?: boolean;
}) {
  const start = (index / total) * 0.85;
  const end = start + 0.85 / total;
  const opacity = useTransform(progress, [start, end], [0.1, 1]);
  const x = useTransform(progress, [start, end], finale ? ["4%", "0%"] : ["-2%", "0%"]);
  const color = useTransform(progress, [end, end + 0.12], finale ? ["#0b0b0a", "#0b0b0a"] : ["#0b0b0a", "#8a857c"]);
  return (
    <motion.p
      style={reduce ? undefined : { opacity, x, color: finale ? undefined : color }}
      className={cn(
        "uppercase will-change-transform",
        finale ? "t-display pt-6 md:pt-10" : "t-h1"
      )}
    >
      {children}
    </motion.p>
  );
}

/* ==========================================================
   MANIFESTO — horizontal journey on desktop, stacked on mobile
   ========================================================== */
export function ManifestoRail() {
  const ref = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const desktop = useMediaQuery("(min-width: 1024px)");
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -dist]);
  const bar = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);
  const horizontal = desktop && !reduce;

  useLayoutEffect(() => {
    const measure = () => {
      if (track.current) setDist(track.current.scrollWidth - window.innerWidth);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [horizontal]);

  const intro = (
    <div className="shrink-0 w-full lg:w-[62vw] flex flex-col justify-between pr-[var(--gutter)] py-4">
      <p className="t-label text-white/50">(Manifesto) — Six convictions</p>
      <h2 className="t-h1 uppercase mt-10 lg:mt-0">
        We believe
        <br />
        the best digital work
        <br />
        feels obvious
        <br />
        <span className="t-serif normal-case italic text-amber tracking-[-0.02em]">after it exists.</span>
      </h2>
      <p className="t-label text-white/40 hidden lg:block">Scroll →</p>
    </div>
  );

  const panels = MANIFESTO.map((m, i) => (
    <div
      key={m.a}
      className="shrink-0 w-full lg:w-[44vw] border-t lg:border-t-0 lg:border-l border-white/15 py-10 lg:py-4 lg:pl-8 lg:pr-10 flex flex-col justify-between min-h-[46svh] lg:min-h-0"
    >
      <div className="flex justify-between t-label text-white/45">
        <span className="t-num">{String(i + 1).padStart(2, "0")} / 06</span>
        <span>Conviction</span>
      </div>
      <p className="mt-12 lg:mt-0">
        <span className="block t-display uppercase">{m.a}</span>
        <span className="block t-serif italic text-[clamp(2rem,4.6vw,4.75rem)] leading-none text-white/60 mt-3">{m.b}</span>
      </p>
    </div>
  ));

  if (!horizontal)
    return (
      <section ref={ref} className="bg-black text-white wrap py-24 md:py-32" aria-label="Manifesto">
        {intro}
        <div className="mt-16">{panels}</div>
      </section>
    );

  return (
    <section ref={ref} className="relative bg-black text-white" style={{ height: "420svh" }} aria-label="Manifesto">
      <div className="sticky top-0 h-svh overflow-hidden flex flex-col">
        <div className="flex-1 flex items-stretch pt-28 pb-10">
          <motion.div ref={track} style={{ x }} className="flex h-full pl-[var(--margin)] pr-[var(--margin)] will-change-transform">
            {intro}
            {panels}
          </motion.div>
        </div>
        <div className="wrap pb-8">
          <div className="h-px bg-white/15 relative">
            <motion.div className="absolute inset-y-0 left-0 bg-amber" style={{ width: bar }} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   AI DUALITY — statements activate progressively
   ========================================================== */
const DUALITY = [
  ["AI accelerates.", "People decide."],
  ["AI generates.", "People direct."],
  ["AI explores.", "People curate."],
  ["AI automates.", "People design the system."],
];

export function AIDuality() {
  return (
    <ol className="wrap">
      {DUALITY.map(([a, b], i) => (
        <DualityRow key={a} a={a} b={b} i={i} />
      ))}
    </ol>
  );
}

function DualityRow({ a, b, i }: { a: string; b: string; i: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "start 0.45"] });
  const op = useTransform(scrollYProgress, [0, 1], [0.12, 1]);
  const opB = useTransform(scrollYProgress, [0.35, 1], [0, 1]);
  const xB = useTransform(scrollYProgress, [0.35, 1], [24, 0]);
  return (
    <li ref={ref} className="g items-baseline border-t border-line py-6 md:py-9">
      <span className="col-span-1 t-label t-num text-black/40">{String(i + 1).padStart(2, "0")}</span>
      <motion.span style={reduce ? undefined : { opacity: op }} className="col-span-3 md:col-span-3 lg:col-span-5 t-h2 text-black/45">
        {a}
      </motion.span>
      <motion.span
        style={reduce ? undefined : { opacity: opB, x: xB }}
        className="col-span-3 col-start-2 md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7 t-h2 mt-2 md:mt-0"
      >
        {b}
      </motion.span>
    </li>
  );
}

/* ==========================================================
   EQUATION — HUMAN + AI = BETTER WORK
   ========================================================== */
export function Equation() {
  const reduce = useReducedMotion();
  const parts = [
    { t: "Human", c: "" },
    { t: "+", c: "text-black/30" },
    { t: "AI", c: "text-black/45" },
    { t: "=", c: "text-black/30" },
    { t: "Better work", c: "" },
  ];
  return (
    <div className="wrap" aria-label="Human plus AI equals better work">
      <div className="flex flex-wrap items-baseline gap-x-[0.25em] t-display uppercase" aria-hidden>
        {parts.map((p, i) => (
          <span key={i} className="overflow-hidden inline-block pb-[0.06em]">
            <motion.span
              className={cn("inline-block", p.c)}
              initial={reduce ? false : { y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 1, ease: EASE, delay: i * 0.12 }}
            >
              {p.t}
              {i === 4 && <span className="text-amber">.</span>}
            </motion.span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ==========================================================
   STATEMENT — full-viewport black typographic moment
   ========================================================== */
export function Statement({ lines, after, label }: { lines: ReactNode[]; after: ReactNode; label: string }) {
  return (
    <section className="relative bg-black text-white min-h-svh flex flex-col justify-between wrap py-10 md:py-14" aria-label={label}>
      <div className="flex justify-between t-label text-white/45">
        <span>{label}</span>
        <span>Glowstone / Principle</span>
      </div>
      <div className="g items-end gap-y-12 py-24">
        <MaskLines as="h2" lines={lines} className="col-span-4 md:col-span-8 lg:col-span-11 t-display uppercase" stagger={0.1} />
        <Reveal className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-9 flex items-center gap-4" delay={0.5}>
          <span className="h-px w-12 bg-amber" aria-hidden />
          <p className="t-serif italic text-[clamp(1.6rem,2.6vw,2.5rem)] leading-none">{after}</p>
        </Reveal>
      </div>
      <div className="flex justify-between t-label text-white/30">
        <span>Clarity</span>
        <span>Distinction</span>
        <span>Purpose</span>
      </div>
    </section>
  );
}
