import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ARTICLES, CAPABILITIES, CLIENT_JOURNEY, FEATURED, IMG, JOURNAL_CATEGORIES, TESTIMONIALS, VIDEO } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { introDelay } from "@/lib/intro";
import { useMediaQuery, useMumbaiTime } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import {
  AmberPoint,
  Button,
  Counter,
  EASE,
  ImageReveal,
  Marquee,
  MaskLines,
  Reveal,
  ScrollWords,
  SectionLabel,
} from "@/components/ui";
import ServicesIndex from "@/components/ServicesIndex";
import ProcessTimeline from "@/components/ProcessTimeline";
import VideoSection from "@/components/VideoSection";
import { ProjectFeature } from "@/components/ProjectCard";
import { ArticleCard, DragRail, JournalFeature } from "@/components/JournalCard";
import { AIDuality, Equation, ManifestoRail, PinnedLines, Statement } from "@/components/sections";

const TOTAL = "13";

export default function Home() {
  useSeo({
    title: "Glowstone — Creative Technology Studio",
    description:
      "Glowstone is an independent creative technology studio building brands, websites, digital products and experiences with clarity, distinction and purpose.",
    path: "/",
  });

  return (
    <>
      <Hero />
      <Intro />
      <WhatWeDo />
      <PinnedLines
        lines={["Some projects need a brand.", "Some need a website.", "Some need an entire system."]}
        finale={
          <>
            We build all three<span className="text-amber">.</span>
          </>
        }
      />
      <SelectedWork />
      <VideoSection src={VIDEO.shadows.src} poster={VIDEO.shadows.poster} caption="Every detail is a decision">
        <div className="wrap h-full flex flex-col justify-between py-8 md:py-12 text-white">
          <div className="flex justify-between t-label text-white/60">
            <span>Fig. 02 — Light, shadow, structure</span>
            <span>Interlude</span>
          </div>
          <MaskLines as="p" lines={["Every detail", "is a decision."]} className="t-display uppercase max-w-[14ch]" />
        </div>
      </VideoSection>
      <Statement
        label="(05) — Principle"
        lines={["Good design", "makes things", <>easier to understand<span className="text-amber">.</span></>]}
        after="That is where we start."
      />
      <Process />
      <AISection />
      <Capabilities />
      <WhyGlowstone />
      <ManifestoRail />
      <ClientExperience />
      <Testimonials />
      <Numbers />
      <JournalPreview />
    </>
  );
}

/* ---------------------------------------------------------- HERO */
function Hero() {
  const plate = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const lg = useMediaQuery("(min-width: 1024px)");
  const md = useMediaQuery("(min-width: 768px)");
  const time = useMumbaiTime();
  const d = introDelay();
  const { scrollYProgress } = useScroll({ target: plate, offset: ["start end", "end end"] });
  const left = useTransform(scrollYProgress, [0, 1], [lg ? 42 : 0, 0]);
  const side = useTransform(scrollYProgress, [0, 1], [lg ? 3 : 5, 0]);
  const clip = useTransform([left, side], ([l, s]: number[]) => `inset(0% ${s}% 0% ${Math.max(l, s)}%)`);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <section aria-labelledby="hero-title" className="relative">
      <div className="wrap pt-28 md:pt-36 min-h-[100svh] flex flex-col">
        <motion.div
          className="g t-label"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: d }}
        >
          <p className="col-span-2 md:col-span-3">
            Glowstone
            <br />
            <span className="text-black/50">Creative Technology Studio</span>
          </p>
          <p className="hidden md:block md:col-span-2 lg:col-span-3 lg:col-start-6 text-black/50">
            Strategy / Design
            <br />
            Technology / Execution
          </p>
          <p className="col-span-2 md:col-span-3 md:col-start-6 lg:col-span-3 lg:col-start-10 text-right">
            Mumbai — India <AmberPoint className="ml-1 live-dot" />
            <br />
            <span className="text-black/50 t-num">{time} IST</span>
          </p>
        </motion.div>

        <div className="flex-1 flex flex-col justify-end pb-10 md:pb-14 pt-16">
          <MaskLines
            as="h1"
            key={md ? "md" : "sm"}
            lines={
              md
                ? ["We build", "digital experiences", <>that matter<span className="text-amber">.</span></>]
                : ["We build", "digital", "experiences", <>that matter<span className="text-amber">.</span></>]
            }
            className="uppercase font-medium text-[11.2vw] md:text-[7.3vw] leading-[0.86] tracking-[-0.055em]"
            delay={d + 0.1}
            stagger={0.09}
          />
          <span id="hero-title" className="sr-only">
            We build digital experiences that matter.
          </span>

          <motion.div
            className="g gap-y-8 mt-10 md:mt-14 items-end"
            initial={reduce ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: d + 0.5 }}
          >
            <p className="col-span-4 md:col-span-4 lg:col-span-4 t-lead text-black/75">
              Strategy, design and technology for brands, businesses and people building what comes next.
            </p>
            <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8 flex flex-col sm:flex-row gap-3 lg:justify-end">
              <Button to="/contact">Start a project</Button>
              <Button
                variant="outline"
                arrow="↓"
                onClick={() =>
                  document.getElementById("work")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" })
                }
              >
                Explore our work
              </Button>
            </div>
          </motion.div>
        </div>

        <div className="flex justify-between t-label text-black/45 pb-4">
          <span>(01 / {TOTAL})</span>
          <span className="hidden md:inline">Scroll to explore</span>
          <span>Vol. {new Date().getFullYear()}</span>
        </div>
      </div>

      {/* Material plate — opens from the right column to full bleed */}
      <div ref={plate} className="relative">
        <motion.figure
          className="relative h-[70svh] md:h-[92svh] overflow-hidden grain bg-warm-white"
          style={reduce ? undefined : { clipPath: clip }}
        >
          <motion.img
            src={IMG.crystal}
            alt="A raw piece of translucent amber stone resting on a white plaster block in warm daylight — the Glowstone material."
            className="absolute inset-0 h-full w-full object-cover object-[65%_50%]"
            style={reduce ? undefined : { scale: imgScale }}
            fetchPriority="high"
            decoding="async"
          />
          <figcaption className="absolute bottom-4 left-[var(--margin)] lg:left-auto lg:right-[var(--margin)] t-label text-black/60">
            Fig. 01 — Glowstone, raw. Amber on plaster.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- INTRO */
function Intro() {
  return (
    <section className="wrap pt-28 md:pt-48 pb-24 md:pb-40" aria-labelledby="intro-title">
      <div className="g gap-y-10">
        <p className="col-span-4 md:col-span-2 lg:col-span-2 t-label text-black/50">(02) — Position</p>
        <div className="col-span-4 md:col-span-6 lg:col-span-10">
          <MaskLines
            as="h2"
            lines={["Design is not", <>decoration<span className="text-amber">.</span></>]}
            className="t-display uppercase"
          />
          <span id="intro-title" className="sr-only">Design is not decoration.</span>
          <Reveal delay={0.2}>
            <p className="t-serif italic text-[clamp(2rem,5vw,5.25rem)] leading-[1] tracking-[-0.02em] mt-6 md:mt-10 text-black/80">
              It is how something becomes understood.
            </p>
          </Reveal>
        </div>
        <div className="col-span-4 md:col-span-6 md:col-start-3 lg:col-span-8 lg:col-start-5 mt-12 md:mt-24">
          <ScrollWords
            className="t-h2"
            text="Glowstone works across identity, digital products and technology to turn ideas into experiences people can see, use and remember."
          />
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- WHAT WE DO */
function WhatWeDo() {
  return (
    <section id="services" aria-labelledby="wwd-title" className="pb-24 md:pb-36">
      <SectionLabel index="03" label="What we do" note="07 Disciplines — One studio" />
      <div className="wrap g mt-12 md:mt-20 mb-14 md:mb-24 gap-y-8">
        <MaskLines
          as="h2"
          lines={["From first idea", <>to final experience<span className="text-amber">.</span></>]}
          className="col-span-4 md:col-span-8 lg:col-span-10 t-display uppercase"
        />
        <Reveal className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-3 lg:col-start-10 t-small text-black/65">
          <span id="wwd-title" className="sr-only">What we do</span>
          Seven disciplines, one way of working. Select a discipline to see what it includes.
        </Reveal>
      </div>
      <ServicesIndex />
      <Marquee className="mt-20 md:mt-28 border-y border-line py-5" speed={45}>
        {["Strategy", "Design", "Technology", "Execution"].map((w) => (
          <span key={w} className="flex items-center t-h2 uppercase px-6 md:px-10">
            {w}
            <AmberPoint className="ml-12 md:ml-20 h-2 w-2" />
          </span>
        ))}
      </Marquee>
    </section>
  );
}

/* ---------------------------------------------------------- SELECTED WORK */
function SelectedWork() {
  const variants = ["full", "right", "bleed", "left"] as const;
  return (
    <section id="work" aria-labelledby="work-title" className="pt-24 md:pt-32 pb-32 md:pb-48 scroll-mt-20">
      <SectionLabel index="04" label="Selected work" note="04 of 08 — 2025 / 2026" />
      <div className="wrap g mt-10 md:mt-16 mb-16 md:mb-28 items-end gap-y-6">
        <h2 id="work-title" className="col-span-4 md:col-span-6 lg:col-span-9 t-mega uppercase">
          <MaskLines as="span" lines={["Selected", "work"]} className="block" />
        </h2>
        <Reveal className="col-span-4 md:col-span-2 lg:col-span-3 flex md:justify-end">
          <span className="t-h1 t-num text-black/30">(04)</span>
        </Reveal>
      </div>
      <div className="space-y-28 md:space-y-48">
        {FEATURED.map((p, i) => (
          <ProjectFeature key={p.slug} project={p} variant={variants[i]} />
        ))}
      </div>
      <div className="wrap mt-24 md:mt-36 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-line pt-8">
        <p className="t-h3 max-w-md">Four of eight. The full archive includes studio tools, games and experiments.</p>
        <Button to="/work" size="lg">View all work</Button>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- PROCESS */
function Process() {
  const words = ["Think", "Design", "Build", "Refine", "Launch"];
  return (
    <section aria-labelledby="process-title" className="pt-28 md:pt-40 pb-20">
      <SectionLabel index="06" label="The process" note="Six steps — One direction" />
      <div className="wrap mt-12 md:mt-20 mb-16 md:mb-24">
        <h2 id="process-title" className="t-display uppercase flex flex-wrap gap-x-[0.3em]">
          {words.map((w, i) => (
            <span key={w} className="overflow-hidden inline-block pb-[0.06em]">
              <motion.span
                className={cn("inline-block", i % 2 === 1 && "text-black/35")}
                initial={{ y: "110%" }}
                whileInView={{ y: "0%" }}
                viewport={{ once: true, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 1, ease: EASE, delay: i * 0.08 }}
              >
                {w}
                <span className={i === words.length - 1 ? "text-amber" : ""}>.</span>
              </motion.span>
            </span>
          ))}
        </h2>
      </div>
      <ProcessTimeline />
    </section>
  );
}

/* ---------------------------------------------------------- AI */
function AISection() {
  return (
    <section aria-labelledby="ai-title" className="bg-paper pt-28 md:pt-40 pb-28 md:pb-40">
      <SectionLabel index="07" label="AI, honestly" note="Infrastructure — not identity" />
      <div className="wrap g mt-12 md:mt-20 gap-y-12">
        <MaskLines
          as="h2"
          lines={["We use AI.", <span key="b" className="text-black/40">But AI isn't</span>, <span key="c" className="text-black/40">the product.</span>]}
          className="col-span-4 md:col-span-8 lg:col-span-8 t-display uppercase"
        />
        <span id="ai-title" className="sr-only">We use AI. But AI isn't the product.</span>
        <Reveal className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-4 lg:col-start-9 self-end space-y-6" delay={0.2}>
          <p className="t-body text-black/75">
            AI helps us research faster, explore more possibilities, prototype ideas, write and debug code, organize information,
            automate repetitive work and accelerate production.
          </p>
          <p className="t-serif italic text-[clamp(1.75rem,2.6vw,2.6rem)] leading-[1.05]">But direction remains human.</p>
        </Reveal>
      </div>

      <div className="mt-24 md:mt-40">
        <Equation />
      </div>

      <div className="mt-20 md:mt-32">
        <AIDuality />
      </div>

      <div className="wrap g mt-24 md:mt-36 gap-y-6">
        <p className="col-span-4 md:col-span-2 lg:col-span-2 t-label text-black/50">Conclusion</p>
        <div className="col-span-4 md:col-span-6 lg:col-span-9">
          <MaskLines as="p" lines={["AI is infrastructure."]} className="t-h1 uppercase" />
          <Reveal delay={0.3}>
            <p className="t-serif italic text-[clamp(2.2rem,5.6vw,6.25rem)] leading-[0.95] text-black/60 mt-2">Not the identity.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- CAPABILITIES */
function Capabilities() {
  return (
    <section aria-labelledby="cap-title" className="pt-28 md:pt-40 pb-24 md:pb-32">
      <SectionLabel index="08" label="Capabilities" note={`${CAPABILITIES.length} capabilities`} />
      <div className="wrap g mt-12 md:mt-20 gap-y-12">
        <MaskLines
          as="h2"
          lines={["One studio.", <>Many ways to build<span className="text-amber">.</span></>]}
          className="col-span-4 md:col-span-8 lg:col-span-9 t-h1 uppercase"
        />
        <span id="cap-title" className="sr-only">One studio. Many ways to build.</span>
        <ul className="group/list col-span-4 md:col-span-8 lg:col-span-11 lg:col-start-2 mt-6 md:mt-12 flex flex-wrap items-baseline">
          {CAPABILITIES.map((c, i) => (
            <Reveal as="li" key={c} delay={(i % 5) * 0.04} className="group flex items-baseline max-w-full">
              <sup className="t-label t-num text-black/35 mr-1.5 -translate-y-[0.9em] inline-block transition-colors group-hover:text-amber">
                {String(i + 1).padStart(2, "0")}
              </sup>
              <span className="text-[1.7rem] md:text-[2.75rem] lg:text-[clamp(2.75rem,4.6vw,5.25rem)] leading-[1.05] tracking-[-0.04em] font-medium transition-colors duration-500 text-black group-hover/list:text-black/20 group-hover:!text-black">
                {c}
              </span>
              {i < CAPABILITIES.length - 1 && (
                <span className="text-[1.7rem] md:text-[2.75rem] lg:text-[clamp(2.75rem,4.6vw,5.25rem)] leading-[1.05] text-black/15 mx-2.5 md:mx-5" aria-hidden>
                  /
                </span>
              )}
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- WHY GLOWSTONE */
function WhyGlowstone() {
  const items = [
    { t: "Small by design.", b: "A focused studio means fewer layers between idea and execution." },
    { t: "Built around systems.", b: "We create reusable design and technology systems rather than one-off visuals." },
    { t: "Technology with taste.", b: "Technical capability should never come at the cost of clarity." },
    { t: "AI-assisted. Human-directed.", b: "Technology accelerates the process. People remain responsible for the outcome." },
  ];
  return (
    <section aria-labelledby="why-title" className="pb-32 md:pb-48">
      <SectionLabel index="09" label="Why Glowstone" note="Four reasons, no superlatives" />
      <h2 id="why-title" className="sr-only">Why Glowstone</h2>
      <div className="wrap g mt-16 md:mt-24 gap-y-16 md:gap-y-24">
        <div className="col-span-4 md:col-span-4 lg:col-span-5 md:row-span-4">
          <div className="md:sticky md:top-28">
            <ImageReveal
              src={IMG.studio}
              alt="Printed interface sketches and typography studies spread on a wooden studio table."
              className="aspect-[4/5] w-full"
              cursor="Explore"
            />
            <p className="t-label text-black/50 mt-3">Fig. 03 — Work in progress. Paper before pixels.</p>
          </div>
        </div>
        {items.map((it, i) => (
          <Reveal
            key={it.t}
            className={cn(
              "col-span-4 md:col-span-4 md:col-start-5 lg:col-span-6 lg:col-start-7 border-t border-black pt-5",
              i % 2 === 1 && "lg:col-start-7"
            )}
          >
            <div className="flex justify-between t-label">
              <span className="t-num">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-black/40">Reason</span>
            </div>
            <h3 className="t-h1 uppercase mt-8 md:mt-12">{it.t}</h3>
            <p className="t-lead text-black/65 mt-5 max-w-lg">{it.b}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- CLIENT EXPERIENCE */
function ClientExperience() {
  return (
    <section aria-labelledby="cx-title" className="pt-28 md:pt-40 pb-28 md:pb-40">
      <SectionLabel index="10" label="Working together" note="Seven steps" />
      <div className="wrap g mt-12 md:mt-20 gap-y-12">
        <div className="col-span-4 md:col-span-8 lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <MaskLines as="h2" lines={["A good process", "should feel", <>simple<span className="text-amber">.</span></>]} className="t-h1 uppercase" />
            <span id="cx-title" className="sr-only">A good process should feel simple.</span>
            <Reveal delay={0.2} className="mt-8 max-w-sm t-body text-black/65">
              No jargon, no mystery. You always know where the project is and what happens next.
            </Reveal>
          </div>
        </div>
        <ol className="col-span-4 md:col-span-8 lg:col-span-6 lg:col-start-7">
          {CLIENT_JOURNEY.map((s, i) => (
            <Reveal as="li" key={s} className="group flex items-baseline gap-6 md:gap-10 border-t border-line py-5 md:py-7 last:border-b">
              <span className="t-label t-num text-black/40 w-6 shrink-0 group-hover:text-amber transition-colors">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="t-h2 uppercase transition-transform duration-500 group-hover:translate-x-2">{s}</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- TESTIMONIALS */
function Testimonials() {
  return (
    <section aria-labelledby="t-title" className="pb-24 md:pb-32">
      <SectionLabel index="11" label="In their words" note={`${String(TESTIMONIALS.length).padStart(2, "0")} voices`} />
      <h2 id="t-title" className="sr-only">Testimonials</h2>
      <div className="wrap">
        {TESTIMONIALS.map((t, i) => (
          <figure
            key={i}
            className={cn(
              "g min-h-[70svh] md:min-h-[80svh] content-center gap-y-10 py-20",
              i > 0 && "border-t border-line"
            )}
          >
            <span className="col-span-4 md:col-span-1 t-label t-num text-black/40">
              {String(i + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <blockquote
              className={cn(
                "col-span-4 md:col-span-7 lg:col-span-9",
                i % 2 === 0 ? "lg:col-start-2" : "lg:col-start-4"
              )}
            >
              <MaskLines
                as="p"
                lines={[<>“{t.quote}”</>]}
                className="t-serif text-[clamp(2.2rem,5.4vw,5.75rem)] leading-[1] tracking-[-0.02em]"
              />
            </blockquote>
            <Reveal
              className={cn(
                "col-span-4 md:col-span-4 md:col-start-2 lg:col-span-3 flex items-center gap-4",
                i % 2 === 0 ? "lg:col-start-2" : "lg:col-start-4"
              )}
              delay={0.3}
            >
              <span className="h-px w-10 bg-black" aria-hidden />
              <figcaption className="t-label">
                {t.name}
                <br />
                <span className="text-black/50">{t.role}</span>
              </figcaption>
            </Reveal>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- NUMBERS (true ones only) */
function Numbers() {
  const stats = [
    { v: 7, l: "Disciplines", n: "Branding to games" },
    { v: 14, l: "Capabilities", n: "One studio" },
    { v: 6, l: "Process steps", n: "Discover to launch" },
    { v: 1, l: "Studio", n: "Mumbai, India" },
  ];
  return (
    <section aria-labelledby="num-title" className="pb-28 md:pb-40">
      <SectionLabel index="12" label="Numbers we can stand behind" note="No inflated metrics" />
      <h2 id="num-title" className="sr-only">Studio in numbers</h2>
      <dl className="wrap g gap-y-14 mt-14 md:mt-20">
        {stats.map((s) => (
          <div key={s.l} className="col-span-2 md:col-span-4 lg:col-span-3 border-l border-line pl-4">
            <dt className="t-label text-black/50">{s.l}</dt>
            <dd className="mt-6">
              <Counter value={s.v} className="block text-[clamp(4rem,10vw,10rem)] font-medium leading-[0.85] tracking-[-0.06em]" />
              <span className="t-label text-black/50 block mt-4">{s.n}</span>
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

/* ---------------------------------------------------------- JOURNAL */
function JournalPreview() {
  const [lead, ...rest] = ARTICLES;
  return (
    <section aria-labelledby="journal-title" className="pb-28 md:pb-40">
      <SectionLabel index="13" label="Journal" note="Notes on design, technology & building" />
      <div className="wrap g mt-12 md:mt-20 mb-14 md:mb-20 items-end gap-y-8">
        <h2 id="journal-title" className="col-span-4 md:col-span-5 lg:col-span-7 t-mega uppercase">
          <MaskLines as="span" lines={["Journal"]} className="block" />
        </h2>
        <ul className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 flex flex-wrap gap-x-4 gap-y-2 t-label text-black/55 md:justify-end">
          {JOURNAL_CATEGORIES.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="wrap">
        <JournalFeature article={lead} />
      </div>
      <div className="wrap mt-20 md:mt-28 mb-6 flex justify-between t-label text-black/50">
        <span>More reading</span>
        <span className="hidden md:inline">Drag →</span>
      </div>
      <DragRail label="More journal articles">
        {rest.map((a, i) => (
          <div key={a.slug} className="snap-start shrink-0 w-[78vw] md:w-[42vw] lg:w-[27vw]">
            <ArticleCard article={a} index={i + 2} aspect={i % 2 ? "aspect-[4/5]" : "aspect-[4/4.4]"} />
          </div>
        ))}
        <div className="shrink-0 w-px" aria-hidden />
      </DragRail>
      <div className="wrap mt-14">
        <Button to="/journal" variant="outline">All articles</Button>
      </div>
    </section>
  );
}
