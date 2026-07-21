"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import BlogFilterBar from "./BlogFilterBar"

type BlogCategoryKey = "all" | "cases" | "insight" | "guideIntro" | "guideProduct" | "news"

const HERO_TITLE = "블로그"
const HERO_DESCRIPTION = "적용사례부터 다양한 인사이트까지, 팩토릭스의 블로그"

const HERO_CONTENT: Record<BlogCategoryKey, { label: string; path: string }> = {
  all: { label: "See All", path: ROUTES.blog.all },
  cases: { label: "적용사례", path: ROUTES.blog.cases },
  insight: { label: "인사이트", path: ROUTES.blog.insight },
  guideIntro: { label: "액상제조 입문", path: ROUTES.blog.guideIntro },
  guideProduct: { label: "제품 선택 방법", path: ROUTES.blog.guideProduct },
  news: { label: "뉴스", path: ROUTES.blog.news },
}

const CATEGORY_ORDER: BlogCategoryKey[] = ["all", "cases", "insight", "guideIntro", "guideProduct", "news"]

export default function BlogHero() {
  const pathname = usePathname()
  const active = CATEGORY_ORDER.find((key) => HERO_CONTENT[key].path === pathname) ?? "all"

  return (
    <div className="relative -mt-20 bg-gradient-to-b from-primary-900 to-primary-700 text-white">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{HERO_TITLE}</h1>
        <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">{HERO_DESCRIPTION}</p>
      </div>

      <div className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between gap-4">
          <div className="flex gap-2 overflow-x-auto flex-1 min-w-0">
            {CATEGORY_ORDER.map((key) => (
              <Link
                key={key}
                href={HERO_CONTENT[key].path}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  active === key ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                {HERO_CONTENT[key].label}
              </Link>
            ))}
          </div>

          <div className="shrink-0">
            <Suspense fallback={null}>
              <BlogFilterBar />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}
