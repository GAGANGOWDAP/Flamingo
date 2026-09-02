export function updatePageSEO({
  title,
  description,
  canonicalUrl,
  ogImage,
  ogType = "website",
  jsonLd,
}: {
  title: string;
  description: string;
  canonicalUrl: string;
  ogImage?: string;
  ogType?: "website" | "product";
  jsonLd?: object[];
}) {
  if (typeof window === "undefined") return;

  document.title = title;

  const setMeta = (nameAttr: string, valAttr: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${valAttr}"]`);
    if (!el) {
      el = document.createElement("meta");
      el.setAttribute(nameAttr, valAttr);
      document.head.appendChild(el);
    }
    el.setAttribute("content", content);
  };

  setMeta("name", "description", description);
  setMeta("property", "og:title", title);
  setMeta("property", "og:description", description);
  setMeta("property", "og:url", canonicalUrl);
  setMeta("property", "og:type", ogType);
  setMeta("property", "og:site_name", "Flamingo Premium Syrups");
  if (ogImage) setMeta("property", "og:image", ogImage);

  setMeta("name", "twitter:card", "summary_large_image");
  setMeta("name", "twitter:title", title);
  setMeta("name", "twitter:description", description);
  if (ogImage) setMeta("name", "twitter:image", ogImage);

  let canonicalEl = document.querySelector(
    'link[rel="canonical"]',
  ) as HTMLLinkElement | null;
  if (!canonicalEl) {
    canonicalEl = document.createElement("link");
    canonicalEl.setAttribute("rel", "canonical");
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute("href", canonicalUrl);

  const existingScripts = document.querySelectorAll(
    'script[type="application/ld+json"]',
  );
  existingScripts.forEach((s) => s.remove());

  if (jsonLd && jsonLd.length > 0) {
    jsonLd.forEach((item, index) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.id = `seo-jsonld-${index}`;
      script.text = JSON.stringify(item);
      document.head.appendChild(script);
    });
  }
}
