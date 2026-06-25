import type { Metadata } from "next";
import PocForm from "../poc/_components/PocForm";

export const metadata: Metadata = {
  title: "온라인상담 신청 | Factorix",
  description: "Factorix 온라인상담 신청",
};

export default function MeetingPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-4">온라인상담 신청</h1>
      <p className="text-gray-600 mb-12">전문 엔지니어가 온라인으로 상세한 기술 상담을 진행합니다.</p>
      <PocForm formType="온라인상담" submitLabel="신청 완료" />
    </div>
  );
}
