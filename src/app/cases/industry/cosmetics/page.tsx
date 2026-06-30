import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { caseStudiesByCategoryQuery, type CaseStudySummary } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"
import IndustrySubNav from "@/components/cases/IndustrySubNav"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "화장품/뷰티 적용사례 | Factorix",
  description: "Factorix 화장품·뷰티 산업 액제제조 솔루션 적용사례",
}

export default async function CosmeticsCasePage() {
  const { data } = await sanityFetch({ query: caseStudiesByCategoryQuery, params: { category: "cosmetics" } })
  const items = (data as CaseStudySummary[]) ?? []

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">적용사례 · 산업별</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-6">화장품/뷰티</h1>

      <IndustrySubNav active="cosmetics" />

      <ContentCardGrid isEmpty={items.length === 0} emptyMessage="콘텐츠 준비 중입니다.">
        {items.map((item) => (
          <ContentCard key={item._id} title={item.title} description={item.description} thumbnailUrl={item.thumbnail?.asset?.url} thumbnailAlt={item.thumbnail?.alt} href={`${ROUTES.cases.industry.cosmetics}/${item.slug}`} />
        ))}
      </ContentCardGrid>

      <div className="flex gap-4 mt-16">
        <Link href={ROUTES.support.poc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">도입 문의</Link>
        <Link href={ROUTES.solutions.standalone.filling} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">충진 시스템 보기</Link>
      </div>
    </div>
  )
}
