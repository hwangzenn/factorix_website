// 연관콘텐츠 선정 우선순위: 산업군 일치 > 카테고리/공정 일치 > 최신순.
// 후보 풀은 이미 publishedAt desc로 정렬되어 있다고 가정 — 각 단계 필터도 그 순서를 유지한다.
type Candidate = { _id: string }

export function pickRelatedByPriority<T extends Candidate>(
  pool: T[],
  matchers: ((item: T) => boolean)[],
  limit = 3
): T[] {
  const picked: T[] = []
  const usedIds = new Set<string>()

  const addFrom = (matches: T[]) => {
    for (const item of matches) {
      if (picked.length >= limit) break
      if (usedIds.has(item._id)) continue
      picked.push(item)
      usedIds.add(item._id)
    }
  }

  for (const matches of matchers) {
    if (picked.length >= limit) break
    addFrom(pool.filter(matches))
  }
  if (picked.length < limit) addFrom(pool)

  return picked.slice(0, limit)
}
