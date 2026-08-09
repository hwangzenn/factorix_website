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
  title: "바이오·의료기기",
  description: "제약, 바이오, 진단, 의료기기, 콘택트렌즈, 코스메틱 — 고정밀·무결점 액상 제조공정을 위한 Factorix 제조자동화 단동설비",
  alternates: { canonical: ROUTES.solutions.automationSystemIndustries.bioMedical },
}

const FEATURES = [
  { title: "무결점 정밀 토출", desc: "기포·미세오염 없는 정량 디스펜싱으로 불량률을 최소화합니다.", iconKey: "precision" as const },
  { title: "클린 환경 대응 설계", desc: "오염 관리가 중요한 공정 환경에 맞춘 설비 구성을 지원합니다.", iconKey: "clean" as const },
  { title: "다품종 소량 유연 대응", desc: "제품군이 자주 바뀌는 바이오·의료기기 생산 특성에 맞춰 설비를 유연하게 전환합니다.", iconKey: "flex" as const },
]

export default async function BioMedicalPage() {
  const [{ data: portfolioData }, { data: relatedData }, { data: logoData }] = await Promise.all([
    sanityFetch({ query: productsByIndustryQuery, params: { industry: "bio-medical" } }),
    sanityFetch({ query: relatedContentByIndustryQuery, params: { industry: "bio-medical" } }),
    sanityFetch({ query: industryLogosQuery }),
  ])
  const logos = ((logoData as IndustryLogo[]) ?? [])
    .filter((l) => l.category === "bio-medical")
    .flatMap((l) => l.logos ?? [])

  return (
    <ManufacturingAutomationIndustryDetail
      label="바이오·의료기기"
      subverticals="제약, 바이오, 진단, 의료기기, 콘택트렌즈, 코스메틱"
      concept="정밀 정량 토출과 오염 없는 충진·경화가 핵심입니다. 미세 기포 하나가 불량으로 이어지는 만큼, 탈포·정량 디스펜싱·클린 환경 대응 자동화가 공정 전반에서 요구됩니다."
      features={FEATURES}
      portfolio={(portfolioData as IndustryPortfolioItem[]) ?? []}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
      logos={logos}
    />
  )
}
