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

// 최상단 1개만 피처드(2열 큰 카드), 나머지는 2열 그리드
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

  const [featured, ...rest] = items

  return (
    <div className="space-y-6">
      <BlogCard
        title={featured.title}
        description={featured.description}
        thumbnailUrl={featured.thumbnail?.asset?.url}
        thumbnailAlt={featured.thumbnail?.alt}
        href={featured.href}
        publishedAt={featured.publishedAt}
        categoryLabel={featured.categoryLabel}
        tag={featured.tag}
        size="featured"
        colorIndex={0}
      />

      {rest.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {rest.map((item, i) => (
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
              size="medium"
              colorIndex={i + 1}
            />
          ))}
        </div>
      )}
    </div>
  )
}
