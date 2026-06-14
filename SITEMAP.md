# SITEMAP & 파일 구조

**구조 원칙: 메인페이지 1개 + 랜딩페이지(leaf)만 실제 page 파일.**
중간 분류(기업정보·적용사례·산업별 등)는 **디렉토리일 뿐 page.tsx 가 없다.**
즉 `/cases`, `/cases/industry` 같은 중간 경로는 페이지가 아니며, GNB에서도 링크가 아니라 펼침 그룹이다.

경로 정본(canonical)은 `src/lib/routes.ts`. 이 문서는 사람이 읽는 참조본이며, 어긋나면 `routes.ts`가 이긴다.

총 페이지: **메인 1 + 랜딩 32 = 33개.**

---

## 1. 사이트맵  (▣ = 실제 페이지 / 📁 = 디렉토리·비링크 그룹)

```
▣ 메인 (/)
│
📁 기업정보 (/company)
│   ├─ ▣ 회사소개            /company/about
│   ├─ ▣ CEO 인사말          /company/ceo
│   └─ ▣ 오시는길            /company/location   (연구소/생산공장 위치 = #map 섹션)
│
📁 액제제조 솔루션 (/solutions)
│   ├─ 📁 단독설비 (/solutions/standalone)
│   │   ├─ ▣ 교반/탈포/쓰리롤밀   /solutions/standalone/mixer
│   │   ├─ ▣ 액상충진기           /solutions/standalone/filling
│   │   ├─ ▣ AI 디스펜서          /solutions/standalone/dispenser
│   │   ├─ ▣ 협동/직교/3축로봇    /solutions/standalone/robot
│   │   └─ ▣ UV/IR 경화기         /solutions/standalone/curing
│   └─ 📁 AI 시스템 (/solutions/ai)
│       ├─ ▣ AI 자동보정 토출시스템 /solutions/ai/auto-calibration
│       └─ ▣ 자동화 시스템         /solutions/ai/smart-factory
│
📁 AI 웨어러블 디바이스 (/wearable)
│   ├─ ▣ 소개(광고영상)      /wearable/intro
│   ├─ ▣ B2C 모델           /wearable/b2c
│   ├─ ▣ B2B 모델           /wearable/b2b
│   └─ ▣ B2G 모델           /wearable/b2g
│
📁 적용사례 (/cases)
│   ├─ 📁 산업별 (/cases/industry)
│   │   ├─ ▣ 바이오          /cases/industry/bio
│   │   ├─ ▣ 화장품/뷰티      /cases/industry/cosmetics
│   │   ├─ ▣ 화학/소재        /cases/industry/chemical
│   │   ├─ ▣ 디스플레이       /cases/industry/display
│   │   ├─ ▣ 전기/전자        /cases/industry/electronics
│   │   ├─ ▣ 자동차          /cases/industry/automotive
│   │   ├─ ▣ 이차전지        /cases/industry/battery
│   │   └─ ▣ 연구기관/대학    /cases/industry/research
│   └─ 📁 제품유형별 (/cases/product)
│       ├─ ▣ 액제제조 솔루션  /cases/product/solutions
│       └─ ▣ 웨어러블 디바이스 /cases/product/wearable
│
📁 고객지원 (/support)
│   ├─ ▣ 시스템 평가테스트 및 PoC 문의 /support/poc
│   ├─ ▣ 상세 방문미팅 요청           /support/meeting
│   ├─ ▣ 웨어러블 디바이스 PoC 문의    /support/wearable-poc
│   └─ ▣ Q&A                         /support/qna
│
📁 자료실 (/resources)
    ├─ ▣ 공지사항      /resources/notice
    ├─ ▣ 언론보도      /resources/press
    ├─ ▣ 특허/수상     /resources/patents
    ├─ ▣ 기술자료실    /resources/tech-docs
    └─ ▣ 투자정보      /resources/ir
```

> ⚠️ 판단 보류 1건: **오시는길**은 단일 페이지로 두고 "연구소/생산공장 위치"는 그 안의 `#map` 섹션으로 처리했다.
> 이걸 별도 페이지로 쪼개고 싶으면 알려달라 — `/company/location/...` 로 분리 가능.

---

## 2. 파일 구조 (Next.js App Router) — 중간 디렉토리엔 page.tsx 없음

```
src/
├─ app/
│  ├─ layout.tsx                 # 루트 레이아웃 (Header/Footer)
│  ├─ page.tsx                   # ▣ 메인 /
│  ├─ globals.css
│  ├─ not-found.tsx
│  ├─ sitemap.ts                 # flattenRoutes(ROUTES)로 자동 생성
│  │
│  ├─ company/                   # 📁 (page 없음)
│  │  ├─ about/page.tsx
│  │  ├─ ceo/page.tsx
│  │  └─ location/page.tsx       # #map 섹션 포함
│  │
│  ├─ solutions/                 # 📁
│  │  ├─ standalone/             # 📁
│  │  │  ├─ mixer/page.tsx
│  │  │  ├─ filling/page.tsx
│  │  │  ├─ dispenser/page.tsx
│  │  │  ├─ robot/page.tsx
│  │  │  └─ curing/page.tsx
│  │  └─ ai/                     # 📁
│  │     ├─ auto-calibration/page.tsx
│  │     └─ smart-factory/page.tsx
│  │
│  ├─ wearable/                  # 📁
│  │  ├─ intro/page.tsx
│  │  ├─ b2c/page.tsx
│  │  ├─ b2b/page.tsx
│  │  └─ b2g/page.tsx
│  │
│  ├─ cases/                     # 📁
│  │  ├─ industry/               # 📁
│  │  │  ├─ bio/page.tsx
│  │  │  ├─ cosmetics/page.tsx
│  │  │  ├─ chemical/page.tsx
│  │  │  ├─ display/page.tsx
│  │  │  ├─ electronics/page.tsx
│  │  │  ├─ automotive/page.tsx
│  │  │  ├─ battery/page.tsx
│  │  │  └─ research/page.tsx
│  │  └─ product/                # 📁
│  │     ├─ solutions/page.tsx
│  │     └─ wearable/page.tsx
│  │
│  ├─ support/                   # 📁
│  │  ├─ poc/page.tsx
│  │  ├─ meeting/page.tsx
│  │  ├─ wearable-poc/page.tsx
│  │  └─ qna/page.tsx
│  │
│  └─ resources/                 # 📁
│     ├─ notice/page.tsx
│     ├─ press/page.tsx
│     ├─ patents/page.tsx
│     ├─ tech-docs/page.tsx
│     └─ ir/page.tsx
│
├─ components/
│  ├─ layout/Header.tsx          # GNB 데스크톱(그룹=펼침, leaf=링크)
│  ├─ layout/MobileNav.tsx       # GNB 모바일 아코디언
│  ├─ layout/Footer.tsx
│  ├─ sections/                  # Hero, FeatureGrid, CTA 등
│  └─ ui/                        # Button, Card 등
│
└─ lib/
   ├─ routes.ts                  # 경로 정본(SSoT) — leaf만
   └─ nav.ts                     # GNB 트리(라벨+경로, 그룹/leaf)
```

### 참고
- 중간 디렉토리엔 `page.tsx`가 없으므로 `/cases` 등을 직접 입력하면 404다. 정상 동작.
  (원하면 중간 경로를 첫 자식으로 redirect 시킬 수 있음 — 선택사항)
- 산업별 8개는 템플릿이 동일하면 `industry/[industry]/page.tsx` + 데이터 파일로 합칠 수도 있으나,
  기본은 요청대로 **바이오 등 개별 page.tsx**로 둔다.
