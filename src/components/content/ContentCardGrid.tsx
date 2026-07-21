import type { ReactNode } from "react"

type Props = {
  children: ReactNode
  emptyMessage?: string
  isEmpty?: boolean
}

export default function ContentCardGrid({ children, emptyMessage = "등록된 콘텐츠가 없습니다.", isEmpty }: Props) {
  if (isEmpty) {
    return <p className="text-gray-500 py-12">{emptyMessage}</p>
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {children}
    </div>
  )
}
