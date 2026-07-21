import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { allCaseStudiesQuery, type CaseStudyWithTags } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { INDUSTRIES } from "@/lib/blogFilters"
import BlogFeed from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "적용사례 | Factorix",
  description: "산업군·공정별로 살펴보는 팩토릭스 적용사례",
}

const INDUSTRY_LABEL: Record<string, string> = Object.fromEntries(INDUSTRIES.map((i) => [i.key, i.label]))

type Props = {
  searchParams: Promise<{ industry?: string; process?: string }>
}

export default async function CaseStudiesPage({ searchParams }: Props) {
  const { industry, process } = await searchParams
  const { data } = await sanityFetch({ query: allCaseStudiesQuery })
  const items = ((data as CaseStudyWithTags[]) ?? []).filter(
    (item) => (!industry || item.industries === industry) && (!process || item.processes === process)
  )

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <BlogFeed
        emptyMessage="조건에 맞는 적용사례가 없습니다."
        items={items.map((item) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          href: `${ROUTES.blog.cases}/${item.slug}`,
          publishedAt: item.publishedAt,
          categoryLabel: "적용사례",
          tag: item.industries ? INDUSTRY_LABEL[item.industries] ?? item.industries : null,
        }))}
      />
    </div>
  )
}
