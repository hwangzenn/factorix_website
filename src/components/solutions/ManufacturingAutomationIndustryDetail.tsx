import Link from "next/link"
import { ROUTES } from "@/lib/routes"
import { PRODUCT_CATEGORY_ROUTE } from "@/lib/productCategoryRoutes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"
import CategoryBreadcrumb from "@/components/content/CategoryBreadcrumb"
import RelatedContent from "@/components/content/RelatedContent"
import type { IndustryPortfolioItem, RelatedContentItem, IndustryLogo } from "@/sanity/lib/queries"

const FEATURE_ICONS = {
  precision: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="3" /><path d="M12 3v2M12 19v2M3 12h2M19 12h2" />
    </svg>
  ),
  clean: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" /><path d="M9 12l2 2 4-4" />
    </svg>
  ),
  flex: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="3" y="4" width="7" height="7" rx="1" /><rect x="14" y="4" width="7" height="7" rx="1" />
      <rect x="3" y="13" width="7" height="7" rx="1" /><rect x="14" y="13" width="7" height="7" rx="1" />
    </svg>
  ),
  mixing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />
    </svg>
  ),
  curing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  line: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M3 12h4l3-7 4 14 3-7h4" />
    </svg>
  ),
  microDispense: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 2v6M12 12v10" /><circle cx="12" cy="10" r="2" /><path d="M8 22h8M6 6h12" />
    </svg>
  ),
  correction: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M20 6a14 14 0 1 0 0 12" strokeDasharray="4 2" /><path d="M14 8v6l4 4" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V6h8v4" /><path d="M12 2v4M8 15h2M14 15h2" />
    </svg>
  ),
  speed: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />
    </svg>
  ),
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
    </svg>
  ),
  integration: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" /><circle cx="12" cy="18" r="3" />
      <path d="M8.5 7.5L11 16M15.5 7.5L13 16" />
    </svg>
  ),
  dataPlatform: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
      <ellipse cx="12" cy="6" rx="8" ry="3" /><path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
      <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
    </svg>
  ),
} as const

type Feature = { title: string; desc: string; iconKey: keyof typeof FEATURE_ICONS }

type Props = {
  label: string
  subverticals: string
  concept: string
  features: Feature[]
  portfolio: IndustryPortfolioItem[]
  relatedContent: RelatedContentItem[]
  logos: NonNullable<IndustryLogo["logos"]>
  /** 산업군 대표 이미지 경로. 아직 이미지가 없으면 비워두면 primary-900 단색 배경으로 대체된다. */
  heroImage?: string
}

export default function ManufacturingAutomationIndustryDetail({
  label,
  subverticals,
  concept,
  features,
  portfolio,
  relatedContent,
  logos,
  heroImage,
}: Props) {
  return (
    <div className="pb-20">
      {/* 히어로 — 뷰포트 가로 전체로 확장. 브레드크럼은 상단, 타이틀/CTA는 하단에 배치 */}
      <div
        className="relative left-1/2 right-1/2 -mx-[50vw] w-screen overflow-hidden mb-8 min-h-[260px] sm:min-h-[320px] flex flex-col justify-between bg-primary-900 bg-cover bg-center"
        style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
      >
        <div className="absolute inset-0 bg-black/45" />
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pt-5 sm:pt-6">
          <CategoryBreadcrumb segments={["공정 솔루션", label]} light />
        </div>
        <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-8 sm:py-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-white leading-snug">
              {label} 공정
              <br />
              제조 자동화 시스템
            </h1>
          </div>
          <div className="flex flex-wrap gap-2 shrink-0 self-start sm:self-end">
            <Link
              href={ROUTES.support.meeting}
              className="inline-flex px-5 py-2.5 bg-primary-700 text-white text-lg font-semibold rounded-md hover:bg-accent transition-colors"
            >
              상세 문의하기
            </Link>
            <Link
              href={ROUTES.support.poc}
              className="inline-flex px-5 py-2.5 border border-white/60 text-white text-lg font-semibold rounded-md hover:bg-white hover:text-black hover:border-white transition-colors"
            >
              PoC 문의하기
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* 컨셉 */}
        <p className="text-lg text-gray-600 mb-12 leading-relaxed">{concept}</p>

        {/* 적용산업 예시 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">적용산업 예시</h2>
        <div className="flex flex-wrap gap-4 mb-12">
          {subverticals.split(",").map((item) => (
            <div
              key={item}
              className="relative flex h-32 w-32 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200 bg-cover bg-center text-center"
              style={heroImage ? { backgroundImage: `url(${heroImage})` } : undefined}
            >
              <span className="absolute inset-0 bg-black/40" />
              <span className="relative px-3 font-bold leading-snug text-white break-keep">{item.trim()}</span>
            </div>
          ))}
        </div>

        {/* 특장점 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">특장점</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          {features.map((f) => (
            <div key={f.title} className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 mb-3">
                {FEATURE_ICONS[f.iconKey]}
              </div>
              <p className="font-bold text-gray-900 mb-2">{f.title}</p>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* 주요 고객사 */}
        {logos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">주요 고객사</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {logos.map((item, i) =>
                item.image?.asset?.url ? (
                  <div key={i} className="h-16 flex items-center justify-center">
                    <img
                      src={item.image.asset.url}
                      alt={item.alt ?? `${label} 고객사 로고`}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                ) : null
              )}
            </div>
          </div>
        )}

        {/* 포트폴리오 */}
        <h2 className="text-2xl font-bold text-gray-900 mb-5">포트폴리오</h2>
        <div className="mb-12">
          <ContentCardGrid isEmpty={portfolio.length === 0} emptyMessage="등록된 포트폴리오가 없습니다. 담당자에게 문의해 주세요.">
            {portfolio.map((p) => (
              <ContentCard
                key={p._id}
                title={p.title}
                description={p.description}
                thumbnailUrl={p.images?.[0]?.asset?.url}
                thumbnailAlt={p.images?.[0]?.alt}
                href={`${PRODUCT_CATEGORY_ROUTE[p.category] ?? ROUTES.solutions.automationSystem}/${p.slug}`}
              />
            ))}
          </ContentCardGrid>
        </div>

        {/* 연관콘텐츠 */}
        <RelatedContent items={relatedContent} />
      </div>
    </div>
  )
}
