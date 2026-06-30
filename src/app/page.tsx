import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import HeroCarousel from "@/components/HeroCarousel";
import IndustryCaseShowcase from "@/components/home/IndustryCaseShowcase";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allCaseStudiesQuery,
  featuredReferenceMaterialsQuery,
  latestReferenceMaterialsQuery,
  type CaseStudySummaryWithCategory,
  type ReferenceMaterialWithCategory,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "팩토릭스 | Factorix — AI 액제제조 · 디스펜싱 솔루션",
  description: "팩토릭스(Factorix)는 AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스를 공급하는 B2B 전문 기업입니다.",
  keywords: [
    "팩토릭스", "Factorix", "디스펜싱 자동화", "액제제조 솔루션",
    "AI 스마트팩토리", "디스펜서", "충진기", "AI 웨어러블",
  ],
};

const SOLUTIONS: { label: string; href: string; span?: number; image?: string }[] = [
  { label: "AFMS-X1 차세대 AI 자동보정 토출 시스템", href: ROUTES.solutions.ai.autoCalibration, span: 2, image: "/blue3/자동보정 시스템.png" },
  { label: "협동/직교/3축 로봇", href: ROUTES.solutions.standalone.robot, image: "/blue3/탁상로봇.png" },
  { label: "AI 디스펜서", href: ROUTES.solutions.standalone.dispenser, image: "/blue3/디스펜서.png" },
  { label: "액상 충진기", href: ROUTES.solutions.standalone.filling, image: "/blue3/충진기.png" },
  { label: "교반/탈포/쓰리롤밀", href: ROUTES.solutions.standalone.mixer, image: "/blue3/쓰리롤밀.png" },
  { label: "UV/IR 경화기", href: ROUTES.solutions.standalone.curing, image: "/blue3/경화기.png" },
  { label: "자동화 시스템", href: ROUTES.solutions.ai.smartFactory, image: "/blue3/자동화시스템.png" },
];


const VALUE_CHAIN_ICONS: Record<string, React.ReactNode> = {
  mixing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  dispersion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  filling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 2v8l-4 4v6h8v-6l-4-4V2" /><path d="M8 20h8" /><path d="M10 2h4" />
    </svg>
  ),
  dispensing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 2v6M12 12v10" /><circle cx="12" cy="10" r="2" /><path d="M8 22h8M6 6h12" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V6h8v4" /><path d="M12 2v4M8 15h2M14 15h2" />
    </svg>
  ),
  curing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M6 10v4M10 9v6M14 10v4M18 8v8" /><path d="M2 2h4M18 2h4" />
    </svg>
  ),
};

const VALUE_CHAIN: { label: string; iconKey: string; href: string }[] = [
  { label: "액상 교반\n및 탈포", iconKey: "mixing", href: ROUTES.solutions.standalone.mixer },
  { label: "입자 분산\n및 3롤밀", iconKey: "dispersion", href: ROUTES.solutions.standalone.mixer },
  { label: "액상 충진\n및 소분", iconKey: "filling", href: ROUTES.solutions.standalone.filling },
  { label: "정량/정밀\n토출", iconKey: "dispensing", href: ROUTES.solutions.standalone.dispenser },
  { label: "탁상로봇", iconKey: "robot", href: ROUTES.solutions.standalone.robot },
  { label: "IR/UV경화\n및 오븐", iconKey: "curing", href: ROUTES.solutions.standalone.curing },
  { label: "맞춤형 공정\n자동화 시스템", iconKey: "automation", href: ROUTES.solutions.ai.smartFactory },
];

export default async function HomePage() {
  const [{ data: featuredData }, { data: latestData }, { data: caseData }] = await Promise.all([
    sanityFetch({ query: featuredReferenceMaterialsQuery }),
    sanityFetch({ query: latestReferenceMaterialsQuery }),
    sanityFetch({ query: allCaseStudiesQuery }),
  ]);
  const featured = (featuredData as ReferenceMaterialWithCategory[]) ?? [];
  const latest = (latestData as ReferenceMaterialWithCategory[]) ?? [];
  const featuredIds = new Set(featured.map((p) => p._id));
  const newsPosts = featured.length >= 3
    ? featured.slice(0, 3)
    : [...featured, ...latest.filter((p) => !featuredIds.has(p._id))].slice(0, 3);
  const caseStudies = (caseData as CaseStudySummaryWithCategory[]) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── Solutions ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Our Solution
            </h2>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-1">자사 솔루션 소개</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-start">
            {SOLUTIONS.map((s) => (
              <Link
                key={s.label}
                href={s.href}
                className={[
                  "group relative overflow-hidden rounded-[5px] bg-gray-100 block",
                  s.span === 2 ? "col-span-2" : "",
                ].join(" ")}
              >
                {s.image ? (
                  <img
                    src={s.image}
                    alt={s.label}
                    className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="aspect-square" />
                )}
                {/* 좌하단 원형 화살표 버튼 */}
                <span className="absolute bottom-3 left-3 w-9 h-9 rounded-full border-2 border-white bg-transparent flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#196DDA] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Value Chain ── */}
      <section className="relative overflow-hidden">
        <img
          src="/valuechain_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10" />

        <div className="relative max-w-[1440px] mx-auto px-8 py-24">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Full-Stack Value Chain Solution
            </h2>
            <p className="text-lg md:text-xl font-medium text-white/80 mt-1">
              점접착 제/코팅제/시약 밸류체인 전체 솔루션 보유
            </p>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-y-4">
            {VALUE_CHAIN.map((step, i) => (
              <div key={step.label} className="flex items-center gap-2 md:gap-3">
                <Link
                  href={step.href}
                  className="w-24 h-24 md:w-[160px] md:h-[160px] rounded-full bg-white flex flex-col items-center justify-center text-center hover:bg-white/90 hover:scale-105 transition-all shadow-lg text-primary-700"
                >
                  {VALUE_CHAIN_ICONS[step.iconKey]}
                  <span className="text-xs md:text-base font-bold text-gray-800 leading-tight px-2 mt-1.5 whitespace-pre-line">
                    {step.label}
                  </span>
                </Link>
                {i < VALUE_CHAIN.length - 1 && (
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-white/80">
                    <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Cases ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Success cases</h2>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-1">고객적용사례</p>
          </div>

          <IndustryCaseShowcase items={caseStudies} />
        </div>
      </section>

      {/* ── Wearable ── */}
      <section className="px-8 py-20">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">AI Wearable</h2>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-1">자사 AI 웨어러블 소개</p>
          </div>

          <div className="flex flex-col md:flex-row rounded-xl overflow-hidden">
          {/* 좌측 3/10 — 버튼 */}
          <div className="md:w-[30%] bg-[#1E2A4A] flex flex-col justify-center px-8 md:px-10 py-10">
            <div className="flex flex-col gap-2">
              <Link
                href={ROUTES.wearable.b2c}
                className="inline-flex items-center justify-center px-5 py-2 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
              >
                B2C모델 알아보기
              </Link>
              <Link
                href={ROUTES.wearable.b2b}
                className="inline-flex items-center justify-center px-5 py-2 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
              >
                B2B모델 알아보기
              </Link>
              <Link
                href={ROUTES.wearable.b2g}
                className="inline-flex items-center justify-center px-5 py-2 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
              >
                B2G모델 알아보기
              </Link>
              <Link
                href={ROUTES.cases.product.wearable}
                className="inline-flex items-center justify-center px-5 py-2 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
              >
                고객 적용사례 보기
              </Link>
            </div>
          </div>
          {/* 우측 7/10 — 이미지 */}
          <div className="md:w-[70%]">
            <img
              src="/ZONE-HSS1-Voice-AI-Wearable-01.jpg"
              alt="AI 웨어러블 디바이스 ZONEWise"
              className="w-full h-full object-cover"
            />
          </div>
          </div>
        </div>
      </section>

      {/* ── Newsroom ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Newsroom</h2>
              <p className="text-lg md:text-xl font-medium text-gray-500 mt-1">팩토릭스 뉴스룸</p>
            </div>
            <Link href={ROUTES.resources} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
              전체보기
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {newsPosts.length > 0 ? newsPosts.map((post) => (
              <Link key={post._id} href={`/resources/${post.category}/${post.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {post.thumbnail?.asset?.url ? (
                    <img src={post.thumbnail.asset.url} alt={post.thumbnail.alt ?? post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  {post.publishedAt && (
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(post.publishedAt).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <p className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#196DDA] transition-colors">{post.title}</p>
                  {post.description && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.description}</p>
                  )}
                </div>
              </Link>
            )) : (
              Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm flex flex-col">
                  <div className="aspect-video bg-gray-100" />
                  <div className="p-5">
                    <div className="h-3 bg-gray-100 rounded w-24 mb-3" />
                    <div className="h-4 bg-gray-100 rounded w-full mb-2" />
                    <div className="h-4 bg-gray-100 rounded w-3/4 mb-3" />
                    <div className="h-3 bg-gray-100 rounded w-full mb-1" />
                    <div className="h-3 bg-gray-100 rounded w-5/6" />
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

    </div>
  );
}
