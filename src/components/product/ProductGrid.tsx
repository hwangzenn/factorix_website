import Image from "next/image"

type Spec = { key: string; value: string }

type ProductItem = {
  _id: string
  title: string
  summary: string | null
  specs: Spec[] | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  images: { asset: { url: string }; alt: string | null; caption: string | null }[] | null
}

type Props = {
  items: ProductItem[]
}

export default function ProductGrid({ items }: Props) {
  if (items.length === 0) {
    return <p className="text-gray-500">등록된 제품 정보가 없습니다.</p>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div
          key={item._id}
          className="bg-white border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
        >
          {item.thumbnail?.asset?.url ? (
            <div className="relative h-48 bg-gray-50">
              <Image
                src={item.thumbnail.asset.url}
                alt={item.thumbnail.alt ?? item.title}
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="h-48 bg-gray-50 flex items-center justify-center">
              <span className="text-gray-300 text-sm">이미지 준비 중</span>
            </div>
          )}

          <div className="p-5">
            <h3 className="text-lg font-bold text-primary-800 mb-2">{item.title}</h3>

            {item.summary && (
              <p className="text-sm text-gray-500 mb-4 line-clamp-3">{item.summary}</p>
            )}

            {item.images && item.images.length > 0 && (
              <div className="flex gap-2 mb-4 flex-wrap">
                {item.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="w-14 h-14 rounded-md overflow-hidden bg-gray-100">
                    <Image
                      src={img.asset.url}
                      alt={img.alt ?? ""}
                      width={56}
                      height={56}
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
            )}

            {item.specs && item.specs.length > 0 && (
              <table className="w-full text-sm border-t border-gray-100">
                <tbody>
                  {item.specs.map((spec, idx) => (
                    <tr key={idx} className="border-b border-gray-50">
                      <td className="py-1.5 pr-3 text-gray-400 w-2/5">{spec.key}</td>
                      <td className="py-1.5 text-gray-700 font-medium">{spec.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
