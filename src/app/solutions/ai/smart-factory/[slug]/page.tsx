import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { productBySlugQuery, type ProductDetail } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentDetail from "@/components/content/ContentDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) return {}
  return {
    title: `${item.seo?.metaTitle || item.title} | Factorix`,
    description: item.seo?.metaDescription || item.description || undefined,
    openGraph: (item.seo?.ogImage?.asset?.url || item.images?.[0]?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.images![0].asset.url }] }
      : undefined,
  }
}

export default async function SmartFactoryDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) notFound()

  return (
    <ContentDetail
      eyebrow="액제제조 솔루션 · AI 시스템 · 자동화 시스템"
      backHref={ROUTES.solutions.ai.smartFactory}
      data={item}
    />
  )
}
