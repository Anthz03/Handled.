import type { MetadataRoute } from "next";
import { posts, projects, services } from "@/lib/data";
import { nav, site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    ...nav.map((n) => n.href),
    "/start-project",
    "/process",
    "/privacy",
    "/terms",
    ...services.map((s) => `/services/${s.slug}`),
    ...projects.map((p) => `/projects/${p.slug}`),
    ...posts.map((p) => `/insights/${p.slug}`),
  ];
  return paths.map((p) => ({ url: `${site.url}${p === "/" ? "" : p}` }));
}
