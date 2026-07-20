// src/lib/i18n.ts
// 번역된 페이지끼리의 한국어(ko) ↔ 영문(en) 경로 매핑.
// 1단계에서는 홈/AFMS 2개만 있고, 이후 단계에서 페이지를 늘릴 때마다 항목을 추가한다.

import { ROUTES } from "./routes";

export type Locale = "ko" | "en";

// 현재 경로에서 locale을 판별한다. 클라이언트 컴포넌트에서 usePathname()과 함께 써서
// 소프트 네비게이션(언어 전환 링크 클릭) 시에도 즉시 반영되게 한다.
// (루트 레이아웃은 클라이언트 네비게이션에서 재실행되지 않아 headers() 기반 locale은 갱신되지 않는다.)
export function getLocaleFromPathname(pathname: string): Locale {
  return pathname.startsWith("/en") ? "en" : "ko";
}

const LOCALE_PAGE_PAIRS: { ko: string; en: string }[] = [
  { ko: ROUTES.home, en: ROUTES.en.home },
  { ko: ROUTES.solutions.ai.autoCalibration, en: ROUTES.en.autoCalibration },
];

// 현재 경로에 대응하는 다른 언어의 경로를 찾는다. 매핑이 없으면 해당 언어의 홈으로 폴백.
export function getAlternatePath(pathname: string, targetLocale: Locale): string {
  const pair = LOCALE_PAGE_PAIRS.find((p) => p.ko === pathname || p.en === pathname);
  if (pair) return targetLocale === "en" ? pair.en : pair.ko;
  return targetLocale === "en" ? ROUTES.en.home : ROUTES.home;
}
