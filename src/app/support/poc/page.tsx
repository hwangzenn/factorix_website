import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "시스템 평가테스트 및 PoC 문의",
  description: "Factorix 시스템 평가테스트 및 PoC 도입 문의",
};

export default function PocPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">시스템 평가테스트 및 PoC 문의</h1>
      <p className="text-gray-600 mb-12">도입 전 시스템 평가 테스트 및 PoC를 신청하세요. 담당자가 빠르게 연락드립니다.</p>
      <form className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">회사명 *</label>
          <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="회사명을 입력하세요" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">담당자명 *</label>
          <input type="text" className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="담당자명을 입력하세요" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">연락처 *</label>
          <input type="tel" className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="연락처를 입력하세요" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
          <input type="email" className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" placeholder="이메일을 입력하세요" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
          <textarea rows={5} className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="문의 내용을 입력하세요" />
        </div>
        <button type="submit" className="w-full py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">
          문의 접수
        </button>
      </form>
    </div>
  );
}
