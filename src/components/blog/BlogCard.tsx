import Image from "next/image"
import Link from "next/link"

const FALLBACK_BG = ["bg-primary-700", "bg-primary-900", "bg-gray-800", "bg-primary-600", "bg-primary-800"]

type Props = {
  title: string
  description?: string | null
  thumbnailUrl?: string | null
  thumbnailAlt?: string | null
  href: string
  publishedAt?: string | null
  categoryLabel: string
  tag?: string | null
  processLabel?: string | null
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
  processLabel,
  colorIndex = 0,
}: Props) {
  return (
    <Link
      href={href}
      className="group flex flex-col h-full rounded-2xl border border-gray-200 bg-white overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-900/5"
    >
      <div className="relative bg-gray-100 overflow-hidden shrink-0 aspect-[1200/630]">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt ?? title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center ${FALLBACK_BG[colorIndex % FALLBACK_BG.length]}`}>
            <span className="text-white/25 font-bold tracking-wide text-3xl">FX</span>
          </div>
        )}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full bg-primary-700 text-white text-xs font-semibold shadow-sm">
            {categoryLabel}
          </span>
          {tag && (
            <span className="px-2.5 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold shadow-sm backdrop-blur-sm">
              {tag}
            </span>
          )}
          {processLabel && (
            <span className="px-2.5 py-1 rounded-full bg-white/90 text-gray-900 text-xs font-semibold shadow-sm backdrop-blur-sm">
              {processLabel}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 min-w-0 p-5">
        <p className="font-bold text-gray-900 leading-snug group-hover:text-primary-700 transition-colors mb-2 text-lg min-h-[25px]">
          {title}
        </p>
        <p className="text-gray-500 leading-relaxed text-sm line-clamp-1 min-h-[23px]">
          {description || "내용이 없습니다."}
        </p>
        <div className="mt-auto pt-4 border-t border-gray-100 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
          {publishedAt && <span>{new Date(publishedAt).toLocaleDateString("ko-KR")}</span>}
          <span>·</span>
          <span>작성자: Factorix 팩토릭스</span>
        </div>
      </div>
    </Link>
  )
}
