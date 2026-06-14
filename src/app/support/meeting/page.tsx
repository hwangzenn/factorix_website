import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "상세 방문미팅 요청",
  description: "Factorix 상세 방문미팅 요청",
};

export default function MeetingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">상세 방문미팅 요청</h1>
      <p className="text-gray-600 mb-12">전문 엔지니어가 직접 방문하여 상세한 기술 상담을 진행합니다.</p>
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
          <label className="block text-sm font-medium text-gray-700 mb-1">희망 방문일</label>
          <input type="date" className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">문의 내용</label>
          <textarea rows={5} className="w-full border border-gray-300 rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none" placeholder="문의 내용을 입력하세요" />
        </div>
        <button type="submit" className="w-full py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">
          미팅 신청
        </button>
      </form>
    </div>
  );
}
