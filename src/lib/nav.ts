// src/lib/nav.ts
// GNB(전역 내비게이션) 트리.
//  - href 있음  = 실제 랜딩페이지로 가는 링크(leaf)
//  - href 없음  = 분류용 그룹 헤더. 클릭해도 이동하지 않고 하위만 펼친다.
// 라벨(한글)만 여기서 관리하고 경로는 ROUTES에서 가져온다(드리프트 방지).
// Header(데스크톱 메가메뉴)·MobileNav(아코디언)는 이 GNB 하나만 보고 렌더링한다.

import { ROUTES } from "./routes";

export type NavItem = {
  label: string;
  href?: string;
  children?: NavItem[];
};

export const GNB: NavItem[] = [
  {
    label: "기업정보",
    children: [
      { label: "회사 소개", href: ROUTES.company.about },
      { label: "CEO 인사말", href: ROUTES.company.ceo },
      { label: "오시는 길", href: ROUTES.company.location },
    ],
  },
  {
    label: "솔루션",
    children: [
      {
        label: "제품",
        children: [
          { label: "교반/탈포/쓰리롤밀", href: ROUTES.solutions.standalone.mixer },
          { label: "액상충진기", href: ROUTES.solutions.standalone.filling },
          { label: "AI 디스펜서", href: ROUTES.solutions.standalone.dispenser },
          { label: "협동/직교/3축로봇", href: ROUTES.solutions.standalone.robot },
          { label: "UV/IR 경화기", href: ROUTES.solutions.standalone.curing },
        ],
      },
      {
        label: "시스템",
        children: [
          { label: "AI 자동보정 토출시스템", href: ROUTES.solutions.ai.autoCalibration },
          { label: "자동화 시스템", href: ROUTES.solutions.ai.smartFactory },
        ],
      },
    ],
  },
  {
    label: "AI웨어러블",
    children: [
      { label: "AI 스마트글라스", href: ROUTES.wearable.intro },
      { label: "B2C 모델", href: ROUTES.wearable.b2c },
      { label: "B2B 모델", href: ROUTES.wearable.b2b },
      { label: "B2G 모델", href: ROUTES.wearable.b2g },
    ],
  },
  {
    label: "적용사례",
    children: [
      {
        label: "산업별",
        children: [
          { label: "바이오", href: ROUTES.cases.industry.bio },
          { label: "화장품/뷰티", href: ROUTES.cases.industry.cosmetics },
          { label: "화학/소재", href: ROUTES.cases.industry.chemical },
          { label: "디스플레이", href: ROUTES.cases.industry.display },
          { label: "전기/전자", href: ROUTES.cases.industry.electronics },
          { label: "자동차", href: ROUTES.cases.industry.automotive },
          { label: "이차전지", href: ROUTES.cases.industry.battery },
          { label: "연구기관/대학", href: ROUTES.cases.industry.research },
        ],
      },
      {
        label: "제품유형별",
        children: [
          { label: "액제공정 솔루션", href: ROUTES.cases.product.solutions },
          { label: "AI 스마트 글라스", href: ROUTES.cases.product.wearable },
        ],
      },
    ],
  },
  {
    label: "고객지원",
    children: [
      { label: "온라인 상담", href: ROUTES.support.meeting },
      { label: "PoC 문의", href: ROUTES.support.wearablePoc },
      { label: "평가테스트 문의", href: ROUTES.support.poc },
      { label: "자주 묻는 질문", href: ROUTES.support.qna },
    ],
  },
  {
    label: "자료실",
    children: [
      { label: "공지사항", href: `${ROUTES.resources}?category=notice` },
      { label: "언론 보도", href: `${ROUTES.resources}?category=press` },
      { label: "특허/수상", href: `${ROUTES.resources}?category=patents` },
      { label: "기술자료실", href: `${ROUTES.resources}?category=tech-docs` },
      { label: "투자정보", href: `${ROUTES.resources}?category=ir` },
    ],
  },
];

export const isGroup = (item: NavItem) => !item.href && !!item.children?.length;
