# CLAUDE.md

> Claude Code가 매 작업마다 따르는 프로젝트 규칙. 중요한 규칙을 위에 둔다.

## 프로젝트 개요
액제제조 솔루션 · AI 웨어러블 디바이스를 다루는 B2B 기업 웹사이트.
**구조 = 메인페이지 1개 + 랜딩페이지 32개(= 총 33페이지).**
3-depth GNB. 콘텐츠/SEO 중심 마케팅 사이트.

## 기술 스택
- Next.js (App Router) + TypeScript
- Tailwind CSS (별도 CSS 파일 금지, 유틸리티 클래스 사용)
- 경로 정본: `src/lib/routes.ts` · GNB 트리: `src/lib/nav.ts` · 사람용 참조: `SITEMAP.md`

---

## TIER 1 — 절대 규칙 (모든 작업 전 확인)
1. **랜딩페이지(leaf)만 page를 만든다.** 중간 분류(기업정보·적용사례·산업별·단독설비 등)는 **디렉토리일 뿐 `page.tsx`를 만들지 않는다.** 예: `적용사례>산업별>바이오` → `cases/industry/bio/page.tsx` 하나만, `cases`·`cases/industry`엔 page 없음.
2. **내부 링크는 문자열 하드코딩 금지.** 반드시 `ROUTES`(`src/lib/routes.ts`)의 상수만 사용. (`<Link href={ROUTES.cases.industry.bio}>`)
3. **GNB는 `src/lib/nav.ts`의 `GNB`만 보고 렌더링.** `href` 없는 항목은 **그룹 헤더 = 비링크**(클릭해도 이동 X, 하위만 펼침). `href` 있는 항목만 `<Link>`로 만든다.
4. **슬러그(URL)는 `SITEMAP.md`/`routes.ts`와 100% 일치.** 구현을 폴더로 하든 동적 라우트로 하든 경로 문자열은 바꾸지 않는다.
5. 새 페이지 추가 시 `routes.ts` → `nav.ts` → `SITEMAP.md` 순으로 먼저 등록한 뒤 page를 만든다.
6. 모호하거나 멀티파일/구조 변경 작업이면 **먼저 plan mode로 계획을 보여주고** 승인 후 구현한다.

---

## 디자인 보정 규칙 (구조는 잠금, 미관은 위임)
페이지별로 **와이어프레임 캡처 이미지**를 제공한다.
- 캡처의 **요소 배치·순서·위계·그룹핑은 그대로** 따른다. 임의로 옮기거나 빼지 않는다.
- 단, 아래는 캡처를 무시하고 **자동 보정**:
  - 모서리 둥글기 → Tailwind `rounded-*` 중 일관된 값으로 통일
  - 간격/패딩/마진 → Tailwind spacing 스케일(4의 배수)로 정돈
  - 색감 → 아래 팔레트로 통일 (캡처의 임시 색은 참고만)
- 캡처의 삐뚤한 선·손글씨·임시 색은 의도가 아니다. 무시한다.

### 톤 & 팔레트
- 톤: 깔끔하고 여백 넉넉한 모던 B2B/산업 기술 느낌.
- 메인 컬러: `#2B4C7E` 계열(딥 블루). 보조·중립색은 여기에 조화롭게 한 번 정해 전 페이지 통일.
- 정한 spacing/radius/색 토큰은 `tailwind.config`에 박아 전 페이지 재사용.

---

## 인링크 규칙 (유기적 교차 링크)
- 모든 랜딩페이지 하단에 `/support/poc` 또는 `/support/meeting`로 가는 **CTA 1개 이상**.
- 솔루션 상세(`/solutions/...`)는 관련 **적용사례**(`/cases/...`)로, 적용사례는 관련 **솔루션/제품**으로 상호 링크.
- 본문에서 특정 기술·제품 언급 시 그 상세 페이지로 맥락 링크(인라인).
- 교차 링크도 `ROUTES` 상수만 사용. 존재하지 않는 경로로 링크 금지.

---

## 빌드 단계 (한 번에 다 만들지 말 것)
1. **스캐폴드**: `routes.ts`/`nav.ts`/`SITEMAP.md` 확정 → 루트 레이아웃 + Header(GNB) + Footer + **랜딩 32개 page를 플레이스홀더로 전부 생성**(중간 디렉토리엔 page 없음). 이 시점에 모든 링크가 유효해진다.
2. **공통 컴포넌트**: 3-depth GNB(데스크톱 메가메뉴 + 모바일 아코디언, 그룹=펼침/leaf=링크), 반복 섹션(Hero/FeatureGrid/CTA).
3. **페이지 배치 구현**: 와이어프레임 캡처를 카테고리별로 묶어 채운다. 배치마다 위 규칙 적용.

---

## SEO / 품질
- 모든 page에 `metadata`(title, description). title은 "페이지명 | 회사명".
- 시맨틱 HTML, 이미지 `alt`·lazy load, 모바일 우선 반응형.
- `app/sitemap.ts`는 `flattenRoutes()`로 `routes.ts`에서 자동 생성(중간 디렉토리는 제외됨 → 자연스럽게 404 경로가 sitemap에 안 들어감).

## 검증
- 작업 후 **모든 `<Link>` 경로가 `flattenRoutes(ROUTES)`에 존재하는지** 검사하는 스크립트로 깨진 링크 0건 확인.
- 큰 변경 후 `/code-review`로 diff 점검.

---

## 첫 지시 예시 (Claude Code 입력용)
> "CLAUDE.md, SITEMAP.md, src/lib/routes.ts, src/lib/nav.ts를 읽어줘. 먼저 plan mode로 (1) 폴더 스캐폴드 계획(중간 분류는 디렉토리만, leaf만 page)과 (2) 3-depth GNB 컴포넌트 설계(그룹=펼침/leaf=링크)를 보여줘. 승인하면 1단계 스캐폴드부터 진행하자. 본문은 이후 와이어프레임 캡처를 배치로 줄게."
