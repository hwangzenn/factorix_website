import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialsQuery, type ReferenceMaterialSummary } from "@/sanity/lib/queries"
import ResourceList from "../_components/ResourceList"

export const metadata: Metadata = {
  title: "특허/수상 | Factorix",
  description: "Factorix 특허 및 수상 내역",
}

export default async function PatentsPage() {
  const { data } = await sanityFetch({
    query: referenceMaterialsQuery,
    params: { category: "patents" },
  })

  return (
    <ResourceList
      eyebrow="자료실"
      title="특허/수상"
      emptyMessage="등록된 내역이 없습니다."
      basePath="/resources/patents"
      items={(data as ReferenceMaterialSummary[]) ?? []}
    />
  )
}
