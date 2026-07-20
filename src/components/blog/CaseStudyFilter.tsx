"use client"

import { useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import BlogFeed from "@/components/blog/BlogFeed"
import type { CaseStudyWithTags } from "@/sanity/lib/queries"

const INDUSTRIES = [
  { key: "bio", label: "바이오" },
  { key: "cosmetics", label: "화장품/뷰티" },
  { key: "chemical", label: "화학/소재" },
  { key: "electronics", label: "전기/전자" },
  { key: "automotive", label: "자동차" },
  { key: "research", label: "연구기관/대학" },
]

const PROCESSES = [
  { key: "mixer-defoamer", label: "교반/탈포기" },
  { key: "three-roll-mill", label: "쓰리롤밀" },
  { key: "filling", label: "액상충진" },
  { key: "dispenser", label: "AI 디스펜싱" },
  { key: "curing", label: "UV/IR 경화" },
  { key: "robot", label: "로봇" },
]

const ALL = "all"

export default function CaseStudyFilter({ items }: { items: CaseStudyWithTags[] }) {
  const searchParams = useSearchParams()
  const [industry, setIndustry] = useState(searchParams.get("industry") ?? ALL)
  const [process, setProcess] = useState(searchParams.get("process") ?? ALL)

  const filtered = useMemo(
    () =>
      items.filter((item) => {
        const matchIndustry = industry === ALL || item.industries === industry
        const matchProcess = process === ALL || item.processes === process
        return matchIndustry && matchProcess
      }),
    [items, industry, process]
  )

  return (
    <div>
      <div className="flex justify-end gap-2 mb-8">
        <FilterSelect label="산업군" value={industry} onChange={setIndustry} options={INDUSTRIES} />
        <FilterSelect label="공정" value={process} onChange={setProcess} options={PROCESSES} />
      </div>

      <BlogFeed
        emptyMessage="조건에 맞는 케이스 스터디가 없습니다."
        items={filtered.map((item) => ({
          _id: item._id,
          title: item.title,
          description: item.description,
          thumbnail: item.thumbnail,
          href: `${ROUTES.blog.cases}/${item.slug}`,
          publishedAt: item.publishedAt,
          categoryLabel: "케이스 스터디",
          tag: INDUSTRIES.find((i) => i.key === item.industries)?.label ?? null,
        }))}
      />
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: { key: string; label: string }[]
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="text-sm border border-gray-200 rounded-md pl-3 pr-7 py-1.5 text-gray-700 bg-white hover:border-gray-300 focus:outline-none focus:ring-1 focus:ring-primary-500 transition-colors"
    >
      <option value={ALL}>{label} 전체</option>
      {options.map((o) => (
        <option key={o.key} value={o.key}>
          {o.label}
        </option>
      ))}
    </select>
  )
}
