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
  return { title: `${item.title} | Factorix`, description: item.description ?? undefined }
}

export default async function ChemicalCaseDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: caseStudyBySlugQuery, params: { slug } })
  const item = data as CaseStudyDetail | null
  if (!item) notFound()

  return (
    <ContentDetail
      eyebrow="적용사례 · 산업별 · 화학/소재"
      backHref={ROUTES.cases.industry.chemical}
      backLabel="화학/소재 적용사례"
      data={item}
    />
  )
}
