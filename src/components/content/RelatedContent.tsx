import Image from "next/image"
import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import type { RelatedContentItem } from "@/sanity/lib/queries"

const CATEGORY_ROUTE: Record<string, string> = {
  insight: ROUTES.blog.insight,
  wiki: ROUTES.blog.guideIntro,
  news: ROUTES.blog.news,
  cases: ROUTES.blog.cases,
}

type Props = {
  items: RelatedContentItem[]
}

export default function RelatedContent({ items }: Props) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between gap-4 mb-4">
        <h2 className="text-2xl font-bold text-gray-900">연관 콘텐츠</h2>
        <Link
          href={ROUTES.blog.all}
          className="text-base text-gray-400 underline underline-offset-2 hover:text-primary-600 transition-colors shrink-0"
        >
          더보기 →
        </Link>
      </div>

      {items.length === 0 ? (
        <p className="text-base text-gray-400 text-center py-10 border border-dashed border-gray-200 rounded-xl">
          연관 콘텐츠가 없습니다
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((item) => {
            const categoryHref = CATEGORY_ROUTE[item.category]
            const href = categoryHref ? `${categoryHref}/${item.slug}` : ROUTES.blog.all
            return (
              <Link
                key={item._id}
                href={href}
                className="group block rounded-xl border border-gray-200 overflow-hidden hover:border-primary-300 transition-colors"
              >
                <div className="relative aspect-[1200/630] bg-gray-100">
                  {item.thumbnail?.asset?.url && (
                    <Image
                      src={item.thumbnail.asset.url}
                      alt={item.thumbnail.alt ?? item.title}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-sm text-gray-400 line-clamp-2">{item.description}</p>
                  )}
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </div>
  )
}
