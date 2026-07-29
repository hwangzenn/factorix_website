import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { caseStudyBySlugQuery, caseStudyRelatedPoolQuery, type CaseStudyDetail, type RelatedCaseStudyCandidate } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import { pickRelatedByPriority } from "@/lib/relatedContent"
import ResourceDetail from "@/app/resources/_components/ResourceDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: caseStudyBySlugQuery, params: { slug } })
  const item = data as CaseStudyDetail | null
  if (!item) return {}
  return {
    title: `${item.seo?.metaTitle || item.title} | Factorix`,
    description: item.seo?.metaDescription || item.description || undefined,
    alternates: { canonical: `${ROUTES.blog.cases}/${slug}` },
    openGraph: (item.seo?.ogImage?.asset?.url || item.thumbnail?.asset?.url)
      ? { images: [{ url: item.seo?.ogImage?.asset?.url || item.thumbnail!.asset.url }] }
      : undefined,
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: caseStudyBySlugQuery, params: { slug } })
  const item = data as CaseStudyDetail | null
  if (!item) notFound()

  const { data: poolData } = await sanityFetch({
    query: caseStudyRelatedPoolQuery,
    params: { slug },
  })
  const pool = (poolData as RelatedCaseStudyCandidate[]) ?? []
  const relatedPicks = pickRelatedByPriority(pool, [
    (c) => !!item.industries && c.industries === item.industries,
    (c) => !!item.processes && c.processes === item.processes,
  ])
  const related = relatedPicks.map((c) => ({
    _id: c._id,
    title: c.title,
    href: `${ROUTES.blog.cases}/${c.slug}`,
    publishedAt: c.publishedAt,
    thumbnail: c.thumbnail,
  }))

  return (
    <ResourceDetail
      eyebrow="블로그 · 적용사례"
      backHref={ROUTES.blog.cases}
      backLabel="적용사례"
      data={item}
      related={related}
      breadcrumbRoot={{ label: "블로그", href: ROUTES.blog.all }}
      contentInquirySlug={item.slug}
      browseMoreHref={ROUTES.blog.cases}
    />
  )
}
