# SITEMAP & 파일 구조

> Claude Code가 매 작업마다 따르는 프로젝트 규칙. 중요한 규칙을 위에 둔다.

**구조 원칙: 메인페이지 1개 + 랜딩페이지(leaf)만 실제 page 파일.**
중간 분류(기업정보·솔루션·블로그 카테고리 등)는 **디렉토리일 뿐 page.tsx 가 없다.**
즉 `/solutions`, `/solutions/standalone` 같은 중간 경로는 페이지가 아니며, GNB에서도 링크가 아니라 펼침 그룹이다.
단, **블로그(`/blog`)는 예외**로 GNB에서 하위 카테고리를 펼치지 않고 `/blog` 페이지로 바로 링크된다(카테고리 이동은 `/blog` 페이지 안의 탭 링크로 한다).

경로 정본(canonical)은 `src/lib/routes.ts`. 이 문서는 사람이 읽는 참조본이며, 어긋나면 `routes.ts`가 이긴다.

총 페이지: **메인 1 + 랜딩 23 = 24개** (영문(EN) 버전 2개는 별도).

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
📁 솔루션 (/solutions)
│   ├─ 📁 단독설비 (/solutions/standalone)
│   │   ├─ ▣ 교반/탈포기         /solutions/standalone/mixer   (Sanity category: mixer-defoamer)
│   │   ├─ ▣ 쓰리롤밀            /solutions/standalone/three-roll-mill
│   │   ├─ ▣ 액상충진기           /solutions/standalone/filling
│   │   ├─ ▣ 디스펜서             /solutions/standalone/dispenser
│   │   ├─ ▣ 협동/직교/3축로봇    /solutions/standalone/robot
│   │   ├─ ▣ UV/IR 경화기         /solutions/standalone/curing
│   │   └─ ▣ 소모품               /solutions/standalone/consumables
│   └─ 📁 AI 시스템 (/solutions/ai)  ── GNB 유지, 제품 CMS 카테고리에선 제외(별도 콘텐츠 모델 예정)
│       ├─ ▣ AI 자동보정 토출시스템 /solutions/ai/auto-calibration
│       └─ ▣ 자동화 시스템         /solutions/ai/smart-factory
│
▣ 블로그 (/blog)   ── GNB에서 바로 링크(하위 카테고리 펼침 없음). 페이지 안에서 아래로 이동.
│   ├─ ▣ 적용사례            /blog/cases          (Sanity: caseStudy, 산업군·공정 태그 필터)
│   ├─ ▣ 인사이트            /blog/insight        (Sanity: blogPost, category=insight)
│   ├─ ▣ 액상 공정 엔지니어링 위키 /blog/guide-intro    (Sanity: blogPost, category=guide-intro)
│   └─ ▣ 뉴스                /blog/news           (Sanity: blogPost, category=news — 구 언론보도/특허수상 이전)
│
📁 적용사례(제품유형별) (/cases)  ── GNB 비노출, 레거시 유지
│   └─ 📁 제품유형별 (/cases/product)
│       ├─ ▣ 액제제조 솔루션  /cases/product/solutions
│       └─ ▣ 웨어러블 디바이스 /cases/product/wearable
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
│  │  ├─ standalone/             # 📁
│  │  │  ├─ mixer/page.tsx (+[slug])
│  │  │  ├─ three-roll-mill/page.tsx (+[slug])
│  │  │  ├─ filling/page.tsx (+[slug])
│  │  │  ├─ dispenser/page.tsx (+[slug])
│  │  │  ├─ robot/page.tsx (+[slug])
│  │  │  ├─ curing/page.tsx (+[slug])
│  │  │  └─ consumables/page.tsx (+[slug])
│  │  └─ ai/                     # 📁
│  │     ├─ auto-calibration/page.tsx (+[slug])
│  │     └─ smart-factory/page.tsx (+[slug])
│  │
│  ├─ blog/                      # ▣ /blog (전체보기) + 카테고리 3종
│  │  ├─ (list)/                 # 라우트 그룹(URL 미노출) — BlogHero를 layout에 둬 카테고리 전환 시 헤더 고정
│  │  │  ├─ layout.tsx           # BlogHero(카테고리 탭 + 산업/공정 필터) + children
│  │  │  ├─ page.tsx             # 전체보기 (blogPost + caseStudy 통합 피드)
│  │  │  ├─ insight/page.tsx
│  │  │  ├─ guide-intro/page.tsx
│  │  │  ├─ news/page.tsx
│  │  │  └─ cases/page.tsx        # 산업군·공정 필터는 BlogHero 우측 BlogFilterBar로 이동
│  │  ├─ insight/[slug]/page.tsx
│  │  ├─ guide-intro/[slug]/page.tsx
│  │  ├─ news/[slug]/page.tsx
│  │  └─ cases/[slug]/page.tsx
│  │
│  ├─ cases/                     # 📁 (레거시, GNB 비노출)
│  │  └─ product/                # 📁
│  │     ├─ solutions/page.tsx (+[slug])
│  │     └─ wearable/page.tsx (+[slug])
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
│  ├─ layout/Header.tsx          # GNB 데스크톱(그룹=펼침, leaf=링크). 블로그는 leaf.
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
- 블로그는 다른 그룹과 달리 GNB에서 하위 카테고리를 펼치지 않고 `/blog`로 바로 이동한다. 카테고리(인사이트/액상 공정 엔지니어링 위키/적용사례/뉴스) 이동은 `/blog` 페이지 상단 탭 링크로 한다.
- 산업별 적용사례(구 `/cases/industry/*` 6개)는 `/blog/cases` 하나로 통합되었고, 산업군·공정은 URL이 아니라 Sanity `caseStudy` 문서의 태그(`industries`, `processes`)로 관리된다.
- 자료실의 언론보도·특허수상은 `/blog/news`로 이전되었다(Sanity `blogPost`, category=news).
