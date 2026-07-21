// src/lib/blogFilters.ts
// 블로그 산업군/공정 필터의 단일 소스. Sanity 스키마(caseStudy.ts, blogPost.ts)의 select
// 옵션 리스트와 프론트엔드 필터 UI(BlogFilterBar)가 모두 이 배열을 참조한다.

export const INDUSTRIES = [
  { key: "bio", label: "바이오" },
  { key: "cosmetics", label: "화장품/뷰티" },
  { key: "chemical", label: "화학/소재" },
  { key: "electronics", label: "전기/전자" },
  { key: "automotive", label: "자동차" },
  { key: "research", label: "연구기관/대학" },
  { key: "other", label: "기타" },
] as const

export const PROCESSES = [
  { key: "mixer-defoamer", label: "교반/탈포기" },
  { key: "three-roll-mill", label: "쓰리롤밀" },
  { key: "filling", label: "액상충진" },
  { key: "dispenser", label: "AI 디스펜싱" },
  { key: "curing", label: "UV/IR 경화" },
  { key: "robot", label: "로봇" },
  { key: "other", label: "기타" },
] as const
