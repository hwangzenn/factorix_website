import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "회사소개 | Factorix",
  description: "팩토릭스 회사소개 — 정밀·학습·신뢰의 철학으로 스마트 제조 파트너를 지향합니다.",
};

const PHILOSOPHY = [
  {
    en: "Precision",
    ko: "정밀",
    desc: "보이지 않는 미세한 차이까지 관리하여 고객이 신뢰할 수 있는 품질을 구현합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
        <circle cx="24" cy="24" r="9" />
        <circle cx="24" cy="24" r="18" />
        <line x1="24" y1="2" x2="24" y2="8" />
        <line x1="24" y1="40" x2="24" y2="46" />
        <line x1="2" y1="24" x2="8" y2="24" />
        <line x1="40" y1="24" x2="46" y2="24" />
      </svg>
    ),
  },
  {
    en: "Intelligence",
    ko: "학습",
    desc: "AI와 데이터를 활용해 공정을 이해하고, 지속적으로 더 나은 결과를 만들어냅니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <circle cx="24" cy="20" r="10" />
        <path d="M16 20c0-4.4 3.6-8 8-8" />
        <path d="M20 34v6M28 34v6M16 40h16" />
        <path d="M18 30h12" />
        <circle cx="33" cy="13" r="3" />
        <path d="M31 11l-4-4" />
      </svg>
    ),
  },
  {
    en: "Trust",
    ko: "신뢰",
    desc: "고객과의 약속을 가장 중요한 가치로 여기며, 장기적인 동반 성장을 추구합니다.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M24 4L8 12v14c0 9.4 6.8 18.2 16 20 9.2-1.8 16-10.6 16-20V12L24 4z" />
        <path d="M16 24l6 6 10-12" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <p className="text-sm text-[#196DDA] font-medium mb-2">기업정보</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-16">회사소개</h1>

      {/* OUR PHILOSOPHY */}
      <div className="mb-20">
        <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">OUR PHILOSOPHY</p>
        <p className="text-lg text-gray-700 leading-relaxed mb-10">
          팩토릭스의 철학은 세 가지 가치 위에 세워져 있습니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PHILOSOPHY.map((item) => (
            <div
              key={item.en}
              className="flex flex-col items-center text-center p-8 rounded-2xl border border-gray-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-20 h-20 rounded-full bg-blue-50 flex items-center justify-center text-[#196DDA] mb-5">
                {item.icon}
              </div>
              <p className="text-xs font-semibold text-[#196DDA] tracking-widest uppercase mb-1">{item.en}</p>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.ko}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="flex gap-4">
        <Link
          href={ROUTES.support.poc}
          className="inline-flex px-6 py-3 bg-[#196DDA] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          도입 문의
        </Link>
        <Link
          href={ROUTES.support.meeting}
          className="inline-flex px-6 py-3 border border-[#196DDA] text-[#196DDA] font-semibold rounded-lg hover:bg-blue-50 transition-colors"
        >
          방문 미팅 요청
        </Link>
      </div>
    </div>
  );
}
