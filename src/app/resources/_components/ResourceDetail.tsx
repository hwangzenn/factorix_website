import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { extractHeadings, slugifyHeading, blockText } from "@/lib/toc"
import { getVideoEmbedUrl } from "@/lib/video"
import type { VideoEmbedBlock, TableBlock } from "@/sanity/lib/queries"
import TableOfContents from "@/components/content/TableOfContents"

type ImageBlock = {
  asset: { url: string }
  alt: string | null
  caption: string | null
}

type BodyImageBlock = {
  asset: { url: string; metadata?: { dimensions?: { width: number; height: number } } }
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

type RelatedItem = {
  _id: string
  title: string
  href: string
  publishedAt?: string | null
  thumbnail?: { asset: { url: string }; alt: string | null } | null
}

type Props = {
  eyebrow: string
  backHref: string
  backLabel: string
  data: ResourceDetailData
  related?: RelatedItem[]
}

const portableComponents = {
  types: {
    image: ({ value }: { value: BodyImageBlock }) => {
      const { width, height } = value.asset.metadata?.dimensions ?? { width: 1200, height: 630 }
      return (
        <figure className="my-6">
          <Image
            src={value.asset.url}
            alt={value.alt ?? ""}
            width={width}
            height={height}
            className="w-full h-auto max-h-[600px] object-contain rounded-lg mx-auto"
          />
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    videoEmbed: ({ value }: { value: VideoEmbedBlock }) => {
      const src = getVideoEmbedUrl(value.url)
      if (!src) return null
      return (
        <figure className="my-6">
          <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
            <iframe
              src={src}
              className="absolute inset-0 w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <figcaption className="text-center text-sm text-gray-400 mt-2">{value.caption}</figcaption>
          )}
        </figure>
      )
    },
    table: ({ value }: { value: TableBlock }) => {
      const [head, ...body] = value.rows ?? []
      if (!head) return null
      return (
        <div className="my-6 overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-500">
                {head.cells.map((c, i) => (
                  <th key={i} className="text-left font-semibold px-4 py-2.5">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row) => (
                <tr key={row._key} className="border-t border-gray-100">
                  {row.cells.map((c, i) => (
                    <td key={i} className="px-4 py-2.5 text-gray-600 whitespace-pre-line">{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )
    },
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

export default function ResourceDetail({ eyebrow, backHref, backLabel, data, related }: Props) {
  const headings = extractHeadings(data.body)
  const hasToc = headings.length >= 2
  const hasRelated = Boolean(related && related.length > 0)
  const gridCols = hasToc && hasRelated
    ? "lg:grid-cols-[200px_1fr_260px]"
    : hasToc
    ? "lg:grid-cols-[200px_1fr]"
    : hasRelated
    ? "lg:grid-cols-[1fr_260px]"
    : ""

  return (
    <div className={`mx-auto px-6 py-20 ${hasToc || hasRelated ? "max-w-6xl" : "max-w-3xl"}`}>
      <div className={gridCols ? `grid ${gridCols} gap-10` : ""}>
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

        {hasRelated && (
          <aside className="hidden lg:block self-start sticky top-28">
            <p className="text-xs font-semibold text-gray-400 mb-3 tracking-wide">연관 콘텐츠</p>
            <div className="space-y-4">
              {related!.map((item) => (
                <Link key={item._id} href={item.href} className="group flex gap-3">
                  <div className="relative w-20 aspect-square rounded-lg overflow-hidden bg-gray-100 shrink-0">
                    {item.thumbnail?.asset?.url && (
                      <Image
                        src={item.thumbnail.asset.url}
                        alt={item.thumbnail.alt ?? item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 line-clamp-2 group-hover:text-primary-700 transition-colors">
                      {item.title}
                    </p>
                    {item.publishedAt && (
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(item.publishedAt).toLocaleDateString("ko-KR")}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </div>
    </div>
  )
}
