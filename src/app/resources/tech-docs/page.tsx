import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialsQuery, type ReferenceMaterialSummary } from "@/sanity/lib/queries"
import ResourceList from "../_components/ResourceList"

export const metadata: Metadata = {
  title: "기술자료실 | Factorix",
  description: "Factorix 기술 자료 다운로드",
}

export default async function TechDocsPage() {
  const { data } = await sanityFetch({
    query: referenceMaterialsQuery,
    params: { category: "tech-docs" },
  })

  return (
    <ResourceList
      eyebrow="자료실"
      title="기술자료실"
      emptyMessage="등록된 자료가 없습니다."
      basePath="/resources/tech-docs"
      items={(data as ReferenceMaterialSummary[]) ?? []}
    />
  )
}
