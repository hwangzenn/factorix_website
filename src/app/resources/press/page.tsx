import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialsQuery, type ReferenceMaterialSummary } from "@/sanity/lib/queries"
import ResourceList from "../_components/ResourceList"

export const metadata: Metadata = {
  title: "언론보도 | Factorix",
  description: "Factorix 언론보도",
}

export default async function PressPage() {
  const { data } = await sanityFetch({
    query: referenceMaterialsQuery,
    params: { category: "press" },
  })

  return (
    <ResourceList
      eyebrow="자료실"
      title="언론보도"
      emptyMessage="등록된 언론보도가 없습니다."
      basePath="/resources/press"
      items={(data as ReferenceMaterialSummary[]) ?? []}
    />
  )
}
