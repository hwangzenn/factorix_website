// src/lib/routes.ts
// ─────────────────────────────────────────────────────────────
// 단일 진실 공급원 (Single Source of Truth)
// 여기 있는 경로 = 실제 page.tsx 가 존재하는 "랜딩페이지"뿐이다.
// 중간 분류(기업정보 / 적용사례 / 산업별 등)는 디렉토리일 뿐 페이지가 아니므로
// ROUTES 에 넣지 않는다. GNB 그룹 헤더는 링크가 아니라 펼침 메뉴다.
// 모든 내부 링크는 이 상수만 import 해서 사용. 문자열 경로 하드코딩 금지.
// ─────────────────────────────────────────────────────────────

export const ROUTES = {
  home: "/",                          // 메인 (유일한 상위 페이지)

  // 기업정보  ── 디렉토리(페이지 없음)
  company: {
    about: "/company/about",          // 회사소개
    ceo: "/company/ceo",              // CEO 인사말
    location: "/company/location",    // 오시는길 (연구소/생산공장 위치 = #map 섹션)
  },

  // 액제제조 솔루션  ── 디렉토리
  solutions: {
    standalone: {                     // 단독설비 ── 디렉토리
      mixer: "/solutions/standalone/mixer",          // 교반/탈포기
      threeRollMill: "/solutions/standalone/three-roll-mill", // 쓰리롤밀
      filling: "/solutions/standalone/filling",      // 액상충진기
      dispenser: "/solutions/standalone/dispenser",  // 디스펜서
      robot: "/solutions/standalone/robot",          // 협동/직교/3축로봇
      curing: "/solutions/standalone/curing",        // UV/IR 경화기
      consumables: "/solutions/standalone/consumables", // 소모품
    },
    ai: {                             // AI 시스템 ── 디렉토리
      autoCalibration: "/solutions/ai/auto-calibration",       // AI 자동보정 토출시스템
      smartFactory: "/solutions/ai/smart-factory",             // 자동화 시스템
    },
  },

  // 적용사례(제품유형별) ── 디렉토리. 산업별 적용사례는 blog.cases로 통합됨.
  cases: {
    product: {                        // 제품유형별 ── 디렉토리
      solutions: "/cases/product/solutions",      // 액제제조 솔루션
      wearable: "/cases/product/wearable",        // 웨어러블 디바이스
    },
  },

  // 블로그 ── 콘텐츠마케팅(인사이트/액상 공정 엔지니어링 위키/뉴스/적용사례)
  blog: {
    all: "/blog",                     // 전체보기
    cases: "/blog/cases",             // 적용사례 (산업별 통합)
    insight: "/blog/insight",         // 인사이트
    guideIntro: "/blog/guide-intro",       // 액상 공정 엔지니어링 위키
    news: "/blog/news",               // 뉴스 (구 자료실 > 언론보도/특허수상 통합)
  },

  // 고객지원  ── 디렉토리
  support: {
    demoTest: "/support/demo-test",       // 평가테스트 문의
    poc: "/support/poc",                  // PoC 문의
    meeting: "/support/meeting",          // 온라인상담 신청
    qna: "/support/qna",                  // Q&A
  },

  // 자료실
  resources: "/resources",

  // 영문(EN) 버전 ── 1단계: 홈 + AFMS 대표페이지만. 이후 단계에서 순차 추가.
  en: {
    home: "/en",
    autoCalibration: "/en/solutions/ai/auto-calibration",
  },
} as const;

// 깨진 링크 검증 / sitemap 생성용: 모든 실제 페이지 경로를 평탄화
export function flattenRoutes(node: unknown = ROUTES, acc: string[] = []): string[] {
  if (typeof node === "string") acc.push(node);
  else if (node && typeof node === "object")
    for (const v of Object.values(node)) flattenRoutes(v, acc);
  return Array.from(new Set(acc));
}
