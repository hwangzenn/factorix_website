import Image from "next/image"
import Link from "next/link"

type Props = {
  title: string
  description?: string | null
  thumbnailUrl?: string | null
  thumbnailAlt?: string | null
  href: string
}

export default function ContentCard({ title, description, thumbnailUrl, thumbnailAlt, href }: Props) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      <div className="aspect-[1200/630] bg-gray-100 overflow-hidden">
        {thumbnailUrl ? (
          <Image
            src={thumbnailUrl}
            alt={thumbnailAlt ?? title}
            width={1200}
            height={630}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="text-gray-300">
              <rect x="6" y="10" width="36" height="28" rx="2" stroke="currentColor" strokeWidth="2" />
              <circle cx="18" cy="22" r="4" stroke="currentColor" strokeWidth="2" />
              <path d="M6 34l10-8 6 4 10-10 10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <p className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-primary-700 transition-colors">
          {title}
        </p>
        {description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{description}</p>
        )}
      </div>
    </Link>
  )
}
