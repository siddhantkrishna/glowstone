import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { Project } from "@/data/content";
import { cn } from "@/utils/cn";
import { EASE, ImageReveal } from "./ui";

type Variant = "full" | "right" | "bleed" | "left";

function Meta({ p, inverted }: { p: Project; inverted?: boolean }) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-4 gap-y-3 t-label", inverted ? "text-white/60" : "text-black/50")}>
      <div>
        <dt className="sr-only">Client</dt>
        <dd className={inverted ? "text-white" : "text-black"}>{p.client}</dd>
      </div>
      <div className="text-right md:text-left">
        <dt className="sr-only">Year</dt>
        <dd className="t-num">{p.year}</dd>
      </div>
      <div className="col-span-2">
        <dt className="sr-only">Sector</dt>
        <dd>{p.sector}</dd>
      </div>
      <div className="col-span-2">
        <dt className="sr-only">Services</dt>
        <dd>{p.disciplines.join(" / ")}</dd>
      </div>
    </dl>
  );
}

function Title({ p, className }: { p: Project; className?: string }) {
  return (
    <h3 className={cn("t-h1 uppercase transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5", className)}>
      {p.title}
    </h3>
  );
}

function ViewCue({ inverted }: { inverted?: boolean }) {
  return (
    <span className={cn("t-label inline-flex items-center gap-2", inverted ? "text-white" : "text-black")}>
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-500 group-hover:-translate-y-full">Case study</span>
        <span className="absolute inset-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-amber">
          View project
        </span>
      </span>
      <span className="arrow arrow-x">→</span>
    </span>
  );
}

function Num({ p, inverted }: { p: Project; inverted?: boolean }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden">
      <motion.span
        className={cn("block t-label", inverted ? "text-white/60" : "text-black/50")}
        initial={reduce ? false : { y: "100%" }}
        whileInView={{ y: "0%" }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: EASE }}
      >
        Project / {p.num}
      </motion.span>
    </span>
  );
}

/** Homepage editorial composition — four distinct layouts. */
export function ProjectFeature({ project: p, variant }: { project: Project; variant: Variant }) {
  const href = `/work/${p.slug}`;
  const alt = `${p.title} — ${p.description}`;

  if (variant === "full")
    return (
      <article className="wrap">
        <Link to={href} className="group block" data-cursor="View" aria-label={`${p.title} case study`}>
          <ImageReveal src={p.hero} alt={alt} className="aspect-[4/5] md:aspect-[16/9] w-full" />
          <div className="g mt-5 md:mt-6 gap-y-6">
            <div className="col-span-4 md:col-span-5 lg:col-span-7">
              <Num p={p} />
              <Title p={p} className="mt-2" />
            </div>
            <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 flex flex-col justify-between gap-6">
              <p className="t-small text-black/70 max-w-sm">{p.description}</p>
              <Meta p={p} />
              <ViewCue />
            </div>
          </div>
        </Link>
      </article>
    );

  if (variant === "right")
    return (
      <article className="wrap">
        <Link to={href} className="group g gap-y-6" data-cursor="View" aria-label={`${p.title} case study`}>
          <div className="col-span-4 md:col-span-3 lg:col-span-3 order-2 md:order-1 flex flex-col justify-end gap-6">
            <Num p={p} />
            <Title p={p} />
            <p className="t-small text-black/70">{p.description}</p>
            <Meta p={p} />
            <ViewCue />
          </div>
          <div className="col-span-4 md:col-span-5 lg:col-span-8 lg:col-start-5 order-1 md:order-2">
            <ImageReveal src={p.hero} alt={alt} className="aspect-[4/3] w-full" />
          </div>
        </Link>
      </article>
    );

  if (variant === "bleed")
    return (
      <article>
        <Link
          to={href}
          className="group relative block overflow-hidden text-white"
          data-cursor="View"
          aria-label={`${p.title} case study`}
        >
          <ImageReveal src={p.hero} alt={alt} className="h-[88svh] min-h-[520px] w-full" intensity={10} />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute inset-0 wrap flex flex-col justify-between py-6 md:py-10">
            <div className="flex justify-between">
              <Num p={p} inverted />
              <span className="t-label text-white/60 t-num">{p.year}</span>
            </div>
            <div className="g gap-y-6 items-end">
              <h3 className="col-span-4 md:col-span-8 lg:col-span-12 t-mega uppercase transition-transform duration-700 group-hover:translate-x-2">
                {p.title}
              </h3>
              <div className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10 flex flex-col gap-5">
                <p className="t-small text-white/80">{p.description}</p>
                <Meta p={p} inverted />
                <ViewCue inverted />
              </div>
            </div>
          </div>
        </Link>
      </article>
    );

  return (
    <article className="wrap">
      <Link to={href} className="group g gap-y-6 items-end" data-cursor="View" aria-label={`${p.title} case study`}>
        <div className="col-span-4 md:col-span-5 lg:col-span-6">
          <ImageReveal src={p.hero} alt={alt} className="aspect-[4/5] w-full" />
        </div>
        <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-8 flex flex-col gap-6 pb-2">
          <Num p={p} />
          <Title p={p} />
          <p className="t-small text-black/70">{p.description}</p>
          <Meta p={p} />
          <ViewCue />
        </div>
      </Link>
    </article>
  );
}

/** Archive tile — size controls editorial rhythm on the Work page. */
export function ProjectTile({ project: p, size }: { project: Project; size: "lg" | "md" | "sm" }) {
  return (
    <Link to={`/work/${p.slug}`} className="group block" data-cursor="View" aria-label={`${p.title} case study`}>
      <div
        className={cn(
          "img-zoom grain relative overflow-hidden bg-paper",
          size === "lg" ? "aspect-[16/10]" : size === "md" ? "aspect-[4/5]" : "aspect-square"
        )}
      >
        <img src={p.hero} alt={`${p.title} — ${p.description}`} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        <span className="absolute left-3 top-3 t-label bg-warm-white/90 px-2 py-1 text-black">{p.num}</span>
        {p.selfInitiated && (
          <span className="absolute right-3 top-3 t-label bg-black/80 px-2 py-1 text-white">Studio</span>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="t-h3 uppercase transition-transform duration-500 group-hover:translate-x-1">{p.title}</h3>
          <p className="t-label text-black/50 mt-2">{p.disciplines.join(" / ")}</p>
        </div>
        <div className="text-right shrink-0">
          <p className="t-label t-num text-black/50">{p.year}</p>
          <p className="t-label mt-2">
            <span className="arrow arrow-x">→</span>
          </p>
        </div>
      </div>
    </Link>
  );
}
