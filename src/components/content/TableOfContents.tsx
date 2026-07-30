"use client"

import { useEffect, useState } from "react"
import type { Heading } from "@/lib/toc"

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const tocHeadings = headings.filter((h) => h.level === "h2")
  const [activeId, setActiveId] = useState<string | null>(tocHeadings[0]?.id ?? null)

  useEffect(() => {
    if (tocHeadings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -70% 0px" }
    )
    const elements = tocHeadings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [tocHeadings])

  if (tocHeadings.length < 2) return null

  return (
    <nav className="hidden lg:block sticky top-28 self-start w-[240px] shrink-0">
      <p className="text-sm font-semibold text-gray-400 mb-3 tracking-wide">목차</p>
      <ul className="space-y-4 border-l border-gray-200">
        {tocHeadings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block -ml-px pl-3 border-l-2 py-0.5 text-sm leading-snug transition-colors ${
                activeId === h.id
                  ? "border-primary-700 text-primary-700 font-bold"
                  : "border-transparent text-gray-600 hover:text-gray-900"
              }`}
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
