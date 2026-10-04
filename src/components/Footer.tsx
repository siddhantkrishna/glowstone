import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { STUDIO } from "@/data/content";
import { useMumbaiTime } from "@/lib/hooks";
import { ArrowLink, Button, MaskLines, Reveal } from "./ui";

/** Final page of the publication: closing question → CTA → wordmark → index → legal. */
export default function Footer({ showCta = true }: { showCta?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const time = useMumbaiTime();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const y = useTransform(scrollYProgress, [0, 1], ["30%", "0%"]);
  const year = new Date().getFullYear();
  const wordRef = useRef<HTMLSpanElement>(null);
  const [fit, setFit] = useState<number | null>(null);

  // Fit the wordmark exactly to the content width — scale the type, never the glyphs.
  useLayoutEffect(() => {
    const measure = () => {
      const el = wordRef.current;
      const box = ref.current;
      if (!el || !box) return;
      const cs = getComputedStyle(box);
      const avail = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      const prev = el.style.fontSize;
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      el.style.fontSize = prev;
      if (w > 0) setFit(Math.floor((100 * avail) / w) - 1);
    };
    measure();
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <footer className="relative bg-black text-white" aria-labelledby={showCta ? "closing-title" : undefined}>
      {showCta && (
        <section className="wrap pt-28 md:pt-40 pb-24 md:pb-36">
          <div className="g">
            <p className="t-label text-white/50 col-span-4 md:col-span-8 lg:col-span-12 mb-10 md:mb-16 flex justify-between">
              <span>(End) — Next chapter</span>
              <span>Yours</span>
            </p>
            <MaskLines
              as="h2"
              lines={["Have something", <>worth building<span className="text-amber">?</span></>]}
              className="t-display col-span-4 md:col-span-8 lg:col-span-11 uppercase"
            />
            <Reveal className="col-span-4 md:col-span-4 md:col-start-5 lg:col-span-4 lg:col-start-7 mt-12 md:mt-20" delay={0.2}>
              <p className="t-lead text-white/85">
                Tell us what you're working on.
                <br />
                <span className="t-serif italic text-white/60 text-[1.15em]">We'll figure out what it needs.</span>
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Button to="/contact" variant="light" size="lg" className="sm:min-w-[260px]">
                  Start a project
                </Button>
                <Button href={`mailto:${STUDIO.email}`} variant="outline-light" size="lg">
                  Or say hello
                </Button>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <div className="wrap">
        <div className="rule-inv" />
        <div className="g gap-y-12 py-14 md:py-20">
          <div className="col-span-4 md:col-span-3 lg:col-span-4 space-y-2">
            <p className="t-label text-white/45">Studio</p>
            <p className="t-h3">{STUDIO.descriptor}</p>
            <p className="t-small text-white/60">
              {STUDIO.city}, {STUDIO.country} — <span className="t-num">{time}</span> IST
            </p>
          </div>
          <nav aria-label="Footer" className="col-span-2 md:col-span-2 lg:col-span-2 lg:col-start-6">
            <p className="t-label text-white/45 mb-4">Index</p>
            <ul className="space-y-2 t-small">
              {[
                ["Work", "/work"],
                ["Services", "/services"],
                ["About", "/about"],
                ["Journal", "/journal"],
                ["Contact", "/contact"],
              ].map(([l, to]) => (
                <li key={to}>
                  <Link to={to} className="u-link">
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="col-span-2 md:col-span-1 lg:col-span-2">
            <p className="t-label text-white/45 mb-4">Social</p>
            <ul className="space-y-2 t-small">
              {STUDIO.social.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noreferrer" className="u-link">
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-4 md:col-span-2 lg:col-span-3 lg:col-start-10">
            <p className="t-label text-white/45 mb-4">Contact</p>
            <ArrowLink href={`mailto:${STUDIO.email}`} className="t-small">
              {STUDIO.email}
            </ArrowLink>
          </div>
        </div>
      </div>

      <div ref={ref} className="overflow-hidden wrap">
        <motion.p
          aria-hidden
          style={reduce ? undefined : { y }}
          className="select-none font-semibold uppercase leading-[0.78] tracking-[-0.065em] whitespace-nowrap text-white pt-4"
        >
          <span ref={wordRef} className="inline-block" style={{ fontSize: fit ? `${fit}px` : "15vw" }}>
            Glowstone<span className="text-amber">.</span>
          </span>
        </motion.p>
      </div>

      <div className="wrap">
        <div className="rule-inv" />
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between py-6 t-label text-white/45">
          <p>© {year} Glowstone. All rights reserved.</p>
          <ul className="flex gap-6">
            {["Privacy", "Terms", "Cookies"].map((l) => (
              <li key={l}>
                <Link to={`/legal/${l.toLowerCase()}`} className="u-link">
                  {l}
                </Link>
              </li>
            ))}
          </ul>
          <p>AI-assisted. Human-directed.</p>
        </div>
      </div>
    </footer>
  );
}
