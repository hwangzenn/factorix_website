"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { INDUSTRIES, PROCESSES } from "@/lib/blogFilters"

const ALL = "all"

export default function BlogFilterBar() {
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const industry = searchParams.get("industry") ?? ALL
  const process = searchParams.get("process") ?? ALL

  const updateParam = (key: "industry" | "process", value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === ALL) {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    const query = params.toString()
    router.push(query ? `${pathname}?${query}` : pathname)
  }

  return (
    <div className="flex gap-2">
      <FilterSelect label="산업군" value={industry} onChange={(v) => updateParam("industry", v)} options={INDUSTRIES} />
      <FilterSelect label="공정" value={process} onChange={(v) => updateParam("process", v)} options={PROCESSES} />
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
  options: readonly { key: string; label: string }[]
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
