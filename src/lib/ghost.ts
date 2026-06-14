// Ghost CMS integration
// Content API: .env.local에 GHOST_URL, GHOST_CONTENT_API_KEY 설정
// Admin API:   .env.local에 GHOST_ADMIN_API_KEY 설정 (서버 전용)
// 미설정 시 모든 함수는 빈 배열/null 반환 → 플레이스홀더 UI 동작

// ─────────────────────────────────────────
// Types
// ─────────────────────────────────────────

export type GhostTag = {
  id: string;
  name: string;
  slug: string;
};

export type GhostPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  html: string | null;
  published_at: string | null;
  updated_at: string | null;
  feature_image: string | null;
  feature_image_alt: string | null;
  tags: GhostTag[];
  primary_tag: GhostTag | null;
  custom_excerpt: string | null;
  // Ghost custom_template & metadata fields
  meta_title: string | null;
  meta_description: string | null;
  og_image: string | null;
  url: string;
  reading_time: number | null;
};

export type GhostPage = Omit<GhostPost, "tags" | "primary_tag"> & {
  tags: GhostTag[];
};

export type PaginationMeta = {
  total: number;
  limit: number;
  page: number;
  pages: number;
};

export type PaginatedResult<T> = {
  items: T[];
  meta: PaginationMeta;
};

export type PostsQuery = {
  tag?: string;           // Ghost 태그 slug
  tags?: string[];        // 다중 태그 OR 필터
  limit?: number;
  page?: number;
  order?: string;         // e.g. "published_at desc"
  fields?: string;        // comma-separated field names
  withHtml?: boolean;     // html 본문 포함 여부
};

// ─────────────────────────────────────────
// Ghost 태그 슬러그 상수
// 섹션별 태그를 여기서 중앙 관리 → 변경 시 한 곳만 수정
// ─────────────────────────────────────────

export const GHOST_TAGS = {
  // 자료실
  resources: {
    press:    "press",
    patents:  "patents",
    ir:       "ir",
    notice:   "notice",
    techDocs: "tech-docs",
  },
  // 적용사례 — 제품별
  cases: {
    product: {
      solutions: "case-solutions",
      wearable:  "case-wearable",
    },
    // 적용사례 — 산업별
    industry: {
      bio:         "case-bio",
      cosmetics:   "case-cosmetics",
      chemical:    "case-chemical",
      display:     "case-display",
      electronics: "case-electronics",
      automotive:  "case-automotive",
      battery:     "case-battery",
      research:    "case-research",
    },
  },
  // 솔루션 제품 (CMS로 제품 정보 관리)
  solutions: {
    ai: {
      autoCalibration: "solution-afms-x1",
      smartFactory:    "solution-smart-factory",
    },
    standalone: {
      dispenser: "solution-dispenser",
      filling:   "solution-filling",
      mixer:     "solution-mixer",
      curing:    "solution-curing",
      robot:     "solution-robot",
    },
  },
} as const;

// ─────────────────────────────────────────
// Content API — 내부 fetch
// ─────────────────────────────────────────

const GHOST_URL  = process.env.GHOST_URL;
const GHOST_KEY  = process.env.GHOST_CONTENT_API_KEY;

const BASE_FIELDS =
  "id,title,slug,excerpt,custom_excerpt,published_at,updated_at,feature_image,feature_image_alt,primary_tag,meta_title,meta_description,url,reading_time";
const FULL_FIELDS = `${BASE_FIELDS},html,og_image`;

async function ghostFetch<T>(
  resource: string,
  params: Record<string, string> = {}
): Promise<{ items: T[]; meta: PaginationMeta }> {
  const empty: PaginationMeta = { total: 0, limit: 20, page: 1, pages: 0 };
  if (!GHOST_URL || !GHOST_KEY) return { items: [], meta: empty };

  const url = new URL(`${GHOST_URL}/ghost/api/content/${resource}/`);
  url.searchParams.set("key", GHOST_KEY);
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);

  try {
    const res = await fetch(url.toString(), { next: { revalidate: 60 } });
    if (!res.ok) return { items: [], meta: empty };
    const data = (await res.json()) as Record<string, unknown>;
    const meta = (data.meta as { pagination: PaginationMeta })?.pagination ?? empty;
    return { items: (data[resource] ?? []) as T[], meta };
  } catch {
    return { items: [], meta: empty };
  }
}

function buildFilter(query: PostsQuery): string {
  const parts: string[] = [];
  if (query.tag)  parts.push(`tag:${query.tag}`);
  if (query.tags?.length) parts.push(`tag:[${query.tags.join(",")}]`);
  return parts.join("+");
}

// ─────────────────────────────────────────
// Content API — 공개 함수
// ─────────────────────────────────────────

/** 조건 기반 포스트 목록 (페이지네이션 포함) */
export async function getPosts(
  query: PostsQuery = {}
): Promise<PaginatedResult<GhostPost>> {
  const { limit = 20, page = 1, order = "published_at desc", withHtml = false } = query;
  const filter = buildFilter(query);
  const { items, meta } = await ghostFetch<GhostPost>("posts", {
    ...(filter && { filter }),
    limit: String(limit),
    page:  String(page),
    order,
    include: "tags",
    fields:  withHtml ? FULL_FIELDS : BASE_FIELDS,
  });
  return { items, meta };
}

/** 단일 포스트 (slug) */
export async function getPostBySlug(slug: string): Promise<GhostPost | null> {
  const { items } = await ghostFetch<GhostPost>("posts", {
    filter:  `slug:${slug}`,
    include: "tags",
    fields:  FULL_FIELDS,
  });
  return items[0] ?? null;
}

/** 태그별 포스트 목록 (하위 호환 유지) */
export async function getPostsByTag(
  tag: string,
  limit = 20,
  page = 1
): Promise<GhostPost[]> {
  const { items } = await getPosts({ tag, limit, page });
  return items;
}

// ─────────────────────────────────────────
// 섹션별 헬퍼
// ─────────────────────────────────────────

/** 뉴스룸 (언론보도) */
export const getNewsPosts = (limit = 3, page = 1) =>
  getPosts({ tag: GHOST_TAGS.resources.press, limit, page });

/** 특허·수상 */
export const getPatentPosts = (limit = 10, page = 1) =>
  getPosts({ tag: GHOST_TAGS.resources.patents, limit, page });

/** IR 자료 */
export const getIrPosts = (limit = 10, page = 1) =>
  getPosts({ tag: GHOST_TAGS.resources.ir, limit, page });

/** 공지사항 */
export const getNoticePosts = (limit = 10, page = 1) =>
  getPosts({ tag: GHOST_TAGS.resources.notice, limit, page });

/** 기술문서 */
export const getTechDocPosts = (limit = 10, page = 1) =>
  getPosts({ tag: GHOST_TAGS.resources.techDocs, limit, page });

/** 적용사례 — 제품별 */
export const getCasesByProduct = (
  product: keyof typeof GHOST_TAGS.cases.product,
  limit = 12,
  page = 1
) => getPosts({ tag: GHOST_TAGS.cases.product[product], limit, page });

/** 적용사례 — 산업별 */
export const getCasesByIndustry = (
  industry: keyof typeof GHOST_TAGS.cases.industry,
  limit = 12,
  page = 1
) => getPosts({ tag: GHOST_TAGS.cases.industry[industry], limit, page });

/** 솔루션 제품 상세 */
export const getSolutionPost = (
  category: keyof typeof GHOST_TAGS.solutions,
  product: string
) => {
  const tagMap = GHOST_TAGS.solutions[category] as Record<string, string>;
  const tag = tagMap[product];
  if (!tag) return Promise.resolve(null);
  return getPostBySlug(tag);
};
