import { Suspense } from "react"
import type { Metadata } from "next"
import { sanityFetch } from "@/sanity/lib/live"
import { allCaseStudiesQuery, type CaseStudyWithTags } from "@/sanity/lib/queries"
import BlogHero from "@/components/blog/BlogHero"
import CaseStudyFilter from "@/components/blog/CaseStudyFilter"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "케이스 스터디 | Factorix",
  description: "산업군·공정별로 살펴보는 팩토릭스 케이스 스터디",
}

export default async function CaseStudiesPage() {
  const { data } = await sanityFetch({ query: allCaseStudiesQuery })
  const items = (data as CaseStudyWithTags[]) ?? []

  return (
    <div>
      <BlogHero
        title="케이스 스터디"
        description="산업군·공정별로 살펴보는 팩토릭스 케이스 스터디"
        active="cases"
      />

      <div className="max-w-5xl mx-auto px-6 py-14">
        <Suspense>
          <CaseStudyFilter items={items} />
        </Suspense>
      </div>
    </div>
  )
}
