import { Suspense } from "react"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { allReferenceMaterialsQuery, type ReferenceMaterialWithCategory } from "@/sanity/lib/queries"
import ResourceListWithTabs from "./_components/ResourceListWithTabs"

export const metadata: Metadata = {
  title: "자료실 | Factorix",
  description: "Factorix 공지사항, 언론보도, 기술자료, 특허/수상, 투자정보",
}

export default async function ResourcesPage() {
  const { data } = await sanityFetch({ query: allReferenceMaterialsQuery })

  return (
    <Suspense>
      <ResourceListWithTabs items={(data as ReferenceMaterialWithCategory[]) ?? []} />
    </Suspense>
  )
}
