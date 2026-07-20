"use client"

import { useEffect, useState } from "react"
import type { Heading } from "@/lib/toc"

export default function TableOfContents({ headings }: { headings: Heading[] }) {
  const [activeId, setActiveId] = useState<string | null>(headings[0]?.id ?? null)

  useEffect(() => {
    if (headings.length === 0) return
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((entry) => entry.isIntersecting)
        if (visible.length > 0) setActiveId(visible[0].target.id)
      },
      { rootMargin: "-100px 0px -70% 0px" }
    )
    const elements = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null)
    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [headings])

  if (headings.length < 2) return null

  return (
    <nav className="hidden lg:block sticky top-28 self-start w-[200px] shrink-0">
      <p className="text-xs font-semibold text-gray-400 mb-3 tracking-wide">목차</p>
      <ul className="space-y-2 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block pl-4 -ml-px border-l-2 py-0.5 text-sm transition-colors ${
                activeId === h.id
                  ? "border-primary-700 text-primary-700 font-medium"
                  : "border-transparent text-gray-500 hover:text-gray-800"
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
