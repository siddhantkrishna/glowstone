/* First-visit intro timing — lets the hero choreograph with the loader. */
const KEY = "gs-intro-seen";
const reduce =
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let seen = true;
try {
  seen = typeof window === "undefined" || !!sessionStorage.getItem(KEY) || reduce;
} catch {
  seen = true;
}

export const SHOW_INTRO = !seen;
export const INTRO_MS = 1250;
const start = typeof performance !== "undefined" ? performance.now() : 0;

export function markIntroSeen() {
  try {
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* noop */
  }
}

/** Seconds to wait before hero choreography begins. */
export function introDelay(base = 0.1) {
  if (!SHOW_INTRO) return base;
  const remaining = (INTRO_MS - (performance.now() - start)) / 1000;
  return Math.max(base, remaining + 0.15);
}
