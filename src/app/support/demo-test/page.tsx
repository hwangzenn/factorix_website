import type { Metadata } from "next"
import PocForm from "../poc/_components/PocForm"

export const metadata: Metadata = {
  title: "평가테스트 문의 | Factorix",
  description: "Factorix 시스템 평가테스트 문의",
}

export default function DemoTestPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">평가테스트 문의</h1>
      <p className="text-gray-600 mb-12">도입 전 시스템 평가 테스트를 신청하세요. 담당자가 빠르게 연락드립니다.</p>
      <PocForm formType="평가테스트 문의" />
    </div>
  )
}
