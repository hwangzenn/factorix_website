# SITEMAP & 파일 구조

> Claude Code가 매 작업마다 따르는 프로젝트 규칙. 중요한 규칙을 위에 둔다.

**구조 원칙: 메인페이지 1개 + 랜딩페이지(leaf)만 실제 page 파일.**
중간 분류(기업정보·솔루션 등)는 **디렉토리일 뿐 page.tsx 가 없다.**
즉 `/solutions`, `/solutions/equipment` 같은 중간 경로는 페이지가 아니며, GNB에서도 링크가 아니라 펼침 그룹이다.
블로그는 GNB에서 펼침 그룹으로 동작하며(GNB 라벨: "기술블로그"), 그룹 헤더는 비링크이고 하위 카테고리(전체보기·고객 적용사례·인사이트·액상 공정 엔지니어링 위키·팩토릭스 뉴스)가 각각 링크다. `/blog`는 "전체보기" 링크로 연결되는 실제 페이지다.

경로 정본(canonical)은 `src/lib/routes.ts`. 이 문서는 사람이 읽는 참조본이며, 어긋나면 `routes.ts`가 이긴다.

총 페이지: **메인 1 + 랜딩 26 = 27개** (영문(EN) 버전 1개는 별도).

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
📁 제품 (GNB 최상위 그룹, URL은 여전히 /solutions/equipment 하위)
│   ├─ ▣ 교반/탈포기         /solutions/equipment/mixer   (Sanity category: mixer-defoamer)
│   ├─ ▣ 쓰리롤밀            /solutions/equipment/three-roll-mill
│   ├─ ▣ 액상충진기           /solutions/equipment/filling
│   ├─ ▣ 디스펜서             /solutions/equipment/dispenser
│   ├─ ▣ 협동/직교/3축로봇    /solutions/equipment/robot
│   ├─ ▣ UV/IR 경화기         /solutions/equipment/curing
│   └─ ▣ 소모품               /solutions/equipment/consumables
│
📁 공정 솔루션 (GNB 최상위 그룹, URL은 여전히 /solutions 하위. 구 GNB 라벨 "솔루션")
│   └─ ▣ 제조자동화 시스템 (허브, GNB 비노출·레거시 유지)  /solutions/automation-system
│       └─ 제조자동화 시스템 (GNB 그룹) ── 산업별 5개
│           ├─ ▣ 바이오·의료기기        /solutions/automation-system/bio-medical
│           ├─ ▣ 화학·소재             /solutions/automation-system/chemicals-materials
│           ├─ ▣ 전자·배터리           /solutions/automation-system/electronics-battery
│           ├─ ▣ 자동차·부품           /solutions/automation-system/automotive
│           └─ ▣ 연구기관·대학         /solutions/automation-system/research-academia
│           (각 산업 상세페이지 공통 순서: 컨셉→특장점→포트폴리오→연관콘텐츠→도입문의.
│            "포트폴리오"는 Sanity `product.industries` 태그로 자동 매핑 — 단독설비 CMS에서
│            산업군을 체크하면 해당 산업 페이지에 노출된다.)
│
│   (구 AI 자동보정 토출시스템/AFMS는 판매 솔루션에서 삭제됨 — 관련 마케팅 콘텐츠는 /blog/news/ces-2026 으로 연결.
│    구 URL 리다이렉트는 next.config.ts 참고: /solutions/equipment-systems/smart-factory→/solutions/automation-system,
│    /solutions/equipment-systems/auto-calibration→/blog/news/ces-2026)
│
📁 블로그   ── GNB 펼침 그룹(비링크). 하위 항목이 각각 링크.
│   ├─ ▣ 전체보기            /blog                (블로그 인덱스)
│   ├─ ▣ 고객 적용사례        /blog/cases          (Sanity: caseStudy, 산업군·공정 태그 필터)
│   ├─ ▣ 인사이트            /blog/insight        (Sanity: blogPost, category=insight)
│   ├─ ▣ 엔지니어링 위키       /blog/wiki           (Sanity: blogPost, category=wiki)
│   └─ ▣ 팩토릭스 뉴스        /blog/news           (Sanity: blogPost, category=news — 구 언론보도/특허수상 이전)
│
📁 적용사례(제품유형별) (/cases)  ── GNB 비노출, 레거시 유지
│   └─ 📁 제품유형별 (/cases/product)
│       └─ ▣ 액제제조 솔루션  /cases/product/solutions
│
📁 고객지원 (/support)
│   ├─ ▣ 시스템 평가테스트 및 PoC 문의 /support/poc
│   ├─ ▣ 상세 방문미팅 요청           /support/meeting
│   ├─ ▣ 평가테스트 문의               /support/demo-test
│   └─ ▣ Q&A                         /support/qna
│
▣ 자료실             /resources
    (서브네비 탭: 공지사항 | 기술자료실 | 투자정보 — 언론보도/특허수상은 블로그>뉴스로 이전)
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
│  │  ├─ equipment/              # 📁
│  │  │  ├─ mixer/page.tsx (+[slug])
│  │  │  ├─ three-roll-mill/page.tsx (+[slug])
│  │  │  ├─ filling/page.tsx (+[slug])
│  │  │  ├─ dispenser/page.tsx (+[slug])
│  │  │  ├─ robot/page.tsx (+[slug])
│  │  │  ├─ curing/page.tsx (+[slug])
│  │  │  └─ consumables/page.tsx (+[slug])
│  │  └─ automation-system/      # ▣ 허브(제조자동화 시스템) + 산업별 5개 리프
│  │     ├─ page.tsx
│  │     ├─ bio-medical/page.tsx
│  │     ├─ chemicals-materials/page.tsx
│  │     ├─ electronics-battery/page.tsx
│  │     ├─ automotive/page.tsx
│  │     └─ research-academia/page.tsx
│  │
│  ├─ blog/                      # ▣ /blog (전체보기) + 카테고리 3종
│  │  ├─ (list)/                 # 라우트 그룹(URL 미노출) — BlogHero를 layout에 둬 카테고리 전환 시 헤더 고정
│  │  │  ├─ layout.tsx           # BlogHero(카테고리 탭 + 산업/공정 필터) + children
│  │  │  ├─ page.tsx             # 전체보기 (blogPost + caseStudy 통합 피드)
│  │  │  ├─ insight/page.tsx
│  │  │  ├─ wiki/page.tsx
│  │  │  ├─ news/page.tsx
│  │  │  └─ cases/page.tsx        # 산업군·공정 필터는 BlogHero 우측 BlogFilterBar로 이동
│  │  ├─ insight/[slug]/page.tsx
│  │  ├─ wiki/[slug]/page.tsx
│  │  ├─ news/[slug]/page.tsx
│  │  └─ cases/[slug]/page.tsx
│  │
│  ├─ cases/                     # 📁 (레거시, GNB 비노출)
│  │  └─ product/                # 📁
│  │     └─ solutions/page.tsx (+[slug])
│  │
│  ├─ support/                   # 📁
│  │  ├─ poc/page.tsx
│  │  ├─ meeting/page.tsx
│  │  ├─ demo-test/page.tsx
│  │  └─ qna/page.tsx
│  │
│  └─ resources/                 # 📁 — 단일 /resources 페이지 + 카테고리별 [slug] 상세
│     ├─ page.tsx                # ?category= 쿼리로 탭 전환 (공지/기술문서/IR)
│     ├─ notice/[slug]/page.tsx
│     ├─ tech-docs/[slug]/page.tsx
│     └─ ir/[slug]/page.tsx
│
├─ components/
│  ├─ layout/Header.tsx          # GNB 데스크톱(그룹=펼침, leaf=링크). 블로그(GNB 라벨: 기술블로그)도 그룹.
│  ├─ layout/MobileNav.tsx       # GNB 모바일 아코디언
│  ├─ layout/Footer.tsx
│  ├─ blog/BlogHero.tsx          # 카테고리 탭(고정 헤더) — usePathname으로 활성 탭 계산
│  ├─ blog/BlogFilterBar.tsx     # 산업군·공정 필터(select 2개) — BlogHero 우측에 배치, URL 쿼리 갱신
│  ├─ content/                   # ContentCard, ContentCardGrid, ContentDetail, TableOfContents
│  └─ ui/                        # Button, Card 등
│
└─ lib/
   ├─ routes.ts                  # 경로 정본(SSoT) — leaf만
   └─ nav.ts                     # GNB 트리(라벨+경로, 그룹/leaf)
```

### 참고
- 중간 디렉토리엔 `page.tsx`가 없으므로 `/solutions`, `/cases` 등을 직접 입력하면 404다. 정상 동작.
- GNB 최상위 그룹은 기업정보 · 제품(구 "솔루션 > 액상제조 장비", URL은 `/solutions/equipment/*` 그대로) · 공정 솔루션(구 "솔루션", 이제 제조자동화 시스템만 하위로 가짐) · 기술블로그(구 라벨 "블로그", 이제 GNB에서 펼침) · 고객지원 · 자료실이다. 어느 그룹도 URL을 바꾸지 않았고 `nav.ts`의 GNB 라벨/그룹핑만 바뀌었다.
- 산업별 적용사례(구 `/cases/industry/*` 6개)는 `/blog/cases` 하나로 통합되었고, 산업군·공정은 URL이 아니라 Sanity `caseStudy` 문서의 태그(`industries`, `processes`)로 관리된다.
- 자료실의 언론보도·특허수상은 `/blog/news`로 이전되었다(Sanity `blogPost`, category=news).
- AI 자동보정 토출시스템(AFMS)은 판매 솔루션에서 삭제되었다. 이미 노출돼 있던 홈/회사소개 마케팅 콘텐츠는 문구를 유지하되 링크만 `/blog/news/ces-2026`(CES 2026 수상 뉴스)로 연결된다.
