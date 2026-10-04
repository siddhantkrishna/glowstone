import { useParams } from "react-router-dom";
import { STUDIO } from "@/data/content";
import { useSeo } from "@/lib/seo";
import { MaskLines } from "@/components/ui";
import NotFound from "./NotFound";

const DOCS: Record<string, { title: string; sections: { h: string; p: string }[] }> = {
  privacy: {
    title: "Privacy",
    sections: [
      { h: "What we collect", p: "Only what you choose to send us — typically your name, email, company and project details when you write to us or use the contact form." },
      { h: "How we use it", p: "To reply to you and, if we work together, to run the project. We do not sell, rent or share personal information with third parties for marketing." },
      { h: "Retention", p: "Enquiries are kept for as long as they are useful to the conversation. Ask us to delete your information at any time and we will." },
      { h: "Contact", p: `Questions about privacy can be sent to ${STUDIO.email}.` },
    ],
  },
  terms: {
    title: "Terms",
    sections: [
      { h: "Use of this site", p: "Content on this website is provided for information. You may share links freely; please don't reproduce work, imagery or writing without permission." },
      { h: "Project work", p: "Every engagement is governed by its own written agreement covering scope, timeline, fees and ownership. Nothing on this site forms a contract." },
      { h: "Intellectual property", p: "Project imagery belongs to Glowstone or its clients. The Glowstone name and identity may not be used without written consent." },
    ],
  },
  cookies: {
    title: "Cookies",
    sections: [
      { h: "Our approach", p: "This website does not use advertising or tracking cookies. A single session value remembers that you have seen the opening sequence, so it isn't shown twice." },
      { h: "Third parties", p: "Fonts are served by Google Fonts and some media by an external video host. These services may log standard technical information such as your IP address." },
    ],
  },
};

export default function Legal() {
  const { slug = "" } = useParams();
  const doc = DOCS[slug];
  useSeo({
    title: doc ? `${doc.title} — Glowstone` : "Not found — Glowstone",
    description: doc ? `${doc.title} information for glowstone.studio.` : "Page not found.",
    path: `/legal/${slug}`,
  });
  if (!doc) return <NotFound />;
  return (
    <section className="wrap pt-32 md:pt-44 pb-28 md:pb-40">
      <p className="t-label text-black/50 flex justify-between mb-10 md:mb-16">
        <span>(Legal)</span>
        <span>Last updated — {new Date().getFullYear()}</span>
      </p>
      <MaskLines as="h1" lines={[doc.title]} className="t-mega uppercase" delay={0.1} />
      <div className="g mt-16 md:mt-24">
        <div className="col-span-4 md:col-span-6 md:col-start-2 lg:col-span-6 lg:col-start-5 space-y-10">
          {doc.sections.map((s, i) => (
            <div key={s.h} className="border-t border-line pt-4">
              <h2 className="t-label flex gap-4">
                <span className="t-num text-black/40">{String(i + 1).padStart(2, "0")}</span>
                {s.h}
              </h2>
              <p className="t-body text-black/75 mt-4">{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
