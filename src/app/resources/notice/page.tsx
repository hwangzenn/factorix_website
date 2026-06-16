import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialsQuery, type ReferenceMaterialSummary } from "@/sanity/lib/queries"
import ResourceList from "../_components/ResourceList"

export const metadata: Metadata = {
  title: "공지사항 | Factorix",
  description: "Factorix 공지사항",
}

export default async function NoticePage() {
  const { data } = await sanityFetch({
    query: referenceMaterialsQuery,
    params: { category: "notice" },
  })

  return (
    <ResourceList
      eyebrow="자료실"
      title="공지사항"
      emptyMessage="등록된 공지사항이 없습니다."
      basePath="/resources/notice"
      items={(data as ReferenceMaterialSummary[]) ?? []}
    />
  )
}
