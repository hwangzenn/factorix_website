# SEO 헤딩 & 메타데이터 현황

> 이 파일을 직접 수정해서 주시면 코드에 그대로 반영합니다.
> 
> **수정 규칙**
> - `title` / `description` 값만 바꿔주세요 (따옴표 안 텍스트)
> - `h1` / `h2` / `h3` 뒤의 텍스트만 바꿔주세요
> - 태그 레벨(h1→h2 등)을 바꾸고 싶으면 앞의 `h숫자`를 바꿔주세요
> - 태그를 **추가**하고 싶으면 같은 들여쓰기로 한 줄 추가
> - 태그를 **삭제**하고 싶으면 해당 줄을 지워주세요
> - ⚠️ 표시는 현재 SEO 문제가 있는 항목입니다

---

## 메인페이지 `/`

**파일:** `src/app/page.tsx`

```
title: "팩토릭스 | Factorix — AI 액제제조 · 디스펜싱 솔루션"
description: "팩토릭스(Factorix)는 AI 기반 초정밀 디스펜싱 자동화 설비 시스템을 공급하는 B2B 전문 기업입니다."

h1: "액상제조 공정 자동화, 팩토릭스(FactoriX) 스마트 솔루션"  ← HeroCarousel 내 sr-only, 슬라이드 회전 카피와 별개로 페이지 전체 유일 h1

  h2: "까다로운 액상제조 공정, Factorix가 해결합니다"
    h3: "액상제조사가 겪는 어려움"
    h3: "FactoriX 솔루션 도입의 차별점"

  h2: "관점별 FactoriX 솔루션 탐색"
    h3: "[공정 단계] 원료 투입부터 패키징까지의 자동화"
    h3: "[장비 종류] 수율을 극대화하는 액상제조 장비 및 시스템"
    h3: "[산업 사례] 귀사의 산업군에 맞춘 특화 공정"

  h2: "팩토릭스 기술 인사이트"
    h3: "팩토릭스 기술 블로그 바로가기"
    h3: "보유 특허 및 인증 자료실"
    h3: "온라인 상담 신청하기"
```

---

## 기업정보

### 회사소개 `/company/about`

**파일:** `src/app/company/about/page.tsx`

```
title: "회사소개 | 팩토릭스 Factorix"
description: "팩토릭스는 액상 소재의 물성 변화를 실시간 학습하고 디스펜싱 공정을 자동 보정하는 AI 제조 지능 시스템 기업입니다."

  h1: "팩토릭스(Factorix) — [현재 코드 확인 필요, 히어로 섹션 h1]"
  h2: "핵심 가치"
    h3: [values 배열에서 동적 렌더링]
  h2: "주요 사업 영역"
    h3: [비즈니스 영역 동적 렌더링]
  h2: "팩토릭스를 선택해야 하는 이유"
    h3: [이유 항목 동적 렌더링]
  h2: "팩토릭스와 함께 제조를 혁신하세요"  ← CTA 섹션
```

### CEO 인사말 `/company/ceo`

**파일:** `src/app/company/ceo/page.tsx`

```
title: "CEO 인사말 | Factorix"
description: "팩토릭스 대표이사 인사말 — 스마트 제조 파트너를 지향합니다."

  h1: "CEO 인사말"
```

### 오시는길 `/company/location`

**파일:** `src/app/company/location/page.tsx`

```
title: "오시는길 | 팩토릭스 Factorix"
description: "팩토릭스 오시는길 — 경기도 오산시 세교동 586 현대프리미어캠퍼스 A동 1115~1117호"

  h1: "오시는길"
```

---

## 솔루션

### (삭제됨) AI 자동보정 토출시스템 — 구 `/solutions/equipment-systems/auto-calibration`

판매 솔루션에서 완전히 삭제됨(구 URL은 `/blog/news/ces-2026`로 301 리다이렉트). 홈/회사소개에 남아있는 AFMS 소개 문구는 그대로 두고 링크만 CES 2026 수상 뉴스로 연결한다. 해당 뉴스 게시물(Sanity `blogPost`)에 "AFMS는 상용화를 위해 개발 중"이라는 문구를 Sanity Studio에서 추가하는 것을 권장.

### 제조자동화 단동설비 `/solutions/automation-system`

**파일:** `src/app/solutions/automation-system/page.tsx` (허브, 산업별 5개 상세는 `bio-medical`/`chemicals-materials`/`electronics-battery`/`automotive`/`research-academia` 하위 페이지)

```
title: "제조자동화 단동설비"
description: "산업별 액상 제조공정·자동화 요구에 맞춘 Factorix 제조자동화 단동설비"

  h1: "제조자동화 단동설비"
```

산업별 5개 상세페이지는 공통 섹션 순서를 따른다: `h1`(산업명) → 컨셉(서브버티컬+개요문단) → `h2: "특장점"` → `h2: "주요 고객사"`(로고, 있을 때만) → `h2: "포트폴리오"`(Sanity `product.industries` 태그 매핑, 비어있으면 안내문) → 연관콘텐츠(`RelatedContent`, `blogPost`/`caseStudy`의 `industries` 태그 매핑) → 도입문의 CTA.

### 디스펜서 `/solutions/standalone/dispenser`

**파일:** `src/app/solutions/standalone/dispenser/page.tsx`

```
title: "디스펜서 | Factorix"
description: "Factorix 디스펜서 — AI 기반 정밀 토출 솔루션"

  h1: "디스펜서"
```

### 액상충진기 `/solutions/standalone/filling`

**파일:** `src/app/solutions/standalone/filling/page.tsx`

```
title: "액상충진기 | Factorix"
description: "Factorix 액상충진기 — 고정밀 액상 충진 솔루션"

  h1: "액상충진기"
```

### 교반/탈포/쓰리롤밀 `/solutions/standalone/mixer`

**파일:** `src/app/solutions/standalone/mixer/page.tsx`

```
title: "교반/탈포/쓰리롤밀 | Factorix"
description: "Factorix 교반·탈포·쓰리롤밀 — 정밀 액제 혼합 솔루션"

  h1: "교반/탈포/쓰리롤밀"
```

### 협동/직교/3축로봇 `/solutions/standalone/robot`

**파일:** `src/app/solutions/standalone/robot/page.tsx`

```
title: "협동/직교/3축로봇 | Factorix"
description: "Factorix 협동·직교·3축로봇 — 자동화 로봇 솔루션"

  h1: "협동/직교/3축로봇"
```

### UV/IR 경화기 `/solutions/standalone/curing`

**파일:** `src/app/solutions/standalone/curing/page.tsx`

```
title: "UV/IR 경화기 | Factorix"
description: "Factorix UV/IR 경화기 — 고효율 UV·IR 경화 솔루션"

  h1: "UV/IR 경화기"
```

---

## 적용사례 — 산업별

### 자동차 `/cases/industry/automotive`

**파일:** `src/app/cases/industry/automotive/page.tsx`

```
title: "자동차 적용사례 | Factorix"
description: "Factorix 자동차 부품 도포 솔루션 적용사례"

  h1: "자동차"
```

### 이차전지 `/cases/industry/battery`

**파일:** `src/app/cases/industry/battery/page.tsx`

```
title: "이차전지 적용사례 | Factorix"
description: "Factorix 이차전지 전극·전해질 코팅 솔루션 적용사례"

  h1: "이차전지"
```

### 바이오 `/cases/industry/bio`

**파일:** `src/app/cases/industry/bio/page.tsx`

```
title: "바이오 적용사례 | Factorix"
description: "Factorix 바이오 산업 액제제조 솔루션 적용사례"

  h1: "바이오"
```

### 화학/소재 `/cases/industry/chemical`

**파일:** `src/app/cases/industry/chemical/page.tsx`

```
title: "화학/소재 적용사례 | Factorix"
description: "Factorix 화학·소재 산업 액제제조 솔루션 적용사례"

  h1: "화학/소재"
```

### 화장품/뷰티 `/cases/industry/cosmetics`

**파일:** `src/app/cases/industry/cosmetics/page.tsx`

```
title: "화장품/뷰티 적용사례 | Factorix"
description: "Factorix 화장품·뷰티 산업 액제제조 솔루션 적용사례"

  h1: "화장품/뷰티"
```

### 디스플레이 `/cases/industry/display`

**파일:** `src/app/cases/industry/display/page.tsx`

```
title: "디스플레이 적용사례 | Factorix"
description: "Factorix 디스플레이 패널 공정 솔루션 적용사례"

  h1: "디스플레이"
```

### 전기/전자 `/cases/industry/electronics`

**파일:** `src/app/cases/industry/electronics/page.tsx`

```
title: "전기/전자 적용사례 | Factorix"
description: "Factorix 전기·전자 부품 제조 솔루션 적용사례"

  h1: "전기/전자"
```

### 연구기관/대학 `/cases/industry/research`

**파일:** `src/app/cases/industry/research/page.tsx`

```
title: "연구기관/대학 적용사례 | Factorix"
description: "Factorix 연구기관·대학 R&D 솔루션 적용사례"

  h1: "연구기관/대학"
```

---

## 적용사례 — 제품별

### 액제제조 솔루션 적용사례 `/cases/product/solutions`

**파일:** `src/app/cases/product/solutions/page.tsx`

```
title: "액제제조 솔루션 적용사례 | Factorix"
description: "Factorix 액제제조 솔루션 제품유형별 적용사례"

  h1: "액제제조 솔루션"
```

---

## 고객지원

### PoC 문의 `/support/poc`

**파일:** `src/app/support/poc/page.tsx`

```
title: "PoC 문의 | Factorix"
description: "Factorix PoC 도입 문의 — 장비, 시스템"

  h1: "PoC 문의"
```

### 온라인상담 신청 `/support/meeting`

**파일:** `src/app/support/meeting/page.tsx`

```
title: "온라인상담 신청 | Factorix"
description: "Factorix 온라인상담 신청"

  h1: "온라인상담 신청"
```

### 평가테스트 문의 `/support/demo-test`

**파일:** `src/app/support/demo-test/page.tsx`

```
title: "평가테스트 문의 | Factorix"
description: "Factorix 시스템 평가테스트 문의"

  h1: "평가테스트 문의"
```

### Q&A `/support/qna`

**파일:** `src/app/support/qna/page.tsx`

```
title: "Q&A"
description: "Factorix 자주 묻는 질문"

⚠️ title에 "| 팩토릭스 Factorix" 누락
  h1: "Q&A"
```

---

## 자료실

### 자료실 `/resources`

**파일:** `src/app/resources/page.tsx`

```
title: "자료실 | Factorix"
description: "Factorix 공지사항, 언론보도, 기술자료, 특허/수상, 투자정보"

⚠️ h1 없음 (코드에 h태그 없음 — 자료실 페이지 본문 구조 확인 필요)
```

---

## 전역 OG (layout.tsx)

> 페이지별 openGraph를 별도 선언하지 않은 경우 이 값이 소셜 공유 카드에 사용됩니다.

```
og:title: "팩토릭스(Factorix) | AI 액제제조 솔루션"
og:description: "팩토릭스 — AI 기반 초정밀 디스펜싱 자동화 설비 시스템 전문 기업"
og:image: "/og-image.png"  (1200×630px 권장)
og:type: "website"
og:locale: "ko_KR"

twitter:card: "summary_large_image"
twitter:title: "팩토릭스(Factorix) | AI 액제제조 솔루션"
twitter:description: "팩토릭스 — AI 기반 초정밀 디스펜싱 자동화 설비 시스템 전문 기업"
```
