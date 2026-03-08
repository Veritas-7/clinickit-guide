import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMeta, BASE_URL, SITE_NAME } from "@/data/seoConfig";

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname];
    if (!meta) return;

    // Title
    document.title = meta.title;

    // Helper to set/create meta tag
    const setMeta = (attr: string, value: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${value}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, value);
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    // Meta description
    setMeta("name", "description", meta.description);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${pathname === "/" ? "" : pathname}`);

    // Open Graph
    setMeta("property", "og:title", meta.ogTitle || meta.title);
    setMeta("property", "og:description", meta.ogDescription || meta.description);
    setMeta("property", "og:type", meta.ogType || "website");
    setMeta("property", "og:url", `${BASE_URL}${pathname === "/" ? "" : pathname}`);
    setMeta("property", "og:site_name", SITE_NAME);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.ogTitle || meta.title);
    setMeta("name", "twitter:description", meta.ogDescription || meta.description);

    // JSON-LD
    const existingLd = document.querySelector('script[data-page-jsonld]');
    if (existingLd) existingLd.remove();
    if (meta.jsonLd) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.setAttribute("data-page-jsonld", "true");
      script.textContent = JSON.stringify(meta.jsonLd);
      document.head.appendChild(script);
    }
  }, [pathname]);
}
