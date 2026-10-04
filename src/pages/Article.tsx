import { useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { ARTICLES, formatDate } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { ArticleCard } from "@/components/JournalCard";
import { ImageReveal, MaskLines, Reveal } from "@/components/ui";
import NotFound from "./NotFound";

export default function Article() {
  const { slug } = useParams();
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40 });
  const idx = ARTICLES.findIndex((a) => a.slug === slug);
  const a = ARTICLES[idx];
  const related = [ARTICLES[(idx + 1) % ARTICLES.length], ARTICLES[(idx + 2) % ARTICLES.length]];

  const jsonLd = useMemo(
    () =>
      a
        ? {
            "@type": "Article",
            headline: a.title,
            author: { "@type": "Person", name: a.author },
            datePublished: a.date,
            articleSection: a.category,
            publisher: { "@type": "Organization", name: "Glowstone" },
          }
        : undefined,
    [a]
  );

  useSeo({
    title: a ? `${a.title} — Glowstone Journal` : "Article not found — Glowstone",
    description: a ? a.excerpt : "This article could not be found.",
    path: `/journal/${slug ?? ""}`,
    image: a?.cover,
    type: "article",
    jsonLd,
  });

  if (!a) return <NotFound />;

  return (
    <article>
      <motion.div
        aria-hidden
        className="fixed left-0 right-0 top-0 z-[60] h-[2px] origin-left bg-amber"
        style={{ scaleX: reduce ? scrollYProgress : progress }}
      />
      <header className="wrap pt-32 md:pt-44 pb-12 md:pb-20">
        <div className="flex justify-between t-label text-black/50 mb-10 md:mb-16">
          <Link to="/journal" className="group inline-flex gap-2">
            <span className="arrow group-hover:-translate-x-1">←</span>
            <span className="u-link">Journal</span>
          </Link>
          <span className="t-num">No. {String(idx + 1).padStart(2, "0")}</span>
        </div>
        <div className="g gap-y-10">
          <p className="col-span-4 md:col-span-8 lg:col-span-12 t-label flex flex-wrap gap-x-6 gap-y-1">
            <span>{a.category}</span>
            <time dateTime={a.date} className="t-num text-black/50">
              {formatDate(a.date)}
            </time>
            <span className="text-black/50">{a.readingTime} read</span>
          </p>
          <MaskLines as="h1" lines={[a.title]} className="col-span-4 md:col-span-8 lg:col-span-11 t-h1 uppercase" delay={0.1} />
          <Reveal className="col-span-4 md:col-span-6 lg:col-span-6 lg:col-start-4" delay={0.3}>
            <p className="t-serif italic text-[clamp(1.5rem,2.4vw,2.3rem)] leading-[1.12]">{a.excerpt}</p>
            <p className="t-label text-black/50 mt-6">By {a.author}</p>
          </Reveal>
        </div>
      </header>

      <ImageReveal src={a.cover} alt={a.title} className="h-[55svh] md:h-[80svh] w-full" priority />

      <div className="wrap g py-20 md:py-32">
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-4 space-y-7">
          {a.content.map((b, i) => {
            if (b.h)
              return (
                <h2 key={i} className="t-h3 uppercase pt-8">
                  {b.h}
                </h2>
              );
            if (b.q)
              return (
                <Reveal key={i} className="py-8 md:-mx-[12%]">
                  <blockquote className="border-l-2 border-amber pl-6 md:pl-10">
                    <p className="t-serif italic text-[clamp(2rem,4vw,3.75rem)] leading-[1.02]">“{b.q}”</p>
                  </blockquote>
                </Reveal>
              );
            return (
              <p
                key={i}
                className={
                  i === 0
                    ? "text-[1.2rem] md:text-[1.3rem] leading-[1.6] first-letter:text-[3.6em] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:mt-1 first-letter:font-medium"
                    : "text-[1.2rem] md:text-[1.3rem] leading-[1.6] text-black/80"
                }
              >
                {b.p}
              </p>
            );
          })}
          <div className="pt-10 flex items-center gap-4 t-label text-black/50">
            <span className="h-px w-10 bg-black" aria-hidden />
            Glowstone — {a.author}
          </div>
        </div>
      </div>

      <section className="wrap pb-28 md:pb-36" aria-labelledby="related">
        <div className="rule" />
        <h2 id="related" className="t-label pt-3 mb-10">Continue reading</h2>
        <div className="g gap-y-14">
          {related.map((r, i) => (
            <div key={r.slug} className={i === 0 ? "col-span-4 md:col-span-4 lg:col-span-5" : "col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-8 lg:pt-24"}>
              <ArticleCard article={r} aspect={i === 0 ? "aspect-[4/3]" : "aspect-[4/5]"} />
            </div>
          ))}
        </div>
      </section>
    </article>
  );
}
