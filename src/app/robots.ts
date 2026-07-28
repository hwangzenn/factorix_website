import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.factorix.co.kr";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/sanity/", "/api/"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
