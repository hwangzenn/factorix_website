"use client"

import { useState } from "react"

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

const inputClass = "w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"

export default function PocForm() {
  const [model, setModel] = useState("")
  const [subModel, setSubModel] = useState("")

  const subs = model ? MODEL_OPTIONS[model]?.subs ?? [] : []

  return (
    <form className="space-y-6">
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
      <button type="submit" className="w-full py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">
        문의 접수완료
      </button>
    </form>
  )
}
