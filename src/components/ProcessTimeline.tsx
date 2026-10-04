import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { PROCESS } from "@/data/content";
import { cn } from "@/utils/cn";
import { EASE } from "./ui";

/** Sticky left index + scroll-activated steps on the right. */
export default function ProcessTimeline() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  const step = PROCESS[active];

  return (
    <div className="wrap g">
      {/* Sticky index */}
      <div className="hidden md:block md:col-span-4 lg:col-span-6">
        <div className="sticky top-24 h-[calc(100svh-8rem)] flex flex-col justify-between py-4">
          <div className="flex items-center gap-3 t-label text-black/50">
            <span className="t-num">{step.num} / 06</span>
            <span className="h-px flex-1 bg-line relative overflow-hidden">
              <motion.span
                className="absolute inset-y-0 left-0 bg-black"
                animate={{ width: `${((active + 1) / PROCESS.length) * 100}%` }}
                transition={{ duration: 0.8, ease: EASE }}
              />
            </span>
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={step.num}
                  className="t-mega t-num"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: EASE }}
                  aria-hidden
                >
                  {step.num}
                </motion.p>
              </AnimatePresence>
            </div>
            <div className="overflow-hidden mt-2">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.p
                  key={step.title}
                  className="t-h1 uppercase"
                  initial={{ y: "100%" }}
                  animate={{ y: "0%" }}
                  exit={{ y: "-100%" }}
                  transition={{ duration: 0.8, ease: EASE, delay: 0.04 }}
                  aria-hidden
                >
                  {step.title}
                  <span className="text-amber">.</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
          <ol className="flex gap-2" aria-hidden>
            {PROCESS.map((p, i) => (
              <li key={p.num} className={cn("t-label transition-colors duration-500", i === active ? "text-black" : "text-black/30")}>
                {p.title}
                {i < PROCESS.length - 1 && <span className="ml-2 text-black/20">/</span>}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Steps */}
      <ol className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
        {PROCESS.map((p, i) => (
          <li
            key={p.num}
            ref={(el) => {
              refs.current[i] = el;
            }}
            data-index={i}
            className={cn(
              "min-h-[52svh] md:min-h-[72svh] flex flex-col justify-center border-t border-line py-10 transition-opacity duration-700",
              i === active ? "opacity-100" : "md:opacity-25"
            )}
          >
            <div className="flex items-baseline justify-between">
              <span className="t-label t-num text-amber">{p.num}</span>
              <span className="t-label text-black/40">Step</span>
            </div>
            <h3 className="t-h2 uppercase mt-6">{p.title}</h3>
            <p className="t-lead mt-5 text-black/75 max-w-md">{p.text}</p>
            <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-2">
              {p.detail.map((d) => (
                <li key={d} className="t-label text-black/55 border-t border-line pt-2">
                  {d}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
