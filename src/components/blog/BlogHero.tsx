import Link from "next/link"
import { ROUTES } from "@/lib/routes"

export type BlogCategoryKey = "all" | "insight" | "tips" | "cases" | "news"

const CATEGORY_PILLS: { key: BlogCategoryKey; label: string; href: string }[] = [
  { key: "all", label: "See All", href: ROUTES.blog.all },
  { key: "insight", label: "인사이트", href: ROUTES.blog.insight },
  { key: "tips", label: "팁", href: ROUTES.blog.tips },
  { key: "cases", label: "케이스 스터디", href: ROUTES.blog.cases },
  { key: "news", label: "뉴스", href: ROUTES.blog.news },
]

export default function BlogHero({
  title,
  description,
  active,
}: {
  title: string
  description: string
  active: BlogCategoryKey
}) {
  return (
    <div className="relative -mt-20 bg-gradient-to-b from-primary-900 to-primary-700 text-white">
      <div className="max-w-5xl mx-auto px-6 pt-32 pb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">{title}</h1>
        <p className="text-white/70 text-sm md:text-base max-w-xl leading-relaxed">{description}</p>
      </div>

      <div className="sticky top-20 z-30 bg-white border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-6 py-4 flex gap-2 overflow-x-auto">
          {CATEGORY_PILLS.map((cat) => (
            <Link
              key={cat.key}
              href={cat.href}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                active === cat.key ? "bg-primary-700 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
