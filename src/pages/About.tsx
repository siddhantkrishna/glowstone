import { Link } from "react-router-dom";
import { IMG, SERVICES, STUDIO, TEAM } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { useMumbaiTime } from "@/lib/hooks";
import { ImageReveal, MaskLines, Reveal, ScrollWords, SectionLabel } from "@/components/ui";

export default function About() {
  useSeo({
    title: "About — Glowstone",
    description:
      "Glowstone is an independent creative technology studio in Mumbai working across strategy, identity, digital experiences and technology. Founded by Siddhant Krishna.",
    path: "/about",
    jsonLd: { "@type": "AboutPage", name: "About Glowstone", mainEntity: { "@type": "Person", name: "Siddhant Krishna", jobTitle: "Founder" } },
  });
  const time = useMumbaiTime();
  const founder = TEAM[0];

  return (
    <>
      {/* Hero */}
      <section className="wrap pt-32 md:pt-44 pb-16 md:pb-24">
        <p className="t-label text-black/50 flex justify-between mb-10 md:mb-16">
          <span>(About) — The studio</span>
          <span>
            {STUDIO.city} — {STUDIO.country}
          </span>
        </p>
        <MaskLines
          as="h1"
          lines={["We make", "complex things", <>feel simple<span className="text-amber">.</span></>]}
          className="t-display uppercase"
          delay={0.1}
        />
        <div className="g mt-14 md:mt-20">
          <Reveal className="col-span-4 md:col-span-5 md:col-start-4 lg:col-span-5 lg:col-start-8 t-lead text-black/75" delay={0.4}>
            Glowstone is an independent creative technology studio working across strategy, identity, digital experiences and technology.
          </Reveal>
        </div>
      </section>

      <ImageReveal src={IMG.arch} alt="A quiet white gallery corridor with geometric light from a skylight." className="h-[60svh] md:h-[90svh] w-full" priority intensity={9} />
      <p className="wrap t-label text-black/50 mt-3">Fig. 01 — Space, light, structure.</p>

      {/* Who we are */}
      <section className="pt-28 md:pt-40 pb-20" aria-labelledby="who">
        <SectionLabel index="01" label="Who we are" />
        <div className="wrap g mt-12 md:mt-20 gap-y-10">
          <h2 id="who" className="sr-only">Who we are</h2>
          <div className="col-span-4 md:col-span-8 lg:col-span-9 lg:col-start-4">
            <ScrollWords
              className="t-h2"
              text="A small, focused studio that sits between design and engineering. We work with businesses, organizations, founders and people building meaningful things — and we stay close to the work from first conversation to final release."
            />
          </div>
        </div>
      </section>

      {/* What we believe */}
      <section className="pb-28 md:pb-40" aria-labelledby="believe">
        <SectionLabel index="02" label="What we believe" note="Three words, applied daily" />
        <h2 id="believe" className="sr-only">What we believe</h2>
        <div className="wrap g mt-12 md:mt-20 gap-y-14">
          {[
            { w: "Clarity", t: "If people can't understand it, it doesn't work — however good it looks." },
            { w: "Distinction", t: "Being specific is how you become recognisable. Noise is not distinction." },
            { w: "Purpose", t: "Every element should earn its place. Decoration that serves nothing is removed." },
          ].map((b, i) => (
            <Reveal key={b.w} delay={i * 0.08} className="col-span-4 md:col-span-8 lg:col-span-4 border-t border-black pt-4">
              <span className="t-label t-num">{String(i + 1).padStart(2, "0")}</span>
              <p className="t-h1 uppercase mt-10 md:mt-16">
                {b.w}
                <span className="text-amber">.</span>
              </p>
              <p className="t-body text-black/65 mt-5 max-w-sm">{b.t}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* How we work */}
      <section className="bg-black text-white py-28 md:py-40" aria-labelledby="how">
        <SectionLabel index="03" label="How we work" inverted note="AI-assisted. Human-directed." />
        <div className="wrap g mt-12 md:mt-20 gap-y-12">
          <MaskLines
            as="h2"
            lines={["AI-assisted.", <span key="h" className="t-serif normal-case italic tracking-[-0.02em] text-amber">Human-directed.</span>]}
            className="col-span-4 md:col-span-8 lg:col-span-9 t-display uppercase"
          />
          <span id="how" className="sr-only">How we work</span>
          <div className="col-span-4 md:col-span-8 lg:col-span-12 g !grid-cols-1 md:!grid-cols-3 gap-y-10 mt-8">
            {[
              ["Direct access", "You work with the people doing the work. No account layers, no hand-offs into the dark."],
              ["Systems thinking", "We design rules and components that keep working after we leave — not one-off artefacts."],
              ["Tools in service", "We use AI to move faster through research, exploration and production. Judgement stays with people."],
            ].map(([t, b], i) => (
              <Reveal key={t} delay={i * 0.08} className="border-t border-white/20 pt-4 md:pr-8">
                <p className="t-label text-white/45 t-num">{String(i + 1).padStart(2, "0")}</p>
                <p className="t-h3 mt-6">{t}</p>
                <p className="t-small text-white/60 mt-3">{b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* What we build */}
      <section className="pt-28 md:pt-40 pb-20" aria-labelledby="build">
        <SectionLabel index="04" label="What we build" />
        <h2 id="build" className="sr-only">What we build</h2>
        <ul className="wrap mt-12 md:mt-16">
          {SERVICES.map((s) => (
            <li key={s.slug} className="border-t border-line last:border-b">
              <Link to={`/services#${s.slug}`} className="group g items-baseline py-4 md:py-5">
                <span className="col-span-1 t-label t-num text-black/40 group-hover:text-amber transition-colors">{s.num}</span>
                <span className="col-span-3 md:col-span-3 lg:col-span-4 t-h2 uppercase transition-transform duration-500 group-hover:translate-x-2">{s.title}</span>
                <span className="hidden md:block md:col-span-3 lg:col-span-5 lg:col-start-7 t-small text-black/55">{s.short}</span>
                <span className="hidden md:block col-span-1 lg:col-start-12 text-right arrow arrow-x">→</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Why we exist */}
      <section className="wrap py-24 md:py-40" aria-labelledby="why">
        <div className="g gap-y-10">
          <p className="col-span-4 md:col-span-2 lg:col-span-3 t-label text-black/50">(05) — Why we exist</p>
          <h2 id="why" className="sr-only">Why we exist</h2>
          <div className="col-span-4 md:col-span-6 lg:col-span-9">
            <MaskLines
              as="p"
              lines={["Most businesses have to choose", "between people who design well", "and people who build well."]}
              className="t-h2"
            />
            <Reveal delay={0.4}>
              <p className="t-serif italic text-[clamp(2.4rem,6vw,6.5rem)] leading-[0.95] mt-8">We exist so they don't have to.</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="pt-12 pb-28 md:pb-40" aria-labelledby="founder-name">
        <SectionLabel index="06" label="Founder" note="Profile" />
        <div className="wrap g mt-12 md:mt-20 gap-y-12">
          <div className="col-span-4 md:col-span-8 lg:col-span-12">
            <MaskLines as="h2" lines={["Siddhant", "Krishna"]} className="t-mega uppercase" />
            <span id="founder-name" className="sr-only">Siddhant Krishna, Founder</span>
          </div>
          <figure className="col-span-4 md:col-span-4 lg:col-span-5">
            <ImageReveal src={founder.image} alt="Black and white portrait of Siddhant Krishna, founder of Glowstone." className="aspect-[4/5]" />
            <figcaption className="t-label text-black/50 mt-3 flex justify-between">
              <span>Siddhant Krishna</span>
              <span>Founder</span>
            </figcaption>
          </figure>
          <div className="col-span-4 md:col-span-4 lg:col-span-6 lg:col-start-7 flex flex-col justify-between gap-12">
            <Reveal>
              <p className="t-serif italic text-[clamp(1.8rem,3vw,3rem)] leading-[1.05]">
                “Good design is mostly good decisions, made consistently.”
              </p>
            </Reveal>
            <div className="md:columns-2 gap-[var(--gutter)] space-y-5 t-body text-black/75">
              {founder.bio.map((b, i) => (
                <p key={i} className={i === 0 ? "first-letter:text-[3.4em] first-letter:float-left first-letter:leading-[0.8] first-letter:mr-2 first-letter:font-medium" : ""}>
                  {b}
                </p>
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-[var(--gutter)]">
              {[
                ["Role", "Founder"],
                ["Based", "Mumbai"],
                ["Focus", "Identity, interface, systems"],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-3">
                  <dt className="t-label text-black/45">{k}</dt>
                  <dd className="t-small mt-2">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Location */}
      <section className="wrap pb-24" aria-label="Location">
        <div className="rule" />
        <div className="g pt-6 gap-y-4 items-baseline">
          <p className="col-span-4 md:col-span-5 lg:col-span-8 t-h1 uppercase">
            {STUDIO.city}, {STUDIO.country}
          </p>
          <p className="col-span-4 md:col-span-3 lg:col-span-4 t-label text-black/55 md:text-right">
            19.07° N, 72.87° E — <span className="t-num text-black">{time}</span> IST
          </p>
        </div>
      </section>
    </>
  );
}
