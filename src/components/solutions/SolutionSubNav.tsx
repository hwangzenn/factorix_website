"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/lib/routes"

const GROUPS = [
  {
    label: "제품",
    items: [
      { href: ROUTES.solutions.standalone.mixer, label: "교반/탈포기" },
      { href: ROUTES.solutions.standalone.threeRollMill, label: "쓰리롤밀" },
      { href: ROUTES.solutions.standalone.filling, label: "액상충진기" },
      { href: ROUTES.solutions.standalone.dispenser, label: "디스펜서" },
      { href: ROUTES.solutions.standalone.robot, label: "협동/직교/3축로봇" },
      { href: ROUTES.solutions.standalone.curing, label: "UV/IR 경화기" },
    ],
  },
  {
    label: "시스템",
    items: [
      { href: ROUTES.solutions.ai.autoCalibration, label: "AI 자동보정 토출시스템" },
      { href: ROUTES.solutions.ai.smartFactory, label: "자동화 시스템" },
    ],
  },
] as const

export default function SolutionSubNav() {
  const pathname = usePathname()

  return (
    <nav className="border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {GROUPS.map((group) => (
          <div key={group.label} className="flex items-center gap-6">
            <span className="text-sm font-bold text-gray-900 shrink-0 py-3">{group.label}</span>
            {group.items.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-sm py-3 transition-colors ${
                    isActive
                      ? "text-primary-700 font-semibold"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-700" />
                  )}
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-300 opacity-0 hover:opacity-100 transition-opacity" />
                </Link>
              )
            })}
          </div>
        ))}
      </div>
    </nav>
  )
}
