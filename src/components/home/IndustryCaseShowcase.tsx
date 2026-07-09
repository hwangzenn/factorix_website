"use client"

import { useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import type { Locale } from "@/lib/i18n"

const CATEGORIES = [
  { key: "bio", label: "바이오", labelEn: "Bio", href: ROUTES.cases.industry.bio, logo: "/고객사로고/바이오.png" },
  { key: "cosmetics", label: "화장품/뷰티", labelEn: "Cosmetics/Beauty", href: ROUTES.cases.industry.cosmetics, logo: "/고객사로고/뷰티.png" },
  { key: "chemical", label: "화학/소재", labelEn: "Chemical/Materials", href: ROUTES.cases.industry.chemical, logo: "/고객사로고/화학소재.png" },
  { key: "electronics", label: "전기/전자", labelEn: "Electronics", href: ROUTES.cases.industry.electronics, logo: "/고객사로고/전기전자.png" },
  { key: "automotive", label: "자동차", labelEn: "Automotive", href: ROUTES.cases.industry.automotive, logo: "/고객사로고/자동차.png" },
  { key: "research", label: "연구기관/대학", labelEn: "Research/Academia", href: ROUTES.cases.industry.research, logo: "/고객사로고/연구기관.png" },
] as const

type CaseItem = {
  _id: string
  title: string
  slug: string
  category: string
  description: string | null
  publishedAt: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  tags: string[] | null
  customerName: string | null
}

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
        <div className="bg-white border border-gray-200 text-gray-900 p-8 md:p-10 flex flex-col justify-between min-h-[320px]">
          <div>
            <p className="text-xl font-bold mb-2">{en ? `${activeCat.labelEn} Industry` : `${activeCat.label} 산업군`}</p>
            <Link
              href={activeCat.href}
              className="inline-flex items-center gap-1 text-sm text-primary-700 hover:text-primary-900 transition-colors"
            >
              {en ? "View more case studies" : "적용사례 더보기"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          <img
            src={activeCat.logo}
            alt={en ? `${activeCat.labelEn} customer logos` : `${activeCat.label} 고객사 로고`}
            className="w-full h-auto mt-8"
          />
        </div>

        {/* 우측: 대표 사례 오버레이 카드 */}
        {featured ? (
          <Link
            href={`${activeCat.href}/${featured.slug}`}
            className="group relative min-h-[320px] overflow-hidden block"
          >
            {featured.thumbnail?.asset?.url ? (
              <img
                src={featured.thumbnail.asset.url}
                alt={featured.thumbnail.alt ?? featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-gray-800" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 md:p-8">
              {featured.tags && featured.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-3">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/20 text-white text-xs font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <p className="font-bold text-white text-lg mb-2">{featured.title}</p>
              <div className="flex items-center gap-2 text-xs text-white/70">
                {featured.customerName && <span>{featured.customerName}</span>}
                {featured.customerName && featured.publishedAt && <span>·</span>}
                {featured.publishedAt && (
                  <span>{new Date(featured.publishedAt).toLocaleDateString(en ? "en-US" : "ko-KR")}</span>
                )}
              </div>
            </div>
          </Link>
        ) : (
          <div className="bg-gray-100 p-8 md:p-10 flex flex-col justify-center min-h-[320px]">
            <p className="font-bold text-gray-400 text-lg">{en ? "Project coming soon" : "프로젝트 준비 중"}</p>
          </div>
        )}
      </div>
    </div>
  )
}
