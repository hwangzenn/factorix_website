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
  slug: string
  summary: string | null
  description: string | null
  specs: { key: string; value: string }[] | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  images: { asset: { url: string }; alt: string | null; caption: string | null }[] | null
}

export type ProductDetail = ProductItem & {
  category: string
  body: PortableTextBlock[] | null
}

export type CaseStudySummary = {
  _id: string
  title: string
  slug: string
  description: string | null
  publishedAt: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  tags: string[] | null
  customerName: string | null
}

export type CaseStudyDetail = CaseStudySummary & {
  category: string
  challenge: string | null
  solution: string | null
  result: string | null
  metrics: { label: string; before: string; after: string }[] | null
  body: PortableTextBlock[] | null
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

export type ReferenceMaterialWithCategory = ReferenceMaterialSummary & {
  category: string
}

export const allReferenceMaterialsQuery = defineQuery(`
  *[_type == "referenceMaterial" && isPublic == true]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt }
  }
`)

export const featuredReferenceMaterialsQuery = defineQuery(`
  *[_type == "referenceMaterial" && isPublic == true && featuredOnMain == true]
  | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt }
  }
`)

export const latestReferenceMaterialsQuery = defineQuery(`
  *[_type == "referenceMaterial" && isPublic == true]
  | order(publishedAt desc) [0...3] {
    _id,
    title,
    "slug": slug.current,
    category,
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
    "slug": slug.current,
    summary,
    description,
    specs,
    thumbnail { asset->{ url }, alt },
    images[] { asset->{ url }, alt, caption }
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    summary,
    description,
    specs,
    thumbnail { asset->{ url }, alt },
    images[] { asset->{ url }, alt, caption },
    body
  }
`)

export const caseStudiesByCategoryQuery = defineQuery(`
  *[_type == "caseStudy" && category == $category && isPublic == true]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    publishedAt,
    thumbnail { asset->{ url }, alt },
    tags,
    customerName
  }
`)

export type CaseStudySummaryWithCategory = CaseStudySummary & {
  category: string
}

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && isPublic == true]
  | order(publishedAt desc) [0...30] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    publishedAt,
    thumbnail { asset->{ url }, alt },
    tags,
    customerName
  }
`)

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && isPublic == true][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    publishedAt,
    thumbnail { asset->{ url }, alt },
    tags,
    customerName,
    challenge,
    solution,
    result,
    metrics[]{ label, before, after },
    body
  }
`)
