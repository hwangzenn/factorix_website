"use client"

import { useState, type FormEvent } from "react"

const MODEL_OPTIONS: Record<string, { label: string; subs: { value: string; label: string }[] }> = {
  equipment: {
    label: "장비",
    subs: [
      { value: "mixer", label: "교반/탈포/쓰리롤밀" },
      { value: "filling", label: "액상충진기" },
      { value: "dispenser", label: "AI 디스펜서" },
      { value: "robot", label: "협동/직교/3축로봇" },
      { value: "curing", label: "UV/IR 경화기" },
    ],
  },
  system: {
    label: "시스템",
    subs: [
      { value: "auto-calibration", label: "AI 자동보정 토출시스템" },
      { value: "smart-factory", label: "자동화 시스템" },
    ],
  },
  wearable: {
    label: "AI 웨어러블",
    subs: [
      { value: "b2c", label: "B2C 모델" },
      { value: "b2b", label: "B2B 모델" },
      { value: "b2g", label: "B2G 모델" },
    ],
  },
}

const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL ?? ""

const inputClass = "w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"

type Props = {
  formType?: string
  submitLabel?: string
}

export default function PocForm({ formType = "PoC 문의", submitLabel = "문의 접수완료" }: Props) {
  const [model, setModel] = useState("")
  const [subModel, setSubModel] = useState("")
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const subs = model ? MODEL_OPTIONS[model]?.subs ?? [] : []

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!SHEET_URL) { setStatus("error"); return }

    setStatus("sending")
    const fd = new FormData(e.currentTarget)

    const modelLabel = model ? MODEL_OPTIONS[model]?.label ?? "" : ""
    const subLabel = subModel
      ? MODEL_OPTIONS[model]?.subs.find((s) => s.value === subModel)?.label ?? ""
      : ""

    const payload = {
      formType,
      company: fd.get("company") as string,
      name: fd.get("name") as string,
      phone: fd.get("phone") as string,
      email: fd.get("email") as string,
      model: modelLabel,
      subModel: subLabel,
      message: fd.get("message") as string,
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
      setModel("")
      setSubModel("")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">접수 완료</h2>
        <p className="text-gray-500">담당자가 빠르게 연락드리겠습니다.</p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 border border-primary-700 text-primary-700 rounded-md hover:bg-primary-50 transition-colors text-sm font-medium"
        >
          추가 문의하기
        </button>
      </div>
    )
  }

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">회사명 *</label>
        <input type="text" name="company" className={inputClass} placeholder="회사명을 입력하세요" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">담당자명 *</label>
        <input type="text" name="name" className={inputClass} placeholder="담당자명을 입력하세요" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
        <input type="tel" name="phone" className={inputClass} placeholder="연락처를 입력하세요" required />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
        <input type="email" name="email" className={inputClass} placeholder="이메일을 입력하세요" required />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">관심 모델</label>
          <select
            name="model"
            className={inputClass}
            value={model}
            onChange={(e) => { setModel(e.target.value); setSubModel("") }}
          >
            <option value="">선택안함</option>
            {Object.entries(MODEL_OPTIONS).map(([key, opt]) => (
              <option key={key} value={key}>{opt.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={`block text-sm font-medium mb-1 ${model ? "text-gray-700" : "text-gray-400"}`}>하위 모델</label>
          <select
            name="subModel"
            className={`${inputClass} ${!model ? "bg-gray-100 text-gray-400 cursor-not-allowed" : ""}`}
            value={subModel}
            onChange={(e) => setSubModel(e.target.value)}
            disabled={!model}
          >
            <option value="">선택안함</option>
            {subs.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
        <textarea name="message" rows={5} className={`${inputClass} resize-none`} placeholder="문의 내용을 입력하세요" />
      </div>
      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "sending" ? "전송 중..." : submitLabel}
      </button>
      {status === "error" && (
        <p className="text-sm text-red-500 text-center">전송에 실패했습니다. 다시 시도해주세요.</p>
      )}
    </form>
  )
}
