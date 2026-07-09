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
  tags?: string[] | null
  customerName?: string | null
  challenge?: string | null
  solution?: string | null
  result?: string | null
  metrics?: { label: string; before: string; after: string }[] | null
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

      {data.tags && data.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-3">
          {data.tags.map((tag) => (
            <span key={tag} className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-700 text-xs font-semibold">
              {tag}
            </span>
          ))}
        </div>
      )}

      {(data.customerName || data.publishedAt) && (
        <p className="text-sm text-gray-400 mb-6">
          {[data.customerName, data.publishedAt ? new Date(data.publishedAt).toLocaleDateString("ko-KR") : null]
            .filter(Boolean)
            .join(" · ")}
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

      {(data.challenge || data.solution || data.result) && (
        <div className="space-y-6 mb-8">
          {data.challenge && (
            <div>
              <h2 className="text-sm font-bold text-primary-700 tracking-wide mb-2">과제</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.challenge}</p>
            </div>
          )}
          {data.solution && (
            <div>
              <h2 className="text-sm font-bold text-primary-700 tracking-wide mb-2">해결방안</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.solution}</p>
            </div>
          )}
          {data.result && (
            <div>
              <h2 className="text-sm font-bold text-primary-700 tracking-wide mb-2">성과</h2>
              <p className="text-gray-600 leading-relaxed whitespace-pre-line">{data.result}</p>
            </div>
          )}
        </div>
      )}

      {data.metrics && data.metrics.length > 0 && (
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="text-left font-semibold px-4 py-3">항목</th>
                <th className="text-left font-semibold px-4 py-3">전</th>
                <th className="text-left font-semibold px-4 py-3">후</th>
              </tr>
            </thead>
            <tbody>
              {data.metrics.map((m) => (
                <tr key={m.label} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{m.label}</td>
                  <td className="px-4 py-3 text-gray-500">{m.before}</td>
                  <td className="px-4 py-3 text-gray-900 font-semibold">{m.after}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.body && data.body.length > 0 && (
        <div className="prose prose-gray max-w-none">
          <PortableText value={data.body} components={portableComponents} />
        </div>
      )}
    </div>
  )
}
