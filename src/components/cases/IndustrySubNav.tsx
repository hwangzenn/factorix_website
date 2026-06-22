import Link from "next/link"
import { ROUTES } from "@/lib/routes"

const INDUSTRIES = [
  { key: "bio", label: "바이오", href: ROUTES.cases.industry.bio },
  { key: "cosmetics", label: "화장품/뷰티", href: ROUTES.cases.industry.cosmetics },
  { key: "chemical", label: "화학/소재", href: ROUTES.cases.industry.chemical },
  { key: "display", label: "디스플레이", href: ROUTES.cases.industry.display },
  { key: "electronics", label: "전기/전자", href: ROUTES.cases.industry.electronics },
  { key: "automotive", label: "자동차", href: ROUTES.cases.industry.automotive },
  { key: "battery", label: "이차전지", href: ROUTES.cases.industry.battery },
  { key: "research", label: "연구기관/대학", href: ROUTES.cases.industry.research },
] as const

export default function IndustrySubNav({ active }: { active: string }) {
  return (
    <nav className="flex flex-wrap gap-2 mb-10">
      {INDUSTRIES.map((cat) => (
        <Link
          key={cat.key}
          href={cat.href}
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
            active === cat.key
              ? "bg-primary-700 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          {cat.label}
        </Link>
      ))}
    </nav>
  )
}
