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
  title: "연구기관·대학",
  description: "대학 연구실, 정부출연연구기관, 기업 R&D센터, 시험·분석기관 — 소량·다품종 실험 공정을 위한 Factorix 제조자동화 시스템",
  alternates: { canonical: ROUTES.solutions.automationSystemIndustries.researchAcademia },
}

const FEATURES = [
  { title: "소량 정밀 디스펜싱", desc: "시료 손실을 최소화하는 미량 정밀 토출을 지원합니다.", iconKey: "microDispense" as const },
  { title: "실험 조건 빠른 전환", desc: "다품종 시료 반복 실험에 맞춰 설비 구성을 유연하게 전환합니다.", iconKey: "flex" as const },
  { title: "재현성 있는 데이터 확보", desc: "동일 조건 반복 실험을 위한 정밀 제어로 데이터 신뢰도를 높입니다.", iconKey: "dataPlatform" as const },
]

export default async function ResearchAcademiaPage() {
  const [{ data: portfolioData }, { data: relatedData }, { data: logoData }] = await Promise.all([
    sanityFetch({ query: productsByIndustryQuery, params: { industry: "research-academia" } }),
    sanityFetch({ query: relatedContentByIndustryQuery, params: { industry: "research-academia" } }),
    sanityFetch({ query: industryLogosQuery }),
  ])
  const logos = ((logoData as IndustryLogo[]) ?? [])
    .filter((l) => l.category === "research-academia")
    .flatMap((l) => l.logos ?? [])

  return (
    <ManufacturingAutomationIndustryDetail
      label="연구기관·대학"
      subverticals="대학 연구실, 정부출연연구기관, 기업 R&D센터, 시험·분석기관"
      concept="소량·다품종 시료를 반복 실험하는 환경에서는 재현성 높은 소형 디스펜싱과 유연한 설비 전환이 중요합니다. 실험 조건 변화에 빠르게 대응하는 단독설비 조합을 지원합니다."
      features={FEATURES}
      portfolio={(portfolioData as IndustryPortfolioItem[]) ?? []}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
      logos={logos}
      heroImage="/산업군/연구기관대학.png"
    />
  )
}
