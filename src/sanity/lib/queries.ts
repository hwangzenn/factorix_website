import { defineQuery } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/react'

export type ReferenceMaterialSummary = {
  _id: string
  title: string
  slug: string
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

export type ReferenceMaterialDetail = ReferenceMaterialSummary & {
  category: string
  images: { asset: { url: string }; alt: string | null; caption: string | null }[] | null
  body: PortableTextBlock[] | null
  fileUrl: string | null
  externalUrl: string | null
}

export type ProductItem = {
  _id: string
  title: string
  summary: string | null
  specs: { key: string; value: string }[] | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  images: { asset: { url: string }; alt: string | null; caption: string | null }[] | null
}

export const referenceMaterialsQuery = defineQuery(`
  *[_type == "referenceMaterial" && category == $category && isPublic == true]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt }
  }
`)

export const referenceMaterialBySlugQuery = defineQuery(`
  *[_type == "referenceMaterial" && slug.current == $slug && isPublic == true][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt },
    images[] { asset->{ url }, alt, caption },
    body,
    "fileUrl": file.asset->url,
    externalUrl
  }
`)

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && category == $category] | order(_createdAt asc) {
    _id,
    title,
    summary,
    specs,
    thumbnail { asset->{ url }, alt },
    images[] { asset->{ url }, alt, caption }
  }
`)
