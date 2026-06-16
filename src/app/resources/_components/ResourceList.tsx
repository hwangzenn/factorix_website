import Image from "next/image"
import Link from "next/link"

type ResourceItem = {
  _id: string
  title: string
  slug: string
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

type Props = {
  eyebrow: string
  title: string
  emptyMessage: string
  basePath: string
  items: ResourceItem[]
}

export default function ResourceList({ eyebrow, title, emptyMessage, basePath, items }: Props) {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">{eyebrow}</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">{title}</h1>

      {items.length === 0 ? (
        <p className="text-gray-500">{emptyMessage}</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {items.map((item) => (
            <li key={item._id} className="py-5 flex gap-4 items-center">
              {item.thumbnail?.asset?.url && (
                <div className="flex-shrink-0 w-16 h-16 rounded-md overflow-hidden bg-gray-100">
                  <Image
                    src={item.thumbnail.asset.url}
                    alt={item.thumbnail.alt ?? item.title}
                    width={64}
                    height={64}
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
