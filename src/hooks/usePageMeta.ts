import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { routeMeta, fallbackMeta, BASE_URL, SITE_NAME, DEFAULT_OG_IMAGE } from "@/data/seoConfig";

export function usePageMeta() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = routeMeta[pathname] || fallbackMeta;

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

    // Robots
    if (meta.noindex) {
      setMeta("name", "robots", "noindex, nofollow");
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.remove();
    }

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", `${BASE_URL}${pathname === "/" ? "" : pathname}`);

    const fullUrl = `${BASE_URL}${pathname === "/" ? "" : pathname}`;
    const ogImage = meta.ogImage || DEFAULT_OG_IMAGE;
    const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${BASE_URL}${ogImage}`;

    // Open Graph
    setMeta("property", "og:title", meta.ogTitle || meta.title);
    setMeta("property", "og:description", meta.ogDescription || meta.description);
    setMeta("property", "og:type", meta.ogType || "website");
    setMeta("property", "og:url", fullUrl);
    setMeta("property", "og:site_name", SITE_NAME);
    setMeta("property", "og:image", ogImageUrl);

    // Twitter
    setMeta("name", "twitter:card", "summary_large_image");
    setMeta("name", "twitter:title", meta.ogTitle || meta.title);
    setMeta("name", "twitter:description", meta.ogDescription || meta.description);
    setMeta("name", "twitter:image", ogImageUrl);

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
