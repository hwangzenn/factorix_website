import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import {
  productsByIndustryQuery,
  relatedContentByIndustryQuery,
  industryLogosQuery,
  type IndustryPortfolioItem,
  type RelatedContentItem,
  type IndustryLogo,
} from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ManufacturingAutomationIndustryDetail from "@/components/solutions/ManufacturingAutomationIndustryDetail"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "자동차·부품",
  description: "자동차, 자동차 부품, 전장, 모빌리티 — 대량 생산 라인 연동 액상 공정을 위한 Factorix 제조자동화 시스템",
  alternates: { canonical: ROUTES.solutions.automationSystemIndustries.automotive },
}

const FEATURES = [
  { title: "라인 속도 대응 고속 토출", desc: "생산 라인 속도에 맞춘 반복 토출로 처리량을 유지합니다.", iconKey: "speed" as const },
  { title: "일정한 접착·실링 품질", desc: "대량 생산에도 균일한 도포 품질을 유지합니다.", iconKey: "quality" as const },
  { title: "기존 설비 통합 연동", desc: "컨베이어·PLC 등 기존 생산라인과 통합 구성이 가능합니다.", iconKey: "integration" as const },
]

export default async function AutomotivePage() {
  const [{ data: portfolioData }, { data: relatedData }, { data: logoData }] = await Promise.all([
    sanityFetch({ query: productsByIndustryQuery, params: { industry: "automotive" } }),
    sanityFetch({ query: relatedContentByIndustryQuery, params: { industry: "automotive" } }),
    sanityFetch({ query: industryLogosQuery }),
  ])
  const logos = ((logoData as IndustryLogo[]) ?? [])
    .filter((l) => l.category === "automotive")
    .flatMap((l) => l.logos ?? [])

  return (
    <ManufacturingAutomationIndustryDetail
      label="자동차·부품"
      subverticals="자동차, 자동차 부품, 전장, 모빌리티"
      concept="접착·실링·코팅 공정이 생산 라인 속도에 맞춰 반복됩니다. 대량 생산 환경에서도 일정한 토출량과 경화 품질을 유지하는 자동화 설비 구성이 필요합니다."
      features={FEATURES}
      portfolio={(portfolioData as IndustryPortfolioItem[]) ?? []}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
      logos={logos}
      heroImage="/산업군/자동차부품.png"
    />
  )
}
