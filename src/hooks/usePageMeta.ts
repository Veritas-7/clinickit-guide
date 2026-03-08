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
    const robotsContent = meta.robots || (meta.noindex ? "noindex, nofollow" : "index, follow");
    setMeta("name", "robots", robotsContent);

    // Canonical — noindex pages still get a canonical to themselves
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

    // JSON-LD (page-specific)
    const existingLd = document.querySelector('script[data-page-jsonld]');
    if (existingLd) existingLd.remove();

    const jsonLdData = meta.jsonLd || {
      "@context": "https://schema.org",
      "@type": meta.schemaType || "WebPage",
      name: meta.ogTitle || meta.title,
      description: meta.description,
      url: fullUrl,
      isPartOf: { "@type": "WebSite", name: SITE_NAME, url: BASE_URL },
    };

    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.setAttribute("data-page-jsonld", "true");
    script.textContent = JSON.stringify(jsonLdData);
    document.head.appendChild(script);

    // BreadcrumbList JSON-LD
    const existingBc = document.querySelector('script[data-breadcrumb-jsonld]');
    if (existingBc) existingBc.remove();
    const breadcrumb = meta.breadcrumb || fallbackMeta.breadcrumb;
    if (breadcrumb && breadcrumb.length > 0) {
      const bcLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumb.map((item, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: item.name,
          item: item.url ? `${BASE_URL}${item.url === "/" ? "" : item.url}` : undefined,
        })),
      };
      const bcScript = document.createElement("script");
      bcScript.type = "application/ld+json";
      bcScript.setAttribute("data-breadcrumb-jsonld", "true");
      bcScript.textContent = JSON.stringify(bcLd);
      document.head.appendChild(bcScript);
    }
  }, [pathname]);
}
