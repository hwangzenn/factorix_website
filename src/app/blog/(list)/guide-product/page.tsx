import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "제품 선택 방법 | Factorix",
  description: "우리 현장에 맞는 장비를 고르는 법, 팩토릭스의 제품 선택 가이드",
}

type Props = {
  searchParams: Promise<{ industry?: string; process?: string }>
}

export default async function GuideProductPage({ searchParams }: Props) {
  const { industry, process } = await searchParams
  const { data } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "guide-product" } })
  const items = ((data as BlogPostSummary[]) ?? []).filter(
    (item) => (!industry || item.industries === industry) && (!process || item.processes === process)
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <BlogFeed
        items={items.map((item) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          href: `${ROUTES.blog.guideProduct}/${item.slug}`,
          publishedAt: item.publishedAt,
          categoryLabel: "제품 선택 방법",
          tag: item.tags?.[0] ?? null,
        }))}
      />
    </div>
  )
}
