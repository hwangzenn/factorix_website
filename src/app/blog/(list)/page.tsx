import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import {
  allBlogPostsQuery,
  allCaseStudiesQuery,
  type BlogPostSummary,
  type CaseStudyWithTags,
} from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { INDUSTRIES, PROCESSES } from "@/lib/blogFilters"
import BlogFeed, { type FeedItem } from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "블로그",
  description: "액제제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트, 엔지니어링 위키, 고객 적용사례, 팩토릭스 뉴스",
  alternates: { canonical: ROUTES.blog.all },
}

const CATEGORY_PATH: Record<string, string> = {
  insight: ROUTES.blog.insight,
  wiki: ROUTES.blog.guideIntro,
  news: ROUTES.blog.news,
}

const CATEGORY_LABEL: Record<string, string> = {
  insight: "인사이트",
  wiki: "엔지니어링 위키",
  news: "팩토릭스 뉴스",
}

const INDUSTRY_LABEL: Record<string, string> = Object.fromEntries(INDUSTRIES.map((i) => [i.key, i.label]))
const PROCESS_LABEL: Record<string, string> = Object.fromEntries(PROCESSES.map((p) => [p.key, p.label]))

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
      processLabel: p.processes ? PROCESS_LABEL[p.processes] ?? p.processes : null,
    })),
    ...cases.map((c) => ({
      _id: c._id,
      title: c.title,
      description: c.description,
      publishedAt: c.publishedAt,
      thumbnail: c.thumbnail,
      href: `${ROUTES.blog.cases}/${c.slug}`,
      categoryLabel: "고객 적용사례",
      tag: c.industries ? INDUSTRY_LABEL[c.industries] ?? c.industries : null,
      processLabel: c.processes ? PROCESS_LABEL[c.processes] ?? c.processes : null,
    })),
  ].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))

  return (
    <div className="max-w-5xl mx-auto px-6 py-14">
      <BlogFeed items={items} />
    </div>
  )
}
