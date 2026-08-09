// src/lib/blogFilters.ts
// 블로그 산업군/공정 필터의 단일 소스. Sanity 스키마(caseStudy.ts, blogPost.ts, industryLogo.ts)의
// select 옵션 리스트와 프론트엔드 필터 UI(BlogFilterBar)가 모두 이 배열을 참조한다.
// 산업군은 제조자동화 단동설비(src/lib/industries.ts MANUFACTURING_INDUSTRIES)와 동일한
// 5개 카테고리 체계를 그대로 재사용해 산업군 태그를 하나로 통일한다.

import { MANUFACTURING_INDUSTRIES } from "./industries"

export const INDUSTRIES = MANUFACTURING_INDUSTRIES

export const PROCESSES = [
  { key: "mixer-defoamer", label: "교반/탈포기" },
  { key: "three-roll-mill", label: "쓰리롤밀" },
  { key: "filling", label: "액상충진" },
  { key: "dispenser", label: "디스펜싱" },
  { key: "curing", label: "UV/IR 경화" },
  { key: "robot", label: "로봇" },
  { key: "other", label: "기타" },
] as const
