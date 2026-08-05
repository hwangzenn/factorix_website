import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { productBySlugQuery, relatedContentByTagsQuery, type ProductDetail, type RelatedContentItem } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentDetail from "@/components/content/ContentDetail"

type Props = { params: Promise<{ slug: string }> }

const CATEGORY = "장비"
const GROUP_LABEL = "소모품"
const PROCESS_KEY = "other"

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) return {}
  return {
    title: item.seo?.metaTitle || item.title,
    description: item.seo?.metaDescription || item.description || undefined,
    alternates: { canonical: `${ROUTES.solutions.equipment.consumables}/${slug}` },
    openGraph: (item.seo?.ogImage?.asset?.url || item.images?.[0]?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.images![0].asset.url }] }
      : undefined,
  }
}

export default async function ConsumablesDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) notFound()

  const { data: relatedData } = await sanityFetch({
    query: relatedContentByTagsQuery,
    params: { process: PROCESS_KEY },
  })

  return (
    <ContentDetail
      category={CATEGORY}
      groupLabel={GROUP_LABEL}
      backHref={ROUTES.solutions.equipment.consumables}
      data={item}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
    />
  )
}
