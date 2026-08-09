import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { productsByCategoryQuery, type ProductItem } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"
import CategoryBreadcrumb from "@/components/content/CategoryBreadcrumb"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "교반/탈포기",
  description: "Factorix 교반/탈포기 — 정밀 액제 혼합 솔루션",
  alternates: { canonical: ROUTES.solutions.equipment.mixer },
}

export default async function MixerPage() {
  const { data } = await sanityFetch({
    query: productsByCategoryQuery,
    params: { category: "mixer-defoamer" },
  })
  const products = (data as ProductItem[]) ?? []

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-10">
        <div>
          <CategoryBreadcrumb segments={["솔루션", "액상제조 장비", "교반/탈포기"]} />
          <h1 className="hidden sm:block text-4xl font-bold text-primary-800">교반/탈포기</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href={ROUTES.support.poc} className="inline-flex px-5 py-2.5 bg-primary-700 text-white text-sm font-semibold rounded-md hover:bg-accent transition-colors">도입 문의</Link>
          <Link href={`${ROUTES.blog.cases}?industry=bio`} className="inline-flex px-5 py-2.5 border border-primary-700 text-primary-700 text-sm font-semibold rounded-md hover:bg-primary-50 transition-colors">적용사례 보기</Link>
        </div>
      </div>

      <ContentCardGrid isEmpty={products.length === 0} emptyMessage="콘텐츠 준비 중입니다.">
        {products.map((p) => (
          <ContentCard
            key={p._id}
            title={p.title}
            description={p.description}
            thumbnailUrl={p.images?.[0]?.asset?.url}
            thumbnailAlt={p.images?.[0]?.alt}
            href={`${ROUTES.solutions.equipment.mixer}/${p.slug}`}
          />
        ))}
      </ContentCardGrid>
    </div>
  )
}
