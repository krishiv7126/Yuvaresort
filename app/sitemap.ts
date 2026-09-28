import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

const pages = [
  { path: "", priority: 1 },
  { path: "/packages", priority: 0.9 },
  { path: "/rooms", priority: 0.9 },
  { path: "/events", priority: 0.8 },
  { path: "/amenities", priority: 0.8 },
  { path: "/experiences", priority: 0.7 },
  { path: "/gallery", priority: 0.7 },
  { path: "/inquiry", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.map(({ path, priority }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency: "monthly",
    priority,
  }));
}
