import { MetadataRoute } from "next";
import { flattenRoutes, ROUTES } from "@/lib/routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = flattenRoutes(ROUTES).filter((p) => p !== "/");
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://factorix.co.kr";

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...paths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
