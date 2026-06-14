import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Q&A",
  description: "Factorix 자주 묻는 질문",
};

export default function QnaPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">Q&amp;A</h1>
      <p className="text-gray-500">콘텐츠 준비 중입니다.</p>
    </div>
  );
}
