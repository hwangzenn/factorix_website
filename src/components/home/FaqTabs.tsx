"use client";

import { useState } from "react";

type FaqCategory = {
  key: string;
  label: string;
  items: { question: string }[];
};

export default function FaqTabs({ categories }: { categories: FaqCategory[] }) {
  const [active, setActive] = useState(categories[0].key);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const activeCategory = categories.find((c) => c.key === active)!;

  return (
    <div>
      {/* 카테고리 탭 */}
      <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
        {categories.map((cat) => {
          const isActive = cat.key === active;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => {
                setActive(cat.key);
                setOpenIndex(null);
              }}
              className={`relative flex items-center gap-2 pb-4 text-base font-semibold transition-colors ${
                isActive ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              {cat.label}
              <span
                className={`inline-flex items-center justify-center min-w-6 h-6 px-1.5 rounded-full text-xs font-bold ${
                  isActive ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-400"
                }`}
              >
                {cat.items.length}
              </span>
              {isActive && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-primary-700" />}
            </button>
          );
        })}
      </div>

      {/* 질문 목록 */}
      <div className="flex flex-col gap-3">
        {activeCategory.items.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div key={item.question} className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-sm md:text-base font-semibold text-gray-900">{item.question}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={`shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
                >
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {isOpen && (
                <p className="px-6 pb-5 text-sm text-gray-400 italic">답변 준비 중입니다.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
