import { useSeo } from "@/lib/seo";
import { Button, MaskLines } from "@/components/ui";

export default function NotFound() {
  useSeo({ title: "Not found — Glowstone", description: "This page doesn't exist.", path: "/404" });
  return (
    <section className="wrap min-h-[90svh] pt-32 md:pt-44 pb-24 flex flex-col justify-between">
      <p className="t-label text-black/50 flex justify-between">
        <span>(404)</span>
        <span>Missing page</span>
      </p>
      <div>
        <MaskLines as="h1" lines={["Nothing", <>here<span className="text-amber">.</span></>]} className="t-mega uppercase" delay={0.1} />
        <p className="t-serif italic text-[clamp(1.6rem,2.6vw,2.6rem)] mt-8 max-w-xl">
          Even the clearest systems have a page that doesn't exist. This is it.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button to="/">Back to the beginning</Button>
          <Button to="/work" variant="outline">See the work</Button>
        </div>
      </div>
    </section>
  );
}
