"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { GNB, NavItem, isGroup } from "@/lib/nav";
import MobileNav from "./MobileNav";
import { ROUTES } from "@/lib/routes";
import { getAlternatePath, type Locale } from "@/lib/i18n";

// 페이지 최상단에 어두운 히어로 이미지/배경이 있어 헤더를 투명하게 얹을 수 있는 경로.
// 그 외 페이지는 최상단부터 흰 배경이라 투명 헤더의 흰 글자가 보이지 않으므로 항상 스크롤된 스타일을 쓴다.
const DARK_HERO_PATHS: string[] = [ROUTES.home, ROUTES.company.about, ROUTES.en.home];

const label = (item: NavItem, locale: Locale) => (locale === "en" ? item.labelEn ?? item.label : item.label);

export default function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_PATHS.includes(pathname);

  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const scrolled = hasDarkHero ? isScrolled : true;
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const langMenuRef = useRef<HTMLDivElement | null>(null);

  const open = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const close = () => {
    closeTimer.current = setTimeout(() => setMenuOpen(false), 150);
  };

  useEffect(() => {
    if (!hasDarkHero) return;
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasDarkHero]);

  useEffect(() => {
    if (!langMenuOpen) return;
    const onClickOutside = (e: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(e.target as Node)) {
        setLangMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [langMenuOpen]);

  const koPath = getAlternatePath(pathname, "ko");
  const enPath = getAlternatePath(pathname, "en");

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-colors duration-300",
        scrolled ? "bg-white" : "bg-transparent",
      ].join(" ")}
      onMouseLeave={close}
    >
      {/* ── Top bar ── */}
      <div className={["border-b transition-colors duration-300", scrolled ? "border-gray-100" : "border-transparent"].join(" ")}>
        <div className="max-w-[1440px] mx-auto px-8 h-20 flex items-center flex-nowrap">
          {/* Logo */}
          <Link href={locale === "en" ? ROUTES.en.home : ROUTES.home} onClick={() => setMenuOpen(false)} className="shrink-0 mr-10">
            <Image
              src={scrolled ? "/로고_블루블랙@4x.png" : "/로고_화이트@4x.png"}
              alt="Factorix"
              width={180}
              height={50}
              priority
              className="h-11 w-auto object-contain"
            />
          </Link>

          {/* Desktop nav — flex-nowrap 보장, 항목 수에 맞게 px 최소화 */}
          <nav className="hidden lg:flex items-center flex-nowrap flex-1">
            {GNB.map((item) => (
              <button
                key={item.label}
                onMouseEnter={open}
                className={[
                  "px-4 h-20 text-[15.4px] font-medium transition-colors whitespace-nowrap",
                  scrolled ? "text-gray-700 hover:text-primary-700" : "text-white hover:text-white/70",
                ].join(" ")}
              >
                {label(item, locale)}
              </button>
            ))}
          </nav>

          {/* Right actions */}
          <div className="hidden lg:flex items-center gap-3 shrink-0 ml-auto">
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen((p) => !p)}
                className={[
                  "flex items-center gap-1 text-sm border rounded px-3 py-1.5 transition-colors",
                  scrolled ? "text-gray-500 border-gray-200 hover:border-gray-400" : "text-white border-white/40 hover:border-white/70",
                ].join(" ")}
              >
                {locale === "en" ? "EN" : "KR"} <span className="text-[10px] leading-none">▾</span>
              </button>
              {langMenuOpen && (
                <div className="absolute right-0 top-full pt-1 z-50 min-w-[120px]">
                  <div className="bg-white shadow-lg border border-gray-200 rounded-md overflow-hidden">
                    <Link
                      href={koPath}
                      onClick={() => setLangMenuOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${locale === "ko" ? "text-primary-700 font-semibold" : "text-gray-700"}`}
                    >
                      한국어
                    </Link>
                    <Link
                      href={enPath}
                      onClick={() => setLangMenuOpen(false)}
                      className={`block px-4 py-2 text-sm hover:bg-gray-50 ${locale === "en" ? "text-primary-700 font-semibold" : "text-gray-700"}`}
                    >
                      English
                    </Link>
                  </div>
                </div>
              )}
            </div>
            <Link
              href={ROUTES.support.meeting}
              onClick={() => setMenuOpen(false)}
              className="inline-flex items-center px-5 py-2 bg-primary-700 text-white text-sm font-semibold rounded hover:bg-primary-800 transition-colors"
            >
              {locale === "en" ? "Contact Us" : "도입 문의"}
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className={["lg:hidden p-2 ml-auto transition-colors", scrolled ? "text-gray-600" : "text-white"].join(" ")}
            aria-label={locale === "en" ? "Open menu" : "메뉴 열기"}
          >
            <span className="block w-5 h-0.5 bg-current mb-1.5" />
            <span className="block w-5 h-0.5 bg-current mb-1.5" />
            <span className="block w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* ── Full-width mega menu ── */}
      {menuOpen && (
        <div
          className="absolute inset-x-0 top-full bg-white shadow-lg border-t border-gray-200 z-40"
          onMouseEnter={open}
        >
          <div className="max-w-[1440px] mx-auto px-10 py-10">
            {/* 6-column flex layout — 적용사례 gets 2× width */}
            <div className="flex">
              {GNB.map((col, ci) => {
                const isCases = col.label === "적용사례";
                const isLast = ci === GNB.length - 1;
                return (
                  <div
                    key={col.label}
                    className={[
                      isCases ? "flex-[2]" : "flex-1",
                      !isLast ? "border-r border-gray-200 mr-8 pr-8" : "",
                    ].join(" ")}
                  >
                    {/* Column header */}
                    <p className="text-base font-bold text-gray-800 mb-5">{label(col, locale)}</p>

                    {/* Column contents */}
                    {isCases ? (
                      <CasesColumn items={col.children ?? []} onClose={() => setMenuOpen(false)} locale={locale} />
                    ) : (
                      <ColItems items={col.children ?? []} onClose={() => setMenuOpen(false)} locale={locale} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {mobileOpen && (
        <MobileNav onClose={() => setMobileOpen(false)} locale={locale} koPath={koPath} enPath={enPath} />
      )}
    </header>
  );
}

/* ── 일반 컬럼: leaf list + sub-group ── */
function ColItems({ items, onClose, locale }: { items: NavItem[]; onClose: () => void; locale: Locale }) {
  return (
    <div className="space-y-1">
      {items.map((item) => {
        if (isGroup(item)) {
          return (
            <div key={item.label} className="pt-2 first:pt-0">
              {/* sub-group label */}
              <p className="text-xs text-gray-400 font-medium mb-2">
                {label(item, locale)} <span className="text-[11px]">›</span>
              </p>
              <div className="space-y-1.5 mb-3">
                {item.children?.map((child) =>
                  child.href ? (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="block text-[14px] text-primary-700 hover:text-primary-900 hover:underline leading-snug"
                    >
                      {label(child, locale)}
                    </Link>
                  ) : null
                )}
              </div>
            </div>
          );
        }
        return item.href ? (
          <Link
            key={item.label}
            href={item.href}
            onClick={onClose}
            className="block text-[14px] text-primary-700 hover:text-primary-900 hover:underline py-0.5"
          >
            {label(item, locale)}
          </Link>
        ) : null;
      })}
    </div>
  );
}

/* ── 적용사례 컬럼: 산업별 2열 그리드 ── */
function CasesColumn({ items, onClose, locale }: { items: NavItem[]; onClose: () => void; locale: Locale }) {
  return (
    <div className="space-y-4">
      {items.map((group) => {
        if (!isGroup(group)) return null;
        const isIndustry = group.label === "산업별";
        return (
          <div key={group.label}>
            <p className="text-xs text-gray-400 font-medium mb-2">
              {label(group, locale)} <span className="text-[11px]">›</span>
            </p>
            {isIndustry ? (
              /* 산업별: 2-column grid */
              <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
                {group.children?.map((child) =>
                  child.href ? (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="text-[14px] text-primary-700 hover:text-primary-900 hover:underline leading-snug"
                    >
                      {label(child, locale)}
                    </Link>
                  ) : null
                )}
              </div>
            ) : (
              /* 제품유형별: single column */
              <div className="space-y-1.5">
                {group.children?.map((child) =>
                  child.href ? (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={onClose}
                      className="block text-[14px] text-primary-700 hover:text-primary-900 hover:underline leading-snug"
                    >
                      {label(child, locale)}
                    </Link>
                  ) : null
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
