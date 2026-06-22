import Image from "next/image";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">기업정보</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.company.about} className="hover:text-white transition-colors">회사소개</Link></li>
              <li><Link href={ROUTES.company.ceo} className="hover:text-white transition-colors">CEO 인사말</Link></li>
              <li><Link href={ROUTES.company.location} className="hover:text-white transition-colors">오시는길</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">솔루션</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.solutions.standalone.mixer} className="hover:text-white transition-colors">교반/탈포/쓰리롤밀</Link></li>
              <li><Link href={ROUTES.solutions.standalone.filling} className="hover:text-white transition-colors">액상충진기</Link></li>
              <li><Link href={ROUTES.solutions.standalone.dispenser} className="hover:text-white transition-colors">AI 디스펜서</Link></li>
              <li><Link href={ROUTES.solutions.standalone.robot} className="hover:text-white transition-colors">협동/직교/3축로봇</Link></li>
              <li><Link href={ROUTES.solutions.standalone.curing} className="hover:text-white transition-colors">UV/IR 경화기</Link></li>
              <li><Link href={ROUTES.solutions.ai.smartFactory} className="hover:text-white transition-colors">자동화 시스템</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.support.poc} className="hover:text-white transition-colors">PoC 문의</Link></li>
              <li><Link href={ROUTES.support.demoTest} className="hover:text-white transition-colors">평가테스트 문의</Link></li>
              <li><Link href={ROUTES.support.meeting} className="hover:text-white transition-colors">온라인상담 신청</Link></li>
              <li><Link href={ROUTES.support.qna} className="hover:text-white transition-colors">Q&amp;A</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">자료실</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.resources} className="hover:text-white transition-colors">자료실</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-start gap-4">
          <div>
            <Image
              src="/logo.png"
              alt="Factorix"
              width={140}
              height={40}
              className="h-8 w-auto object-contain mb-2 brightness-0 invert"
            />
            <p className="text-sm">액제제조 솔루션 · AI 웨어러블 디바이스 전문 기업</p>
          </div>
          <p className="text-sm">© 2025 Factorix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
