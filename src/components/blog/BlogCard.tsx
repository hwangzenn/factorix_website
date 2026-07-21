import Image from "next/image"
import Link from "next/link"

const FALLBACK_BG = ["bg-primary-700", "bg-primary-900", "bg-gray-800", "bg-primary-600", "bg-primary-800"]

export type BlogCardSize = "featured" | "medium"

type Props = {
  title: string
  description?: string | null
  thumbnailUrl?: string | null
  thumbnailAlt?: string | null
  href: string
  publishedAt?: string | null
  categoryLabel: string
  tag?: string | null
  size?: BlogCardSize
  colorIndex?: number
}

export default function BlogCard({
  title,
  description,
  thumbnailUrl,
  thumbnailAlt,
  href,
  publishedAt,
  categoryLabel,
  tag,
  size = "medium",
  colorIndex = 0,
}: Props) {
  const isFeatured = size === "featured"

  return (
    <Link href={href} className={`group flex h-full ${isFeatured ? "flex-col md:flex-row md:gap-8" : "flex-col"}`}>
      <div
        className={`relative bg-gray-100 overflow-hidden shrink-0 rounded-xl ${
          isFeatured ? "aspect-[1200/600] md:aspect-auto md:w-1/2" : "aspect-[1200/600]"
        }`}
      >
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt ?? title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${FALLBACK_BG[colorIndex % FALLBACK_BG.length]}`}>
            <span className={`text-white/25 font-bold tracking-wide ${isFeatured ? "text-4xl" : "text-3xl"}`}>FX</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold shadow-sm backdrop-blur-sm">
            {categoryLabel}
          </span>
        </div>
      </div>

      <div className={`flex flex-col flex-1 ${isFeatured ? "pt-5 md:pt-0 md:justify-center" : "pt-4"}`}>
        <p
          className={`font-bold text-gray-900 leading-snug group-hover:text-primary-700 transition-colors mb-2 ${
            isFeatured ? "text-2xl md:text-3xl line-clamp-2" : "text-base line-clamp-2"
          }`}
        >
          {title}
        </p>
        <p className={`text-gray-500 leading-relaxed ${isFeatured ? "text-sm md:text-base line-clamp-3" : "text-sm line-clamp-2"}`}>
          {description || "내용이 없습니다."}
        </p>
        <div className="mt-auto pt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
          {publishedAt && <span>{new Date(publishedAt).toLocaleDateString("ko-KR")}</span>}
          <span>·</span>
          <span>작성자: 팩토릭스</span>
          {tag && <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">{tag}</span>}
        </div>
      </div>
    </Link>
  )
}
