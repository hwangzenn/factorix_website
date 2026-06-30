import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { caseStudiesByCategoryQuery, type CaseStudySummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "웨어러블 디바이스 적용사례 | Factorix",
  description: "Factorix AI 웨어러블 디바이스 제품유형별 적용사례",
}

export default async function ProductWearableCasePage() {
  const { data } = await sanityFetch({ query: caseStudiesByCategoryQuery, params: { category: "wearable" } })
  const items = (data as CaseStudySummary[]) ?? []

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">적용사례 · 제품유형별</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">웨어러블 디바이스</h1>

      <ContentCardGrid isEmpty={items.length === 0} emptyMessage="콘텐츠 준비 중입니다.">
        {items.map((item) => (
          <ContentCard key={item._id} title={item.title} description={item.description} thumbnailUrl={item.thumbnail?.asset?.url} thumbnailAlt={item.thumbnail?.alt} href={`${ROUTES.cases.product.wearable}/${item.slug}`} />
        ))}
      </ContentCardGrid>

      <div className="flex gap-4 mt-16">
        <Link href={ROUTES.support.poc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">웨어러블 PoC 문의</Link>
        <Link href={ROUTES.wearable.intro} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">디바이스 소개</Link>
      </div>
    </div>
  )
}
