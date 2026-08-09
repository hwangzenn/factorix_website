"use client"

import { useState, type FormEvent } from "react"

const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? ""

export default function NewsletterSubscribe() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!SHEET_URL) { setStatus("error"); return }

    setStatus("sending")
    const fd = new FormData(e.currentTarget)
    const payload = {
      formType: "뉴스레터 구독",
      email: fd.get("email") as string,
      timestamp: new Date().toISOString(),
    }

    const form = e.currentTarget
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify(payload),
      })
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <div className="rounded-2xl bg-primary-50 border border-primary-100 px-6 py-8 sm:px-10 sm:py-10 text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">뉴스레터 구독하고 인사이트 받기</h2>
        <p className="text-sm text-gray-500 mb-6">액상 제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트를 이메일로 받아보세요.</p>

        {status === "success" ? (
          <p className="text-primary-700 font-semibold">구독 신청이 완료되었습니다. 감사합니다!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              name="email"
              required
              placeholder="이메일 주소를 입력하세요"
              className="flex-1 border border-gray-300 rounded-md px-4 py-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <button
              type="submit"
              disabled={status === "sending"}
              className="px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-accent transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
            >
              {status === "sending" ? "구독 중..." : "구독하기"}
            </button>
          </form>
        )}
        {status === "error" && (
          <p className="text-sm text-red-500 mt-3">구독 신청에 실패했습니다. 다시 시도해주세요.</p>
        )}
      </div>
    </div>
  )
}
