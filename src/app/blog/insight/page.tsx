import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogHero from "@/components/blog/BlogHero"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "인사이트 | Factorix",
  description: "액제제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트",
}

export default async function InsightPage() {
  const { data } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "insight" } })
  const items = (data as BlogPostSummary[]) ?? []

  return (
    <div>
      <BlogHero
        title="인사이트"
        description="액제제조·디스펜싱 자동화 시장과 기술 트렌드에 대한 팩토릭스의 인사이트"
        active="insight"
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <BlogFeed
          items={items.map((item) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail,
            href: `${ROUTES.blog.insight}/${item.slug}`,
            publishedAt: item.publishedAt,
            categoryLabel: "인사이트",
            tag: item.tags?.[0] ?? null,
          }))}
        />
      </div>
    </div>
  )
}
