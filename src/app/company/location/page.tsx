import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export const metadata: Metadata = {
  title: "오시는길 | 팩토릭스 Factorix",
  description: "팩토릭스 오시는길 — 경기도 오산시 세교동 586 현대프리미어캠퍼스 A동 1115~1117호",
};

export default function LocationPage() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-[#196DDA] font-medium mb-2">기업정보</p>
      <h1 className="text-4xl font-bold text-gray-900 mb-10">오시는길</h1>

      {/* 주소 */}
      <div className="bg-gray-50 rounded-xl p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex-1">
          <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">ADDRESS</p>
          <p className="text-lg font-bold text-gray-900 mb-0.5">현대프리미어캠퍼스 A동 1115~1117호</p>
          <p className="text-gray-500 text-sm">경기도 오산시 세교동 586</p>
        </div>
        <a
          href="https://map.naver.com/v5/search/경기도 오산시 세교동 586 현대프리미어캠퍼스"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:border-[#196DDA] hover:text-[#196DDA] transition-colors shrink-0"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M8 1.5C5.5 1.5 3.5 3.5 3.5 6c0 3.5 4.5 8.5 4.5 8.5S12.5 9.5 12.5 6c0-2.5-2-4.5-4.5-4.5z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"/>
            <circle cx="8" cy="6" r="1.5" stroke="currentColor" strokeWidth="1.4"/>
          </svg>
          네이버 지도로 보기
        </a>
      </div>

      {/* 전경 + 지도 2열 */}
      <div id="map" className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-12">
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <img
            src="/company-exterior.jpg"
            alt="팩토릭스 회사 전경 — 현대프리미어캠퍼스"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="rounded-xl overflow-hidden border border-gray-100">
          <iframe
            src="https://maps.google.com/maps?q=경기도+오산시+세교동+586+현대프리미어캠퍼스&t=&z=16&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0, minHeight: "320px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="팩토릭스 위치"
          />
        </div>
      </div>

      <Link
        href={ROUTES.support.meeting}
        className="inline-flex px-6 py-3 bg-[#196DDA] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
      >
        방문 미팅 요청
      </Link>
    </div>
  );
}
