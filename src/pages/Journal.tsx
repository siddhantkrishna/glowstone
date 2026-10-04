import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ARTICLES, JOURNAL_CATEGORIES } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn } from "@/utils/cn";
import FilterBar from "@/components/FilterBar";
import { ArticleCard, ArticleRow, JournalFeature } from "@/components/JournalCard";
import { EASE, MaskLines, Reveal, SectionLabel } from "@/components/ui";

const GRID = [
  { cls: "col-span-4 md:col-span-4 lg:col-span-5", aspect: "aspect-[4/5]" },
  { cls: "col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-8 lg:pt-40", aspect: "aspect-[4/4.6]" },
  { cls: "col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-2", aspect: "aspect-square" },
  { cls: "col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 lg:pt-24", aspect: "aspect-[16/11]" },
  { cls: "col-span-4 md:col-span-8 lg:col-span-7 lg:col-start-3", aspect: "aspect-[16/9]" },
];

export default function Journal() {
  useSeo({
    title: "Journal — Glowstone",
    description: "Notes on design, technology, branding, AI, culture and building digital products — from the Glowstone studio.",
    path: "/journal",
    jsonLd: { "@type": "Blog", name: "Glowstone Journal", publisher: { "@type": "Organization", name: "Glowstone" } },
  });
  const reduce = useReducedMotion();
  const [cat, setCat] = useState("all");
  const options = useMemo(
    () => [
      { value: "all", label: "All", count: ARTICLES.length },
      ...JOURNAL_CATEGORIES.map((c) => ({ value: c, label: c, count: ARTICLES.filter((a) => a.category === c).length })),
    ],
    []
  );
  const list = cat === "all" ? ARTICLES : ARTICLES.filter((a) => a.category === cat);
  const [lead, ...rest] = list;

  return (
    <>
      <section className="wrap pt-32 md:pt-44 pb-14 md:pb-20">
        <p className="t-label text-black/50 flex justify-between mb-10 md:mb-14">
          <span>(Journal) — Vol. {new Date().getFullYear()}</span>
          <span>{String(ARTICLES.length).padStart(2, "0")} entries</span>
        </p>
        <MaskLines as="h1" lines={["Journal"]} className="t-mega uppercase" delay={0.1} />
        <div className="g mt-10 md:mt-14">
          <Reveal className="col-span-4 md:col-span-5 lg:col-span-5 t-serif italic text-[clamp(1.6rem,2.6vw,2.6rem)] leading-[1.08]" delay={0.3}>
            Notes on design, technology and building — written slowly, on purpose.
          </Reveal>
        </div>
      </section>

      <FilterBar label="Filter articles by category" options={options} value={cat} onChange={setCat} />

      <section className="pt-14 md:pt-20 pb-24" aria-live="polite">
        <AnimatePresence mode="wait">
          <motion.div
            key={cat}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            {lead && (
              <div className="wrap">
                <p className="t-label text-black/45 mb-6">Lead story</p>
                <JournalFeature article={lead} />
              </div>
            )}
            {rest.length > 0 && (
              <div className="wrap g gap-y-20 md:gap-y-24 mt-24 md:mt-36">
                {rest.map((a, i) => {
                  const g = GRID[i % GRID.length];
                  return (
                    <div key={a.slug} className={cn(g.cls)}>
                      <ArticleCard article={a} aspect={g.aspect} index={i + 2} />
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </section>

      <section className="pt-12 pb-28 md:pb-40" aria-labelledby="index-title">
        <SectionLabel index="∞" label="Index" note="All entries" />
        <h2 id="index-title" className="sr-only">Journal index</h2>
        <div className="wrap mt-10">
          {ARTICLES.map((a, i) => (
            <ArticleRow key={a.slug} article={a} n={i + 1} />
          ))}
          <div className="border-t border-line" />
        </div>
      </section>
    </>
  );
}
