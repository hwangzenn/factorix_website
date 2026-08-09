import type React from "react"
import Image from "next/image"
import Link from "next/link"
import { PortableText, type PortableTextBlock } from "@portabletext/react"
import { extractHeadings, slugifyHeading, blockText } from "@/lib/toc"
import { getVideoEmbedUrl } from "@/lib/video"
import type { VideoEmbedBlock, TableBlock } from "@/sanity/lib/queries"
import TableOfContents from "@/components/content/TableOfContents"
import ContentInquiryButton from "@/components/content/ContentInquiryButton"
import ShareButton from "@/components/content/ShareButton"
import NewsletterSubscribe from "@/components/content/NewsletterSubscribe"

type ImageBlock = {
  asset: { url: string }
  alt: string | null
  caption: string | null
}

type BodyImageBlock = {
  asset?: { url: string; metadata?: { dimensions?: { width: number; height: number } } }
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
  breadcrumbRoot?: { label: string; href: string }
  contentInquirySlug?: string
  browseMoreHref?: string
}

const portableComponents = {
  types: {
    image: ({ value }: { value: BodyImageBlock }) => {
      if (!value.asset?.url) return null
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
                  <th key={i} className="text-left font-semibold px-4 py-2.5 break-words">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row) => (
                <tr key={row._key} className="border-t border-gray-100">
                  {row.cells.map((c, i) => (
                    <td key={i} className="px-4 py-2.5 text-gray-600 whitespace-pre-line break-words">{c}</td>
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
          className="text-primary-700 underline underline-offset-2 hover:text-accent"
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
      <h2 id={slugifyHeading(blockText(value))} className="text-3xl font-bold mt-8 mb-3 scroll-mt-28">
        {children}
      </h2>
    ),
    h3: ({ children, value }: { children?: React.ReactNode; value: PortableTextBlock }) => (
      <h3 id={slugifyHeading(blockText(value))} className="text-xl font-semibold mt-6 mb-2 scroll-mt-28">
        {children}
      </h3>
    ),
    h4: ({ children, value }: { children?: React.ReactNode; value: PortableTextBlock }) => (
      <h4 id={slugifyHeading(blockText(value))} className="text-lg font-semibold mt-4 mb-2 scroll-mt-28">
        {children}
      </h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => <p className="text-lg leading-relaxed mb-4 whitespace-pre-line">{children}</p>,
    blockquote: ({ children }: { children?: React.ReactNode }) => <blockquote className="border-l-4 border-primary-300 pl-4 italic text-gray-600 my-4">{children}</blockquote>,
  },
}

export default function ResourceDetail({ eyebrow, backHref, backLabel, data, related, breadcrumbRoot, contentInquirySlug, browseMoreHref }: Props) {
  const headings = extractHeadings(data.body)
  const hasToc = headings.length >= 2
  const hasRelated = related !== undefined
  const gridCols = hasToc && hasRelated
    ? "lg:grid-cols-[240px_1fr_260px]"
    : hasToc
    ? "lg:grid-cols-[240px_1fr]"
    : hasRelated
    ? "lg:grid-cols-[1fr_260px]"
    : ""

  return (
    <div className={`mx-auto px-6 py-20 ${hasToc || hasRelated ? "max-w-7xl" : "max-w-3xl"}`}>
      <div className={gridCols ? `grid ${gridCols} gap-16` : ""}>
        {hasToc && <TableOfContents headings={headings} />}
        <div className="px-[5px]">
      {breadcrumbRoot ? (
        <nav aria-label="breadcrumb" className="flex flex-wrap items-center gap-2 text-sm mb-1">
          <Link href={breadcrumbRoot.href} className="text-gray-400 underline underline-offset-2 hover:text-primary-600 transition-colors">
            {breadcrumbRoot.label}
          </Link>
          <span className="text-gray-300" aria-hidden>&gt;</span>
          <Link href={backHref} className="text-gray-400 underline underline-offset-2 hover:text-primary-600 transition-colors">
            {backLabel}
          </Link>
        </nav>
      ) : (
        <>
          <p className="text-sm text-primary-600 font-medium mb-1">{eyebrow}</p>
          <Link href={backHref} className="text-sm text-gray-400 hover:text-primary-600 transition-colors">
            ← {backLabel}
          </Link>
        </>
      )}

      <h1 className="text-[2.75rem] leading-tight font-bold text-primary-800 mt-8 mb-6">{data.title}</h1>

      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <p className="text-sm text-gray-400">
          {data.publishedAt && (
            <>
              {new Date(data.publishedAt).toLocaleDateString("ko-KR")}
              <span className="mx-2 text-gray-300" aria-hidden>·</span>
            </>
          )}
          작성자: Factorix
        </p>
        <ShareButton />
      </div>

      {data.description && (
        <div className="mb-8 bg-gray-50 rounded-xl p-5">
          <p className="text-sm font-semibold text-gray-400 mb-2 tracking-wide">한줄 요약</p>
          <p className="text-lg text-gray-600 leading-relaxed whitespace-pre-line">{data.description}</p>
        </div>
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
            className="inline-flex px-5 py-2.5 bg-primary-700 text-white font-medium rounded-md hover:bg-accent transition-colors text-sm"
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

      {contentInquirySlug && (
        <div className="flex flex-wrap gap-3 mt-10 pt-8 border-t border-gray-100">
          <ContentInquiryButton slug={contentInquirySlug} />
        </div>
      )}

      <NewsletterSubscribe />
        </div>

        {hasRelated && (
          <aside className="hidden lg:block self-start sticky top-28">
            <p className="text-sm font-semibold text-gray-400 mb-3 tracking-wide">연관 콘텐츠</p>
            {related!.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8 border border-dashed border-gray-200 rounded-xl">
                해당없음
              </p>
            ) : (
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
            )}
            {browseMoreHref && (
              <Link
                href={browseMoreHref}
                className="mt-6 inline-flex items-center justify-center w-full px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors text-sm"
              >
                더보기 →
              </Link>
            )}
          </aside>
        )}
      </div>
    </div>
  )
}
