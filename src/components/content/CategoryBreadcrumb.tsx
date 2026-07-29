// 모바일 전용 브레드크럼. 중간 단계(그룹헤더)는 실제 페이지가 없어 클릭 불가 텍스트로만 표시하고,
// 마지막 단계(현재 페이지)도 위치 표시용이라 링크로 만들지 않는다.
export default function CategoryBreadcrumb({ segments }: { segments: string[] }) {
  return (
    <nav aria-label="breadcrumb" className="sm:hidden flex flex-wrap items-center gap-1 text-sm text-gray-400 mb-2">
      {segments.map((segment, i) => (
        <span key={i} className="flex items-center gap-1">
          {i > 0 && <span aria-hidden>›</span>}
          <span className={i === segments.length - 1 ? "text-primary-800 font-semibold" : ""}>{segment}</span>
        </span>
      ))}
    </nav>
  )
}
