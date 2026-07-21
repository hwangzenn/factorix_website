import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import HeroCarousel from "@/components/HeroCarousel";
import IndustryCaseShowcase from "@/components/home/IndustryCaseShowcase";
import FaqTabs from "@/components/home/FaqTabs";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allCaseStudiesQuery,
  industryLogosQuery,
  type CaseStudyWithTags,
  type IndustryLogo,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "팩토릭스 | Factorix — AI 액제제조 · 디스펜싱 솔루션",
  description: "팩토릭스(Factorix)는 AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스를 공급하는 B2B 전문 기업입니다.",
  keywords: [
    "팩토릭스", "Factorix", "디스펜싱 자동화", "액제제조 솔루션",
    "AI 스마트팩토리", "디스펜서", "충진기", "AI 웨어러블",
  ],
  alternates: {
    canonical: ROUTES.home,
    languages: { ko: ROUTES.home, en: ROUTES.en.home },
  },
};

const PROBLEMS: { num: string; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    num: "01",
    title: "실시간 변화하는 변수",
    desc: "액상은 온도, 습도, 압력 등 외부 및 내부 환경 변화에 따라 물리·화학적 특성이 실시간으로 변화해 동일한 설정값으로도 동일한 품질을 보장하기 어렵습니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M3 13c2-7 4-7 6 0s4 7 6 0 4-7 6 0" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "높은 불량률",
    desc: "수작업자의 실수와 액상 변화로 인한 토출량 불안정은 과다·과소 도포 및 설계 위치 이탈 등 불량으로 이어지기 쉽습니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M12 3l9 16H3L12 3z" />
        <path d="M12 10v4" />
        <circle cx="12" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "원가 상승 및 수율 저하",
    desc: "불량 발생 시 즉각적인 수동 보정 및 재작업이 필요해 재작업 비용이 발생할 뿐만 아니라 소재 낭비 등 공정 전반의 제조 원가를 상승시킵니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M3 7l7 7 4-4 7 7" />
        <path d="M21 10v7h-7" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "고객 신뢰도 하락",
    desc: "성능이 저하된 부품이 납품될 경우 최종 엔드유저 제품 성능에 치명적인 문제가 발생하며, 이는 결국 기업 평판을 크게 하락시킵니다.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        <path d="M9.5 9l2 2-2 3.5M14.5 9l-2 2 2 3.5" />
      </svg>
    ),
  },
];

const SOLUTIONS: { label: string; tag: string; href: string; image?: string }[] = [
  { label: "협동/직교/3축 로봇", tag: "3축로봇", href: ROUTES.solutions.standalone.robot, image: "/장비시스템/탁상로봇.png" },
  { label: "디스펜서", tag: "디스펜서", href: ROUTES.solutions.standalone.dispenser, image: "/장비시스템/디스펜서.png" },
  { label: "액상 충진기", tag: "충진기", href: ROUTES.solutions.standalone.filling, image: "/장비시스템/충진기.png" },
  { label: "교반/탈포기", tag: "교반기/탈포기", href: ROUTES.solutions.standalone.mixer, image: "/장비시스템/쓰리롤밀.png" },
  { label: "UV/IR 경화기", tag: "UV/IR 경화기", href: ROUTES.solutions.standalone.curing, image: "/장비시스템/경화기.png" },
  { label: "자동화 시스템", tag: "맞춤형 자동화 시스템", href: ROUTES.solutions.ai.smartFactory, image: "/장비시스템/자동화시스템.png" },
];

const AFMS_FEATURE = {
  name: "AFMS-X1",
  desc: "AFMS는 바이오시약, 산업용 페이스트 등 액상 소재의 물성변화를 실시간 분석해 디스펜싱 조건을 자동으로 보정하는 AI 기반 제조 액상 자동보정 토출 시스템입니다.",
  href: ROUTES.solutions.ai.autoCalibration,
  image: "/장비시스템/자동보정 시스템.png",
};

const AFMS_BENEFITS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "스마트 디스펜싱 컨트롤",
    desc: "토출량, 압력 속도 및 오차 실시간 자동 보정",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />
      </svg>
    ),
  },
  {
    title: "스마트 비전 예측",
    desc: "점, 라인, 도포 면적 및 미세 기포 검출, 불량 예측",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "통합 제조 데이터 플랫폼",
    desc: "공정, 품질 데이터 통합 저장 및 생산이력관리, 지속학습",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
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

const FAQ_SOLUTION: { question: string }[] = [
  { question: "FactoriX가 제조장비 유통기업과 무엇이 다른가요?" },
  { question: "반도체 패키징 공정 솔루션만 제공하나요?" },
  { question: "일반적인 산업용 페이스트만 취급하시나요?" },
  { question: "규모가 작은 프로젝트도 솔루션 도입이 가능한가요?" },
  { question: "솔루션 도입 시, 작업 프로세스는 어떻게 되나요?" },
  { question: "솔루션 견적은 어떻게 측정되나요?" },
];

const FAQ_PROCESS: { question: string }[] = [
  { question: "동일한 설정값인데 왜 액상도포 품질 편차가 발생하나요?" },
  { question: "액상 도포 불량으로 인한 구체적인 기업손실은?" },
  { question: "액상 공정의 안정성을 높이려면 무엇이 필요한가요?" },
  { question: "액상공정 개선의 핵심 지표는 무엇인가요?" },
];

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
  const { data: caseData } = await sanityFetch({ query: allCaseStudiesQuery });
  const caseStudies = (caseData as CaseStudyWithTags[]) ?? [];
  const { data: logoData } = await sanityFetch({ query: industryLogosQuery });
  const industryLogos = (logoData as IndustryLogo[]) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── 까다로운 액상제조 공정, Factorix가 해결합니다 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              까다로운 액상공정,<br />제조현장에서 겪는 어려움
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed md:text-right">
              첨단 산업의 핵심 소재인 접착제·바이오시약·페이스트 등<br />
              <strong className="font-bold text-gray-900">액상을 정밀하게 정량으로 도포하는 공정은</strong><br />
              매우 어렵습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.num} className="rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary-700">{p.icon}</span>
                  <span className="text-sm font-bold text-gray-300">{p.num}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-10">{p.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FactoriX 솔루션의 차별점 (배경 이미지) ── */}
      <section className="relative overflow-hidden py-20 px-8">
        <img
          src="/valuechain_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative max-w-[1440px] mx-auto">
          <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              액상공정 전문<br />디스펜싱&amp;공정 자동화 솔루션
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed md:text-right">
              원료부터 자동화까지, FactoriX는 반도체 패키징에 편향된 액상공정 업계에서{" "}
              <strong className="font-bold text-white">30년간</strong> 다양한 산업용 액상 제조 공정을 다룬 엔지니어 그룹입니다.
              누적 1,000건 이상 연구개발 노하우에 기반해{" "}
              <strong className="font-bold text-white">전체 밸류체인에 대한 통합 솔루션</strong>을 제공합니다.
            </p>
          </div>

          {/* 공정별로 세분화된 통합 솔루션 */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-10">
              공정별로 세분화된 통합 솔루션
            </h3>
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              {VALUE_CHAIN.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-3">
                  <Link
                    href={step.href}
                    className="w-32 h-36 md:w-40 md:h-44 rounded-2xl bg-white/95 border border-white/40 flex flex-col items-center text-center px-3 py-5 hover:bg-white transition-all text-primary-700"
                  >
                    {VALUE_CHAIN_ICONS[step.iconKey]}
                    <span className="flex-1 flex items-center justify-center text-xs md:text-sm font-bold text-gray-800 leading-tight whitespace-pre-line text-center mt-1.5">
                      {step.label}
                    </span>
                    <span className="inline-flex items-center justify-center gap-0.5 text-[11px] md:text-xs font-semibold text-primary-600">
                      관련제품 보기
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                  {i < VALUE_CHAIN.length - 1 && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-white/60">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 고객 맞춤형 솔루션 / 장비 및 시스템 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* 고객 맞춤형 솔루션 */}
          <div id="cases" className="mb-16 scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              고객 맞춤형 솔루션
            </h3>
            <IndustryCaseShowcase items={caseStudies} logos={industryLogos} />
          </div>

          {/* FactoriX 장비 및 시스템 */}
          <div id="equipment" className="scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              FactoriX 장비 및 시스템
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="group relative overflow-hidden rounded-[5px] bg-gray-100 block"
                >
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.label}
                      className="w-full aspect-[16/9] object-cover block group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="aspect-square" />
                  )}
                  {/* 호버 시 어두운 레이어 */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                  {/* 좌상단 장비명 태그 + 제품 라인업 보기 */}
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col items-start gap-2">
                    <span className="text-xl md:text-3xl font-normal text-primary-900">
                      {s.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-900">
                      제품 라인업 보기
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI융합 차세대 디스펜싱 솔루션 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* AFMS 소개 */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  AI융합 차세대 디스펜싱 솔루션
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
                  AFMS 소개
                </h3>
                <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                  {AFMS_FEATURE.desc}
                </p>

                {/* 기대효과 */}
                <div className="mt-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
                    기대효과
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {AFMS_BENEFITS.map((b) => (
                      <div key={b.title} className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 mb-3">
                          {b.icon}
                        </div>
                        <p className="font-bold text-gray-900 mb-2">{b.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={AFMS_FEATURE.href}
                className="group relative overflow-hidden rounded-[5px] bg-gray-100 block w-full md:w-[85%] mx-auto"
              >
                <img
                  src={AFMS_FEATURE.image}
                  alt={AFMS_FEATURE.name}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                <div className="absolute top-10 left-10 flex flex-col items-start gap-2">
                  <span className="text-2xl md:text-3xl font-normal text-white">
                    {AFMS_FEATURE.name}
                  </span>
                  <span className="text-2xl md:text-3xl font-normal text-white">
                    액상 자동보정 토출 시스템
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#196DDA]">
                    자세히 알아보기
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 자주 묻는 질문 QnA ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              자주 묻는 질문 Q&amp;A
            </h2>
            <Link href={ROUTES.support.qna} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
              전체보기
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <FaqTabs
            categories={[
              { key: "solution", label: "FactoriX 솔루션", items: FAQ_SOLUTION },
              { key: "process", label: "액상 제조공정", items: FAQ_PROCESS },
            ]}
          />
        </div>
      </section>

      {/* ── 팩토릭스 기술 인사이트 ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              팩토릭스 기술 인사이트
            </h2>
          </div>

          {/* AI 웨어러블 / 블로그 / 유튜브 / 특허자료 */}
          <div className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 좌측: AI 웨어러블 */}
              <div className="block rounded-lg overflow-hidden">
                <img
                  src="/ai웨어러블.png"
                  alt="AI 웨어러블 신사업 CES 2026 혁신상 수상"
                  className="w-full h-auto block"
                />
              </div>

              {/* 우측: 블로그 / 유튜브 / 특허자료 */}
              <div className="flex flex-col gap-4">
                <Link
                  href={`${ROUTES.resources}?category=tech-docs`}
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">팩토릭스 기술블로그 바로가기</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className="flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-400 px-6 py-6">
                  <span className="text-lg md:text-xl font-semibold">시연영상 유튜브 채널 바로가기</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <Link
                  href={ROUTES.blog.news}
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">특허 및 IR 자료실 바로가기</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* 온라인 상담 CTA */}
          <div className="bg-primary-700 rounded-xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              온라인 상담 신청하기
            </h3>
            <Link
              href={ROUTES.support.meeting}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 text-sm font-bold rounded hover:bg-gray-100 transition-colors shrink-0"
            >
              온라인상담 신청
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
