// src/lib/industries.ts
// 산업군 5개 슬러그/라벨의 단일 소스. 제조자동화 단동설비 산업 상세페이지, 홈페이지
// "고객 맞춤형 솔루션" 섹션, Sanity product.industries/caseStudy.industries/blogPost.industries/
// industryLogo.category 필드의 옵션 리스트가 모두 여기(또는 이를 재노출하는 src/lib/blogFilters.ts)를 참조한다.

export const MANUFACTURING_INDUSTRIES = [
  { key: "bio-medical", label: "바이오·의료기기", labelEn: "Bio & Medical Devices" },
  { key: "chemicals-materials", label: "화학·소재", labelEn: "Chemicals & Materials" },
  { key: "electronics-battery", label: "전자·배터리", labelEn: "Electronics & Battery" },
  { key: "automotive", label: "자동차·부품", labelEn: "Automotive & Parts" },
  { key: "research-academia", label: "연구기관·대학", labelEn: "Research & Academia" },
] as const
