"use client"

import { useState } from "react"

export default function ShareButton() {
  const [copied, setCopied] = useState(false)

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="relative inline-block">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-1.5 text-sm text-gray-400 hover:text-primary-600 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="18" cy="5" r="3" />
          <circle cx="6" cy="12" r="3" />
          <circle cx="18" cy="19" r="3" />
          <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4" />
        </svg>
        공유하기
      </button>

      {copied && (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 whitespace-nowrap rounded-md bg-gray-900 text-white text-xs px-3 py-1.5 shadow-lg">
          링크가 복사되었습니다
          <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  )
}
