"use client";

import { Fragment, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { MANUFACTURING_INDUSTRIES } from "@/lib/industries";
import type { Locale } from "@/lib/i18n";

const ICONS: Record<string, React.ReactNode> = {
  mixing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  dispersion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  filling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M12 2v8l-4 4v6h8v-6l-4-4V2" /><path d="M8 20h8" /><path d="M10 2h4" />
    </svg>
  ),
  dispensing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M12 2v6M12 12v10" /><circle cx="12" cy="10" r="2" /><path d="M8 22h8M6 6h12" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V6h8v4" /><path d="M12 2v4M8 15h2M14 15h2" />
    </svg>
  ),
  curing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  consumables: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M4 7l8-4 8 4-8 4-8-4z" /><path d="M4 7v10l8 4 8-4V7" /><path d="M12 11v10" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M6 10v4M10 9v6M14 10v4M18 8v8" /><path d="M2 2h4M18 2h4" />
    </svg>
  ),
  industry: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M3 21V10l6 4V10l6 4V6l6 4v11H3z" /><path d="M7 17v-3M12 17v-3M17 17v-3" />
    </svg>
  ),
  materials: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <rect x="9" y="8" width="10" height="9" rx="1" /><circle cx="6" cy="18" r="1.5" /><circle cx="11" cy="18" r="1.5" /><path d="M4 18h1M12.5 18h2M4 12h4v-4" />
    </svg>
  ),
  adhesives: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-8 md:h-8">
      <path d="M10 2h4M11 2v6l-5 9a2 2 0 0 0 2 3h8a2 2 0 0 0 2-3l-5-9V2" /><path d="M8.5 15h7" />
    </svg>
  ),
};

type Item = { key: string; label: string; href: string; iconKey: keyof typeof ICONS; badge?: string; image?: string; subverticals?: string; tag?: string };
type ProcessStep = { num: string; label: string; labelKo: string; iconKey: keyof typeof ICONS; href?: string; note?: string; dimmed?: boolean };
type Group = {
  eyebrow?: string;
  heading: string;
  headingBold?: string;
  sub?: string;
  items: Item[];
  bg: string;
  variant?: "industry" | "equipment" | "flow";
  bgImage?: string;
  dark?: boolean;
  steps?: ProcessStep[];
};

const INDUSTRY_IMAGES: Record<string, string | undefined> = {
  "bio-medical": "/산업군/바이오의료기기.png",
  "chemicals-materials": "/산업군/화학소재.png",
  "electronics-battery": "/산업군/전자배터리.png",
  automotive: "/산업군/자동차부품.png",
  "research-academia": "/산업군/연구기관대학.png",
};

const INDUSTRY_ITEMS_KO: Item[] = MANUFACTURING_INDUSTRIES.map((i) => ({
  key: i.key,
  label: i.label,
  href: ROUTES.solutions.automationSystemIndustries[
    i.key === "bio-medical" ? "bioMedical"
      : i.key === "chemicals-materials" ? "chemicalsMaterials"
      : i.key === "electronics-battery" ? "electronicsBattery"
      : i.key === "automotive" ? "automotive"
      : "researchAcademia"
  ],
  iconKey: "industry",
  image: INDUSTRY_IMAGES[i.key],
  subverticals: i.subverticals,
}));

const INDUSTRY_ITEMS_EN: Item[] = MANUFACTURING_INDUSTRIES.map((i, idx) => ({
  ...INDUSTRY_ITEMS_KO[idx],
  label: i.labelEn,
  subverticals: i.subverticalsEn,
}));

const PROCESS_ITEMS_KO: Item[] = [
  { key: "mixing", label: "액상 교반\n및 탈포", href: ROUTES.solutions.equipment.mixer, iconKey: "mixing" },
  { key: "dispersion", label: "입자 분산\n및 3롤밀", href: ROUTES.solutions.equipment.threeRollMill, iconKey: "dispersion" },
  { key: "filling", label: "액상 충진\n및 소분", href: ROUTES.solutions.equipment.filling, iconKey: "filling" },
  { key: "dispensing", label: "정량/정밀\n토출", href: ROUTES.solutions.equipment.dispenser, iconKey: "dispensing" },
  { key: "robot", label: "탁상로봇", href: ROUTES.solutions.equipment.robot, iconKey: "robot" },
  { key: "curing", label: "IR/UV경화\n및 오븐", href: ROUTES.solutions.equipment.curing, iconKey: "curing" },
  { key: "automation", label: "제조자동화\n단동설비", href: ROUTES.solutions.automationSystem, iconKey: "automation", badge: "커스텀 제작" },
];

const PROCESS_ITEMS_EN: Item[] = [
  { key: "mixing", label: "Liquid Mixing\n& Defoaming", href: ROUTES.solutions.equipment.mixer, iconKey: "mixing" },
  { key: "dispersion", label: "Particle Dispersion\n& 3-Roll Milling", href: ROUTES.solutions.equipment.threeRollMill, iconKey: "dispersion" },
  { key: "filling", label: "Liquid Filling\n& Dividing", href: ROUTES.solutions.equipment.filling, iconKey: "filling" },
  { key: "dispensing", label: "Precision\nDispensing", href: ROUTES.solutions.equipment.dispenser, iconKey: "dispensing" },
  { key: "robot", label: "Desktop Robot", href: ROUTES.solutions.equipment.robot, iconKey: "robot" },
  { key: "curing", label: "IR/UV Curing\n& Ovens", href: ROUTES.solutions.equipment.curing, iconKey: "curing" },
  { key: "automation", label: "Manufacturing\nAutomation Equipment", href: ROUTES.solutions.automationSystem, iconKey: "automation", badge: "Custom-Built" },
];

// 01 원료, 02 전자재료 제조 모두 그룹사 페타엑스가 담당(팩토릭스 제품 아님, 링크 없음 + 딤 처리).
const PROCESS_STEPS_KO: ProcessStep[] = [
  { num: "01", label: "Materials", labelKo: "원료 조달", iconKey: "materials", note: "그룹사 페타엑스 담당", dimmed: true },
  { num: "02", label: "Adhesives", labelKo: "전자재료 제조", iconKey: "adhesives", note: "그룹사 페타엑스 담당", dimmed: true },
  { num: "03", label: "Mixing / Degassing", labelKo: "교반 & 탈포", iconKey: "mixing", href: ROUTES.solutions.equipment.mixer },
  { num: "04", label: "Particle Dispersion", labelKo: "입자 분산", iconKey: "dispersion", href: ROUTES.solutions.equipment.threeRollMill },
  { num: "05", label: "Liquid Filling / Dividing", labelKo: "액상 충진 & 소분", iconKey: "filling", href: ROUTES.solutions.equipment.filling },
  { num: "06", label: "Dispensing & Pneumatic Control", labelKo: "정량/정밀 토출", iconKey: "dispensing", href: ROUTES.solutions.equipment.dispenser },
  { num: "07", label: "3-Axis Dispensing Robot", labelKo: "3축 로봇", iconKey: "robot", href: ROUTES.solutions.equipment.robot },
  { num: "08", label: "UV/IR Curing & Oven", labelKo: "UV/IR 경화 & 오븐", iconKey: "curing", href: ROUTES.solutions.equipment.curing },
];

// 쓰리롤밀 이미지는 실제 쓰리롤밀 카드에만 사용한다. 교반/탈포기·소모품은 전용 제품 사진이 없어
// 잘못된 사진을 보여주는 대신 아이콘 플레이스홀더로 대체한다(추후 실사진 교체 예정).
const EQUIPMENT_ITEMS_KO: Item[] = [
  { key: "mixer", label: "교반/탈포기", tag: "교반기/탈포기", href: ROUTES.solutions.equipment.mixer, iconKey: "mixing" },
  { key: "threeRollMill", label: "쓰리롤밀", tag: "쓰리롤밀", href: ROUTES.solutions.equipment.threeRollMill, iconKey: "dispersion", image: "/장비시스템/쓰리롤밀.png" },
  { key: "filling", label: "액상충진기", tag: "충진기", href: ROUTES.solutions.equipment.filling, iconKey: "filling", image: "/장비시스템/충진기.png" },
  { key: "dispenser", label: "디스펜서", tag: "디스펜서", href: ROUTES.solutions.equipment.dispenser, iconKey: "dispensing", image: "/장비시스템/디스펜서.png" },
  { key: "robot", label: "협동/직교/3축로봇", tag: "3축로봇", href: ROUTES.solutions.equipment.robot, iconKey: "robot", image: "/장비시스템/탁상로봇.png" },
  { key: "curing", label: "UV/IR 경화기", tag: "UV/IR 경화기", href: ROUTES.solutions.equipment.curing, iconKey: "curing", image: "/장비시스템/경화기.png" },
  { key: "consumables", label: "소모품", tag: "소모품", href: ROUTES.solutions.equipment.consumables, iconKey: "consumables" },
  { key: "automation", label: "제조자동화 단동설비", tag: "산업별 맞춤 단동설비", href: ROUTES.solutions.automationSystem, iconKey: "automation", image: "/장비시스템/자동화시스템.png" },
];

const EQUIPMENT_ITEMS_EN: Item[] = [
  { key: "mixer", label: "Mixer/Defoamer", tag: "Mixer/Defoamer", href: ROUTES.solutions.equipment.mixer, iconKey: "mixing" },
  { key: "threeRollMill", label: "Three-Roll Mill", tag: "Three-Roll Mill", href: ROUTES.solutions.equipment.threeRollMill, iconKey: "dispersion", image: "/장비시스템/쓰리롤밀.png" },
  { key: "filling", label: "Liquid Filling Machine", tag: "Filling Machine", href: ROUTES.solutions.equipment.filling, iconKey: "filling", image: "/장비시스템/충진기.png" },
  { key: "dispenser", label: "Dispenser", tag: "Dispenser", href: ROUTES.solutions.equipment.dispenser, iconKey: "dispensing", image: "/장비시스템/디스펜서.png" },
  { key: "robot", label: "Collaborative/Cartesian/3-Axis Robot", tag: "3-Axis Robot", href: ROUTES.solutions.equipment.robot, iconKey: "robot", image: "/장비시스템/탁상로봇.png" },
  { key: "curing", label: "UV/IR Curing System", tag: "UV/IR Curing System", href: ROUTES.solutions.equipment.curing, iconKey: "curing", image: "/장비시스템/경화기.png" },
  { key: "consumables", label: "Consumables", tag: "Consumables", href: ROUTES.solutions.equipment.consumables, iconKey: "consumables" },
  { key: "automation", label: "Manufacturing Automation Equipment", tag: "Industry-Specific Automation Equipment", href: ROUTES.solutions.automationSystem, iconKey: "automation", image: "/장비시스템/자동화시스템.png" },
];

const GROUPS_KO: Group[] = [
  {
    eyebrow: "산업별 맞춤형 솔루션",
    heading: "기성 설비가 아닌,\n귀사의 소재·⁠점도·⁠토출량·⁠생산조건에 최적화된\n액상 자동화 공정을 설계합니다.",
    headingBold: "귀사의 소재·⁠점도·⁠토출량·⁠생산조건에 최적화",
    items: INDUSTRY_ITEMS_KO,
    bg: "bg-white",
    variant: "industry",
  },
  {
    eyebrow: "토탈 밸류체인 솔루션",
    heading: "공정마다 다른 업체 찾을 필요 없이,\n액상 제조 전 공정을 하나의 파트너와 구축하세요.",
    headingBold: "액상 제조 전 공정을 하나의 파트너와",
    items: PROCESS_ITEMS_KO,
    steps: PROCESS_STEPS_KO,
    bg: "bg-gray-50",
    bgImage: "/valuechain_bg.png",
    dark: true,
    variant: "flow",
  },
  {
    eyebrow: "팩토릭스 장비 제품라인업",
    heading: "필요한 장비를 바로 선택해 제품 사양을 확인하세요.",
    items: EQUIPMENT_ITEMS_KO,
    bg: "bg-white",
    variant: "equipment",
  },
];

const GROUPS_EN: Group[] = [
  {
    heading: "Find Your Solution by Industry",
    sub: "From bio-medical to chemicals, electronics, automotive, and research institutions — we build custom automation systems tailored to your industry.",
    items: INDUSTRY_ITEMS_EN,
    bg: "bg-white",
    variant: "industry",
  },
  {
    heading: "Find Your Solution by Process",
    sub: "From liquid mixing to precision dispensing, curing, and automation — find equipment for every process stage.",
    items: PROCESS_ITEMS_EN,
    bg: "bg-gray-50",
    bgImage: "/valuechain_bg.png",
    dark: true,
  },
  {
    heading: "Find Your Solution by Equipment",
    sub: "Pick the equipment you need and check the product specs right away.",
    items: EQUIPMENT_ITEMS_EN,
    bg: "bg-white",
    variant: "equipment",
  },
];

function IndustryCard({
  item,
  expanded,
  onMouseEnter,
  onToggle,
}: {
  item: Item;
  expanded: boolean;
  onMouseEnter: () => void;
  onToggle: () => void;
}) {
  return (
    <Link
      href={item.href}
      onMouseEnter={onMouseEnter}
      onClick={(e) => {
        if (!expanded) {
          e.preventDefault();
          onToggle();
        }
      }}
      className={[
        "relative flex w-full flex-col overflow-hidden rounded-xl",
        "lg:h-full lg:w-auto lg:transition-[flex-grow] lg:duration-500 lg:ease-out",
        expanded ? "lg:flex-[2.4]" : "lg:flex-1",
      ].join(" ")}
    >
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={item.image} alt="" className="absolute inset-0 h-full w-full object-cover object-right" />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 text-gray-400">
          {ICONS[item.iconKey]}
        </div>
      )}
      <div className="absolute inset-0 bg-black/50" />

      {/* 상단: 제목 */}
      <div className="relative px-5 py-5 md:px-6 md:py-6">
        <h3 className="text-lg md:text-xl font-bold text-white leading-snug break-keep drop-shadow-sm">{item.label}</h3>
      </div>

      {/* 중간: 하위 산업 카테고리 (펼침 시만) */}
      {item.subverticals && (
        <div className="relative pl-8 pr-5 pb-5 text-left md:pl-12 md:pr-6 md:pb-6">
          <div
            className={[
              "flex flex-col items-start gap-1 overflow-hidden transition-all duration-300",
              expanded ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0",
            ].join(" ")}
          >
            {item.subverticals.split(",").map((tag) => (
              <span key={tag} className="text-white/90 text-base md:text-lg font-medium">
                – {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* 버튼: 카드 우측 하단 모서리에 고정, 항상 노출 */}
      <span className="absolute bottom-4 right-4 md:bottom-5 md:right-5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary-700">
        <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
          <path d="M7 1v12M1 7h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

function EquipmentTileCard({ item, en }: { item: Item; en: boolean }) {
  return (
    <Link href={item.href} className="group relative overflow-hidden rounded-[5px] bg-gray-100 block">
      {item.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={item.image}
          alt={item.label}
          className="w-full aspect-[16/9] object-cover block group-hover:scale-105 transition-transform duration-300"
        />
      ) : (
        <div className="aspect-[16/9] flex items-center justify-center text-gray-300">{ICONS[item.iconKey]}</div>
      )}
      {/* 호버 시 어두운 레이어 */}
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
      {/* 좌상단 장비명 태그 + 제품 라인업 보기 */}
      <div className="absolute top-5 left-5 md:top-7 md:left-7 flex flex-col items-start gap-2">
        <span className="text-lg md:text-2xl font-normal text-primary-900 break-keep">
          {item.tag ?? item.label}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-900">
          {en ? "View lineup" : "제품 목록 보기"}
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function IconCard({ item, en }: { item: Item; en: boolean }) {
  return (
    <Link
      href={item.href}
      className="group relative flex flex-col items-start gap-4 rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg hover:shadow-primary-900/5 transition-all bg-white"
    >
      {item.badge && (
        <span className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-primary-700 text-white text-xs font-semibold">
          {item.badge}
        </span>
      )}
      <span className="text-primary-700">{ICONS[item.iconKey]}</span>
      <span className="text-base font-bold text-gray-900 leading-snug whitespace-pre-line">
        {item.label}
      </span>
      <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary-700">
        {en ? "View" : "바로가기"}
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="shrink-0">
          <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </Link>
  );
}

// "\n"은 md 이상에서만 강제 줄바꿈하고, 그 아래(모바일)는 화면 폭에 맞춰 자연스럽게 줄바꿈되게 한다.
function withResponsiveBreaks(text: string) {
  const parts = text.split("\n");
  if (parts.length === 1) return text;
  return parts.map((part, i) => (
    <Fragment key={i}>
      {i > 0 && <br className="hidden md:block" />}
      {part}
    </Fragment>
  ));
}

function DownArrow({ dark }: { dark?: boolean }) {
  return (
    <div className="flex h-6 flex-col items-center lg:hidden">
      <div className={`w-px flex-1 ${dark ? "bg-white/30" : "bg-gray-300"}`} />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`-mt-1 shrink-0 rotate-90 ${dark ? "text-white/30" : "text-gray-300"}`}>
        <path d="M1 1l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function ProcessStepCard({ step, dark }: { step: ProcessStep; dark?: boolean }) {
  const content = (
    <div className={`flex shrink-0 flex-col items-center gap-2 text-center ${step.dimmed ? "opacity-50 grayscale" : ""}`}>
      <div className="flex w-48 items-center gap-2 rounded-full border border-gray-200 bg-white py-2 pl-2 pr-3 transition-colors group-hover:border-primary-700 md:w-60 md:gap-2.5 md:py-2.5 md:pl-2.5 md:pr-4">
        <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-900 text-[11px] font-bold text-white md:h-7 md:w-7">
          {step.num}
        </span>
        <span className="shrink-0 text-primary-700">{ICONS[step.iconKey]}</span>
        <span className="text-sm font-bold text-gray-900 break-keep md:text-base">{step.labelKo}</span>
      </div>
      {step.note && <span className={`text-[11px] break-keep ${dark ? "text-white/60" : "text-gray-400"}`}>{step.note}</span>}
    </div>
  );

  if (!step.href) return content;

  return (
    <Link href={step.href} className="group">
      {content}
    </Link>
  );
}

// 인접 버튼을 잇는 짧은 연결선(참고 이미지처럼 행 폭 전체가 아니라 버튼 사이 짧은 구간만).
function Connector({ dark, arrow }: { dark?: boolean; arrow?: "left" }) {
  const stroke = dark ? "stroke-white/30" : "stroke-gray-300";
  return (
    <svg width="28" height="12" viewBox="0 0 28 12" fill="none" className="hidden shrink-0 lg:block">
      {arrow === "left" ? (
        <path d="M27 6H8M12 1L7 6L12 11" className={stroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M1 6H27" className={stroke} strokeWidth="1.5" strokeLinecap="round" />
      )}
    </svg>
  );
}

// 오른쪽으로 볼록한 곡선으로 1행 마지막 버튼과 2행 마지막 버튼을 잇는다.
function CurveConnector({ dark }: { dark?: boolean }) {
  return (
    <div className="relative hidden h-20 w-10 self-end lg:block md:h-24">
      <svg viewBox="0 0 40 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path d="M0,0 C32,0 32,100 0,100" fill="none" className={dark ? "stroke-white/30" : "stroke-gray-300"} strokeWidth="1.5" />
      </svg>
    </div>
  );
}

function ProcessFlow({ steps, dark }: { steps: ProcessStep[]; dark?: boolean }) {
  const top = steps.slice(0, 4);
  const bottom = steps.slice(4, 8).reverse();

  return (
    <div>
      {/* 모바일: 세로 흐름(01→08 순서) */}
      <div className="flex flex-col items-center gap-4 lg:hidden">
        {steps.map((s, i) => (
          <Fragment key={s.num}>
            <ProcessStepCard step={s} dark={dark} />
            {i < steps.length - 1 && <DownArrow dark={dark} />}
          </Fragment>
        ))}
      </div>

      {/* 데스크톱: 참고 이미지처럼 4열 2행 + 우측 곡선 연결 */}
      <div className="mx-auto hidden w-fit flex-col items-center lg:flex">
        <div className="flex items-center">
          {top.map((s, i) => (
            <Fragment key={s.num}>
              {i > 0 && <Connector dark={dark} />}
              <ProcessStepCard step={s} dark={dark} />
            </Fragment>
          ))}
        </div>
        <CurveConnector dark={dark} />
        <div className="flex items-center">
          {bottom.map((s, i) => (
            <Fragment key={s.num}>
              {i > 0 && <Connector dark={dark} arrow={i === 1 ? "left" : undefined} />}
              <ProcessStepCard step={s} dark={dark} />
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

function SolutionGroup({ group, en }: { group: Group; en: boolean }) {
  const isIndustry = group.variant === "industry";
  const isEquipment = group.variant === "equipment";
  const isFlow = group.variant === "flow";
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const activeKey = hoveredKey ?? group.items[0]?.key;
  const headingWeight = isIndustry ? "font-semibold" : "font-bold";
  const [headingBefore, headingAfter] = group.headingBold
    ? group.heading.split(group.headingBold)
    : [group.heading, ""];

  return (
    <section className={`relative overflow-hidden py-20 px-8 ${group.bgImage ? "" : group.bg}`}>
      {group.bgImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={group.bgImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
        </>
      )}
      <div className="relative max-w-[1440px] mx-auto">
        <div className="mb-10">
          {group.eyebrow && (
            <span className={`block text-base md:text-lg font-semibold tracking-widest uppercase mb-2 ${group.dark ? "text-white/80" : "text-primary-700"}`}>
              {group.eyebrow}
            </span>
          )}
          <h2 className={`text-4xl md:text-5xl leading-tight break-keep ${group.sub ? "mb-4" : ""} ${group.dark ? "text-white" : "text-gray-900"}`}>
            {group.headingBold ? (
              <>
                <span className="font-normal">{withResponsiveBreaks(headingBefore)}</span>
                <span className={headingWeight}>{withResponsiveBreaks(group.headingBold)}</span>
                <span className="font-normal">{withResponsiveBreaks(headingAfter)}</span>
              </>
            ) : (
              <span className={headingWeight}>{withResponsiveBreaks(group.heading)}</span>
            )}
          </h2>
          {group.sub && (
            <p className={`max-w-2xl text-lg md:text-xl leading-relaxed ${group.dark ? "text-white/80" : "text-gray-500"}`}>{group.sub}</p>
          )}
        </div>

        {isFlow && group.steps ? (
          <div className="pt-6 md:pt-10">
            <ProcessFlow steps={group.steps} dark={group.dark} />
          </div>
        ) : (
          <div
            className={
              isIndustry
                ? "flex flex-col gap-3 lg:flex-row lg:h-[360px]"
                : isEquipment
                ? "grid grid-cols-2 sm:grid-cols-4 gap-3"
                : "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
            }
            onMouseLeave={isIndustry ? () => setHoveredKey(null) : undefined}
          >
            {group.items.map((item) =>
              isEquipment ? (
                <EquipmentTileCard key={item.key} item={item} en={en} />
              ) : isIndustry ? (
                <IndustryCard
                  key={item.key}
                  item={item}
                  expanded={item.key === activeKey}
                  onMouseEnter={() => setHoveredKey(item.key)}
                  onToggle={() => setHoveredKey(item.key)}
                />
              ) : (
                <IconCard key={item.key} item={item} en={en} />
              )
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default function SolutionExplorer({ locale = "ko" }: { locale?: Locale }) {
  const en = locale === "en";
  const groups = en ? GROUPS_EN : GROUPS_KO;

  return (
    <>
      {groups.map((group) => (
        <SolutionGroup key={group.heading} group={group} en={en} />
      ))}
    </>
  );
}
