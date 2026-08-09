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
import { MANUFACTURING_TO_LEGACY_INDUSTRY } from "@/lib/industries"
import ManufacturingAutomationIndustryDetail from "@/components/solutions/ManufacturingAutomationIndustryDetail"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "전자·배터리",
  description: "전기·전자, 반도체, 디스플레이, 배터리 — 초미세 패턴 토출과 무결점 공정을 위한 Factorix 제조자동화 단동설비",
  alternates: { canonical: ROUTES.solutions.automationSystemIndustries.electronicsBattery },
}

const FEATURES = [
  { title: "초미세 패턴 디스펜싱", desc: "서브밀리 단위의 정밀 토출로 미세 회로·셀 공정을 지원합니다.", iconKey: "microDispense" as const },
  { title: "실시간 물성 보정", desc: "소재 물성 변화에 따라 토출조건을 자동으로 학습·보정합니다.", iconKey: "correction" as const },
  { title: "협동로봇 연동 조립", desc: "초정밀 위치 제어와 반복 정밀도로 수율을 안정적으로 관리합니다.", iconKey: "robot" as const },
]

export default async function ElectronicsBatteryPage() {
  const [{ data: portfolioData }, { data: relatedData }, { data: logoData }] = await Promise.all([
    sanityFetch({ query: productsByIndustryQuery, params: { industry: "electronics-battery" } }),
    sanityFetch({ query: relatedContentByIndustryQuery, params: { industry: "electronics" } }),
    sanityFetch({ query: industryLogosQuery }),
  ])
  const logos = ((logoData as IndustryLogo[]) ?? [])
    .filter((l) => MANUFACTURING_TO_LEGACY_INDUSTRY["electronics-battery"].includes(l.category))
    .flatMap((l) => l.logos ?? [])

  return (
    <ManufacturingAutomationIndustryDetail
      label="전자·배터리"
      subverticals="전기·전자, 반도체, 디스플레이, 배터리"
      concept="초미세 회로·셀 공정에서는 미세 패턴 디스펜싱과 정밀 위치 제어가 필수입니다. 물성 변화를 실시간 보정하는 AI 토출과 협동로봇 연동으로 수율을 관리합니다."
      features={FEATURES}
      portfolio={(portfolioData as IndustryPortfolioItem[]) ?? []}
      relatedContent={(relatedData as RelatedContentItem[]) ?? []}
      logos={logos}
    />
  )
}
