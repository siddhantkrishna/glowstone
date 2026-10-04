import { useEffect } from "react";

const SITE = "https://glowstone.studio";
const DEFAULT_IMAGE = `${SITE}/images/hero-crystal.jpg`;

type SeoInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  jsonLd?: Record<string, unknown>;
};

function setMeta(attr: "name" | "property", key: string, value: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", value);
}

/** Per-route metadata: title, description, canonical, Open Graph, X cards, JSON-LD. */
export function useSeo({ title, description, path, image, type = "website", jsonLd }: SeoInput) {
  useEffect(() => {
    const url = `${SITE}${path}`;
    const img = image ? `${SITE}/${image.replace(/^\//, "")}` : DEFAULT_IMAGE;
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:url", url);
    setMeta("property", "og:type", type);
    setMeta("property", "og:image", img);
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", img);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.route = "true";
      script.text = JSON.stringify({ "@context": "https://schema.org", ...jsonLd });
      document.head.appendChild(script);
    }
    return () => {
      script?.remove();
    };
  }, [title, description, path, image, type, jsonLd]);
}
