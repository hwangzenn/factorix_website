"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const SLIDES = [
  {
    eyebrow: "AI 디스펜싱 솔루션",
    heading: "AI-Powered Dispensing\nIntelligence",
    sub: "AI가 유체 변화를 실시간 학습·보정하는\n초정밀 디스펜싱 자동화 플랫폼",
    ctas: [
      { label: "도입 문의하기", href: ROUTES.support.meeting },
      { label: "솔루션 보기", href: ROUTES.solutions.ai.autoCalibration },
    ],
    video: "https://r2.factorix.co.kr/디스펜싱.mov",
  },
  {
    eyebrow: "AI 웨어러블 디바이스",
    heading: "현장 전문가의 눈,\nAI 스마트 글라스",
    sub: "산업 현장의 작업자를 위한 AI 기반\n웨어러블 스마트 글라스 솔루션",
    ctas: [
      { label: "자세히 알아보기", href: ROUTES.wearable.intro },
      { label: "도입 문의하기", href: ROUTES.support.poc },
    ],
    video: "https://r2.factorix.co.kr/웨어러블.mov",
  },
  {
    eyebrow: "스마트팩토리",
    heading: "액제공정 토탈 솔루션,\n스마트팩토리 구축",
    sub: "교반·충진·디스펜싱·경화까지\n액제공정 전 공정을 하나로 연결합니다",
    ctas: [
      { label: "토탈 솔루션 보기", href: ROUTES.solutions.ai.smartFactory },
      { label: "도입 사례 보기", href: ROUTES.cases.product.solutions },
    ],
    video: "https://r2.factorix.co.kr/스마트팩토리.mov",
  },
] as const;

const INTERVAL = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const resetTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
  };

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return;
      if (i === current) {
        v.currentTime = 0;
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
  }, [current]);

  const handleNav = (delta: number) => {
    setCurrent((prev) => (prev + delta + SLIDES.length) % SLIDES.length);
    resetTimer();
  };

  const handleDot = (idx: number) => {
    setCurrent(idx);
    resetTimer();
  };

  return (
    <section className="relative min-h-[600px] flex items-center overflow-hidden select-none">
      {/* 배경 영상 — 슬라이드별 opacity 전환 */}
      {SLIDES.map((s, i) => (
        <video
          key={i}
          ref={(el) => { videoRefs.current[i] = el; }}
          src={s.video}
          autoPlay={i === 0}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}

      {/* 어두운 오버레이 */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 텍스트 콘텐츠 — reflow 방지용 고정 높이 */}
      <div className="relative max-w-[1440px] mx-auto px-8 w-full" style={{ height: 420 }}>
        {SLIDES.map((s, i) => (
          <div
            key={i}
            className="absolute inset-0 flex flex-col justify-center py-20 transition-opacity duration-700"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <p className="text-sm text-blue-300 mb-3 tracking-widest uppercase">{s.eyebrow}</p>
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4 whitespace-pre-line">
              {s.heading}
            </h1>
            <p className="text-lg text-gray-300 mb-10 whitespace-pre-line">{s.sub}</p>
            <div className="flex flex-wrap gap-3">
              {s.ctas.map((cta) => (
                <Link
                  key={cta.href}
                  href={cta.href}
                  className="inline-flex items-center px-6 py-2.5 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Left arrow */}
      <button
        onClick={() => handleNav(-1)}
        aria-label="이전 슬라이드"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => handleNav(1)}
        aria-label="다음 슬라이드"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M8 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDot(i)}
            aria-label={`${i + 1}번 슬라이드`}
            className={[
              "rounded-full transition-all duration-300",
              i === current
                ? "w-6 h-2.5 bg-white"
                : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
