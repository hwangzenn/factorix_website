import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { referenceMaterialBySlugQuery, type ReferenceMaterialDetail } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ResourceDetail from "../../_components/ResourceDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: referenceMaterialBySlugQuery, params: { slug } })
  const item = data as ReferenceMaterialDetail | null
  if (!item) return {}
  return { title: `${item.title} | Factorix`, description: item.description ?? undefined }
}

export default async function PressDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: referenceMaterialBySlugQuery, params: { slug } })
  const item = data as ReferenceMaterialDetail | null
  if (!item) notFound()

  return (
    <ResourceDetail
      eyebrow="자료실 · 언론보도"
      backHref={ROUTES.resources.press}
      backLabel="언론보도 목록"
      data={item}
    />
  )
}
