import { MetadataRoute } from "next";
import { flattenRoutes, ROUTES } from "@/lib/routes";
import { PRODUCT_CATEGORY_ROUTE } from "@/lib/productCategoryRoutes";
import { sanityFetch } from "@/sanity/lib/live";
import {
  sitemapBlogPostsQuery,
  sitemapCaseStudiesQuery,
  sitemapReferenceMaterialsQuery,
  sitemapProductsByCategoryQuery,
} from "@/sanity/lib/queries";

export const revalidate = 3600;

const BLOG_CATEGORY_ROUTE: Record<string, string> = {
  insight: ROUTES.blog.insight,
  wiki: ROUTES.blog.guideIntro,
  news: ROUTES.blog.news,
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.factorix.co.kr";
  const staticPaths = flattenRoutes(ROUTES).filter((p) => p !== "/");

  const [{ data: postData }, { data: caseData }, { data: resourceData }, ...productResults] =
    await Promise.all([
      sanityFetch({ query: sitemapBlogPostsQuery }),
      sanityFetch({ query: sitemapCaseStudiesQuery }),
      sanityFetch({ query: sitemapReferenceMaterialsQuery }),
      ...Object.keys(PRODUCT_CATEGORY_ROUTE).map((category) =>
        sanityFetch({ query: sitemapProductsByCategoryQuery, params: { category } })
      ),
    ]);

  const posts = (postData as { slug: string; category: string }[]) ?? [];
  const cases = (caseData as { slug: string }[]) ?? [];
  const resources = (resourceData as { slug: string; category: string }[]) ?? [];
  const productCategories = Object.keys(PRODUCT_CATEGORY_ROUTE);
  const products = productResults.flatMap((result, i) => {
    const category = productCategories[i];
    return ((result.data as { slug: string }[]) ?? []).map((p) => `${PRODUCT_CATEGORY_ROUTE[category]}/${p.slug}`);
  });

  const dynamicPaths = [
    ...posts.map((p) => `${BLOG_CATEGORY_ROUTE[p.category] ?? ROUTES.blog.news}/${p.slug}`),
    ...cases.map((c) => `${ROUTES.blog.cases}/${c.slug}`),
    ...resources.map((r) => `/resources/${r.category}/${r.slug}`),
    ...products,
  ];

  return [
    { url: base, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...dynamicPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
