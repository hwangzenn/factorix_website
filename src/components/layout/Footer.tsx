"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { GNB, isGroup } from "@/lib/nav";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const en = getLocaleFromPathname(pathname) === "en";

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 네비바(GNB) 구조를 그대로 재사용 — 그룹당 한 컬럼, 그룹 라벨은 비링크(하위만 링크) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {GNB.filter(isGroup).map((group) => (
            <div key={group.label}>
              <h4 className="text-white font-semibold mb-4 text-sm">{en ? group.labelEn ?? group.label : group.label}</h4>
              <ul className="space-y-2 text-sm">
                {group.children?.map((item) =>
                  item.href ? (
                    <li key={item.label}>
                      <Link href={item.href} className="hover:text-white transition-colors">
                        {en ? item.labelEn ?? item.label : item.label}
                      </Link>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-start gap-8">
          <div>
            <Image
              src="/logo.png"
              alt="Factorix"
              width={140}
              height={40}
              className="h-8 w-auto object-contain mb-2 brightness-0 invert"
            />
            <p className="text-sm mb-4">{en ? "Liquid Manufacturing Solutions" : "액제제조 솔루션 전문 기업"}</p>
            <div className="text-xs leading-relaxed space-y-0.5 text-gray-500">
              <p>상호명: (주)FactoriX</p>
              <p>대표자: 전제열</p>
              <p>사업장주소: 경기도 오산시 세교동 586 현대프리미어캠퍼스 A동 1115~1117호</p>
              <p>연락처: 070-8672-0192</p>
              <p>사업자등록번호: 461-86-03943</p>
              <p>대표자 이메일: jyjeon@factorix.co.kr</p>
            </div>
          </div>
          <p className="text-sm shrink-0">FactoriX(팩토릭스) | AI 액상 충진 토출 디스펜싱·스마트팩토리 자동화시스템 전문기업 All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
