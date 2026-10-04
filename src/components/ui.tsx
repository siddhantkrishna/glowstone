import {
  createElement,
  useEffect,
  useRef,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import { Link } from "react-router-dom";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/utils/cn";

export const EASE = [0.16, 1, 0.3, 1] as const;

/* ==========================================================
   BUTTON — text + arrow; fill slides, arrow travels, text nudges
   ========================================================== */
type ButtonProps = {
  to?: string;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  children: ReactNode;
  variant?: "dark" | "light" | "outline" | "outline-light";
  arrow?: "→" | "↓" | "↗";
  size?: "md" | "lg";
  className?: string;
  disabled?: boolean;
};

export function Button({
  to,
  href,
  onClick,
  type = "button",
  children,
  variant = "dark",
  arrow = "→",
  size = "md",
  className,
  disabled,
}: ButtonProps) {
  const base = cn(
    "group relative inline-flex items-center justify-between gap-6 overflow-hidden font-mono uppercase tracking-[0.08em] select-none",
    size === "lg" ? "h-16 px-7 text-[13px]" : "h-12 px-5 text-[11.5px]",
    variant === "dark" && "bg-black text-white",
    variant === "light" && "bg-white text-black",
    variant === "outline" && "border border-black/80 text-black",
    variant === "outline-light" && "border border-white/40 text-white",
    disabled && "opacity-50 pointer-events-none",
    className
  );
  const fill = cn(
    "absolute inset-0 translate-y-[101%] transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-focus-visible:translate-y-0",
    variant === "dark" && "bg-amber",
    variant === "light" && "bg-amber",
    variant === "outline" && "bg-black",
    variant === "outline-light" && "bg-white"
  );
  const text = cn(
    "relative transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-x-0.5",
    variant === "dark" && "group-hover:text-black",
    variant === "outline" && "group-hover:text-white",
    variant === "outline-light" && "group-hover:text-black"
  );
  const arrowCls = cn(
    "arrow relative transition-colors duration-500",
    arrow === "→" && "arrow-x",
    arrow === "↓" && "arrow-d",
    arrow === "↗" && "arrow-ne",
    variant === "dark" && "group-hover:text-black",
    variant === "outline" && "group-hover:text-white",
    variant === "outline-light" && "group-hover:text-black"
  );
  const inner = (
    <>
      <span className={fill} aria-hidden />
      <span className={text}>{children}</span>
      <span className={arrowCls} aria-hidden>
        {arrow}
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={base}>
        {inner}
      </Link>
    );
  if (href)
    return (
      <a href={href} className={base}>
        {inner}
      </a>
    );
  return (
    <button type={type} onClick={onClick} className={base} disabled={disabled}>
      {inner}
    </button>
  );
}

/* Inline text link with animated underline and arrow */
export function ArrowLink({
  to,
  href,
  children,
  className,
  arrow = "→",
}: {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  arrow?: "→" | "↓" | "↗";
}) {
  const cls = cn("group inline-flex items-baseline gap-2", className);
  const a = cn("arrow", arrow === "→" ? "arrow-x" : arrow === "↓" ? "arrow-d" : "arrow-ne");
  const content = (
    <>
      <span className="u-link">{children}</span>
      <span className={a} aria-hidden>
        {arrow}
      </span>
    </>
  );
  if (to)
    return (
      <Link to={to} className={cls}>
        {content}
      </Link>
    );
  return (
    <a href={href} className={cls} {...(href?.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {})}>
      {content}
    </a>
  );
}

/* ==========================================================
   SECTION LABEL — (index) label ———— annotation
   ========================================================== */
export function SectionLabel({
  index,
  label,
  note,
  inverted,
  className,
}: {
  index?: string;
  label: string;
  note?: string;
  inverted?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("wrap", className)}>
      <div className={inverted ? "rule-inv" : "rule"} />
      <div className={cn("g pt-3", inverted ? "text-white/60" : "text-black/55")}>
        <span className="t-label col-span-1">{index ? `(${index})` : "—"}</span>
        <span className={cn("t-label col-span-3 md:col-span-3", inverted ? "text-white" : "text-black")}>{label}</span>
        {note && <span className="t-label hidden md:block md:col-span-4 lg:col-start-9 text-right">{note}</span>}
      </div>
    </div>
  );
}

/* ==========================================================
   MASKED LINE REVEAL — each line rises from behind a mask
   ========================================================== */
export function MaskLines({
  lines,
  as = "h2",
  className,
  lineClassName,
  delay = 0,
  stagger = 0.08,
  amount = "-12%",
}: {
  lines: ReactNode[];
  as?: ElementType;
  className?: string;
  lineClassName?: string;
  delay?: number;
  stagger?: number;
  amount?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: `0px 0px ${amount} 0px` as `${number}px` });
  return createElement(
    as,
    { ref, className },
    lines.map((line, i) => (
      <span key={i} className={cn("block overflow-hidden pb-[0.08em] -mb-[0.08em]", lineClassName)}>
        <motion.span
          className="block will-change-transform"
          initial={reduce ? false : { y: "110%" }}
          animate={reduce || inView ? { y: "0%" } : { y: "110%" }}
          transition={{ duration: 1.15, ease: EASE, delay: delay + i * stagger }}
        >
          {line}
        </motion.span>
      </span>
    ))
  );
}

/* Fade-up reveal for supporting content */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "li" | "p" | "span" | "article";
}) {
  const reduce = useReducedMotion();
  const M = motion[as];
  return (
    <M
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1, ease: EASE, delay }}
    >
      {children}
    </M>
  );
}

/* ==========================================================
   IMAGE REVEAL — clip-path opening + gentle parallax
   ========================================================== */
export function ImageReveal({
  src,
  alt,
  className,
  parallax = true,
  priority = false,
  cursor,
  grain = true,
  intensity = 7,
}: {
  src: string;
  alt: string;
  className?: string;
  parallax?: boolean;
  priority?: boolean;
  cursor?: string;
  grain?: boolean;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -8% 0px" });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensity}%`, `${intensity}%`]);
  const usePara = parallax && !reduce;
  return (
    <motion.div
      ref={ref}
      data-cursor={cursor}
      className={cn("img-zoom relative overflow-hidden bg-paper", grain && "grain", className)}
      initial={reduce ? false : { clipPath: "inset(10% 5% 10% 5%)" }}
      animate={reduce || inView ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
      transition={{ duration: 1.5, ease: EASE }}
    >
      <motion.div
        className="absolute inset-0"
        style={usePara ? { y, scale: 1 + intensity / 50 } : undefined}
      >
        <img
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          {...(priority ? { fetchPriority: "high" as const } : {})}
          className="h-full w-full object-cover"
        />
      </motion.div>
    </motion.div>
  );
}

/* ==========================================================
   SCROLL WORDS — reading-progress text illumination
   ========================================================== */
export function ScrollWords({ text, className, dim = 0.16 }: { text: string; className?: string; dim?: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.5"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} reduce={!!reduce} dim={dim}>
          {w}
        </Word>
      ))}
    </p>
  );
}
function Word({
  children,
  progress,
  range,
  reduce,
  dim,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  reduce: boolean;
  dim: number;
}) {
  const opacity = useTransform(progress, range, [dim, 1]);
  return (
    <motion.span style={reduce ? undefined : { opacity }} className="inline">
      {children}{" "}
    </motion.span>
  );
}

/* ==========================================================
   MARQUEE
   ========================================================== */
export function Marquee({
  children,
  speed = 40,
  className,
  reverse,
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
  reverse?: boolean;
}) {
  return (
    <div className={cn("marquee overflow-hidden", className)} aria-hidden>
      <div
        className="marquee-track flex w-max"
        style={{ ["--marquee-speed" as string]: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}
      >
        <div className="flex shrink-0">{children}</div>
        <div className="flex shrink-0">{children}</div>
      </div>
    </div>
  );
}

/* ==========================================================
   COUNTER — only for numbers that are true
   ========================================================== */
export function Counter({ value, pad = 2, className }: { value: number; pad?: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? value : 0);
  useEffect(() => {
    if (!inView || reduce) return;
    const c = animate(0, value, { duration: 1.6, ease: EASE, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, value, reduce]);
  return (
    <span ref={ref} className={cn("t-num", className)}>
      {String(n).padStart(pad, "0")}
    </span>
  );
}

/* Glowstone mark — a simple amber point used sparingly */
export function AmberPoint({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block h-[0.32em] w-[0.32em] rounded-full bg-amber align-middle", className)} />;
}
