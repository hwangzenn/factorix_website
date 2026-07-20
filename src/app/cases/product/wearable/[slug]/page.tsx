import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { caseStudyBySlugQuery, type CaseStudyDetail } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentDetail from "@/components/content/ContentDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: caseStudyBySlugQuery, params: { slug } })
  const item = data as CaseStudyDetail | null
  if (!item) return {}
  return {
    title: `${item.seo?.metaTitle || item.title} | Factorix`,
    description: item.seo?.metaDescription || item.description || undefined,
    openGraph: (item.seo?.ogImage?.asset?.url || item.thumbnail?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.thumbnail!.asset.url }] }
      : undefined,
  }
}

export default async function WearableCaseDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: caseStudyBySlugQuery, params: { slug } })
  const item = data as CaseStudyDetail | null
  if (!item) notFound()

  return (
    <ContentDetail
      eyebrow="적용사례 · 제품유형별 · 웨어러블 디바이스"
      backHref={ROUTES.cases.product.wearable}
      backLabel="웨어러블 적용사례"
      data={item}
    />
  )
}
