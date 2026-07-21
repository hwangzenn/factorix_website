import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { extractHeadings, slugifyHeading, blockText } from "@/lib/toc"
import TableOfContents from "@/components/content/TableOfContents"

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
  body: PortableTextBlock[] | null
  images?: ImageBlock[] | null
  fileUrl?: string | null
  externalUrl?: string | null
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
  marks: {
    link: ({ children, value }: { children?: React.ReactNode; value?: { href?: string } }) => {
      const href = value?.href ?? "#"
      const isExternal = /^https?:\/\//.test(href)
      return (
        <a
          href={href}
          className="text-primary-700 underline underline-offset-2 hover:text-primary-800"
          {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {children}
        </a>
      )
    },
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

export default function ResourceDetail({ eyebrow, backHref, backLabel, data }: Props) {
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
        <p className="text-gray-600 mb-8 leading-relaxed whitespace-pre-line">{data.description}</p>
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
              <div className="relative aspect-[1200/630] rounded-lg overflow-hidden bg-gray-100">
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
      </div>
    </div>
  )
}
