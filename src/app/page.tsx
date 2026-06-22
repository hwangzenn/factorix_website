import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getNewsPosts } from "@/lib/ghost";
import HeroCarousel from "@/components/HeroCarousel";

export const metadata: Metadata = {
  title: "Factorix | AI-Powered Dispensing",
  description: "AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업 Factorix",
};

const SOLUTIONS: { label: string; href: string; span?: number; image?: string }[] = [
  { label: "AFMS-X1 차세대 AI 자동보정 토출 시스템", href: ROUTES.solutions.ai.autoCalibration, span: 2, image: "/blue2/자동보정 시스템.png" },
  { label: "협동/직교/3축 로봇", href: ROUTES.solutions.standalone.robot, image: "/blue2/탁상로봇.png" },
  { label: "AI 디스펜서", href: ROUTES.solutions.standalone.dispenser, image: "/blue2/디스펜서.png" },
  { label: "액상 충진기", href: ROUTES.solutions.standalone.filling, image: "/blue2/충진기.png" },
  { label: "교반/탈포/쓰리롤밀", href: ROUTES.solutions.standalone.mixer, image: "/blue2/쓰리롤밀.png" },
  { label: "UV/IR 경화기", href: ROUTES.solutions.standalone.curing, image: "/blue2/경화기.png" },
  { label: "자동화 시스템", href: ROUTES.solutions.ai.smartFactory, image: "/blue2/자동화시스템.png" },
];

const INDUSTRIES = [
  {
    label: "바이오",
    desc: "의약·바이오 공정 적용",
    href: ROUTES.cases.industry.bio,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 3c5 4 5 14 0 18M17 3c-5 4-5 14 0 18" />
        <path d="M7 9h10M7 15h10" />
      </svg>
    ),
  },
  {
    label: "화장품/뷰티",
    desc: "화장품 충진·제조",
    href: ROUTES.cases.industry.cosmetics,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="8" y="7" width="8" height="13" rx="1" />
        <path d="M10 7V5h4v2M10 12h4M10 15h2" />
      </svg>
    ),
  },
  {
    label: "화학/소재",
    desc: "화학 소재 처리 공정",
    href: ROUTES.cases.industry.chemical,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 3h6M9 3v7L5 19h14L15 10V3" />
        <circle cx="10" cy="15" r="1" fill="currentColor" stroke="none" />
        <circle cx="14" cy="13" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "디스플레이",
    desc: "디스플레이 패널 공정",
    href: ROUTES.cases.industry.display,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="13" rx="1" />
        <path d="M8 21h8M12 17v4" />
        <path d="M7 9h10M7 12h6" />
      </svg>
    ),
  },
  {
    label: "전기/전자",
    desc: "전자 부품 제조",
    href: ROUTES.cases.industry.electronics,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="7" y="7" width="10" height="10" rx="1" />
        <path d="M10 7V5M14 7V5M10 19v-2M14 19v-2M7 10H5M7 14H5M19 10h-2M19 14h-2" />
      </svg>
    ),
  },
  {
    label: "자동차",
    desc: "자동차 부품 도포",
    href: ROUTES.cases.industry.automotive,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 13l2-5h10l2 5" />
        <rect x="3" y="13" width="18" height="5" rx="1" />
        <circle cx="7.5" cy="18" r="1.5" />
        <circle cx="16.5" cy="18" r="1.5" />
      </svg>
    ),
  },
  {
    label: "이차전지",
    desc: "전극·전해질 코팅",
    href: ROUTES.cases.industry.battery,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="8" width="16" height="8" rx="1" />
        <path d="M19 11v2" />
        <path d="M9 12h6M12 10v4" />
      </svg>
    ),
  },
  {
    label: "연구기관/대학",
    desc: "R&D·실험실 솔루션",
    href: ROUTES.cases.industry.research,
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 4L2 9l10 5 10-5-10-5z" />
        <path d="M6 11.5v5c0 1.66 2.69 3 6 3s6-1.34 6-3v-5" />
        <path d="M22 9v5" />
      </svg>
    ),
  },
];

const PROCESS_IMAGES = [
  { src: "/공정/공정01.png", alt: "공정1 액상 교반 및 탈포", href: ROUTES.solutions.standalone.mixer, btn: "bg-gray-500" },
  { src: "/공정/공정02.png", alt: "공정2 충진 및 소분", href: ROUTES.solutions.standalone.filling, btn: "bg-gray-500" },
  { src: "/공정/공정03.png", alt: "공정3 정량 토출", href: ROUTES.solutions.standalone.dispenser, btn: "bg-gray-500" },
  { src: "/공정/공정04.png", alt: "공정4 탁상로봇", href: ROUTES.solutions.standalone.robot, btn: "bg-gray-500" },
  { src: "/공정/공정05.png", alt: "공정5 경화", href: ROUTES.solutions.standalone.curing, btn: "bg-gray-500" },
  { src: "/공정/공정06.png", alt: "공정6 자동화 시스템", href: ROUTES.solutions.ai.smartFactory, btn: "bg-gray-500" },
  { src: "/공정/공정07.png", alt: "공정7 토탈 자동화", href: ROUTES.solutions.ai.smartFactory, span: 2, btn: "bg-[#196DDA]" },
  { src: "/공정/공정08.png", alt: "공정8 AI 자동보정", href: ROUTES.solutions.ai.autoCalibration, span: 2, btn: "bg-[#1E3A6E]" },
];

export default async function HomePage() {
  const { items: newsPosts } = await getNewsPosts(3);

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

      {/* ── 공정 이미지 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Total System Integration</h2>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-1">액제공정 토탈솔루션 제공</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {PROCESS_IMAGES.map((img, i) => (
              <Link
                key={i}
                href={img.href}
                className={["group relative overflow-hidden block", img.span === 2 ? "md:col-span-2" : ""].join(" ")}
              >
                <img src={img.src} alt={img.alt} className="w-full h-auto block border-0 group-hover:scale-105 transition-transform duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Industry Cases ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-10">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">Success cases</h2>
            <p className="text-lg md:text-xl font-medium text-gray-500 mt-1 mb-8">고객적용사례</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={ROUTES.cases.product.solutions}
                className="flex-1 inline-flex items-center justify-center py-4 text-base font-semibold border-2 border-[#196DDA] text-[#196DDA] rounded-lg hover:bg-[#196DDA] hover:text-white transition-colors"
              >
                솔루션 적용사례 보기
              </Link>
              <Link
                href={ROUTES.cases.product.wearable}
                className="flex-1 inline-flex items-center justify-center py-4 text-base font-semibold border-2 border-[#196DDA] text-[#196DDA] rounded-lg hover:bg-[#196DDA] hover:text-white transition-colors"
              >
                AI웨어러블 적용사례 보기
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-10">
            {INDUSTRIES.map((ind) => (
              <Link
                key={ind.label}
                href={ind.href}
                className="group flex items-center gap-5 hover:opacity-80 transition-opacity"
              >
                {/* Icon circle */}
                <div className="shrink-0 w-20 h-20 rounded-full border-2 border-primary-100 bg-primary-50 flex items-center justify-center text-primary-600 group-hover:border-primary-300 transition-colors">
                  <span className="w-10 h-10">{ind.icon}</span>
                </div>
                {/* Text */}
                <div>
                  <p className="font-bold text-gray-900 text-base leading-tight">{ind.label}</p>
                  <p className="text-sm text-gray-400 mt-1">{ind.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Wearable ── */}
      <section className="relative overflow-hidden">
        {/* 배경 이미지 전체 채우기 */}
        <img
          src="/ZONE-HSS1-Voice-AI-Wearable-01.jpg"
          alt="AI 웨어러블 디바이스 ZONEWise"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* 어두운 오버레이 */}
        <div className="absolute inset-0 bg-black/55" />

        {/* 텍스트 콘텐츠 */}
        <div className="relative max-w-[1440px] mx-auto px-8 py-24">
          <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-8">
            AI Wearable Device<br /><span className="text-2xl md:text-3xl font-semibold">CES수상 렌즈없는 스마트글라스</span>
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href={ROUTES.wearable.intro}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
            >
              자세히 알아보기
            </Link>
            <Link
              href={ROUTES.support.wearablePoc}
              className="inline-flex items-center justify-center px-6 py-2.5 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
            >
              도입 문의하기
            </Link>
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
              <Link key={post.id} href={`/resources/press/${post.slug}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                {/* 이미지 */}
                <div className="aspect-video bg-gray-100 overflow-hidden">
                  {post.feature_image ? (
                    <img src={post.feature_image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  ) : (
                    <div className="w-full h-full bg-gray-200" />
                  )}
                </div>
                {/* 본문 */}
                <div className="p-5 flex flex-col flex-1">
                  {post.published_at && (
                    <p className="text-xs text-gray-400 mb-2">
                      {new Date(post.published_at).toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric" })}
                    </p>
                  )}
                  <p className="font-semibold text-gray-900 text-base leading-snug mb-2 group-hover:text-[#196DDA] transition-colors">{post.title}</p>
                  {post.excerpt && (
                    <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">{post.excerpt}</p>
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
