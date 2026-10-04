import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { INTRO_MS, SHOW_INTRO, markIntroSeen } from "@/lib/intro";

/** First-visit only: wordmark, a thin line, then the page reveals. Skipped on reduced motion. */
export default function Loader() {
  const [show, setShow] = useState(SHOW_INTRO);
  useEffect(() => {
    if (!show) return;
    markIntroSeen();
    const id = window.setTimeout(() => setShow(false), INTRO_MS + 700);
    return () => window.clearTimeout(id);
  }, [show]);
  if (!show) return null;
  const ease = [0.65, 0, 0.35, 1] as const;
  return (
    <motion.div
      role="presentation"
      aria-hidden
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-black text-white wrap py-6"
      initial={{ y: "0%" }}
      animate={{ y: "-100%" }}
      transition={{ duration: 0.75, ease, delay: INTRO_MS / 1000 - 0.15 }}
    >
      <div className="flex justify-between t-label text-white/50">
        <span>Creative Technology Studio</span>
        <span>Mumbai — India</span>
      </div>
      <div>
        <div className="overflow-hidden">
          <motion.div
            className="t-display tracking-[-0.06em]"
            initial={{ y: "105%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Glowstone<span className="text-amber">.</span>
          </motion.div>
        </div>
        <div className="mt-6 h-px w-full bg-white/15">
          <motion.div
            className="h-px origin-left bg-amber"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: INTRO_MS / 1000 - 0.2, ease }}
          />
        </div>
      </div>
      <div className="flex justify-between t-label text-white/50">
        <span>Clarity / Distinction / Purpose</span>
        <span className="hidden sm:inline">Strategy · Design · Technology · Execution</span>
      </div>
    </motion.div>
  );
}
