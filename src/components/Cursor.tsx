import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useFinePointer } from "@/lib/hooks";

/**
 * Desktop-only cursor. A small dot that expands over interactive elements
 * and shows a contextual label (VIEW / EXPLORE / DRAG / OPEN) via [data-cursor].
 */
export default function Cursor() {
  const fine = useFinePointer();
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 650, damping: 45, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 650, damping: 45, mass: 0.35 });
  const [label, setLabel] = useState("");
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);

  const enabled = fine && !reduce;

  useEffect(() => {
    if (!enabled) return;
    const root = document.documentElement;
    root.classList.add("has-cursor");
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      if (!visible) setVisible(true);
    };
    const over = (e: Event) => {
      const t = e.target as Element | null;
      if (!t || !t.closest) return;
      const c = t.closest("[data-cursor]");
      setLabel(c?.getAttribute("data-cursor") || "");
      setHover(!!t.closest("a, button, [role='button'], label, summary, select"));
    };
    const leave = () => setVisible(false);
    const enter = () => setVisible(true);
    const md = () => setDown(true);
    const mu = () => setDown(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    window.addEventListener("pointerdown", md);
    window.addEventListener("pointerup", mu);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
      window.removeEventListener("pointerdown", md);
      window.removeEventListener("pointerup", mu);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  if (!enabled) return null;

  const size = label ? 0 : hover ? 44 : 8;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[95]">
      <motion.div
        className="fixed left-0 top-0 rounded-full mix-blend-difference"
        style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor: hover ? "rgba(255,255,255,0)" : "rgba(255,255,255,1)",
          scale: down ? 0.8 : 1,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 35 }}
        initial={false}
      >
        <div className="h-full w-full rounded-full border border-white" style={{ opacity: hover ? 1 : 0 }} />
      </motion.div>
      <AnimatePresence>
        {label && visible && (
          <motion.div
            key="label"
            className="fixed left-0 top-0 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-amber text-black"
            style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: down ? 0.9 : 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="t-label">{label}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
