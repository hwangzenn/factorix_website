import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "액상제조 입문 | Factorix",
  description: "액제제조·디스펜싱 자동화를 처음 접하는 분들을 위한 팩토릭스의 입문 가이드",
}

type Props = {
  searchParams: Promise<{ industry?: string; process?: string }>
}

export default async function GuideIntroPage({ searchParams }: Props) {
  const { industry, process } = await searchParams
  const { data } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "guide-intro" } })
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
          href: `${ROUTES.blog.guideIntro}/${item.slug}`,
          publishedAt: item.publishedAt,
          categoryLabel: "액상제조 입문",
          tag: item.tags?.[0] ?? null,
        }))}
      />
    </div>
  )
}
