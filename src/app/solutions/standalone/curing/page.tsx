import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "UV/IR 경화기 | Factorix",
  description: "Factorix UV/IR 경화기 — 고효율 UV·IR 경화 솔루션",
};

export default function CuringPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">액제제조 솔루션 · 단독설비</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-6">UV/IR 경화기</h1>
      <p className="text-gray-500 mb-16">콘텐츠 준비 중입니다.</p>
      <div className="flex gap-4">
        <Link href={ROUTES.support.poc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">도입 문의</Link>
        <Link href={ROUTES.cases.industry.bio} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">적용사례 보기</Link>
      </div>
    </div>
  );
}
