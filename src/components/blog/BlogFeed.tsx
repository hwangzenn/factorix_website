import BlogCard from "./BlogCard"

export type FeedItem = {
  _id: string
  title: string
  description?: string | null
  thumbnail?: { asset: { url: string } | null; alt?: string | null } | null
  href: string
  publishedAt?: string | null
  categoryLabel: string
  tag?: string | null
}

export default function BlogFeed({
  items,
  emptyMessage = "콘텐츠 준비 중입니다.",
}: {
  items: FeedItem[]
  emptyMessage?: string
}) {
  if (items.length === 0) {
    return <p className="text-gray-500 py-12">{emptyMessage}</p>
  }

  return (
    <div>
      <div className="flex justify-end mb-4">
        <span className="text-sm text-gray-400">총 {items.length}개</span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-10">
        {items.map((item, i) => (
          <BlogCard
            key={item._id}
            title={item.title}
            description={item.description}
            thumbnailUrl={item.thumbnail?.asset?.url}
            thumbnailAlt={item.thumbnail?.alt}
            href={item.href}
            publishedAt={item.publishedAt}
            categoryLabel={item.categoryLabel}
            tag={item.tag}
            colorIndex={i}
          />
        ))}
      </div>
    </div>
  )
}
