import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import {
  allBlogPostsQuery,
  allCaseStudiesQuery,
  type BlogPostSummary,
  type CaseStudyWithTags,
} from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import BlogHero from "@/components/blog/BlogHero"
import BlogFeed, { type FeedItem } from "@/components/blog/BlogFeed"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "블로그 | Factorix",
  description: "액제제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트, 팁, 케이스 스터디, 뉴스",
}

const CATEGORY_PATH: Record<string, string> = {
  insight: ROUTES.blog.insight,
  tips: ROUTES.blog.tips,
  news: ROUTES.blog.news,
}

const CATEGORY_LABEL: Record<string, string> = {
  insight: "인사이트",
  tips: "팁",
  news: "뉴스",
}

const INDUSTRY_LABEL: Record<string, string> = {
  bio: "바이오",
  cosmetics: "화장품/뷰티",
  chemical: "화학/소재",
  electronics: "전기/전자",
  automotive: "자동차",
  research: "연구기관/대학",
}

export default async function BlogAllPage() {
  const [{ data: postData }, { data: caseData }] = await Promise.all([
    sanityFetch({ query: allBlogPostsQuery }),
    sanityFetch({ query: allCaseStudiesQuery }),
  ])
  const posts = (postData as BlogPostSummary[]) ?? []
  const cases = (caseData as CaseStudyWithTags[]) ?? []

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
      categoryLabel: "케이스 스터디",
      tag: c.industries ? INDUSTRY_LABEL[c.industries] ?? c.industries : null,
    })),
  ].sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""))

  return (
    <div>
      <BlogHero
        title="블로그"
        description="적용사례부터 다양한 인사이트까지, 팩토릭스의 블로그"
        active="all"
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <BlogFeed items={items} />
      </div>
    </div>
  )
}
