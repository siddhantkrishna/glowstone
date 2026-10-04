import { cn } from "@/utils/cn";

type Option = { value: string; label: string; count?: number };

/** Editorial filter row — superscript counts, sliding underline, aria-pressed toggles. */
export default function FilterBar({
  options,
  value,
  onChange,
  label,
  className,
  trailing,
}: {
  options: Option[];
  value: string;
  onChange: (v: string) => void;
  label: string;
  className?: string;
  trailing?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "sticky top-14 z-30 bg-warm-white/90 backdrop-blur-xl border-y border-line transition-[top] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] [html[data-nav=hidden]_&]:top-0",
        className
      )}
    >
      <div className="wrap flex items-center gap-6 h-14">
        <span className="t-label text-black/45 hidden md:inline shrink-0">Filter</span>
        <div role="group" aria-label={label} className="no-scrollbar flex items-center gap-5 md:gap-7 overflow-x-auto flex-1 -mx-1 px-1">
          {options.map((o) => {
            const active = o.value === value;
            return (
              <button
                key={o.value}
                onClick={() => onChange(o.value)}
                aria-pressed={active}
                disabled={o.count === 0}
                className={cn(
                  "relative t-label shrink-0 py-2 transition-colors duration-300 disabled:opacity-25",
                  active ? "text-black" : "text-black/45 hover:text-black"
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  {active && <span className="h-1.5 w-1.5 rounded-full bg-amber" aria-hidden />}
                  {o.label}
                  {o.count !== undefined && <sup className="t-num text-[9px] text-black/40">{String(o.count).padStart(2, "0")}</sup>}
                </span>
                <span
                  className={cn(
                    "absolute left-0 -bottom-px h-px bg-black transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                    active ? "w-full" : "w-0"
                  )}
                  aria-hidden
                />
              </button>
            );
          })}
        </div>
        {trailing}
      </div>
    </div>
  );
}
