import type { Metadata } from "next"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"
import CategoryBreadcrumb from "@/components/content/CategoryBreadcrumb"

export const metadata: Metadata = {
  title: "제조자동화 단동설비",
  description: "산업별 액상 제조공정·자동화 요구에 맞춘 Factorix 제조자동화 단동설비",
  alternates: { canonical: ROUTES.solutions.automationSystem },
}

const INDUSTRIES = [
  {
    label: "바이오·의료기기",
    subverticals: "제약, 바이오, 진단, 의료기기, 콘택트렌즈, 코스메틱",
    href: ROUTES.solutions.automationSystemIndustries.bioMedical,
  },
  {
    label: "화학·소재",
    subverticals: "화학, 접착제, 수지, 실리콘, 기능성 소재",
    href: ROUTES.solutions.automationSystemIndustries.chemicalsMaterials,
  },
  {
    label: "전자·배터리",
    subverticals: "전기·전자, 반도체, 디스플레이, 배터리",
    href: ROUTES.solutions.automationSystemIndustries.electronicsBattery,
  },
  {
    label: "자동차·부품",
    subverticals: "자동차, 자동차 부품, 전장, 모빌리티",
    href: ROUTES.solutions.automationSystemIndustries.automotive,
  },
  {
    label: "연구기관·대학",
    subverticals: "대학 연구실, 정부출연연구기관, 기업 R&D센터, 시험·분석기관",
    href: ROUTES.solutions.automationSystemIndustries.researchAcademia,
  },
]

export default function AutomationSystemPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
        <div>
          <CategoryBreadcrumb segments={["솔루션", "제조자동화 단동설비"]} />
          <h1 className="hidden sm:block text-4xl font-bold text-primary-800">제조자동화 단동설비</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.support.poc} className="inline-flex px-5 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-md hover:bg-accent transition-colors">도입 문의</Link>
          <Link href={ROUTES.support.meeting} className="inline-flex px-5 py-2.5 border border-primary-700 text-primary-700 text-sm font-semibold rounded-md hover:bg-primary-50 transition-colors">온라인 상담</Link>
        </div>
      </div>

      <p className="text-lg text-gray-600 mb-12 leading-relaxed">
        Factorix의 제조자동화 단동설비는 완제품 시장이 아니라 <strong className="text-primary-700 font-semibold">액상 제조공정과 자동화 요구의 유사성</strong>을 기준으로 5개 산업군에 적용됩니다.
        각 산업군에 맞는 교반·충진·디스펜싱·경화·로봇 설비 구성을 확인하세요.
      </p>

      <ContentCardGrid>
        {INDUSTRIES.map((industry) => (
          <ContentCard
            key={industry.href}
            title={industry.label}
            description={industry.subverticals}
            href={industry.href}
          />
        ))}
      </ContentCardGrid>
    </div>
  )
}
