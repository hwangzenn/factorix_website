import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { PROCESSES } from "@/lib/blogFilters"
import BlogFeed from "@/components/blog/BlogFeed"

const PROCESS_LABEL: Record<string, string> = Object.fromEntries(PROCESSES.map((p) => [p.key, p.label]))

export const revalidate = 3600

export const metadata: Metadata = {
  title: "뉴스",
  description: "팩토릭스의 언론보도, 특허/수상 등 소식",
  alternates: { canonical: ROUTES.blog.news },
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
          categoryLabel: "뉴스",
          processLabel: item.processes ? PROCESS_LABEL[item.processes] ?? item.processes : null,
        }))}
      />
    </div>
  )
}
