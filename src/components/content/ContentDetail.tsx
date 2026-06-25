import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"

type ImageBlock = {
  asset: { url: string }
  alt: string | null
  caption: string | null
}

export type ContentDetailData = {
  title: string
  publishedAt?: string | null
  description?: string | null
  thumbnail?: { asset: { url: string }; alt: string | null } | null
  body?: PortableTextBlock[] | null
}

type Props = {
  eyebrow: string
  backHref: string
  backLabel: string
  data: ContentDetailData
}

const portableComponents = {
  types: {
    image: ({ value }: { value: ImageBlock }) => (
      <figure className="my-6">
        <div className="relative w-full aspect-[1200/630] rounded-lg overflow-hidden bg-gray-100">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ""}
            fill
            className="object-cover"
          />
        </div>
        {value.caption && (
          <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
        )}
      </figure>
    ),
  },
  block: {
    h1: ({ children }: { children?: React.ReactNode }) => <h1 className="text-3xl font-bold mt-10 mb-4">{children}</h1>,
    h2: ({ children }: { children?: React.ReactNode }) => <h2 className="text-2xl font-bold mt-8 mb-3">{children}</h2>,
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="text-base leading-relaxed mb-4">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-primary-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
  },
}

export default function ContentDetail({ eyebrow, backHref, backLabel, data }: Props) {
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
        <div className="relative w-full aspect-[1200/630] rounded-xl overflow-hidden mb-8 bg-gray-100">
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
        <div className="prose prose-gray max-w-none">
          <PortableText value={data.body} components={portableComponents} />
        </div>
      )}
    </div>
  )
}
