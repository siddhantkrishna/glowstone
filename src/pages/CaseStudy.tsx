import { useMemo, type ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import { PROJECTS } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn } from "@/utils/cn";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui";
import NotFound from "./NotFound";

function Chapter({ n, title, children, lead }: { n: string; title: string; children: ReactNode; lead?: boolean }) {
  return (
    <section className="wrap g gap-y-6 py-20 md:py-32" aria-labelledby={`ch-${n}`}>
      <div className="col-span-4 md:col-span-2 lg:col-span-3">
        <div className="md:sticky md:top-28 border-t border-black pt-3 flex md:flex-col justify-between gap-2">
          <span className="t-label t-num text-amber">{n}</span>
          <h2 id={`ch-${n}`} className="t-label">
            {title}
          </h2>
        </div>
      </div>
      <div className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-5">
        <Reveal>
          <div className={cn(lead ? "t-h2" : "t-lead text-black/80", "max-w-[30ch] md:max-w-none")}>{children}</div>
        </Reveal>
      </div>
    </section>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  const p = PROJECTS[idx];
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  const jsonLd = useMemo(
    () =>
      p
        ? {
            "@type": "CreativeWork",
            name: p.title,
            creator: { "@type": "Organization", name: "Glowstone" },
            dateCreated: p.published,
            about: p.disciplines.join(", "),
            description: p.description,
          }
        : undefined,
    [p]
  );

  useSeo({
    title: p ? `${p.title} — Case Study — Glowstone` : "Project not found — Glowstone",
    description: p ? p.description : "This project could not be found.",
    path: `/work/${slug ?? ""}`,
    image: p?.hero,
    type: "article",
    jsonLd,
  });

  if (!p) return <NotFound />;

  const meta = [
    { k: "Client", v: p.client },
    { k: "Year", v: p.year },
    { k: "Disciplines", v: p.disciplines.join(" / ") },
    { k: "Sector", v: p.sector },
  ];

  return (
    <article>
      {/* Title */}
      <header className="wrap pt-32 md:pt-44 pb-12 md:pb-16">
        <div className="flex justify-between t-label text-black/50 mb-10 md:mb-16">
          <Link to="/work" className="group inline-flex gap-2">
            <span className="arrow group-hover:-translate-x-1">←</span>
            <span className="u-link">All work</span>
          </Link>
          <span>
            Project / {p.num} — {String(PROJECTS.length).padStart(2, "0")}
          </span>
        </div>
        <MaskLines as="h1" lines={[p.title]} className="t-mega uppercase" delay={0.1} />
        <div className="g mt-12 md:mt-16 gap-y-8">
          <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 t-lead" delay={0.25}>
            {p.description}
          </Reveal>
          <dl className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 grid grid-cols-2 gap-x-[var(--gutter)] gap-y-6">
            {meta.map((m, i) => (
              <Reveal key={m.k} delay={0.3 + i * 0.05} className="border-t border-line pt-3">
                <dt className="t-label text-black/45">{m.k}</dt>
                <dd className="t-small mt-2">{m.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </header>

      {/* Hero visual — full bleed */}
      <ImageReveal src={p.hero} alt={`${p.title} — hero visual`} className="h-[70svh] md:h-[96svh] w-full" priority intensity={9} cursor="Explore" />
      <p className="wrap t-label text-black/50 mt-3 flex justify-between">
        <span>Fig. 01 — {p.title}</span>
        <span>{p.sector}</span>
      </p>

      <Chapter n="01" title="The challenge" lead>
        {p.challenge}
      </Chapter>

      {/* Grid-breaking image: bleeds off the left edge */}
      <div className="g pr-[var(--margin)]">
        <div className="col-span-4 md:col-span-7 lg:col-span-9">
          <ImageReveal src={p.gallery[0]} alt={`${p.title} — gallery image 1`} className="aspect-[16/10] w-full" cursor="Explore" />
        </div>
        <p className="col-span-4 md:col-span-1 lg:col-span-2 lg:col-start-11 t-label text-black/50 mt-3 md:mt-0 self-end pl-[var(--margin)] md:pl-0">
          Fig. 02 — Context
        </p>
      </div>

      <Chapter n="02" title="The approach">{p.approach}</Chapter>

      {/* Process */}
      <section className="wrap pb-12" aria-label="Process">
        <div className="rule" />
        <p className="t-label text-black/50 pt-3 mb-8">Process — Documentation</p>
        <div className="g gap-y-12">
          {p.process.map((pr, i) => (
            <figure
              key={i}
              className={cn(
                "col-span-4",
                i === 0 ? "md:col-span-5 lg:col-span-6" : "md:col-span-3 lg:col-span-4 lg:col-start-9 md:pt-24"
              )}
            >
              <ImageReveal src={pr.image} alt={pr.caption} className={i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"} />
              <figcaption className="t-label text-black/55 mt-3 flex gap-3">
                <span className="t-num text-black">P.{String(i + 1).padStart(2, "0")}</span>
                <span className="normal-case tracking-normal font-sans text-[13px]">{pr.caption}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <Chapter n="03" title="The system">{p.system}</Chapter>

      {/* System specimen */}
      <section className="bg-black text-white" aria-label="System specimen">
        <div className="wrap g py-20 md:py-28 gap-y-12">
          <div className="col-span-4 md:col-span-4 lg:col-span-5">
            <p className="t-label text-white/50">Specimen — Typography</p>
            <p className="text-[clamp(8rem,22vw,20rem)] font-medium leading-[0.8] tracking-[-0.06em] mt-6">Aa</p>
            <p className="t-serif italic text-[clamp(2rem,4vw,3.5rem)] text-white/70 leading-none mt-4">Aa — editorial</p>
          </div>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 flex flex-col justify-between gap-12">
            <div>
              <p className="t-label text-white/50 mb-4">Grid — 12 columns</p>
              <div className="grid grid-cols-12 gap-1 h-24" aria-hidden>
                {Array.from({ length: 12 }).map((_, i) => (
                  <span key={i} className={cn("bg-white/10", i === 4 && "bg-amber/80")} />
                ))}
              </div>
            </div>
            <div>
              <p className="t-label text-white/50 mb-4">Palette — Restraint</p>
              <div className="grid grid-cols-4 gap-1" aria-hidden>
                <span className="aspect-square bg-white" />
                <span className="aspect-square bg-warm-white" />
                <span className="aspect-square bg-graphite border border-white/10" />
                <span className="aspect-square bg-amber" />
              </div>
            </div>
            <p className="t-small text-white/60">{p.disciplines.join(" · ")}</p>
          </div>
        </div>
      </section>

      <Chapter n="04" title="The experience">{p.experience}</Chapter>

      {/* Gallery */}
      <section className="pb-12" aria-label="Gallery">
        <ImageReveal src={p.gallery[1] ?? p.hero} alt={`${p.title} — gallery image 2`} className="h-[60svh] md:h-[90svh] w-full" intensity={10} cursor="Explore" />
        {p.gallery[2] && (
          <div className="wrap g mt-[var(--gutter)] gap-y-6">
            <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-2 flex flex-col justify-end">
              <p className="t-serif italic text-[clamp(1.8rem,3vw,3rem)] leading-[1.05]">“{p.description}”</p>
            </div>
            <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
              <ImageReveal src={p.gallery[2]} alt={`${p.title} — gallery image 3`} className="aspect-[4/5]" cursor="Explore" />
            </div>
          </div>
        )}
      </section>

      <Chapter n="05" title="The result" lead>
        {p.result}
      </Chapter>

      {/* Credits */}
      <section className="wrap g pb-24 md:pb-32 gap-y-6" aria-label="Credits">
        <p className="col-span-4 md:col-span-2 lg:col-span-3 t-label">Credits</p>
        <dl className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-5">
          {p.credits.map((c) => (
            <div key={c.role} className="flex justify-between border-t border-line py-3 t-small">
              <dt className="text-black/55">{c.role}</dt>
              <dd>{c.name}</dd>
            </div>
          ))}
          <div className="flex justify-between border-t border-b border-line py-3 t-small">
            <dt className="text-black/55">Published</dt>
            <dd className="t-num">{p.published}</dd>
          </div>
        </dl>
      </section>

      {/* Next project */}
      <Link to={`/work/${next.slug}`} className="group block border-t border-line" data-cursor="Next">
        <div className="wrap g py-14 md:py-24 gap-y-8 items-end">
          <div className="col-span-4 md:col-span-5 lg:col-span-8">
            <p className="t-label text-black/50 mb-6">Next project — {next.num}</p>
            <p className="t-mega uppercase transition-transform duration-700 group-hover:translate-x-3">{next.title}</p>
          </div>
          <div className="col-span-4 md:col-span-3 lg:col-span-4">
            <div className="img-zoom grain relative aspect-[4/3] overflow-hidden bg-paper">
              <img src={next.hero} alt={`${next.title} preview`} loading="lazy" className="h-full w-full object-cover" />
            </div>
            <p className="t-label mt-3 flex justify-between">
              <span>{next.disciplines.join(" / ")}</span>
              <span className="arrow arrow-x">→</span>
            </p>
          </div>
        </div>
      </Link>
    </article>
  );
}
