import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostBySlugQuery, relatedBlogPostsQuery, type BlogPostDetail, type RelatedBlogPost } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ResourceDetail from "@/app/resources/_components/ResourceDetail"

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

export default async function InsightDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) notFound()

  const { data: relatedData } = await sanityFetch({
    query: relatedBlogPostsQuery,
    params: { category: "insight", slug },
  })
  const related = ((relatedData as RelatedBlogPost[]) ?? []).map((p) => ({
    _id: p._id,
    title: p.title,
    href: `${ROUTES.blog.insight}/${p.slug}`,
    publishedAt: p.publishedAt,
    thumbnail: p.thumbnail,
  }))

  return (
    <ResourceDetail
      eyebrow="블로그 · 인사이트"
      backHref={ROUTES.blog.insight}
      backLabel="인사이트"
      data={item}
      related={related}
    />
  )
}
