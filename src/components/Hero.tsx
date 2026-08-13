"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

const SLIDE_1_IMAGE = "/hero-slide-1.png"; // 정밀 토출 노즐 클로즈업
const SLIDE_2_IMAGE = "/hero-slide-2.png"; // 액상 공정의 다양한 형태(교반/충진/도출 등) 추상 이미지
const SLIDE_3_IMAGE = "/hero-slide-3.png"; // 엔지니어 그룹의 현장 협업 장면

const SLIDES_KO = [
  {
    image: SLIDE_1_IMAGE,
    heading: "초정밀 수율 극대화\n산업용 디스펜싱 솔루션 기업",
    sub: "정량 토출부터 혼합·탈포·도포·경화, 커스텀 자동화 설비까지\n제조 공정에 맞는 액상 제어 솔루션을 설계합니다.",
    ctas: [
      { label: "온라인 문의", href: ROUTES.support.meeting },
      { label: "담당자 전화 문의", href: "tel:070-8672-0192" },
    ],
  },
  {
    image: SLIDE_2_IMAGE,
    heading: "산업별 맞춤형 솔루션\n성공노하우 1000건+",
    sub: "바이오·화학·전자·자동차·연구기관까지,\n산업에 맞춘 장비와 커스텀 자동화 시스템을 설계합니다.",
    ctas: [
      { label: "산업별 팩토릭스 솔루션 알아보기", href: ROUTES.solutions.automationSystemIndustries.bioMedical },
    ],
  },
  {
    image: SLIDE_3_IMAGE,
    heading: "액상공정 전문\n20년+ 엔지니어 그룹",
    sub: "전문성과 현장경험을 갖춘 엔지니어 그룹이\n평가테스트부터 최종납품까지 책임집니다.",
    ctas: [
      { label: "엔지니어 기술블로그 보기", href: ROUTES.blog.guideIntro },
    ],
  },
] as const;

const SLIDES_EN = [
  {
    image: SLIDE_1_IMAGE,
    heading: "Making Liquid Processes More Precise and Reliable\nIndustrial Dispensing & Automation Solutions",
    sub: "From precision dispensing to mixing, defoaming, coating, and curing — even custom automation systems —\nwe design liquid control solutions built for your manufacturing process.",
    ctas: [
      { label: "Online Inquiry", href: ROUTES.support.meeting },
      { label: "Call Us", href: "tel:070-8672-0192" },
    ],
  },
  {
    image: SLIDE_2_IMAGE,
    heading: "Different Processes Need Different Liquid Control.",
    sub: "From dispensing, mixing, and defoaming to coating and curing,\nwe design equipment and custom automation systems tailored to your process and liquid properties.",
    ctas: [
      { label: "Explore FactoriX Solutions by Process", href: ROUTES.solutions.automationSystemIndustries.bioMedical },
    ],
  },
  {
    image: SLIDE_3_IMAGE,
    heading: "We Design the Process, Not Just the Equipment.",
    sub: "An engineering team with over 20 years of field experience\nworks with you from liquid testing to equipment selection, custom systems, and automation.",
    ctas: [
      { label: "Read Our Engineering Blog", href: ROUTES.blog.guideIntro },
    ],
  },
] as const;

const INTERVAL = 6000;

export default function Hero({ locale = "ko" }: { locale?: Locale }) {
  const en = locale === "en";
  const SLIDES = en ? SLIDES_EN : SLIDES_KO;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [SLIDES.length]);

  return (
    <section className="relative -mt-20 min-h-[480px] md:h-[calc(100vh-9rem)] md:min-h-[480px] flex items-center overflow-hidden">
      {SLIDES.map((s, i) => (
        <img
          key={i}
          src={s.image}
          alt=""
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ opacity: i === current ? 1 : 0 }}
        />
      ))}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-[1440px] mx-auto px-8 w-full h-[460px] sm:h-[340px] md:h-[300px]">
        {SLIDES.map((s, i) => {
          const Heading = i === 0 ? "h1" : "h2";
          return (
            <div
              key={i}
              className="absolute inset-x-8 top-0 bottom-0 flex flex-col items-start justify-center pt-8 sm:justify-start sm:pt-2 text-left transition-opacity duration-1000"
              style={{ opacity: i === current ? 1 : 0, pointerEvents: i === current ? "auto" : "none" }}
            >
              <Heading className="text-[clamp(1.5rem,1.15rem+2vw,3rem)] font-bold text-white leading-tight mb-3 sm:mb-4 whitespace-pre-line break-keep">
                {s.heading}
              </Heading>
              <p className="text-[clamp(1rem,0.9rem+0.5vw,1.25rem)] text-gray-300 mb-6 sm:mb-10 md:mb-12 max-w-2xl whitespace-pre-line break-keep">
                {s.sub}
              </p>
              <div className="flex flex-wrap justify-start gap-2 sm:gap-3">
                {s.ctas.map((cta) => (
                  <Link
                    key={cta.label}
                    href={cta.href}
                    className="inline-flex items-center px-5 sm:px-8 py-2.5 sm:py-3.5 border border-white/60 text-white text-sm sm:text-lg md:text-xl font-medium rounded hover:bg-white hover:text-black hover:border-white transition-colors"
                  >
                    {cta.label}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={en ? `Slide ${i + 1}` : `${i + 1}번 슬라이드`}
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
