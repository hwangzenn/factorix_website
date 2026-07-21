import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostsByCategoryQuery, type BlogPostSummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "액상 공정 엔지니어링 위키 | Factorix",
  description: "액상 제조·디스펜싱 공정의 기초 개념과 실무 지식을 정리한 팩토릭스의 엔지니어링 위키",
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
          author: item.author,
          categoryLabel: "액상 공정 엔지니어링 위키",
          tag: item.tags?.[0] ?? null,
        }))}
      />
    </div>
  )
}
