import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import HeroCarousel from "@/components/HeroCarousel";
import IndustryCaseShowcase from "@/components/home/IndustryCaseShowcase";
import FaqAccordion from "@/components/home/FaqAccordion";
import ContentCard from "@/components/content/ContentCard";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allCaseStudiesQuery,
  referenceMaterialsQuery,
  type CaseStudySummaryWithCategory,
  type ReferenceMaterialSummary,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "팩토릭스 | Factorix — AI 액제제조 · 디스펜싱 솔루션",
  description: "팩토릭스(Factorix)는 AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스를 공급하는 B2B 전문 기업입니다.",
  keywords: [
    "팩토릭스", "Factorix", "디스펜싱 자동화", "액제제조 솔루션",
    "AI 스마트팩토리", "디스펜서", "충진기", "AI 웨어러블",
  ],
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

const SOLUTIONS: { label: string; href: string; image?: string }[] = [
  { label: "협동/직교/3축 로봇", href: ROUTES.solutions.standalone.robot, image: "/blue3/탁상로봇.png" },
  { label: "AI 디스펜서", href: ROUTES.solutions.standalone.dispenser, image: "/blue3/디스펜서.png" },
  { label: "액상 충진기", href: ROUTES.solutions.standalone.filling, image: "/blue3/충진기.png" },
  { label: "교반/탈포/쓰리롤밀", href: ROUTES.solutions.standalone.mixer, image: "/blue3/쓰리롤밀.png" },
  { label: "UV/IR 경화기", href: ROUTES.solutions.standalone.curing, image: "/blue3/경화기.png" },
  { label: "자동화 시스템", href: ROUTES.solutions.ai.smartFactory, image: "/blue3/자동화시스템.png" },
];

const AFMS_FEATURE = {
  title: "AI융합 차세대 디스펜싱 솔루션\nAFMS-X1",
  desc: "AFMS는 바이오시약, 산업용 페이스트 등 액상 소재의 물성변화를 실시간 분석해 디스펜싱 조건을 자동으로 보정하는 AI 기반 제조 액상 자동보정 토출 시스템입니다. 기존 제조공정이 작업자의 경험에 의존해 토출량, 속도 등을 수동으로 조정했다면, AFMS는 공정 데이터와 비전 데이터를 실시간으로 학습해 최적의 토출 조건을 자동 보정합니다.",
  href: ROUTES.solutions.ai.autoCalibration,
  image: "/blue3/자동보정 시스템.png",
};

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
  const [{ data: techDocsData }, { data: patentsData }, { data: pressData }, { data: caseData }] = await Promise.all([
    sanityFetch({ query: referenceMaterialsQuery, params: { category: "tech-docs" } }),
    sanityFetch({ query: referenceMaterialsQuery, params: { category: "patents" } }),
    sanityFetch({ query: referenceMaterialsQuery, params: { category: "press" } }),
    sanityFetch({ query: allCaseStudiesQuery }),
  ]);
  const techDocs = ((techDocsData as ReferenceMaterialSummary[]) ?? []).slice(0, 3);
  const patents = ((patentsData as ReferenceMaterialSummary[]) ?? []).slice(0, 3);
  const press = ((pressData as ReferenceMaterialSummary[]) ?? []).slice(0, 3);
  const caseStudies = (caseData as CaseStudySummaryWithCategory[]) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <HeroCarousel />

      {/* ── 까다로운 액상제조 공정, Factorix가 해결합니다 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              까다로운 액상 공정<br />제조현장에서 겪는 어려움
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
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
                <h3 className="text-lg font-bold text-gray-900 mb-2">{p.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FactoriX 솔루션의 차별점 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-16">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                FactoriX는 액상 공정 전문<br />스마트 디스펜싱 &amp; 자동화 솔루션 기업입니다.
              </h2>
              <div className="shrink-0 md:text-right">
                <p className="text-4xl md:text-5xl font-bold text-primary-700 leading-none">1,000+</p>
                <p className="text-sm text-gray-500 mt-2">누적 연구개발 건수</p>
              </div>
            </div>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed max-w-3xl">
              원료부터 자동화까지, FactoriX는 반도체 패키징에 편향된 액상공정 업계에서{" "}
              <strong className="font-bold text-gray-900">30년간</strong> 다양한 산업용 액상 제조 공정을 다룬 엔지니어 그룹입니다.
              누적 1,000건 이상 연구개발 노하우에 기반해{" "}
              <strong className="font-bold text-gray-900">전체 밸류체인에 대한 통합 솔루션</strong>을 제공합니다.
            </p>
          </div>

          {/* 공정별로 세분화된 통합 솔루션 */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-10">
              공정별로 세분화된 통합 솔루션
            </h3>
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              {VALUE_CHAIN.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-3">
                  <Link
                    href={step.href}
                    className="w-24 h-24 md:w-[140px] md:h-[140px] rounded-full bg-gray-50 border border-gray-200 flex flex-col items-center justify-center text-center hover:bg-primary-50 hover:border-primary-200 transition-all text-primary-700"
                  >
                    {VALUE_CHAIN_ICONS[step.iconKey]}
                    <span className="text-xs md:text-sm font-bold text-gray-800 leading-tight px-2 mt-1.5 whitespace-pre-line">
                      {step.label}
                    </span>
                  </Link>
                  {i < VALUE_CHAIN.length - 1 && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-gray-300">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 고객 맞춤형 솔루션 */}
          <div id="cases" className="mb-16 scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              고객 맞춤형 솔루션
            </h3>
            <IndustryCaseShowcase items={caseStudies} />
          </div>

          {/* 수율을 극대화하는 장비 및 시스템 */}
          <div id="equipment" className="scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              수율을 극대화하는 장비 및 시스템
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-start">
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
        </div>
      </section>

      {/* ── AI융합 차세대 디스펜싱 솔루션 AFMS-X1 ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-6 whitespace-pre-line">
              {AFMS_FEATURE.title}
            </h2>
            <p className="text-base md:text-lg text-gray-500 leading-relaxed mb-8">
              {AFMS_FEATURE.desc}
            </p>
            <Link
              href={AFMS_FEATURE.href}
              className="inline-flex items-center justify-center px-6 py-3 bg-primary-700 text-white text-sm font-bold rounded hover:bg-primary-800 transition-colors"
            >
              제품 상세보기
            </Link>
          </div>
          <div className="rounded-xl overflow-hidden bg-white">
            <img
              src={AFMS_FEATURE.image}
              alt={AFMS_FEATURE.title.replace("\n", " ")}
              className="w-full h-auto block"
            />
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                FactoriX 솔루션
              </h3>
              <FaqAccordion items={FAQ_SOLUTION} />
            </div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-6">
                액상 제조공정
              </h3>
              <FaqAccordion items={FAQ_PROCESS} />
            </div>
          </div>
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

          {/* AI 웨어러블 신사업 CES 수상 비하인드 */}
          <div className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                AI 웨어러블 신사업 CES 수상 비하인드
              </h3>
              <Link href={`${ROUTES.resources}?category=press`} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            {press.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {press.map((doc) => (
                  <ContentCard
                    key={doc._id}
                    title={doc.title}
                    description={doc.description}
                    thumbnailUrl={doc.thumbnail?.asset?.url}
                    thumbnailAlt={doc.thumbnail?.alt}
                    href={`${ROUTES.resources}/press/${doc.slug}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-6">등록된 언론보도 자료가 없습니다.</p>
            )}
          </div>

          {/* 기술 블로그 */}
          <div className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                팩토릭스 기술 블로그 바로가기
              </h3>
              <Link href={`${ROUTES.resources}?category=tech-docs`} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            {techDocs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {techDocs.map((doc) => (
                  <ContentCard
                    key={doc._id}
                    title={doc.title}
                    description={doc.description}
                    thumbnailUrl={doc.thumbnail?.asset?.url}
                    thumbnailAlt={doc.thumbnail?.alt}
                    href={`${ROUTES.resources}/tech-docs/${doc.slug}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-6">등록된 기술자료가 없습니다.</p>
            )}
          </div>

          {/* 시연영상 유튜브 */}
          <div className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                팩토릭스 시연영상 유튜브 바로가기
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[0, 1, 2].map((i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-gray-100 border border-gray-200">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/80 flex items-center justify-center text-gray-400">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="font-semibold text-gray-400">영상 준비 중입니다.</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 특허 및 기술자료실 */}
          <div className="mb-14">
            <div className="flex items-end justify-between mb-6">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                특허 및 기술자료실 바로가기
              </h3>
              <Link href={`${ROUTES.resources}?category=patents`} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            {patents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {patents.map((doc) => (
                  <ContentCard
                    key={doc._id}
                    title={doc.title}
                    description={doc.description}
                    thumbnailUrl={doc.thumbnail?.asset?.url}
                    thumbnailAlt={doc.thumbnail?.alt}
                    href={`${ROUTES.resources}/patents/${doc.slug}`}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-6">등록된 특허/인증 자료가 없습니다.</p>
            )}
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
