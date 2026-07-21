"use client"

import { Suspense } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import BlogFilterBar from "./BlogFilterBar"

type BlogCategoryKey = "all" | "cases" | "insight" | "guideIntro" | "news"

const HERO_CONTENT: Record<BlogCategoryKey, { label: string; path: string; title: string; description: string }> = {
  all: {
    label: "See All",
    path: ROUTES.blog.all,
    title: "블로그",
    description: "적용사례부터 다양한 인사이트까지, 팩토릭스의 블로그",
  },
  cases: {
    label: "적용사례",
    path: ROUTES.blog.cases,
    title: "적용사례",
    description: "산업별 액상 제조·디스펜싱 자동화 도입 사례를 확인하세요",
  },
  insight: {
    label: "인사이트",
    path: ROUTES.blog.insight,
    title: "인사이트",
    description: "액상 제조·디스펜싱 자동화에 대한 팩토릭스의 인사이트",
  },
  guideIntro: {
    label: "액상 공정 엔지니어링 위키",
    path: ROUTES.blog.guideIntro,
    title: "액상 공정 엔지니어링 위키",
    description: "액상 제조·디스펜싱 공정의 기초 개념과 실무 지식을 정리했습니다",
  },
  news: {
    label: "뉴스",
    path: ROUTES.blog.news,
    title: "뉴스",
    description: "팩토릭스의 소식과 산업 동향을 전합니다",
  },
}

const CATEGORY_ORDER: BlogCategoryKey[] = ["all", "cases", "insight", "guideIntro", "news"]

export default function BlogHero() {
  const pathname = usePathname()
  const active = CATEGORY_ORDER.find((key) => HERO_CONTENT[key].path === pathname) ?? "all"

  return (
    <div className="relative -mt-20 bg-gradient-to-b from-primary-900 to-primary-700 text-white">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{HERO_CONTENT[active].title}</h1>
        <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">{HERO_CONTENT[active].description}</p>
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
