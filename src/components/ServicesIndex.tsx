import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { SERVICES } from "@/data/content";
import { useFinePointer } from "@/lib/hooks";
import { cn } from "@/utils/cn";
import { EASE } from "./ui";

/** Editorial service index — hover reveals imagery that follows the cursor; click expands detail. */
export default function ServicesIndex() {
  const ref = useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 180, damping: 26, mass: 0.6 });
  const y = useSpring(my, { stiffness: 180, damping: 26, mass: 0.6 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  };

  const showFloat = fine && !reduce && hovered !== null && open === null;

  return (
    <div ref={ref} className="relative" onPointerMove={onMove} onPointerLeave={() => setHovered(null)}>
      <ul className="wrap" role="list">
        {SERVICES.map((s, i) => {
          const isOpen = open === i;
          const dim = hovered !== null && hovered !== i && open === null;
          return (
            <li key={s.slug} className="border-t border-line last:border-b">
              <button
                className="group g w-full text-left py-6 md:py-8 items-baseline"
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                aria-controls={`svc-${s.slug}`}
              >
                <span
                  className={cn(
                    "col-span-1 t-label t-num transition-colors duration-500",
                    hovered === i || isOpen ? "text-amber" : "text-black/45"
                  )}
                >
                  {s.num}
                </span>
                <span
                  className={cn(
                    "col-span-3 md:col-span-4 lg:col-span-5 t-h1 uppercase transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    dim ? "opacity-25" : "opacity-100",
                    (hovered === i || isOpen) && "md:translate-x-4"
                  )}
                >
                  {s.title}
                </span>
                <span
                  className={cn(
                    "hidden md:block md:col-span-2 lg:col-span-4 lg:col-start-8 t-small text-black/65 transition-opacity duration-500",
                    dim && "opacity-30"
                  )}
                >
                  {s.short}
                </span>
                <span className="hidden md:flex col-span-1 lg:col-start-12 justify-end">
                  <span
                    className={cn(
                      "relative block h-4 w-4 transition-transform duration-500",
                      isOpen && "rotate-45"
                    )}
                    aria-hidden
                  >
                    <span className="absolute left-0 top-1/2 h-px w-full bg-current" />
                    <span className="absolute left-1/2 top-0 h-full w-px bg-current" />
                  </span>
                </span>
                <span className="col-span-3 col-start-2 md:hidden t-small text-black/65 mt-3">{s.short}</span>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={`svc-${s.slug}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="g gap-y-8 pb-10 md:pb-14">
                      <div className="col-span-4 md:col-span-3 md:col-start-2 lg:col-span-4 lg:col-start-2">
                        <div className="grain relative aspect-[4/3] overflow-hidden bg-paper">
                          <img src={s.image} alt={`${s.title} — visual reference`} loading="lazy" className="h-full w-full object-cover" />
                        </div>
                      </div>
                      <div className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-7 flex flex-col gap-8">
                        <p className="t-serif italic text-[clamp(1.5rem,2.4vw,2.25rem)] leading-[1.15]">{s.statement}</p>
                        <p className="t-body text-black/70">{s.description}</p>
                        <div>
                          <p className="t-label text-black/45 mb-3">Deliverables</p>
                          <ul className="flex flex-wrap gap-2">
                            {s.deliverables.map((d) => (
                              <li key={d} className="t-label border border-line px-3 py-2">
                                {d}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <Link to={`/services#${s.slug}`} className="group t-label inline-flex items-center gap-2 w-fit">
                          <span className="u-link">Explore {s.title}</span>
                          <span className="arrow arrow-x">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          );
        })}
      </ul>

      {/* Floating preview */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 z-10 hidden md:block"
        style={{ x, y }}
      >
        <AnimatePresence>
          {showFloat && (
            <motion.div
              key="float"
              className="relative -translate-x-1/2 -translate-y-1/2 w-[18vw] max-w-[300px] aspect-[4/5] overflow-hidden bg-paper"
              initial={{ clipPath: "inset(50% 50% 50% 50%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              exit={{ clipPath: "inset(50% 50% 50% 50%)" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              {SERVICES.map((s, i) => (
                <motion.img
                  key={s.slug}
                  src={s.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                  animate={{ opacity: hovered === i ? 1 : 0, scale: hovered === i ? 1 : 1.12 }}
                  transition={{ duration: 0.6, ease: EASE }}
                />
              ))}
              <span className="absolute bottom-2 left-2 t-label bg-warm-white px-1.5 py-0.5 text-black">
                {hovered !== null ? `${SERVICES[hovered].num} / 07` : ""}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
