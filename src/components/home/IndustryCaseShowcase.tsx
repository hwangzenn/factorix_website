"use client"

import { useState } from "react"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import type { Locale } from "@/lib/i18n"
import type { CaseStudyWithTags } from "@/sanity/lib/queries"

const CATEGORIES = [
  { key: "bio", label: "바이오", labelEn: "Bio" },
  { key: "cosmetics", label: "화장품/뷰티", labelEn: "Cosmetics/Beauty" },
  { key: "chemical", label: "화학/소재", labelEn: "Chemical/Materials" },
  { key: "electronics", label: "전기/전자", labelEn: "Electronics" },
  { key: "automotive", label: "자동차", labelEn: "Automotive" },
  { key: "research", label: "연구기관/대학", labelEn: "Research/Academia" },
] as const

type IndustryLogo = {
  category: string
  logos: { image: { asset: { url: string } } | null; alt: string | null }[] | null
}

export default function IndustryCaseShowcase({
  items,
  logos = [],
  locale = "ko",
}: {
  items: CaseStudyWithTags[]
  logos?: IndustryLogo[]
  locale?: Locale
}) {
  const en = locale === "en"
  const [active, setActive] = useState<string>(CATEGORIES[0].key)

  const filtered = items.filter((item) => item.industries === active)
  const activeCat = CATEGORIES.find((c) => c.key === active)!
  const activeLogos = (logos.find((l) => l.category === active)?.logos ?? []).slice(0, 4)
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
              href={`${ROUTES.blog.cases}?industry=${active}`}
              className="inline-flex items-center gap-1 text-sm text-primary-700 hover:text-primary-900 transition-colors"
            >
              {en ? "View more case studies" : "적용사례 더보기"}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
          {activeLogos.length > 0 && (
            <div className="grid grid-cols-4 gap-3 mt-8">
              {activeLogos.map((item, i) =>
                item.image?.asset?.url ? (
                  <div key={i} className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center p-2">
                    <img
                      src={item.image.asset.url}
                      alt={item.alt ?? (en ? `${activeCat.labelEn} customer logo` : `${activeCat.label} 고객사 로고`)}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : null
              )}
            </div>
          )}
        </div>

        {/* 우측: 대표 사례 오버레이 카드 */}
        {featured ? (
          <Link
            href={`${ROUTES.blog.cases}/${featured.slug}`}
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
              <p className="font-bold text-white text-lg mb-2">{featured.title}</p>
              {featured.publishedAt && (
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <span>{new Date(featured.publishedAt).toLocaleDateString(en ? "en-US" : "ko-KR")}</span>
                </div>
              )}
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
