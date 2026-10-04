import { useRef, type ReactNode } from "react";
import { Link } from "react-router-dom";
import type { Article } from "@/data/content";
import { formatDate } from "@/data/content";
import { cn } from "@/utils/cn";

function MetaRow({ a, className }: { a: Article; className?: string }) {
  return (
    <p className={cn("t-label flex flex-wrap gap-x-4 gap-y-1 text-black/50", className)}>
      <span className="text-black">{a.category}</span>
      <time dateTime={a.date} className="t-num">
        {formatDate(a.date)}
      </time>
      <span>{a.readingTime} read</span>
    </p>
  );
}

/** Large lead story */
export function JournalFeature({ article: a }: { article: Article }) {
  return (
    <Link to={`/journal/${a.slug}`} className="group g gap-y-6" data-cursor="Read">
      <div className="col-span-4 md:col-span-5 lg:col-span-7">
        <div className="img-zoom grain relative aspect-[4/3] overflow-hidden bg-paper">
          <img src={a.cover} alt={a.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        </div>
      </div>
      <div className="col-span-4 md:col-span-3 lg:col-span-4 lg:col-start-9 flex flex-col justify-between gap-6">
        <MetaRow a={a} />
        <div>
          <h3 className="t-h2 transition-transform duration-700 group-hover:translate-x-1">{a.title}</h3>
          <p className="t-body text-black/65 mt-5">{a.excerpt}</p>
        </div>
        <span className="t-label inline-flex gap-2">
          <span className="u-link">Read article</span>
          <span className="arrow arrow-x">→</span>
        </span>
      </div>
    </Link>
  );
}

/** Standard article card */
export function ArticleCard({ article: a, aspect = "aspect-[4/5]", index }: { article: Article; aspect?: string; index?: number }) {
  return (
    <Link to={`/journal/${a.slug}`} className="group block" data-cursor="Read">
      <div className={cn("img-zoom grain relative overflow-hidden bg-paper", aspect)}>
        <img src={a.cover} alt={a.title} loading="lazy" decoding="async" className="h-full w-full object-cover" />
        {index !== undefined && (
          <span className="absolute left-3 top-3 t-label bg-warm-white/90 px-2 py-1 t-num">No. {String(index).padStart(2, "0")}</span>
        )}
      </div>
      <MetaRow a={a} className="mt-4" />
      <h3 className="t-h3 mt-3 transition-transform duration-500 group-hover:translate-x-1">{a.title}</h3>
      <p className="t-small text-black/60 mt-3 line-clamp-2">{a.excerpt}</p>
    </Link>
  );
}

/** Index row — typographic list item */
export function ArticleRow({ article: a, n }: { article: Article; n: number }) {
  return (
    <Link to={`/journal/${a.slug}`} className="group g items-baseline border-t border-line py-6 md:py-8" data-cursor="Read">
      <span className="col-span-1 t-label t-num text-black/45">{String(n).padStart(2, "0")}</span>
      <span className="col-span-3 md:col-span-5 lg:col-span-7 t-h2 transition-transform duration-700 group-hover:translate-x-3">
        {a.title}
      </span>
      <span className="col-span-3 col-start-2 md:col-span-2 lg:col-span-2 lg:col-start-10 t-label text-black/50 mt-3 md:mt-0">
        {a.category} — {a.readingTime}
      </span>
      <span className="hidden md:block col-span-1 lg:col-start-12 text-right">
        <span className="arrow arrow-x">→</span>
      </span>
    </Link>
  );
}

/** Horizontal rail with mouse drag-to-scroll; native swipe on touch; keyboard scrollable. */
export function DragRail({ children, label }: { children: ReactNode; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const state = useRef({ down: false, x: 0, left: 0, moved: false });
  return (
    <div
      ref={ref}
      role="region"
      aria-label={label}
      tabIndex={0}
      data-cursor="Drag"
      className="no-scrollbar flex gap-[var(--gutter)] overflow-x-auto px-[var(--margin)] snap-x snap-mandatory md:snap-none"
      onPointerDown={(e) => {
        if (e.pointerType !== "mouse" || !ref.current) return;
        state.current = { down: true, x: e.clientX, left: ref.current.scrollLeft, moved: false };
      }}
      onPointerMove={(e) => {
        const s = state.current;
        if (!s.down || !ref.current) return;
        const dx = e.clientX - s.x;
        if (Math.abs(dx) > 4) s.moved = true;
        ref.current.scrollLeft = s.left - dx;
      }}
      onPointerUp={() => (state.current.down = false)}
      onPointerLeave={() => (state.current.down = false)}
      onClickCapture={(e) => {
        if (state.current.moved) {
          e.preventDefault();
          e.stopPropagation();
          state.current.moved = false;
        }
      }}
      onDragStart={(e) => e.preventDefault()}
    >
      {children}
    </div>
  );
}
