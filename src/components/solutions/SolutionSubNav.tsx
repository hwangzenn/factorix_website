"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/lib/routes"

const GROUPS = [
  {
    label: "제조자동화 단동설비",
    items: [
      { href: ROUTES.solutions.automationSystemIndustries.bioMedical, label: "바이오·의료기기" },
      { href: ROUTES.solutions.automationSystemIndustries.chemicalsMaterials, label: "화학·소재" },
      { href: ROUTES.solutions.automationSystemIndustries.electronicsBattery, label: "전자·배터리" },
      { href: ROUTES.solutions.automationSystemIndustries.automotive, label: "자동차·부품" },
      { href: ROUTES.solutions.automationSystemIndustries.researchAcademia, label: "연구기관·대학" },
    ],
  },
  {
    label: "액상제조 장비",
    items: [
      { href: ROUTES.solutions.equipment.mixer, label: "교반/탈포기" },
      { href: ROUTES.solutions.equipment.threeRollMill, label: "쓰리롤밀" },
      { href: ROUTES.solutions.equipment.filling, label: "액상충진기" },
      { href: ROUTES.solutions.equipment.dispenser, label: "디스펜서" },
      { href: ROUTES.solutions.equipment.robot, label: "협동/직교/3축로봇" },
      { href: ROUTES.solutions.equipment.curing, label: "UV/IR 경화기" },
      { href: ROUTES.solutions.equipment.consumables, label: "소모품" },
    ],
  },
] as const

export default function SolutionSubNav() {
  const pathname = usePathname()

  return (
    <nav className="hidden sm:block border-b border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        {GROUPS.map((group) => (
          <div key={group.label} className="flex items-center gap-6 overflow-x-auto whitespace-nowrap">
            <span className="text-base font-bold text-gray-900 shrink-0 py-3">{group.label}</span>
            {group.items.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative shrink-0 text-base py-3 transition-colors ${
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
