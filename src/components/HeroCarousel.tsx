"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";

const SLIDES = [
  {
    image: "/hero-bg-2.jpg",
    heading: "Connect Innovation For Your Factory",
    sub: "액상제조 전문 맞춤형 스마트팩토리 솔루션",
    ctas: [
      { label: "장비 및 시스템 보기", href: `${ROUTES.home}#equipment` },
      { label: "고객 적용사례 보기", href: `${ROUTES.home}#cases` },
    ],
  },
  {
    image: "/hero-bg.jpg",
    heading: "Hyper-Precision & Zero-Defection",
    sub: "AI융합 차세대 디스펜싱 솔루션",
    ctas: [
      { label: "관련 제품 보기", href: ROUTES.solutions.ai.autoCalibration },
    ],
  },
] as const;

const INTERVAL = 5000;

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <section className="relative -mt-20 aspect-[1920/972] flex items-center overflow-hidden">
      {/* 배경 이미지 — 슬라이드별 opacity 전환 */}
      {SLIDES.map((s, i) => (
        <img
          key={s.image}
          src={s.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-[1440px] mx-auto px-8 w-full py-20" style={{ height: 260 }}>
        <h1 className="sr-only">액상제조 공정 자동화, 팩토릭스(FactoriX) 스마트 솔루션</h1>
        {SLIDES.map((s, i) => (
          <div
            key={s.image}
            className="absolute inset-x-8 flex flex-col items-center justify-center text-center transition-opacity duration-1000"
            style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
          >
            <p className="text-5xl md:text-6xl font-bold text-white leading-tight mb-4">
              {s.heading}
            </p>
            {s.sub && <p className="text-[21.6px] text-gray-300 mb-10">{s.sub}</p>}
            <div className="flex flex-wrap justify-center gap-3">
              {s.ctas.map((cta) => (
                <Link
                  key={cta.label}
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

      {/* Dot indicators */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`${i + 1}번 슬라이드`}
            className={[
              "rounded-full transition-all duration-300",
              i === current ? "w-6 h-2.5 bg-white" : "w-2.5 h-2.5 bg-white/40 hover:bg-white/70",
            ].join(" ")}
          />
        ))}
      </div>
    </section>
  );
}
