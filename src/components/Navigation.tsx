import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { STUDIO } from "@/data/content";
import { useMumbaiTime } from "@/lib/hooks";
import { EASE } from "./ui";

const LINKS = [
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/journal", label: "Journal" },
];

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-sans font-semibold uppercase tracking-[-0.02em] leading-none", className)}>
      Glowstone
    </span>
  );
}

export default function Navigation() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const time = useMumbaiTime();
  const dark = pathname.startsWith("/contact");

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      setHidden(y > 480 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Expose nav visibility so sticky sub-bars can dock correctly.
  useEffect(() => {
    document.documentElement.dataset.nav = hidden && !open ? "hidden" : "shown";
  }, [hidden, open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[transform,background-color,height,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
          hidden && !open ? "-translate-y-full" : "translate-y-0",
          scrolled && !open
            ? dark
              ? "bg-black/80 backdrop-blur-xl border-b border-white/10"
              : "bg-warm-white/80 backdrop-blur-xl border-b border-black/10"
            : "border-b border-transparent",
          dark || open ? "text-white" : "text-black"
        )}
      >
        <nav
          aria-label="Primary"
          className={cn(
            "wrap g items-center transition-[height] duration-500",
            scrolled ? "h-14" : "h-[4.5rem] md:h-20"
          )}
        >
          <Link to="/" aria-label="Glowstone — home" className="col-span-2 md:col-span-2 lg:col-span-3 flex items-center gap-2">
            <Wordmark className="text-[15px] md:text-[17px]" />
          </Link>

          <ul className="hidden lg:flex lg:col-span-5 lg:col-start-5 gap-8">
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) => cn("t-label u-link py-1", isActive && "!bg-[length:100%_1px]")}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex lg:col-span-4 lg:col-start-9 items-center justify-end gap-6">
            <span className={cn("t-label t-num", dark ? "text-white/50" : "text-black/45")}>
              MUM {time} IST
            </span>
            <Link
              to="/contact"
              className={cn(
                "group relative inline-flex h-10 items-center gap-3 overflow-hidden px-4 t-label",
                dark ? "bg-white text-black" : "bg-black text-white"
              )}
            >
              <span className="absolute inset-0 translate-y-full bg-amber transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
              <span className="relative group-hover:text-black transition-colors">Start a project</span>
              <span className="relative arrow arrow-x group-hover:text-black">→</span>
            </Link>
          </div>

          <div className="col-span-2 md:col-span-6 lg:hidden flex justify-end">
            <button
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="t-label flex h-11 items-center gap-3 -mr-2 px-2"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative block h-2.5 w-5" aria-hidden>
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    open ? "top-1/2 rotate-45" : "top-0"
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-full bg-current transition-transform duration-500",
                    open ? "top-1/2 -rotate-45" : "bottom-0"
                  )}
                />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <MobileNavigation open={open} time={time} />
    </>
  );
}

function MobileNavigation({ open, time }: { open: boolean; time: string }) {
  const items = [...LINKS, { to: "/contact", label: "Contact" }];
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          id="mobile-menu"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className="fixed inset-0 z-40 flex flex-col bg-black text-white lg:hidden"
          initial={{ clipPath: "inset(0 0 100% 0)" }}
          animate={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
        >
          <div className="wrap flex-1 flex flex-col pt-24 pb-8">
            <div className="flex justify-between t-label text-white/45 pb-3 border-b border-white/15">
              <span>Index</span>
              <span>05 Sections</span>
            </div>
            <ul className="mt-2">
              {items.map((l, i) => (
                <li key={l.to} className="border-b border-white/15 overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.8, ease: EASE, delay: 0.2 + i * 0.06 }}
                  >
                    <NavLink
                      to={l.to}
                      className={({ isActive }) =>
                        cn("group flex items-baseline justify-between py-3", isActive && "text-amber")
                      }
                    >
                      <span className="text-[clamp(2.75rem,12vw,5.5rem)] font-medium leading-[0.95] tracking-[-0.05em] transition-transform duration-500 group-active:translate-x-2">
                        {l.label}
                      </span>
                      <span className="t-label text-white/40">0{i + 1}</span>
                    </NavLink>
                  </motion.div>
                </li>
              ))}
            </ul>
            <motion.div
              className="mt-auto pt-10 grid grid-cols-2 gap-6 t-label text-white/60"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <div className="space-y-2">
                <p className="text-white">
                  {STUDIO.city}, {STUDIO.country}
                </p>
                <p className="t-num">{time} IST</p>
                <a href={`mailto:${STUDIO.email}`} className="block normal-case tracking-normal text-[15px] text-white u-link-static w-fit">
                  {STUDIO.email}
                </a>
              </div>
              <ul className="space-y-2 text-right">
                {STUDIO.social.slice(0, 2).map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer" className="u-link text-white">
                      {s.label} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
