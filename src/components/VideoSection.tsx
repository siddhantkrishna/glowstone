import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "@/lib/hooks";

/**
 * Full-bleed cinematic transition. The frame opens from an inset crop to full width
 * as it scrolls into view. Video is lazy-loaded near the viewport, muted, inline,
 * looped, with a poster — and replaced by the still under reduced motion.
 */
export default function VideoSection({
  src,
  poster,
  caption,
  children,
}: {
  src: string;
  poster: string;
  caption?: string;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prefersReduce = useReducedMotion();
  const md = useMediaQuery("(min-width: 768px)");
  const saveData =
    typeof navigator !== "undefined" &&
    !!(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
  // Stills only on reduced motion, small screens and data-saver connections.
  const reduce = prefersReduce || !md || saveData;
  const [load, setLoad] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] });
  const inset = useTransform(scrollYProgress, [0, 1], [12, 0]);
  const clip = useTransform(inset, (v) => `inset(${v * 0.6}% ${v}% ${v * 0.6}% ${v}%)`);
  const scale = useTransform(scrollYProgress, [0, 1], [1.15, 1]);

  useEffect(() => {
    if (reduce || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setLoad(true);
        const v = videoRef.current;
        if (!v) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { rootMargin: "200px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <section ref={ref} className="relative h-[80svh] md:h-[100svh] overflow-hidden bg-black" aria-label={caption}>
      <motion.div className="absolute inset-0" style={prefersReduce ? undefined : { clipPath: clip }}>
        <motion.div className="absolute inset-0 grain" style={prefersReduce ? undefined : { scale }}>
          {reduce || !load ? (
            <img src={poster} alt="" className="h-full w-full object-cover grayscale-[40%]" loading="lazy" />
          ) : (
            <video
              ref={videoRef}
              className="h-full w-full object-cover grayscale-[40%]"
              src={src}
              poster={poster}
              muted
              loop
              playsInline
              autoPlay
              preload="none"
              aria-hidden
            />
          )}
          <div className="absolute inset-0 bg-black/35" />
        </motion.div>
      </motion.div>
      <div className="relative z-10 h-full">{children}</div>
    </section>
  );
}
