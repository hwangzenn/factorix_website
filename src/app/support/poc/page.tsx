import type { Metadata } from "next"
import PocForm from "./_components/PocForm"

export const metadata: Metadata = {
  title: "PoC 문의 | Factorix",
  description: "Factorix PoC 도입 문의 — 장비, 시스템, AI 웨어러블",
}

export default function PocPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">PoC 문의</h1>
      <p className="text-gray-600 mb-12">도입 전 평가 테스트 및 PoC를 신청하세요. 담당자가 빠르게 연락드립니다.</p>
      <PocForm />
    </div>
  )
}
