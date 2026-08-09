import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

const CONTENT_KO = {
  image: "/hero-bg-2.jpg",
  heading: "액상 정밀 토출, 불량률부터 줄입니다",
  sub: "액상 디스펜싱·충진·경화 자동화 설비를 찾고 계신가요? 30년 엔지니어링 경험의 팩토릭스가 설계부터 양산까지 함께합니다.",
  cta: { label: "온라인 상담 신청", href: ROUTES.support.meeting },
} as const;

const CONTENT_EN = {
  image: "/hero-bg-2.jpg",
  heading: "Precision Liquid Dispensing That Cuts Defect Rates",
  sub: "Looking for liquid dispensing, filling, or curing automation? Factorix partners with you from design through mass production, backed by 30 years of engineering experience.",
  cta: { label: "Request Consultation", href: ROUTES.support.meeting },
} as const;

export default function Hero({ locale = "ko" }: { locale?: Locale }) {
  const content = locale === "en" ? CONTENT_EN : CONTENT_KO;

  return (
    <section className="relative -mt-20 min-h-[560px] md:min-h-0 md:aspect-[1920/972] flex items-center overflow-hidden">
      <img
        src={content.image}
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative max-w-[1440px] mx-auto px-8 w-full py-20 flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl sm:text-3xl md:text-6xl font-bold text-white leading-tight mb-4">
          {content.heading}
        </h1>
        <p className="text-sm sm:text-base md:text-[21.6px] text-gray-300 mb-10 max-w-2xl">
          {content.sub}
        </p>
        <Link
          href={content.cta.href}
          className="inline-flex items-center px-6 py-2.5 border border-white/60 text-white text-sm font-medium rounded hover:bg-white/10 transition-colors"
        >
          {content.cta.label}
        </Link>
      </div>
    </section>
  );
}
