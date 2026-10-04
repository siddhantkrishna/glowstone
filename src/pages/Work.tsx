import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "framer-motion";
import { CATEGORIES, PROJECTS } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn } from "@/utils/cn";
import FilterBar from "@/components/FilterBar";
import { ProjectTile } from "@/components/ProjectCard";
import { EASE, MaskLines, Reveal } from "@/components/ui";

const LAYOUT = [
  { cls: "col-span-4 md:col-span-8 lg:col-span-8", size: "lg" as const },
  { cls: "col-span-4 md:col-span-4 lg:col-span-4 lg:pt-[28vh]", size: "md" as const },
  { cls: "col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-2", size: "md" as const },
  { cls: "col-span-4 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-8 lg:pt-[18vh]", size: "sm" as const },
  { cls: "col-span-4 md:col-span-8 lg:col-span-10 lg:col-start-3", size: "lg" as const },
  { cls: "col-span-4 md:col-span-4 lg:col-span-6", size: "md" as const },
];

export default function Work() {
  useSeo({
    title: "Work — Glowstone",
    description: "Selected projects and studio experiments across branding, websites, web apps, apps, games, social and creative.",
    path: "/work",
  });
  const reduce = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [view, setView] = useState<"gallery" | "index">("gallery");
  const [hover, setHover] = useState<string | null>(null);

  const options = useMemo(
    () => [
      { value: "all", label: "All", count: PROJECTS.length },
      ...CATEGORIES.map((c) => ({ value: c.slug, label: c.label, count: PROJECTS.filter((p) => p.categories.includes(c.slug)).length })),
    ],
    []
  );
  const list = filter === "all" ? PROJECTS : PROJECTS.filter((p) => p.categories.includes(filter as never));
  const hovered = PROJECTS.find((p) => p.slug === hover) ?? list[0];

  return (
    <>
      <section className="wrap pt-32 md:pt-44 pb-16 md:pb-24">
        <div className="g gap-y-10 items-end">
          <p className="col-span-4 md:col-span-8 lg:col-span-12 t-label text-black/50 flex justify-between">
            <span>(Archive) — Work</span>
            <span>2025 — {new Date().getFullYear()}</span>
          </p>
          <h1 className="col-span-4 md:col-span-6 lg:col-span-8 t-mega uppercase">
            <MaskLines as="span" lines={["Work"]} className="block" delay={0.1} />
          </h1>
          <Reveal className="col-span-4 md:col-span-2 lg:col-span-4 flex flex-col gap-4 lg:items-end" delay={0.3}>
            <span className="t-h1 t-num text-black/25">({String(PROJECTS.length).padStart(2, "0")})</span>
          </Reveal>
          <Reveal className="col-span-4 md:col-span-5 lg:col-span-5 lg:col-start-1 t-lead text-black/70" delay={0.35}>
            Client projects, studio tools and self-initiated experiments. Each one began with a question worth answering.
          </Reveal>
        </div>
      </section>

      <FilterBar
        label="Filter projects by discipline"
        options={options}
        value={filter}
        onChange={setFilter}
        trailing={
          <div className="hidden md:flex items-center gap-4 t-label shrink-0" role="group" aria-label="View mode">
            {(["gallery", "index"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                aria-pressed={view === v}
                className={cn("transition-colors", view === v ? "text-black" : "text-black/40 hover:text-black")}
              >
                {v}
              </button>
            ))}
          </div>
        }
      />

      <section className="pt-14 md:pt-20 pb-32 md:pb-48" aria-live="polite">
        <div className="wrap flex justify-between t-label text-black/45 mb-10">
          <span>
            Showing <span className="t-num text-black">{String(list.length).padStart(2, "0")}</span> /{" "}
            {String(PROJECTS.length).padStart(2, "0")}
          </span>
          <span>{options.find((o) => o.value === filter)?.label}</span>
        </div>

        {view === "gallery" ? (
          <LayoutGroup>
            <motion.div layout={!reduce} className="wrap g gap-y-20 md:gap-y-28">
              <AnimatePresence mode="popLayout">
                {list.map((p, i) => {
                  const l = LAYOUT[i % LAYOUT.length];
                  return (
                    <motion.div
                      key={p.slug}
                      layout={!reduce}
                      className={l.cls}
                      initial={reduce ? false : { opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.97, transition: { duration: 0.3 } }}
                      transition={{ duration: 0.8, ease: EASE, delay: Math.min(i, 4) * 0.05 }}
                    >
                      <ProjectTile project={p} size={l.size} />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <div className="wrap g">
            <ul className="col-span-8 lg:col-span-7" onMouseLeave={() => setHover(null)}>
              <li className="g !grid-cols-12 t-label text-black/40 pb-3">
                <span className="col-span-1">No.</span>
                <span className="col-span-5">Project</span>
                <span className="col-span-4">Disciplines</span>
                <span className="col-span-2 text-right">Year</span>
              </li>
              {list.map((p) => (
                <li key={p.slug} className="border-t border-line last:border-b">
                  <Link
                    to={`/work/${p.slug}`}
                    className="group g !grid-cols-12 items-baseline py-5"
                    onMouseEnter={() => setHover(p.slug)}
                    onFocus={() => setHover(p.slug)}
                  >
                    <span className="col-span-1 t-label t-num text-black/45 group-hover:text-amber transition-colors">{p.num}</span>
                    <span className="col-span-5 t-h3 uppercase transition-transform duration-500 group-hover:translate-x-2">{p.title}</span>
                    <span className="col-span-4 t-label text-black/55">{p.disciplines.join(" / ")}</span>
                    <span className="col-span-2 t-label t-num text-right">{p.year}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="hidden lg:block lg:col-span-4 lg:col-start-9">
              <div className="sticky top-36">
                <div className="grain relative aspect-[4/5] overflow-hidden bg-paper">
                  <AnimatePresence mode="popLayout" initial={false}>
                    <motion.img
                      key={hovered?.slug}
                      src={hovered?.hero}
                      alt={hovered ? `${hovered.title} preview` : ""}
                      className="absolute inset-0 h-full w-full object-cover"
                      initial={{ clipPath: "inset(100% 0 0 0)" }}
                      animate={{ clipPath: "inset(0% 0 0 0)" }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.7, ease: EASE }}
                    />
                  </AnimatePresence>
                </div>
                {hovered && (
                  <div className="mt-4 flex justify-between t-label">
                    <span>{hovered.title}</span>
                    <span className="text-black/50">{hovered.sector}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
}
