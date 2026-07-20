import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialBySlugQuery, type ReferenceMaterialDetail } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ResourceDetail from "../../_components/ResourceDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: referenceMaterialBySlugQuery, params: { slug } })
  const item = data as ReferenceMaterialDetail | null
  if (!item) return {}
  return {
    title: `${item.seo?.metaTitle || item.title} | Factorix`,
    description: item.seo?.metaDescription || item.description || undefined,
    openGraph: (item.seo?.ogImage?.asset?.url || item.thumbnail?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.thumbnail!.asset.url }] }
      : undefined,
  }
}

export default async function IrDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: referenceMaterialBySlugQuery, params: { slug } })
  const item = data as ReferenceMaterialDetail | null
  if (!item) notFound()

  return (
    <ResourceDetail
      eyebrow="자료실 · 투자정보"
      backHref={ROUTES.resources}
      backLabel="자료실"
      data={item}
    />
  )
}
