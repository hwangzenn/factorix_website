import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import {
  allBlogPostsQuery,
  allCaseStudiesQuery,
  type BlogPostSummary,
  type CaseStudyWithTags,
} from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { INDUSTRIES } from "@/lib/blogFilters"
import BlogFeed, { type FeedItem } from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "블로그 | Factorix",
  description: "액제제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트, 액상제조 입문, 제품 선택 방법, 적용사례, 뉴스",
}

const CATEGORY_PATH: Record<string, string> = {
  insight: ROUTES.blog.insight,
  "guide-intro": ROUTES.blog.guideIntro,
  "guide-product": ROUTES.blog.guideProduct,
  news: ROUTES.blog.news,
}

const CATEGORY_LABEL: Record<string, string> = {
  insight: "인사이트",
  "guide-intro": "액상제조 입문",
  "guide-product": "제품 선택 방법",
  news: "뉴스",
}

const INDUSTRY_LABEL: Record<string, string> = Object.fromEntries(INDUSTRIES.map((i) => [i.key, i.label]))

type Props = {
  searchParams: Promise<{ industry?: string; process?: string }>
}

export default async function BlogAllPage({ searchParams }: Props) {
  const { industry, process } = await searchParams
  const [{ data: postData }, { data: caseData }] = await Promise.all([
    sanityFetch({ query: allBlogPostsQuery }),
    sanityFetch({ query: allCaseStudiesQuery }),
  ])
  const posts = ((postData as BlogPostSummary[]) ?? []).filter(
    (p) => (!industry || p.industries === industry) && (!process || p.processes === process)
  )
  const cases = ((caseData as CaseStudyWithTags[]) ?? []).filter(
    (c) => (!industry || c.industries === industry) && (!process || c.processes === process)
  )

  const items: FeedItem[] = [
    ...posts.map((p) => ({
      _id: p._id,
      title: p.title,
      description: p.description,
      publishedAt: p.publishedAt,
      thumbnail: p.thumbnail,
      href: `${CATEGORY_PATH[p.category]}/${p.slug}`,
      categoryLabel: CATEGORY_LABEL[p.category] ?? p.category,
      tag: p.tags?.[0] ?? null,
    })),
    ...cases.map((c) => ({
      _id: c._id,
      title: c.title,
      description: c.description,
      publishedAt: c.publishedAt,
      thumbnail: c.thumbnail,
      href: `${ROUTES.blog.cases}/${c.slug}`,
      categoryLabel: "적용사례",
      tag: c.industries ? INDUSTRY_LABEL[c.industries] ?? c.industries : null,
    })),
  ].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <BlogFeed items={items} />
    </div>
  )
}
