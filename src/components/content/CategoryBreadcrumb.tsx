// 솔루션(제품/공정 솔루션) 하위 페이지들의 카테고리 위치 표시. 중간 단계(그룹헤더)는
// 실제 페이지가 없어 클릭 불가 텍스트로만 표시하고, 마지막 단계(현재 페이지)도
// 위치 표시용이라 링크로 만들지 않는다.
export default function CategoryBreadcrumb({ segments, light = false }: { segments: string[]; light?: boolean }) {
  return (
    <nav
      aria-label="breadcrumb"
      className={`flex flex-wrap items-center gap-1 text-sm mb-2 ${light ? "text-white/70" : "text-gray-400"}`}
    >
      {segments.map((segment, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>›</span>}
          <span className={i === segments.length - 1 ? `font-semibold ${light ? "text-white" : "text-primary-800"}` : ""}>
            {segment}
          </span>
        </span>
      ))}
    </nav>
  )
}
