import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { productsByCategoryQuery, type ProductItem } from "@/sanity/lib/queries"
import ProductGrid from "@/components/product/ProductGrid"
import { ROUTES } from "@/lib/routes"

export const metadata: Metadata = {
  title: "AI 디스펜서 | Factorix",
  description: "Factorix AI 디스펜서 — AI 기반 정밀 토출 솔루션",
}

export default async function DispenserPage() {
  const { data: products } = await sanityFetch({
    query: productsByCategoryQuery,
    params: { category: "standalone-dispenser" },
  })

  return (
    <div className="max-w-6xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">액제제조 솔루션 · 단독설비</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">AI 디스펜서</h1>
      <p className="text-gray-500 mb-12">AI 기반 정밀 토출 솔루션</p>

      <ProductGrid items={(products as ProductItem[]) ?? []} />

      <div className="flex gap-4 mt-16">
        <Link
          href={ROUTES.support.poc}
          className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors"
        >
          도입 문의
        </Link>
        <Link
          href={ROUTES.cases.industry.bio}
          className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors"
        >
          적용사례 보기
        </Link>
      </div>
    </div>
  )
}
