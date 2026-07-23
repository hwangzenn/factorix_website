import { defineQuery } from 'next-sanity'
import type { PortableTextBlock } from '@portabletext/react'

// 다국어 쿼리 컨벤션 (product/caseStudy/blogPost/referenceMaterial 공통):
// 한국어(기본): language == "ko" || !defined(language)  — language 필드가 없는 기존 문서는 한국어로 취급
// 영문: language == "en"
// 지금은 모든 목록/상세 쿼리가 KO 전용 라우트에서만 쓰이므로 필터를 걸지 않는다.
// EN 전용 페이지를 만들 때 그 쿼리에만 `&& language == "en"`을 추가한다.

export type SeoData = {
  metaTitle: string | null
  metaDescription: string | null
  ogImage: { asset: { url: string } } | null
  ogImageAlt: string | null
} | null

const seoProjection = `seo { metaTitle, metaDescription, ogImage { asset->{ url } }, ogImageAlt }`

// body(PortableText) 안의 image 블록은 asset이 참조(_ref)일 뿐이라 asset->로 역참조해야
// 프론트에서 value.asset.url을 읽을 수 있다. block/videoEmbed 타입은 ...로 그대로 통과.
const bodyProjection = `body[]{ ..., _type == "image" => { ..., asset->{ url, metadata { dimensions { width, height } } } } }`

export type VideoEmbedBlock = { _type: 'videoEmbed'; url: string; caption: string | null }

export type TableBlock = { _type: 'table'; rows: { _key: string; cells: string[] }[] }

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
  seo: SeoData
}

export type ProductItem = {
  _id: string
  title: string
  slug: string
  description: string | null
  specs: { key: string; value: string }[] | null
  images: { asset: { url: string }; alt: string | null; caption: string | null }[] | null
}

export type ProductDetail = ProductItem & {
  category: string
  body: PortableTextBlock[] | null
  seo: SeoData
}

export type CaseStudySummary = {
  _id: string
  title: string
  slug: string
  description: string | null
  publishedAt: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

export type CaseStudyWithTags = CaseStudySummary & {
  industries: string | null
  processes: string | null
}

export type CaseStudyDetail = CaseStudyWithTags & {
  body: PortableTextBlock[] | null
  seo: SeoData
}

export type BlogPostSummary = {
  _id: string
  title: string
  slug: string
  category: string
  author: string | null
  publishedAt: string | null
  description: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
  tags: string[] | null
  industries: string | null
  processes: string | null
}

export type BlogPostDetail = BlogPostSummary & {
  body: PortableTextBlock[] | null
  seo: SeoData
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
    ${bodyProjection},
    "fileUrl": file.asset->url,
    externalUrl,
    ${seoProjection}
  }
`)

export type IndustryLogo = {
  category: string
  logos: { image: { asset: { url: string } } | null; alt: string | null }[] | null
}

export const industryLogosQuery = defineQuery(`
  *[_type == "industryLogo"] {
    category,
    logos[] { image { asset->{ url } }, alt }
  }
`)

export const productsByCategoryQuery = defineQuery(`
  *[_type == "product" && category == $category] | order(_createdAt asc) {
    _id,
    title,
    "slug": slug.current,
    description,
    specs,
    images[] { asset->{ url }, alt, caption }
  }
`)

export const productBySlugQuery = defineQuery(`
  *[_type == "product" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    description,
    specs,
    images[] { asset->{ url }, alt, caption },
    ${bodyProjection},
    ${seoProjection}
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
    thumbnail { asset->{ url }, alt }
  }
`)

export const allCaseStudiesQuery = defineQuery(`
  *[_type == "caseStudy" && isPublic == true]
  | order(publishedAt desc) [0...60] {
    _id,
    title,
    "slug": slug.current,
    industries,
    processes,
    description,
    publishedAt,
    thumbnail { asset->{ url }, alt }
  }
`)

export const caseStudyBySlugQuery = defineQuery(`
  *[_type == "caseStudy" && slug.current == $slug && isPublic == true][0] {
    _id,
    title,
    "slug": slug.current,
    industries,
    processes,
    description,
    publishedAt,
    thumbnail { asset->{ url }, alt },
    ${bodyProjection},
    ${seoProjection}
  }
`)

export const blogPostsByCategoryQuery = defineQuery(`
  *[_type == "blogPost" && category == $category && isPublic == true]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt },
    tags,
    industries,
    processes
  }
`)

export const allBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && isPublic == true]
  | order(publishedAt desc) [0...60] {
    _id,
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt },
    tags,
    industries,
    processes
  }
`)

export const relatedBlogPostsQuery = defineQuery(`
  *[_type == "blogPost" && category == $category && isPublic == true && slug.current != $slug]
  | order(publishedAt desc) [0...4] {
    _id,
    title,
    "slug": slug.current,
    publishedAt,
    thumbnail { asset->{ url }, alt }
  }
`)

export type RelatedBlogPost = {
  _id: string
  title: string
  slug: string
  publishedAt: string | null
  thumbnail: { asset: { url: string }; alt: string | null } | null
}

export type FaqItem = {
  _id: string
  question: string
  answer: string
  category: string
}

export const featuredFaqsQuery = defineQuery(`
  *[_type == "faq" && isPublic == true && featuredOnMain == true]
  | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`)

export const allFaqsQuery = defineQuery(`
  *[_type == "faq" && isPublic == true]
  | order(category asc, order asc) {
    _id,
    question,
    answer,
    category
  }
`)

export const blogPostBySlugQuery = defineQuery(`
  *[_type == "blogPost" && slug.current == $slug && isPublic == true][0] {
    _id,
    title,
    "slug": slug.current,
    category,
    author,
    publishedAt,
    description,
    thumbnail { asset->{ url }, alt },
    tags,
    ${bodyProjection},
    ${seoProjection}
  }
`)
