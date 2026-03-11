import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://crystalskylogistics.com";
  return [
    { url: `${base}/`,       lastModified: new Date(), changeFrequency: "weekly",  priority: 1 },
    { url: `${base}/about`,  lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/track`,  lastModified: new Date(), changeFrequency: "yearly",  priority: 0.6 },
  ];
}
