"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"

const CATEGORIES = [
  { key: "bio", label: "바이오", href: ROUTES.cases.industry.bio },
  { key: "cosmetics", label: "화장품/뷰티", href: ROUTES.cases.industry.cosmetics },
  { key: "chemical", label: "화학/소재", href: ROUTES.cases.industry.chemical },
  { key: "display", label: "디스플레이", href: ROUTES.cases.industry.display },
  { key: "electronics", label: "전기/전자", href: ROUTES.cases.industry.electronics },
  { key: "automotive", label: "자동차", href: ROUTES.cases.industry.automotive },
  { key: "battery", label: "이차전지", href: ROUTES.cases.industry.battery },
  { key: "research", label: "연구기관/대학", href: ROUTES.cases.industry.research },
] as const

type CaseItem = {
  _id: string
  title: string
  slug: string
  category: string
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

function PlaceholderCard({ label }: { label: string }) {
  return (
    <div className="bg-gray-50 rounded-xl overflow-hidden flex flex-col md:flex-row">
      <div className="md:w-1/2 aspect-video md:aspect-auto bg-gray-200 flex items-center justify-center min-h-[320px]">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-gray-300">
          <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
          <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="2" />
          <path d="M6 34l10-8 6 4 10-10 10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="md:w-1/2 p-5 flex flex-col justify-center">
        <p className="font-semibold text-gray-400 text-base leading-snug">{label} 적용사례 준비 중</p>
        <p className="text-sm text-gray-300 mt-2">콘텐츠가 곧 등록됩니다.</p>
      </div>
    </div>
  )
}

export default function IndustryCaseShowcase({ items }: { items: CaseItem[] }) {
  const [active, setActive] = useState<string>(CATEGORIES[0].key)

  const filtered = items.filter((item) => item.category === active)
  const activeCat = CATEGORIES.find((c) => c.key === active)!

  return (
    <div>
      {/* Category pills + 전체보기 */}
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
            {cat.label}
          </button>
        ))}
        <Link
          href={activeCat.href}
          className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-700 hover:underline shrink-0"
        >
          전체보기
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>
      </div>

      {/* Case cards */}
      <div className="flex flex-col gap-6">
        {filtered.length > 0 ? (
          filtered.slice(0, 4).map((item) => (
            <Link
              key={item._id}
              href={`${activeCat.href}/${item.slug}`}
              className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-md transition-shadow flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 aspect-video md:aspect-auto bg-gray-100 overflow-hidden min-h-[320px]">
                {item.thumbnail?.asset?.url ? (
                  <Image
                    src={item.thumbnail.asset.url}
                    alt={item.thumbnail.alt ?? item.title}
                    width={640}
                    height={360}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200" />
                )}
              </div>
              <div className="md:w-1/2 p-5 flex flex-col justify-center">
                <p className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary-700 transition-colors">
                  {item.title}
                </p>
                {item.description && (
                  <p className="text-sm text-gray-500 line-clamp-3">{item.description}</p>
                )}
              </div>
            </Link>
          ))
        ) : (
          <PlaceholderCard label={activeCat.label} />
        )}
      </div>

    </div>
  )
}
