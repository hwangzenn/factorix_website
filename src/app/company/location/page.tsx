import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "오시는길",
  description: "Factorix 연구소 및 생산공장 위치 안내",
};

export default function LocationPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">기업정보</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-6">오시는길</h1>
      <div id="map" className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center mb-12">
        <p className="text-gray-400">지도 준비 중</p>
      </div>
      <Link
        href={ROUTES.support.meeting}
        className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors"
      >
        방문 미팅 요청
      </Link>
    </div>
  );
}
