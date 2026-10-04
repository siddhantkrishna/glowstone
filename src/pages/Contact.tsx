import { useSearchParams } from "react-router-dom";
import { STUDIO } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { useMumbaiTime } from "@/lib/hooks";
import ContactForm from "@/components/ContactForm";
import { ArrowLink, MaskLines, Reveal } from "@/components/ui";

export default function Contact() {
  useSeo({
    title: "Contact — Start a Project — Glowstone",
    description: "Tell Glowstone what you're building. Brands, websites, web apps, apps, games, social and creative. Mumbai, India — hello@glowstone.studio.",
    path: "/contact",
    jsonLd: { "@type": "ContactPage", name: "Contact Glowstone", email: STUDIO.email },
  });
  const [params] = useSearchParams();
  const time = useMumbaiTime();

  return (
    <div className="bg-black text-white -mb-px">
      <section className="wrap pt-32 md:pt-44 pb-16 md:pb-28">
        <p className="t-label text-white/50 flex justify-between mb-10 md:mb-16">
          <span>(Contact) — Start a project</span>
          <span className="t-num">{time} IST</span>
        </p>
        <MaskLines
          as="h1"
          lines={["Let's build", "something", <>worth remembering<span className="text-amber">.</span></>]}
          className="t-display uppercase"
          delay={0.1}
        />
        <div className="g mt-14 md:mt-20 gap-y-10">
          <Reveal className="col-span-4 md:col-span-4 lg:col-span-5 t-lead text-white/75" delay={0.35}>
            A few questions, so the first conversation can be a useful one. Prefer email? That works too.
          </Reveal>
          <Reveal className="col-span-4 md:col-span-4 lg:col-span-4 lg:col-start-9 grid grid-cols-2 gap-6" delay={0.45}>
            <div>
              <p className="t-label text-white/45 mb-2">Studio</p>
              <p className="t-small">
                {STUDIO.city}, {STUDIO.country}
              </p>
            </div>
            <div>
              <p className="t-label text-white/45 mb-2">Email</p>
              <ArrowLink href={`mailto:${STUDIO.email}`} className="t-small">
                {STUDIO.email}
              </ArrowLink>
            </div>
          </Reveal>
        </div>
      </section>
      <section className="wrap pb-20" aria-label="Project enquiry form">
        <ContactForm initialType={params.get("type") ?? undefined} />
      </section>
    </div>
  );
}
