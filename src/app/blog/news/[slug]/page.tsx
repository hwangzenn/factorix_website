import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostBySlugQuery, blogPostRelatedPoolQuery, type BlogPostDetail, type RelatedBlogPostCandidate } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { pickRelatedByPriority } from "@/lib/relatedContent"
import ResourceDetail from "@/app/resources/_components/ResourceDetail"

const CATEGORY_ROUTE: Record<string, string> = {
  insight: ROUTES.blog.insight,
  wiki: ROUTES.blog.guideIntro,
  news: ROUTES.blog.news,
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) return {}
  return {
    title: item.seo?.metaTitle || item.title,
    description: item.seo?.metaDescription || item.description || undefined,
    alternates: { canonical: `${ROUTES.blog.news}/${slug}` },
    openGraph: (item.seo?.ogImage?.asset?.url || item.thumbnail?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.thumbnail!.asset.url }] }
      : undefined,
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) notFound()

  const { data: poolData } = await sanityFetch({
    query: blogPostRelatedPoolQuery,
    params: { slug },
  })
  const pool = (poolData as RelatedBlogPostCandidate[]) ?? []
  const relatedPicks = pickRelatedByPriority(pool, [
    (p) => !!item.industries && p.industries === item.industries,
    (p) => p.category === item.category,
  ])
  const related = relatedPicks.map((p) => ({
    _id: p._id,
    title: p.title,
    href: `${CATEGORY_ROUTE[p.category] ?? ROUTES.blog.news}/${p.slug}`,
    publishedAt: p.publishedAt,
    thumbnail: p.thumbnail,
  }))

  return (
    <ResourceDetail
      eyebrow="블로그 · 뉴스"
      backHref={ROUTES.blog.news}
      backLabel="뉴스"
      data={item}
      related={related}
      breadcrumbRoot={{ label: "블로그", href: ROUTES.blog.all }}
      contentInquirySlug={item.slug}
      browseMoreHref={ROUTES.blog.news}
    />
  )
}
