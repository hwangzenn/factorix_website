import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostBySlugQuery, relatedBlogPostsByTagQuery, type BlogPostDetail, type RelatedBlogPostByTag } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ResourceDetail from "@/app/resources/_components/ResourceDetail"

const CATEGORY_ROUTE: Record<string, string> = {
  insight: ROUTES.blog.insight,
  "guide-intro": ROUTES.blog.guideIntro,
  news: ROUTES.blog.news,
}

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) return {}
  return {
    title: `${item.seo?.metaTitle || item.title} | Factorix`,
    description: item.seo?.metaDescription || item.description || undefined,
    openGraph: (item.seo?.ogImage?.asset?.url || item.thumbnail?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.thumbnail!.asset.url }] }
      : undefined,
  }
}

export default async function GuideIntroDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) notFound()

  const { data: relatedData } = await sanityFetch({
    query: relatedBlogPostsByTagQuery,
    params: { tags: item.tags ?? [], slug },
  })
  const related = ((relatedData as RelatedBlogPostByTag[]) ?? []).map((p) => ({
    _id: p._id,
    title: p.title,
    href: `${CATEGORY_ROUTE[p.category] ?? ROUTES.blog.guideIntro}/${p.slug}`,
    publishedAt: p.publishedAt,
    thumbnail: p.thumbnail,
  }))

  return (
    <ResourceDetail
      eyebrow="블로그 · 액상 공정 엔지니어링 위키"
      backHref={ROUTES.blog.guideIntro}
      backLabel="액상 공정 엔지니어링 위키"
      data={item}
      related={related}
      breadcrumbRoot={{ label: "블로그", href: ROUTES.blog.all }}
      contentInquirySlug={item.slug}
      browseMoreHref={ROUTES.blog.guideIntro}
    />
  )
}
