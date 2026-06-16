import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"

type ImageBlock = {
  asset: { url: string }
  alt: string | null
  caption: string | null
}

type ResourceDetailData = {
  title: string
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  images: ImageBlock[] | null
  body: PortableTextBlock[] | null
  fileUrl: string | null
  externalUrl: string | null
}

type Props = {
  eyebrow: string
  backHref: string
  backLabel: string
  data: ResourceDetailData
}

const portableComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="my-6">
        <Image
          src={value.asset.url}
          alt={value.alt ?? ""}
          width={800}
          height={500}
          className="rounded-lg object-cover w-full"
        />
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
}

export default function ResourceDetail({ eyebrow, backHref, backLabel, data }: Props) {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-1">{eyebrow}</p>
      <Link href={backHref} className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
        ← {backLabel}
      </Link>

      <h1 className="text-3xl font-bold text-primary-800 mt-6 mb-3">{data.title}</h1>

      {data.publishedAt && (
        <p className="text-sm text-gray-400 mb-6">
          {new Date(data.publishedAt).toLocaleDateString("ko-KR")}
        </p>
      )}

      {data.thumbnail?.asset?.url && (
        <div className="relative w-full h-64 rounded-xl overflow-hidden mb-8 bg-gray-100">
          <Image
            src={data.thumbnail.asset.url}
            alt={data.thumbnail.alt ?? data.title}
            fill
            className="object-cover"
          />
        </div>
      )}

      {data.description && (
        <p className="text-gray-600 mb-8 leading-relaxed">{data.description}</p>
      )}

      {data.body && data.body.length > 0 && (
        <div className="prose prose-gray max-w-none mb-8">
          <PortableText value={data.body} components={portableComponents} />
        </div>
      )}

      {data.images && data.images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 mb-8">
          {data.images.map((img, idx) => (
            <figure key={idx}>
              <div className="relative h-48 rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src={img.asset.url}
                  alt={img.alt ?? ""}
                  fill
                  className="object-cover"
                />
              </div>
              {img.caption && (
                <figcaption className="text-center text-xs text-gray-400 mt-1">{img.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        {data.fileUrl && (
          <a
            href={data.fileUrl}
            download
            className="inline-flex px-5 py-2.5 bg-primary-700 text-white font-medium rounded-md hover:bg-primary-800 transition-colors text-sm"
          >
            파일 다운로드
          </a>
        )}
        {data.externalUrl && (
          <a
            href={data.externalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex px-5 py-2.5 border border-primary-700 text-primary-700 font-medium rounded-md hover:bg-primary-50 transition-colors text-sm"
          >
            원문 보기 ↗
          </a>
        )}
      </div>
    </div>
  )
}
