"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/lib/routes";
import { getLocaleFromPathname } from "@/lib/i18n";

export default function Footer() {
  const pathname = usePathname();
  const en = getLocaleFromPathname(pathname) === "en";
  const autoCalibrationHref = en ? ROUTES.en.autoCalibration : ROUTES.solutions.ai.autoCalibration;

  return (
    <footer className="bg-gray-900 text-gray-400 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{en ? "Company" : "기업정보"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.company.about} className="hover:text-white transition-colors">{en ? "About Us" : "회사소개"}</Link></li>
              <li><Link href={ROUTES.company.ceo} className="hover:text-white transition-colors">{en ? "CEO Message" : "CEO 인사말"}</Link></li>
              <li><Link href={ROUTES.company.location} className="hover:text-white transition-colors">{en ? "Location" : "오시는길"}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{en ? "Solutions" : "솔루션"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.solutions.standalone.mixer} className="hover:text-white transition-colors">{en ? "Mixing/Defoaming/Three-Roll Mill" : "교반/탈포/쓰리롤밀"}</Link></li>
              <li><Link href={ROUTES.solutions.standalone.filling} className="hover:text-white transition-colors">{en ? "Liquid Filling Machine" : "액상충진기"}</Link></li>
              <li><Link href={ROUTES.solutions.standalone.dispenser} className="hover:text-white transition-colors">{en ? "AI Dispenser" : "AI 디스펜서"}</Link></li>
              <li><Link href={ROUTES.solutions.standalone.robot} className="hover:text-white transition-colors">{en ? "Collaborative/Cartesian/3-Axis Robot" : "협동/직교/3축로봇"}</Link></li>
              <li><Link href={ROUTES.solutions.standalone.curing} className="hover:text-white transition-colors">{en ? "UV/IR Curing System" : "UV/IR 경화기"}</Link></li>
              <li><Link href={autoCalibrationHref} className="hover:text-white transition-colors">{en ? "AI Auto-Calibration System" : "AI 자동보정 토출시스템"}</Link></li>
              <li><Link href={ROUTES.solutions.ai.smartFactory} className="hover:text-white transition-colors">{en ? "Automation System" : "자동화 시스템"}</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{en ? "Support" : "고객지원"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.support.poc} className="hover:text-white transition-colors">{en ? "PoC Inquiry" : "PoC 문의"}</Link></li>
              <li><Link href={ROUTES.support.demoTest} className="hover:text-white transition-colors">{en ? "Evaluation Test Inquiry" : "평가테스트 문의"}</Link></li>
              <li><Link href={ROUTES.support.meeting} className="hover:text-white transition-colors">{en ? "Online Consultation" : "온라인상담 신청"}</Link></li>
              <li><Link href={ROUTES.support.qna} className="hover:text-white transition-colors">Q&amp;A</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm">{en ? "Resources" : "자료실"}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={ROUTES.resources} className="hover:text-white transition-colors">{en ? "Resources" : "자료실"}</Link></li>
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
            <p className="text-sm">{en ? "Liquid Manufacturing Solutions · AI Wearable Devices" : "액제제조 솔루션 · AI 웨어러블 디바이스 전문 기업"}</p>
          </div>
          <p className="text-sm">© 2025 Factorix. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
