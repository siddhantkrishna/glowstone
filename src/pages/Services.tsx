import { SERVICES, type Service } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "framer-motion";
import { Button, ImageReveal, MaskLines, Reveal } from "@/components/ui";

const TYPE_MAP: Record<string, string> = {
  branding: "Brand",
  websites: "Website",
  "web-apps": "Web App",
  apps: "App",
  games: "Game",
  social: "Social",
  creative: "Creative",
};

export default function Services() {
  useSeo({
    title: "Services — Glowstone",
    description:
      "Branding, websites, web apps, apps, games, social and creative — strategy, design and technology delivered by one focused studio.",
    path: "/services",
    jsonLd: {
      "@type": "ItemList",
      itemListElement: SERVICES.map((s, i) => ({ "@type": "ListItem", position: i + 1, name: s.title, description: s.short })),
    },
  });
  const reduce = useReducedMotion();
  const jump = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });

  return (
    <>
      <section className="wrap pt-32 md:pt-44 pb-20 md:pb-28">
        <p className="t-label text-black/50 flex justify-between mb-10 md:mb-16">
          <span>(Services) — Seven disciplines</span>
          <span>One standard</span>
        </p>
        <MaskLines
          as="h1"
          lines={["Strategy.", "Design.", "Technology.", <>Execution<span className="text-amber">.</span></>]}
          className="t-display uppercase"
          delay={0.1}
          stagger={0.07}
        />
        <div className="g mt-14 md:mt-20 gap-y-10">
          <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 t-lead text-black/75" delay={0.4}>
            Every engagement draws on the same four capabilities. What changes is the scale — a mark, a website, or an entire system.
          </Reveal>
          <nav aria-label="Services index" className="col-span-4 md:col-span-4 lg:col-span-5 lg:col-start-8">
            <ol>
              {SERVICES.map((s) => (
                <li key={s.slug} className="border-t border-line last:border-b">
                  <button onClick={() => jump(s.slug)} className="group flex w-full items-baseline justify-between py-3 text-left">
                    <span className="flex items-baseline gap-5">
                      <span className="t-label t-num text-black/40 group-hover:text-amber transition-colors">{s.num}</span>
                      <span className="t-h3 uppercase transition-transform duration-500 group-hover:translate-x-1.5">{s.title}</span>
                    </span>
                    <span className="arrow arrow-d t-label">↓</span>
                  </button>
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {SERVICES.map((s, i) => (
        <ServiceSection key={s.slug} s={s} i={i} />
      ))}

      <section className="wrap py-28 md:py-40 g gap-y-10">
        <p className="col-span-4 md:col-span-2 lg:col-span-3 t-label text-black/50">Not sure?</p>
        <div className="col-span-4 md:col-span-6 lg:col-span-8 lg:col-start-5">
          <MaskLines as="h2" lines={["Most projects", "don't fit one box."]} className="t-h1 uppercase" />
          <Reveal className="mt-8 max-w-lg t-lead text-black/70" delay={0.2}>
            Tell us the problem. We'll recommend the smallest set of disciplines that solves it properly.
          </Reveal>
          <Reveal className="mt-10" delay={0.3}>
            <Button to="/contact" size="lg">Start a project</Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}

function ServiceSection({ s, i }: { s: Service; i: number }) {
  const flip = i % 2 === 1;
  return (
    <section id={s.slug} aria-labelledby={`${s.slug}-title`} className={cn("scroll-mt-16 py-20 md:py-32", i % 2 === 1 && "bg-paper")}>
      <div className="wrap">
        <div className={cn(i % 2 === 1 ? "border-black/15" : "border-line", "border-t pt-3 flex justify-between t-label text-black/50")}>
          <span className="t-num">{s.num} / 07</span>
          <span>Service</span>
        </div>
        <div className="g mt-10 md:mt-16 gap-y-12">
          <div className={cn("col-span-4 md:col-span-8 lg:col-span-12", flip && "lg:text-right")}>
            <MaskLines as="h2" lines={[s.title]} className="t-mega uppercase" />
            <span id={`${s.slug}-title`} className="sr-only">{s.title}</span>
          </div>
          <Reveal className={cn("col-span-4 md:col-span-6 lg:col-span-5", flip ? "lg:col-start-1" : "lg:col-start-8")}>
            <p className="t-serif italic text-[clamp(1.6rem,2.4vw,2.4rem)] leading-[1.08]">{s.statement}</p>
          </Reveal>
        </div>

        <div className="g mt-14 md:mt-24 gap-y-12">
          <div className={cn("col-span-4 md:col-span-4 lg:col-span-6", flip && "lg:col-start-7 lg:row-start-1")}>
            <ImageReveal src={s.image} alt={`${s.title} — visual reference`} className="aspect-[4/5] md:aspect-[5/6]" cursor="Explore" />
          </div>
          <div className={cn("col-span-4 md:col-span-4 lg:col-span-5 flex flex-col gap-12", flip ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-8")}>
            <Reveal>
              <p className="t-label text-black/45 mb-4">Description</p>
              <p className="t-lead text-black/80">{s.description}</p>
            </Reveal>
            <Reveal>
              <p className="t-label text-black/45 mb-4">Deliverables</p>
              <ul>
                {s.deliverables.map((d, j) => (
                  <li key={d} className="flex items-baseline justify-between border-t border-black/10 py-2.5 last:border-b">
                    <span className="t-small">{d}</span>
                    <span className="t-label t-num text-black/35">{String(j + 1).padStart(2, "0")}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal>
              <p className="t-label text-black/45 mb-4">Process</p>
              <ol className="grid grid-cols-2 gap-x-4 gap-y-6">
                {s.process.map((p, j) => (
                  <li key={p} className="border-t border-black pt-2">
                    <span className="t-label t-num text-amber">{String(j + 1).padStart(2, "0")}</span>
                    <p className="t-small mt-1">{p}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
            <Reveal>
              <Button to={`/contact?type=${encodeURIComponent(TYPE_MAP[s.slug])}`} variant={i % 2 === 1 ? "dark" : "outline"}>
                {(() => {
                  const noun = s.title.toLowerCase().replace(/s$/, "");
                  return `Start ${/^[aeiou]/.test(noun) ? "an" : "a"} ${noun} project`;
                })()}
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
