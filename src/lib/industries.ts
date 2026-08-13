// src/lib/industries.ts
// 산업군 5개 슬러그/라벨의 단일 소스. 제조자동화 단동설비 산업 상세페이지, 홈페이지
// "고객 맞춤형 솔루션" 섹션, Sanity product.industries/caseStudy.industries/blogPost.industries/
// industryLogo.category 필드의 옵션 리스트가 모두 여기(또는 이를 재노출하는 src/lib/blogFilters.ts)를 참조한다.

export const MANUFACTURING_INDUSTRIES = [
  {
    key: "bio-medical",
    label: "바이오·의료기기",
    labelEn: "Bio & Medical Devices",
    subverticals: "제약, 바이오, 진단, 의료기기, 콘택트렌즈, 코스메틱",
    subverticalsEn: "Pharma, Bio, Diagnostics, Medical Devices, Contact Lenses, Cosmetics",
  },
  {
    key: "chemicals-materials",
    label: "화학·소재",
    labelEn: "Chemicals & Materials",
    subverticals: "화학, 접착제, 수지, 실리콘, 기능성 소재",
    subverticalsEn: "Chemicals, Adhesives, Resins, Silicone, Functional Materials",
  },
  {
    key: "electronics-battery",
    label: "전자·배터리",
    labelEn: "Electronics & Battery",
    subverticals: "전기·전자, 반도체, 디스플레이, 배터리",
    subverticalsEn: "Electrical/Electronics, Semiconductors, Display, Battery",
  },
  {
    key: "automotive",
    label: "자동차·부품",
    labelEn: "Automotive & Parts",
    subverticals: "자동차, 자동차 부품, 전장, 모빌리티",
    subverticalsEn: "Automotive, Auto Parts, Electrical Components, Mobility",
  },
  {
    key: "research-academia",
    label: "연구기관·대학",
    labelEn: "Research & Academia",
    subverticals: "대학 연구실, 정부출연연구기관, 기업 R&D센터, 시험·분석기관",
    subverticalsEn: "University Labs, Government Research Institutes, Corporate R&D Centers, Testing & Analysis Institutes",
  },
] as const
