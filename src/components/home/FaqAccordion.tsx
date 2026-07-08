"use client";

import { useState } from "react";

type FaqItem = { question: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-gray-200 border-t border-gray-200">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 py-4 text-left"
            >
              <span className="text-sm md:text-base font-semibold text-gray-900">
                <span className="text-primary-700 mr-2">Q.</span>
                {item.question}
              </span>
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
              <p className="pb-4 text-sm text-gray-400 italic leading-relaxed">
                <span className="text-gray-300 mr-2 not-italic font-semibold">A.</span>
                답변 준비 중입니다.
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
