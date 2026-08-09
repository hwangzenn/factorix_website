// src/lib/industries.ts
// 제조자동화 단동설비 5개 산업군 슬러그/라벨의 단일 소스.
// Sanity product.industries 필드의 옵션 리스트, 산업 상세페이지, 홈페이지 "고객 맞춤형 솔루션" 섹션이 모두 여기를 참조한다.
// 블로그/적용사례에서 쓰는 src/lib/blogFilters.ts의 INDUSTRIES(7키)와는 별도 체계다 — 그쪽은 caseStudy/blogPost/industryLogo 태깅용.

export const MANUFACTURING_INDUSTRIES = [
  { key: "bio-medical", label: "바이오·의료기기", labelEn: "Bio & Medical Devices" },
  { key: "chemicals-materials", label: "화학·소재", labelEn: "Chemicals & Materials" },
  { key: "electronics-battery", label: "전자·배터리", labelEn: "Electronics & Battery" },
  { key: "automotive", label: "자동차·부품", labelEn: "Automotive & Parts" },
  { key: "research-academia", label: "연구기관·대학", labelEn: "Research & Academia" },
] as const

// 위 5개 산업군 → 기존 blogFilters.INDUSTRIES(caseStudy/blogPost/industryLogo 태깅용 7키) best-effort 매핑.
// 두 체계가 1:1이 아니라(바이오·의료기기가 bio+cosmetics를 포함하는 등) 여러 키가 매핑될 수 있다.
export const MANUFACTURING_TO_LEGACY_INDUSTRY: Record<string, string[]> = {
  "bio-medical": ["bio", "cosmetics"],
  "chemicals-materials": ["chemical"],
  "electronics-battery": ["electronics"],
  automotive: ["automotive"],
  "research-academia": ["research"],
}
