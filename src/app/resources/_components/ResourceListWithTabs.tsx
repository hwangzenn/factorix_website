"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"

const CATEGORIES = [
  { key: "notice", label: "공지사항", basePath: "/resources/notice" },
  { key: "press", label: "언론보도", basePath: "/resources/press" },
  { key: "patents", label: "특허/수상", basePath: "/resources/patents" },
  { key: "tech-docs", label: "기술자료실", basePath: "/resources/tech-docs" },
  { key: "ir", label: "투자정보", basePath: "/resources/ir" },
]

const VALID_KEYS = new Set(CATEGORIES.map((c) => c.key))

type ResourceItem = {
  _id: string
  title: string
  slug: string
  category: string
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

export default function ResourceListWithTabs({ items }: { items: ResourceItem[] }) {
  const searchParams = useSearchParams()
  const paramCategory = searchParams.get("category")
  const initialCategory = paramCategory && VALID_KEYS.has(paramCategory) ? paramCategory : CATEGORIES[0].key
  const [activeCategory, setActiveCategory] = useState(initialCategory)

  const filtered = items.filter((item) => item.category === activeCategory)
  const basePath = CATEGORIES.find((c) => c.key === activeCategory)!.basePath

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">자료실</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-8">자료실</h1>

      <nav className="flex gap-1 border-b border-gray-200 mb-10">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2.5 text-sm font-medium transition-colors relative ${
              activeCategory === cat.key
                ? "text-primary-700"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {cat.label}
            {activeCategory === cat.key && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700" />
            )}
          </button>
        ))}
      </nav>

      {filtered.length === 0 ? (
        <p className="text-gray-500">등록된 자료가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {filtered.map((item) => (
            <li key={item._id} className="py-5 flex gap-4 items-center">
              {item.thumbnail?.asset?.url && (
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <img
                    src={item.thumbnail.asset.url}
                    alt={item.thumbnail.alt ?? item.title}
                    className="object-cover w-full h-full"
                  />
                </div>
              )}

              <div className="flex-1 min-w-0">
                <Link
                  href={`${basePath}/${item.slug}`}
                  className="font-medium text-gray-800 hover:text-primary-700 transition-colors"
                >
                  {item.title}
                </Link>

                {item.publishedAt && (
                  <p className="text-sm text-gray-400 mt-1">
                    {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
                  </p>
                )}

                {item.description && (
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">{item.description}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
