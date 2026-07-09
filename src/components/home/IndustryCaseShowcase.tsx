"use client"

import { useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import type { Locale } from "@/lib/i18n"

const CATEGORIES = [
  { key: "bio", label: "바이오", labelEn: "Bio", href: ROUTES.cases.industry.bio },
  { key: "cosmetics", label: "화장품/뷰티", labelEn: "Cosmetics/Beauty", href: ROUTES.cases.industry.cosmetics },
  { key: "chemical", label: "화학/소재", labelEn: "Chemical/Materials", href: ROUTES.cases.industry.chemical },
  { key: "electronics", label: "전기/전자", labelEn: "Electronics", href: ROUTES.cases.industry.electronics },
  { key: "automotive", label: "자동차", labelEn: "Automotive", href: ROUTES.cases.industry.automotive },
  { key: "research", label: "연구기관/대학", labelEn: "Research/Academia", href: ROUTES.cases.industry.research },
] as const

type CaseItem = {
  _id: string
  title: string
  slug: string
  category: string
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

const CASE_FIELDS = [
  { ko: "해결과제", en: "Challenge" },
  { ko: "적용 솔루션", en: "Solution Applied" },
  { ko: "기대효과", en: "Expected Impact" },
] as const

export default function IndustryCaseShowcase({ items, locale = "ko" }: { items: CaseItem[]; locale?: Locale }) {
  const en = locale === "en"
  const [active, setActive] = useState<string>(CATEGORIES[0].key)

  const filtered = items.filter((item) => item.category === active)
  const activeCat = CATEGORIES.find((c) => c.key === active)!
  const featured = filtered[0]

  return (
    <div>
      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-3 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActive(cat.key)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
              active === cat.key
                ? "bg-primary-700 text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            {en ? cat.labelEn : cat.label}
          </button>
        ))}
      </div>

      {/* Case detail card */}
      <div className="grid grid-cols-1 md:grid-cols-2 rounded-xl overflow-hidden">
        {/* 좌측: 산업군 + 적용사례 더보기 + 고객사 로고 */}
        <div className="bg-[#0B1B3D] text-white p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <p className="text-xl font-bold mb-2">{en ? `${activeCat.labelEn} Industry` : `${activeCat.label} 산업군`}</p>
            <Link
              href={activeCat.href}
              className="inline-flex items-center gap-1 text-sm text-blue-200 hover:text-white transition-colors"
            >
              {en ? "View more case studies" : "적용사례 더보기"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className="h-10 rounded bg-white/10 flex items-center justify-center text-xs font-semibold text-white/40 tracking-wider">
                LOGO
              </div>
            ))}
          </div>
        </div>

        {/* 우측: 프로젝트 정보 */}
        <div className="bg-gray-100 p-8 md:p-10 flex flex-col justify-center min-h-[320px]">
          {featured ? (
            <Link
              href={`${activeCat.href}/${featured.slug}`}
              className="font-bold text-gray-900 text-lg mb-6 hover:text-primary-700 transition-colors"
            >
              {featured.title}
            </Link>
          ) : (
            <p className="font-bold text-gray-400 text-lg mb-6">{en ? "Project coming soon" : "프로젝트 준비 중"}</p>
          )}
          <dl className="space-y-4">
            {CASE_FIELDS.map((field) => (
              <div key={field.ko}>
                <dt className="text-xs font-bold text-gray-400 tracking-wide mb-1">{en ? field.en : field.ko}</dt>
                <dd className="text-sm text-gray-400 italic">{en ? "Content coming soon." : "콘텐츠 준비 중입니다."}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
}
