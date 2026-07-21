import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { extractHeadings, slugifyHeading, blockText } from "@/lib/toc"
import TableOfContents from "./TableOfContents"

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
  specs?: { key: string; value: string }[] | null
  images?: ImageBlock[] | null
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
    h2: ({ children, value }: { children?: React.ReactNode; value: PortableTextBlock }) => (
      <h2 id={slugifyHeading(blockText(value))} className="text-2xl font-bold mt-8 mb-3 scroll-mt-28">
        {children}
      </h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>,
    h4: ({ children }: { children?: React.ReactNode }) => <h4 className="text-lg font-semibold mt-4 mb-2">{children}</h4>,
    normal: ({ children }: { children?: React.ReactNode }) => <p className="text-base leading-relaxed mb-4 whitespace-pre-line">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-primary-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
  },
}

export default function ContentDetail({ eyebrow, backHref, backLabel, data }: Props) {
  const headings = extractHeadings(data.body)
  const hasToc = headings.length >= 2

  return (
    <div className={`mx-auto px-6 py-20 ${hasToc ? "max-w-5xl" : "max-w-3xl"}`}>
      <div className={hasToc ? "grid lg:grid-cols-[200px_1fr] gap-10" : ""}>
        {hasToc && <TableOfContents headings={headings} />}
        <div>
      <p className="text-sm text-primary-600 font-medium mb-1">{eyebrow}</p>
      <Link href={backHref} className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
        ← {backLabel}
      </Link>

      <h1 className="text-3xl font-bold text-primary-800 mt-6 mb-3">{data.title}</h1>

      {data.publishedAt && (
        <p className="text-sm text-gray-400 mb-6">{new Date(data.publishedAt).toLocaleDateString("ko-KR")}</p>
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
        <p className="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">{data.description}</p>
      )}

      {data.specs && data.specs.length > 0 && (
        <div className="mb-8 overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                <th className="text-left font-semibold px-4 py-3 w-1/3">Attribute</th>
                <th className="text-left font-semibold px-4 py-3">Property</th>
              </tr>
            </thead>
            <tbody>
              {data.specs.map((s) => (
                <tr key={s.key} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-gray-900">{s.key}</td>
                  <td className="px-4 py-3 text-gray-600">{s.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {data.images && data.images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {data.images.map((img, idx) => (
            <figure key={idx}>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
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

      {data.body && data.body.length > 0 && (
        <div className="prose prose-gray max-w-none">
          <PortableText value={data.body} components={portableComponents} />
        </div>
      )}
        </div>
      </div>
    </div>
  )
}
