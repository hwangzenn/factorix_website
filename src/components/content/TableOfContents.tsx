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

  const LEVEL_STYLE: Record<Heading["level"], string> = {
    h2: "pl-3 text-base font-semibold",
    h3: "pl-6 text-sm font-medium",
    h4: "pl-9 text-sm font-medium",
  }

  return (
    <nav className="hidden lg:block sticky top-28 self-start w-[240px] shrink-0">
      <p className="text-sm font-semibold text-gray-400 mb-3 tracking-wide">목차</p>
      <ul className="space-y-2 border-l border-gray-200">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className={`block -ml-px border-l-2 py-0.5 leading-snug transition-colors ${LEVEL_STYLE[h.level]} ${
                activeId === h.id
                  ? "border-primary-700 text-primary-700 font-semibold"
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
