// src/lib/nav.ts
// GNB(전역 내비게이션) 트리.
//  - href 있음  = 실제 랜딩페이지로 가는 링크(leaf)
//  - href 없음  = 분류용 그룹 헤더. 클릭해도 이동하지 않고 하위만 펼친다.
// 라벨(한글)만 여기서 관리하고 경로는 ROUTES에서 가져온다(드리프트 방지).
// labelEn은 영문(EN) 버전에서 쓰는 라벨. 대상 페이지가 아직 번역되지 않았어도
// 라벨만 영문화하고 링크는 기존 한국어 페이지로 유지한다(1단계 스코프).
// Header(데스크톱 메가메뉴)·MobileNav(아코디언)는 이 GNB 하나만 보고 렌더링한다.

import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  labelEn?: string;
  href?: string;
  children?: NavItem[];
};

export const GNB: NavItem[] = [
  {
    label: "기업정보",
    labelEn: "Company",
    children: [
      { label: "회사 소개", labelEn: "About Us", href: ROUTES.company.about },
      { label: "CEO 인사말", labelEn: "CEO Message", href: ROUTES.company.ceo },
      { label: "오시는 길", labelEn: "Location", href: ROUTES.company.location },
    ],
  },
  {
    label: "제품",
    labelEn: "Products",
    children: [
      { label: "교반/탈포기", labelEn: "Mixing/Defoaming", href: ROUTES.solutions.equipment.mixer },
      { label: "쓰리롤밀", labelEn: "Three-Roll Mill", href: ROUTES.solutions.equipment.threeRollMill },
      { label: "액상충진기", labelEn: "Liquid Filling Machine", href: ROUTES.solutions.equipment.filling },
      { label: "디스펜서", labelEn: "Dispenser", href: ROUTES.solutions.equipment.dispenser },
      { label: "협동/직교/3축로봇", labelEn: "Collaborative/Cartesian/3-Axis Robot", href: ROUTES.solutions.equipment.robot },
      { label: "UV/IR 경화기", labelEn: "UV/IR Curing System", href: ROUTES.solutions.equipment.curing },
      { label: "소모품", labelEn: "Consumables", href: ROUTES.solutions.equipment.consumables },
    ],
  },
  {
    label: "공정 솔루션",
    labelEn: "Solutions",
    children: [
      { label: "바이오·의료기기", labelEn: "Bio & Medical Devices", href: ROUTES.solutions.automationSystemIndustries.bioMedical },
      { label: "화학·소재", labelEn: "Chemicals & Materials", href: ROUTES.solutions.automationSystemIndustries.chemicalsMaterials },
      { label: "전자·배터리", labelEn: "Electronics & Battery", href: ROUTES.solutions.automationSystemIndustries.electronicsBattery },
      { label: "자동차·부품", labelEn: "Automotive & Parts", href: ROUTES.solutions.automationSystemIndustries.automotive },
      { label: "연구기관·대학", labelEn: "Research & Academia", href: ROUTES.solutions.automationSystemIndustries.researchAcademia },
    ],
  },
  {
    label: "기술블로그",
    labelEn: "Blog",
    children: [
      { label: "전체보기", labelEn: "All Posts", href: ROUTES.blog.all },
      { label: "고객 적용사례", labelEn: "Case Studies", href: ROUTES.blog.cases },
      { label: "인사이트", labelEn: "Insights", href: ROUTES.blog.insight },
      { label: "액상 공정 엔지니어링 위키", labelEn: "Process Engineering Wiki", href: ROUTES.blog.guideIntro },
      { label: "팩토릭스 뉴스", labelEn: "News", href: ROUTES.blog.news },
    ],
  },
  {
    label: "고객지원",
    labelEn: "Support",
    children: [
      { label: "온라인 상담", labelEn: "Online Consultation", href: ROUTES.support.meeting },
      { label: "PoC 문의", labelEn: "PoC Inquiry", href: ROUTES.support.poc },
      { label: "평가테스트 문의", labelEn: "Evaluation Test Inquiry", href: ROUTES.support.demoTest },
      { label: "자주 묻는 질문", labelEn: "FAQ", href: ROUTES.support.qna },
    ],
  },
  {
    label: "자료실",
    labelEn: "Resources",
    children: [
      { label: "공지사항", labelEn: "Notices", href: `${ROUTES.resources}?category=notice` },
      { label: "기술자료실", labelEn: "Technical Documents", href: `${ROUTES.resources}?category=tech-docs` },
      { label: "투자정보", labelEn: "Investor Information", href: `${ROUTES.resources}?category=ir` },
    ],
  },
];

export const isGroup = (item: NavItem) => !item.href && !!item.children?.length;
