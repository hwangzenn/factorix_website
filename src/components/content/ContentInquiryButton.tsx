"use client"

import { useEffect, useState } from "react"
import PocForm from "@/app/support/poc/_components/PocForm"

export default function ContentInquiryButton({ slug }: { slug: string }) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex px-8 py-4 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors text-lg"
      >
        지금 보고 있는 콘텐츠로 온라인 문의하기
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-8">
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="닫기"
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <h2 className="text-xl font-bold text-gray-900 mb-1">콘텐츠 문의하기</h2>
            <p className="text-sm text-gray-500 mb-6">담당자가 빠르게 연락드리겠습니다.</p>
            <PocForm formType="콘텐츠 문의" submitLabel="문의 접수완료" presetProduct={slug} presetProductLabel="콘텐츠 코드" />
          </div>
        </div>
      )}
    </>
  )
}
