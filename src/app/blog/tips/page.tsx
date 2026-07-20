import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogHero from "@/components/blog/BlogHero"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "팁 | Factorix",
  description: "액제제조·디스펜싱 자동화 현장에서 바로 쓰는 팩토릭스의 팁",
}

export default async function TipsPage() {
  const { data } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "tips" } })
  const items = (data as BlogPostSummary[]) ?? []

  return (
    <div>
      <BlogHero
        title="팁"
        description="현장에서 바로 써먹는 액제제조·디스펜싱 자동화 실전 팁"
        active="tips"
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <BlogFeed
          items={items.map((item) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            thumbnail: item.thumbnail,
            href: `${ROUTES.blog.tips}/${item.slug}`,
            publishedAt: item.publishedAt,
            categoryLabel: "팁",
            tag: item.tags?.[0] ?? null,
          }))}
        />
      </div>
    </div>
  )
}
