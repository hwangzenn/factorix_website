import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CEO 인사말 | Factorix",
  description: "팩토릭스 대표이사 인사말 — 스마트 제조 파트너를 지향합니다.",
};

export default function CeoPage() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      {/* 헤더 */}
      <p className="text-sm text-[#196DDA] font-medium mb-2">기업정보</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-12">CEO 인사말</h1>

      {/* 대표 인용구 */}
      <blockquote className="border-l-4 border-[#196DDA] pl-6 py-2 mb-12">
        <p className="text-xl md:text-2xl font-semibold text-gray-800 leading-snug">
          기술은 사람을 대신하는 것이 아니라,<br />사람의 가능성을 확장해야 합니다.
        </p>
      </blockquote>

      {/* 인사 본문 */}
      <div className="space-y-5 text-gray-700 leading-relaxed text-base mb-16">
        <p>안녕하십니까. 팩토릭스(FACTORIX)를 찾아주신 여러분께 진심으로 감사드립니다.</p>
        <p>
          팩토릭스는 정밀 유체 제어 기술과 AI 기반 공정 학습 기술을 결합하여, 제조 현장의 품질과
          생산성을 혁신하는 스마트 자동화 솔루션을 개발하고 있습니다. 우리는 단순히 장비를 만드는
          기업이 아니라, 고객의 공정 문제를 함께 해결하고 더 나은 제조 환경을 만들어가는
          기술 파트너가 되고자 합니다.
        </p>
        <p>
          제조 현장은 항상 변화합니다. 온도, 습도, 재료 특성, 작업 환경의 작은 변화도 품질에 큰
          영향을 미칩니다. 팩토릭스는 이러한 현실적인 문제를 외면하지 않고, 데이터를 기반으로
          학습하고 스스로 보정하는 지능형 시스템을 통해 제조의 안정성과 정밀도를 높이고 있습니다.
        </p>
        <p>
          우리는 <strong className="text-gray-900">"혁신을 이어붙인다"</strong>는 마음으로, 접착과 디스펜싱 기술을 넘어
          제조 산업 전반의 연결과 진화를 만들어가고자 합니다. 작은 공정 개선이 고객의 경쟁력을 높이고,
          그것이 다시 산업의 미래를 바꾼다고 믿기 때문입니다.
        </p>
        <p>
          앞으로도 팩토릭스는 끊임없는 연구개발과 현장 중심의 기술 혁신을 통해,
          고객이 가장 먼저 찾는 스마트 제조 파트너가 되겠습니다.
        </p>
        <p>감사합니다.</p>
      </div>

      {/* 서명 */}
      <div className="border-t border-gray-100 pt-8 text-right">
        <p className="text-sm text-gray-400 mb-1">팩토릭스 대표이사</p>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">전제열</p>
      </div>
    </div>
  );
}
