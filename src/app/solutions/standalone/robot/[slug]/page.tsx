import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { productBySlugQuery, type ProductDetail } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentDetail from "@/components/content/ContentDetail"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) return {}
  return { title: `${item.title} | Factorix`, description: item.description ?? item.summary ?? undefined }
}

export default async function RobotDetailPage({ params }: Props) {
  const { slug } = await params
  const { data } = await sanityFetch({ query: productBySlugQuery, params: { slug } })
  const item = data as ProductDetail | null
  if (!item) notFound()

  return (
    <ContentDetail
      eyebrow="액제제조 솔루션 · 단독설비 · 협동/직교/3축로봇"
      backHref={ROUTES.solutions.standalone.robot}
      backLabel="협동/직교/3축로봇"
      data={item}
    />
  )
}
