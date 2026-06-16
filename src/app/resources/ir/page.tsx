import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialsQuery, type ReferenceMaterialSummary } from "@/sanity/lib/queries"
import ResourceList from "../_components/ResourceList"

export const metadata: Metadata = {
  title: "투자정보 | Factorix",
  description: "Factorix 투자 정보 IR",
}

export default async function IrPage() {
  const { data } = await sanityFetch({
    query: referenceMaterialsQuery,
    params: { category: "ir" },
  })

  return (
    <ResourceList
      eyebrow="자료실"
      title="투자정보"
      emptyMessage="등록된 투자정보가 없습니다."
      basePath="/resources/ir"
      items={(data as ReferenceMaterialSummary[]) ?? []}
    />
  )
}
