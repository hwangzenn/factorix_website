import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { productsByCategoryQuery, type ProductItem } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "UV/IR 경화기 | Factorix",
  description: "Factorix UV/IR 경화기 — 고효율 UV·IR 경화 솔루션",
}

export default async function CuringPage() {
  const { data } = await sanityFetch({
    query: productsByCategoryQuery,
    params: { category: "standalone-curing" },
  })
  const products = (data as ProductItem[]) ?? []

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-4xl font-bold text-primary-800">UV/IR 경화기</h1>
        <div className="flex gap-3 shrink-0">
          <Link href={ROUTES.support.poc} className="inline-flex px-5 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-md hover:bg-primary-800 transition-colors">도입 문의</Link>
          <Link href={ROUTES.cases.industry.electronics} className="inline-flex px-5 py-2.5 border border-primary-700 text-primary-700 text-sm font-semibold rounded-md hover:bg-primary-50 transition-colors">적용사례 보기</Link>
        </div>
      </div>

      <ContentCardGrid isEmpty={products.length === 0} emptyMessage="콘텐츠 준비 중입니다.">
        {products.map((p) => (
          <ContentCard
            key={p._id}
            title={p.title}
            description={p.description ?? p.summary}
            thumbnailUrl={p.thumbnail?.asset?.url}
            thumbnailAlt={p.thumbnail?.alt}
            href={`${ROUTES.solutions.standalone.curing}/${p.slug}`}
          />
        ))}
      </ContentCardGrid>
    </div>
  )
}
