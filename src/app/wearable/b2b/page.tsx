import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "웨어러블 B2B 모델",
  description: "Factorix AI 웨어러블 디바이스 B2B 모델",
};

export default function WearableB2BPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">AI 웨어러블 디바이스</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-6">B2B 모델</h1>
      <p className="text-gray-500 mb-16">콘텐츠 준비 중입니다.</p>
      <div className="flex gap-4">
        <Link href={ROUTES.support.wearablePoc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">웨어러블 PoC 문의</Link>
        <Link href={ROUTES.support.meeting} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">방문 미팅 요청</Link>
      </div>
    </div>
  );
}
