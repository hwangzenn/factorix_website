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
  title: "화학·소재",
  description: "화학, 접착제, 수지, 실리콘, 기능성 소재 — 고점도·경화 민감 액상 공정을 위한 Factorix 제조자동화 시스템",
  alternates: { canonical: ROUTES.solutions.automationSystemIndustries.chemicalsMaterials },
}

const FEATURES = [
  { title: "고점도 균일 혼합", desc: "점도 변화에도 안정적인 교반·분산으로 균일한 물성을 유지합니다.", iconKey: "mixing" as const },
  { title: "경화 조건 정밀 제어", desc: "소재별 경화 프로파일에 맞춘 UV/IR 자동화로 품질을 일정하게 유지합니다.", iconKey: "curing" as const },
  { title: "연속공정 라인 연동", desc: "원료 투입부터 충진까지 이어지는 자동화 구성이 가능합니다.", iconKey: "line" as const },
]

export default async function ChemicalsMaterialsPage() {
  const [{ data: portfolioData }, { data: relatedData }, { data: logoData }] = await Promise.all([
    sanityFetch({ query: productsByIndustryQuery, params: { industry: "chemicals-materials" } }),
    sanityFetch({ query: relatedContentByIndustryQuery, params: { industry: "chemicals-materials" } }),
    sanityFetch({ query: industryLogosQuery }),
  ])
  const logos = ((logoData as IndustryLogo[]) ?? [])
    .filter((l) => l.category === "chemicals-materials")
    .flatMap((l) => l.logos ?? [])

  return (
    <ManufacturingAutomationIndustryDetail
      label="화학·소재"
      subverticals="화학, 접착제, 수지, 실리콘, 기능성 소재"
      concept="고점도·경화성 소재 특유의 혼합·분산·경화 공정이 반복됩니다. 점도 변화에도 균일한 토출을 유지하는 교반·쓰리롤밀·경화 자동화가 품질을 좌우합니다."
      features={FEATURES}
      portfolio={(portfolioData as IndustryPortfolioItem[]) ?? []}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
      logos={logos}
      heroImage="/산업군/화학소재.png"
    />
  )
}
