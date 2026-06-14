"use client";
import Link from "next/link";
import { useState } from "react";
import { GNB, NavItem, isGroup } from "@/lib/nav";
import { ROUTES } from "@/lib/routes";

export default function MobileNav({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto lg:hidden">
      <div className="flex items-center justify-between px-6 h-16 border-b border-gray-100">
        <span className="font-bold text-xl text-primary-700">Factorix</span>
        <button onClick={onClose} className="p-2 text-gray-600 text-xl" aria-label="메뉴 닫기">
          ✕
        </button>
      </div>
      <nav className="px-4 py-2">
        {GNB.map((item) => (
          <AccordionItem key={item.label} item={item} depth={0} onClose={onClose} />
        ))}
      </nav>
      <div className="px-6 pb-10 pt-4 border-t border-gray-100">
        <Link
          href={ROUTES.support.poc}
          onClick={onClose}
          className="block w-full text-center py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors"
        >
          도입 문의
        </Link>
      </div>
    </div>
  );
}

function AccordionItem({
  item,
  depth,
  onClose,
}: {
  item: NavItem;
  depth: number;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isLeaf = !!item.href;

  if (isLeaf) {
    return (
      <Link
        href={item.href!}
        onClick={onClose}
        className={`flex items-center py-3 border-b border-gray-50 hover:text-primary-700 transition-colors ${
          depth === 0 ? "font-medium text-gray-800" : depth === 1 ? "pl-4 text-sm text-gray-700" : "pl-8 text-sm text-gray-600"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((p) => !p)}
        className={`flex w-full items-center justify-between py-3 border-b border-gray-50 transition-colors hover:text-primary-700 ${
          depth === 0 ? "font-medium text-gray-800" : depth === 1 ? "pl-4 text-sm text-gray-700" : "pl-8 text-sm text-gray-600"
        }`}
      >
        <span>{item.label}</span>
        <span
          className={`text-xs transition-transform duration-200 mr-1 ${open ? "rotate-180" : ""}`}
        >
          ▾
        </span>
      </button>
      {open && item.children && (
        <div className={depth === 0 ? "bg-gray-50" : "bg-gray-100"}>
          {item.children.map((child) => (
            <AccordionItem key={child.label} item={child} depth={depth + 1} onClose={onClose} />
          ))}
        </div>
      )}
    </div>
  );
}
