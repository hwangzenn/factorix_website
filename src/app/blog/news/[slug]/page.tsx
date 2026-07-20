import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { blogPostBySlugQuery, type BlogPostDetail } from "@/sanity/lib/queries"
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

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: blogPostBySlugQuery, params: { slug } })
  const item = data as BlogPostDetail | null
  if (!item) notFound()

  return (
    <ResourceDetail
      eyebrow="블로그 · 뉴스"
      backHref={ROUTES.blog.news}
      backLabel="뉴스"
      data={item}
    />
  )
}
