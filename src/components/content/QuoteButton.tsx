"use client"

import { useEffect, useState } from "react"
import PocForm from "@/app/support/poc/_components/PocForm"

type Mode = "quote" | "inquiry"

const MODE_CONTENT: Record<Mode, { buttonLabel: string; title: string; description: string; formType: string; submitLabel: string }> = {
  quote: {
    buttonLabel: "견적안내 받기",
    title: "예산에 맞는지 먼저 확인해보세요",
    description: "부담스러운 영업 상담 없이, 정확한 금액대만 빠르게 안내드립니다.",
    formType: "가격문의",
    submitLabel: "문의 접수완료",
  },
  inquiry: {
    buttonLabel: "제품 상세자료 받기",
    title: "지금 보고계신 제품의\n상세기술자료를 확인하세요",
    description: "담당 엔지니어가 스펙·도면 등 기술자료를 정리해 보내드립니다.",
    formType: "특정제품문의",
    submitLabel: "문의 접수완료",
  },
}

export default function QuoteButton({ productName }: { productName: string }) {
  const [mode, setMode] = useState<Mode | null>(null)

  useEffect(() => {
    if (!mode) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setMode(null)
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [mode])

  const content = mode ? MODE_CONTENT[mode] : null

  return (
    <>
      <div className="flex flex-col w-full gap-3 sm:w-auto sm:flex-row sm:flex-wrap">
        <button
          type="button"
          onClick={() => setMode("quote")}
          className="inline-flex justify-center px-8 py-4 bg-primary-700 text-white font-semibold rounded-md hover:bg-accent transition-colors text-lg"
        >
          {MODE_CONTENT.quote.buttonLabel}
        </button>
        <button
          type="button"
          onClick={() => setMode("inquiry")}
          className="inline-flex justify-center px-8 py-4 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors text-lg"
        >
          {MODE_CONTENT.inquiry.buttonLabel}
        </button>
      </div>

      {content && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMode(null)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            <button
              type="button"
              onClick={() => setMode(null)}
              aria-label="닫기"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-1 whitespace-pre-line">{content.title}</h2>
            <p className="text-sm text-gray-500 mb-6">{content.description}</p>
            <PocForm formType={content.formType} submitLabel={content.submitLabel} presetProduct={productName} />
          </div>
        </div>
      )}
    </>
  )
}
