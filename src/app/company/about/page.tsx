import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "회사소개 | 팩토릭스 Factorix",
  description: "팩토릭스는 액상 소재의 물성 변화를 실시간 학습하고 디스펜싱 공정을 자동 보정하는 AI 제조 지능 시스템 기업입니다.",
};

const VALUES = [
  {
    label: "AI 기술 융합",
    desc: "데이터 기반의 실시간 자동 토출 보정으로 공정 변수를 스스로 학습하고 최적화합니다.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="20" cy="16" r="7" />
        <path d="M14 16c0-3.3 2.7-6 6-6" />
        <path d="M17 27v5M23 27v5M14 32h12" />
        <path d="M17 24h6" />
        <circle cx="28" cy="10" r="2.5" /><path d="M26.5 8.5l-3-3" />
      </svg>
    ),
  },
  {
    label: "Total Solution",
    desc: "원료 제조부터 로봇, AI 자동화 시스템까지 액제공정 전 과정을 하나의 파트너로 지원합니다.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <rect x="4" y="14" width="10" height="12" rx="1" />
        <rect x="15" y="10" width="10" height="20" rx="1" />
        <rect x="26" y="6" width="10" height="28" rx="1" />
        <path d="M9 14V8M20 10V4M31 6V2" />
      </svg>
    ),
  },
  {
    label: "정확성 및 효율성",
    desc: "공정 불량을 최소화하고 생산성을 극대화하여 고객의 제조 경쟁력을 실질적으로 높입니다.",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-8 h-8">
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
        <circle cx="20" cy="20" r="8" />
        <circle cx="20" cy="20" r="16" />
        <line x1="20" y1="2" x2="20" y2="6" />
        <line x1="20" y1="34" x2="20" y2="38" />
        <line x1="2" y1="20" x2="6" y2="20" />
        <line x1="34" y1="20" x2="38" y2="20" />
      </svg>
    ),
  },
];

const BUSINESSES = [
  {
    tag: "AFMS",
    title: "AI 기반 자율 액상 제조 시스템",
    desc: "실시간 공정 데이터 학습을 통한 최적의 토출 조건 자동 보정 솔루션. 온도·습도·점도 변화에 무관하게 일정한 품질을 유지합니다.",
    href: ROUTES.solutions.ai.autoCalibration,
  },
  {
    tag: "EQUIPMENT",
    title: "스마트 자동화 시스템",
    desc: "액상 충진기, AI 디스펜서, 교반/탈포기, 3축 로봇 등 정밀 제조 장비 라인업. 단품부터 통합 자동화 시스템까지 구성 가능합니다.",
    href: ROUTES.solutions.ai.smartFactory,
  },
  {
    tag: "MATERIAL",
    title: "전자재료 제조",
    desc: "산업용 접착제, 실리콘 등 핵심 전자 소재 개발 및 공급. 소재 이해도와 공정 노하우를 동시에 보유한 통합 역량을 제공합니다.",
    href: ROUTES.cases.product.solutions,
  },
  {
    tag: "WEARABLE · CES 2026 수상",
    title: "AI 웨어러블 디바이스 HSS1",
    desc: "CES 2026 혁신상 수상 기술 기반의 차세대 AI 비서 플랫폼. 산업 현장부터 일상까지 연결하는 스마트 웨어러블 솔루션입니다.",
  },
];

const STATS = [
  { value: "200+", label: "국내외 파트너사" },
  { value: "100억+", label: "2026 목표 매출" },
  { value: "4개", label: "핵심 사업 영역" },
  { value: "CES", label: "2026 혁신상 수상" },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative -mt-20 text-white py-24 px-8 overflow-hidden">
        <img
          src="/about-hero.jpg"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#0f1f3d]/70" />
        <div className="relative max-w-4xl mx-auto">
          <p className="text-sm text-blue-300 font-medium tracking-widest uppercase mb-4">기업정보 · 회사소개</p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
            AI로 제조의 미래를<br />디스펜싱하다
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed max-w-2xl">
            액상 소재의 물성 변화를 실시간으로 학습하고 디스펜싱 공정을 자동 보정하여
            제조 양산을 최적화하는 <strong className="text-white">'AI 제조 지능 시스템'</strong> 기업입니다.
          </p>
        </div>
      </section>


      {/* ── 핵심 가치 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">VALUE PROPOSITION</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            원료부터 자동화까지,<br />통합 밸류체인을 구축한 유일한 기업
          </h2>
          <p className="text-gray-500 mb-12">
            팩토릭스는 소재·장비·AI·웨어러블 역량을 모두 내재화한 통합 기술력으로
            고객의 공정 문제를 처음부터 끝까지 해결합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VALUES.map((v) => (
              <div key={v.label} className="p-8 rounded-2xl border border-gray-100 bg-gray-50 hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center text-[#196DDA] mb-5">
                  {v.icon}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2">{v.label}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 주요 사업 영역 ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">BUSINESS AREAS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">주요 사업 영역</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {BUSINESSES.map((b) => {
              const content = (
                <>
                  <span className="inline-block text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-3">{b.tag}</span>
                  <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#196DDA] transition-colors">{b.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                  {b.href && (
                    <span className="inline-flex items-center gap-1 mt-5 text-xs font-semibold text-[#196DDA]">
                      자세히 보기
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  )}
                </>
              );
              return b.href ? (
                <Link
                  key={b.tag}
                  href={b.href}
                  className="group bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#196DDA]/30 hover:shadow-md transition-all"
                >
                  {content}
                </Link>
              ) : (
                <div key={b.tag} className="bg-white rounded-2xl p-8 border border-gray-100">
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 기업 경쟁력 ── */}
      <section className="bg-[#0f1f3d] text-white py-20 px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-2">WHY FACTORIX</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-12">팩토릭스를 선택해야 하는 이유</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-1">{s.value}</p>
                <p className="text-sm text-blue-200">{s.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                title: "검증된 이력",
                desc: "200개 이상의 국내외 주요 파트너와 함께 현장 검증된 솔루션을 공급하고 있습니다.",
              },
              {
                title: "기술의 해자",
                desc: "소재 이해도, 현장 공정 노하우, 장비 설계 능력, AI 알고리즘을 모두 내재화한 통합 기술력.",
              },
              {
                title: "지속적 성장",
                desc: "2026년 목표 매출 100억 원 이상, 글로벌 시장 진출을 통해 AI 제조 지능 플랫폼으로 도약합니다.",
              },
            ].map((item) => (
              <div key={item.title} className="bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-blue-100/70 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-16 px-8">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">팩토릭스와 함께 제조를 혁신하세요</h2>
            <p className="text-gray-500 text-sm">공정 문제를 함께 분석하고 최적의 솔루션을 제안합니다.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href={ROUTES.support.meeting}
              className="inline-flex px-6 py-3 bg-[#196DDA] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              온라인상담
            </Link>
            <Link
              href={ROUTES.resources}
              className="inline-flex px-6 py-3 border border-[#196DDA] text-[#196DDA] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              특허/수상정보 보기
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
