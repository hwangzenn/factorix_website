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
description: "팩토릭스(Factorix)는 AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스를 공급하는 B2B 전문 기업입니다."

h1: "액상제조 공정 자동화, 팩토릭스(FactoriX) 스마트 솔루션"  ← HeroCarousel 내 sr-only, 슬라이드 회전 카피와 별개로 페이지 전체 유일 h1

  h2: "까다로운 액상제조 공정, Factorix가 해결합니다"
    h3: "액상제조사가 겪는 어려움"
    h3: "FactoriX 솔루션 도입의 차별점"

  h2: "관점별 FactoriX 솔루션 탐색"
    h3: "[공정 단계] 원료 투입부터 패키징까지의 자동화"
    h3: "[장비 종류] 수율을 극대화하는 액상제조 장비 및 시스템"
    h3: "[산업 사례] 귀사의 산업군에 맞춘 특화 공정"
    h3: "[기타] CES수상 AI 웨어러블 디바이스"

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

### AI 자동보정 토출시스템 `/solutions/ai/auto-calibration`

**파일:** `src/app/solutions/ai/auto-calibration/page.tsx`

```
title: "AI 자동보정 토출시스템 AFMS | 팩토릭스 Factorix"
description: "실시간 물성 분석과 Vision AI로 디스펜싱 조건을 스스로 학습·자동보정하는 AI 제조 지능 시스템 AFMS"

  h1: "AI 자동보정 토출시스템 AFMS [현재 코드 확인 필요]"
  h2: "AFMS란 무엇인가 [현재 코드 확인 필요]"
  h2: "5가지 자동화 아키텍처"
    h3: [아키텍처 항목 동적 렌더링]
  h2: "도입 후 변화되는 지표"
    h3: [지표 항목 동적 렌더링]
  h2: "제품 라인업"
  h2: "AFMS 도입을 검토 중이시라면"  ← CTA
```

### 자동화 시스템 `/solutions/ai/smart-factory`

**파일:** `src/app/solutions/ai/smart-factory/page.tsx`

```
title: "자동화 시스템 | Factorix"
description: "Factorix AI 스마트팩토리 시스템 — 생산 공정 자동화"

  h1: "자동화 시스템"
```

### AI 디스펜서 `/solutions/standalone/dispenser`

**파일:** `src/app/solutions/standalone/dispenser/page.tsx`

```
title: "AI 디스펜서 | Factorix"
description: "Factorix AI 디스펜서 — AI 기반 정밀 토출 솔루션"

  h1: "AI 디스펜서"
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

### 웨어러블 디바이스 적용사례 `/cases/product/wearable`

**파일:** `src/app/cases/product/wearable/page.tsx`

```
title: "웨어러블 디바이스 적용사례 | Factorix"
description: "Factorix AI 웨어러블 디바이스 제품유형별 적용사례"

  h1: "웨어러블 디바이스"
```

---

## AI 웨어러블

### 소개 `/wearable/intro`

**파일:** `src/app/wearable/intro/page.tsx`

```
title: "AI 웨어러블 디바이스 소개"
description: "Factorix AI 웨어러블 디바이스 소개"

⚠️ title에 "| 팩토릭스 Factorix" 누락 (다른 페이지와 형식 불일치)
  h1: "소개"
```

### B2B 모델 `/wearable/b2b`

**파일:** `src/app/wearable/b2b/page.tsx`

```
title: "웨어러블 B2B 모델"
description: "Factorix AI 웨어러블 디바이스 B2B 모델"

⚠️ title에 "| 팩토릭스 Factorix" 누락
  h1: "B2B 모델"
```

### B2C 모델 `/wearable/b2c`

**파일:** `src/app/wearable/b2c/page.tsx`

```
title: "웨어러블 B2C 모델"
description: "Factorix AI 웨어러블 디바이스 B2C 모델"

⚠️ title에 "| 팩토릭스 Factorix" 누락
  h1: "B2C 모델"
```

### B2G 모델 `/wearable/b2g`

**파일:** `src/app/wearable/b2g/page.tsx`

```
title: "웨어러블 B2G 모델"
description: "Factorix AI 웨어러블 디바이스 B2G 모델"

⚠️ title에 "| 팩토릭스 Factorix" 누락
  h1: "B2G 모델"
```

---

## 고객지원

### PoC 문의 `/support/poc`

**파일:** `src/app/support/poc/page.tsx`

```
title: "PoC 문의 | Factorix"
description: "Factorix PoC 도입 문의 — 장비, 시스템, AI 웨어러블"

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
og:description: "팩토릭스 — AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업"
og:image: "/og-image.png"  (1200×630px 권장)
og:type: "website"
og:locale: "ko_KR"

twitter:card: "summary_large_image"
twitter:title: "팩토릭스(Factorix) | AI 액제제조 솔루션"
twitter:description: "팩토릭스 — AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업"
```
