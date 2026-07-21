import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "뉴스 | Factorix",
  description: "팩토릭스의 언론보도, 특허/수상 등 소식",
}

type Props = {
  searchParams: Promise<{ industry?: string; process?: string }>
}

export default async function NewsPage({ searchParams }: Props) {
  const { industry, process } = await searchParams
  const { data } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "news" } })
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
          href: `${ROUTES.blog.news}/${item.slug}`,
          publishedAt: item.publishedAt,
          author: item.author,
          categoryLabel: "뉴스",
          tag: item.tags?.[0] ?? null,
        }))}
      />
    </div>
  )
}
