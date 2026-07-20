import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import HeroCarousel from "@/components/HeroCarousel";
import IndustryCaseShowcase from "@/components/home/IndustryCaseShowcase";
import FaqTabs from "@/components/home/FaqTabs";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allCaseStudiesQuery,
  industryLogosQuery,
  type CaseStudyWithTags,
  type IndustryLogo,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "Factorix | AI Liquid Manufacturing & Dispensing Solutions",
  description: "Factorix is a B2B specialist supplying AI-powered ultra-precision dispensing automation systems and AI wearable devices.",
  keywords: [
    "Factorix", "liquid manufacturing", "dispensing automation", "AI smart factory",
    "dispenser", "filling machine", "AI wearable",
  ],
  alternates: {
    canonical: ROUTES.en.home,
    languages: { ko: ROUTES.home, en: ROUTES.en.home },
  },
  openGraph: { locale: "en_US" },
};

const PROBLEMS: { num: string; title: string; desc: string; icon: React.ReactNode }[] = [
  {
    num: "01",
    title: "Constantly Changing Variables",
    desc: "Liquid materials constantly change their physical and chemical properties in real time due to temperature, humidity, pressure, and other internal and external conditions — making it difficult to guarantee consistent quality even with identical settings.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M3 13c2-7 4-7 6 0s4 7 6 0 4-7 6 0" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "High Defect Rates",
    desc: "Manual operator error combined with unstable dispensing volume easily leads to defects such as over/under-application and misalignment from the designed position.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M12 3l9 16H3L12 3z" />
        <path d="M12 10v4" />
        <circle cx="12" cy="17.2" r="0.6" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Rising Costs & Lower Yield",
    desc: "Defects require immediate manual correction and rework, driving up rework costs and material waste — raising manufacturing costs across the entire process.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M3 7l7 7 4-4 7 7" />
        <path d="M21 10v7h-7" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Declining Customer Trust",
    desc: "Shipping underperforming components can critically damage the performance of the end user's final product, ultimately harming your company's reputation.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        <path d="M9.5 9l2 2-2 3.5M14.5 9l-2 2 2 3.5" />
      </svg>
    ),
  },
];

const SOLUTIONS: { label: string; tag: string; href: string; image?: string }[] = [
  { label: "Collaborative/Cartesian/3-Axis Robot", tag: "3-Axis Robot", href: ROUTES.solutions.standalone.robot, image: "/장비시스템/탁상로봇.png" },
  { label: "AI Dispenser", tag: "Dispenser", href: ROUTES.solutions.standalone.dispenser, image: "/장비시스템/디스펜서.png" },
  { label: "Liquid Filling Machine", tag: "Filling Machine", href: ROUTES.solutions.standalone.filling, image: "/장비시스템/충진기.png" },
  { label: "Mixing/Defoaming/Three-Roll Mill", tag: "Mixer/Three-Roll Mill", href: ROUTES.solutions.standalone.mixer, image: "/장비시스템/쓰리롤밀.png" },
  { label: "UV/IR Curing System", tag: "UV/IR Curing System", href: ROUTES.solutions.standalone.curing, image: "/장비시스템/경화기.png" },
  { label: "Automation System", tag: "Custom Automation System", href: ROUTES.solutions.ai.smartFactory, image: "/장비시스템/자동화시스템.png" },
];

const AFMS_FEATURE = {
  name: "AFMS-X1",
  desc: "AFMS is an AI-powered liquid auto-calibration dispensing system that analyzes real-time changes in the physical properties of liquid materials — such as bio-reagents and industrial pastes — and automatically corrects dispensing conditions.",
  href: ROUTES.en.autoCalibration,
  image: "/장비시스템/자동보정 시스템.png",
};

const AFMS_BENEFITS: { title: string; desc: string; icon: React.ReactNode }[] = [
  {
    title: "Smart Dispensing Control",
    desc: "Real-time automatic correction of dispensing volume, pressure, speed, and error",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M12 3c-3 4-5 7-5 10a5 5 0 0 0 10 0c0-3-2-6-5-10z" />
      </svg>
    ),
  },
  {
    title: "Smart Vision Prediction",
    desc: "Detects dots, lines, coating area, and micro air bubbles to predict defects",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Integrated Manufacturing Data Platform",
    desc: "Unified storage of process and quality data, production history management, and continuous learning",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <ellipse cx="12" cy="6" rx="8" ry="3" />
        <path d="M4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6" />
        <path d="M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6" />
      </svg>
    ),
  },
];

const VALUE_CHAIN_ICONS: Record<string, React.ReactNode> = {
  mixing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 3v18M8 7l4-4 4 4M8 17l4 4 4-4" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  dispersion: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <circle cx="12" cy="12" r="9" /><path d="M12 3v18M3 12h18" /><circle cx="12" cy="12" r="3" />
    </svg>
  ),
  filling: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 2v8l-4 4v6h8v-6l-4-4V2" /><path d="M8 20h8" /><path d="M10 2h4" />
    </svg>
  ),
  dispensing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <path d="M12 2v6M12 12v10" /><circle cx="12" cy="10" r="2" /><path d="M8 22h8M6 6h12" />
    </svg>
  ),
  robot: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <rect x="4" y="10" width="16" height="10" rx="1" /><path d="M8 10V6h8v4" /><path d="M12 2v4M8 15h2M14 15h2" />
    </svg>
  ),
  curing: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  ),
  automation: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
      <rect x="2" y="6" width="20" height="12" rx="1" /><path d="M6 10v4M10 9v6M14 10v4M18 8v8" /><path d="M2 2h4M18 2h4" />
    </svg>
  ),
};

const FAQ_SOLUTION: { question: string }[] = [
  { question: "How is FactoriX different from an equipment distributor?" },
  { question: "Do you only provide solutions for semiconductor packaging processes?" },
  { question: "Do you only handle general industrial pastes?" },
  { question: "Can small-scale projects also adopt your solutions?" },
  { question: "What is the process for adopting a solution?" },
  { question: "How is a solution quote determined?" },
];

const FAQ_PROCESS: { question: string }[] = [
  { question: "Why does dispensing quality vary with identical settings?" },
  { question: "What are the concrete business losses from dispensing defects?" },
  { question: "What is needed to improve liquid process stability?" },
  { question: "What are the key metrics for improving liquid processes?" },
];

const VALUE_CHAIN: { label: string; iconKey: string; href: string }[] = [
  { label: "Liquid Mixing\n& Defoaming", iconKey: "mixing", href: ROUTES.solutions.standalone.mixer },
  { label: "Particle Dispersion\n& 3-Roll Milling", iconKey: "dispersion", href: ROUTES.solutions.standalone.mixer },
  { label: "Liquid Filling\n& Dividing", iconKey: "filling", href: ROUTES.solutions.standalone.filling },
  { label: "Precision\nDispensing", iconKey: "dispensing", href: ROUTES.solutions.standalone.dispenser },
  { label: "Desktop Robot", iconKey: "robot", href: ROUTES.solutions.standalone.robot },
  { label: "IR/UV Curing\n& Ovens", iconKey: "curing", href: ROUTES.solutions.standalone.curing },
  { label: "Custom Process\nAutomation Systems", iconKey: "automation", href: ROUTES.solutions.ai.smartFactory },
];

export default async function EnHomePage() {
  const { data: caseData } = await sanityFetch({ query: allCaseStudiesQuery });
  const caseStudies = (caseData as CaseStudyWithTags[]) ?? [];
  const { data: logoData } = await sanityFetch({ query: industryLogosQuery });
  const industryLogos = (logoData as IndustryLogo[]) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <HeroCarousel locale="en" />

      {/* ── Demanding liquid processes, Factorix solves them ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Demanding Liquid Processes,<br />Challenges on the Factory Floor
            </h2>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed md:text-right">
              Adhesives, bio-reagents, pastes, and other core materials for advanced industries<br />
              <strong className="font-bold text-gray-900">precisely dispensing liquids in exact quantities</strong><br />
              is extremely difficult.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROBLEMS.map((p) => (
              <div key={p.num} className="rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-primary-700">{p.icon}</span>
                  <span className="text-sm font-bold text-gray-300">{p.num}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-10">{p.title}</h3>
                <p className="text-sm md:text-base text-gray-500 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What sets FactoriX apart (background image) ── */}
      <section className="relative overflow-hidden py-20 px-8">
        <img
          src="/valuechain_bg.png"
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />

        <div className="relative max-w-[1440px] mx-auto">
          <div className="mb-32 grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
              Liquid Process Specialists —<br />Dispensing &amp; Process Automation
            </h2>
            <p className="text-lg md:text-xl text-white/80 leading-relaxed md:text-right">
              From raw materials to automation, FactoriX is a team of engineers with{" "}
              <strong className="font-bold text-white">30 years</strong> of experience across diverse industrial liquid manufacturing processes,
              in an industry long biased toward semiconductor packaging. Built on more than 1,000 R&amp;D projects, we deliver{" "}
              <strong className="font-bold text-white">integrated solutions across the entire value chain</strong>.
            </p>
          </div>

          {/* Integrated solutions by process stage */}
          <div>
            <h3 className="text-xl md:text-2xl font-bold text-white leading-tight mb-10">
              Integrated Solutions by Process Stage
            </h3>
            <div className="flex items-center justify-between flex-wrap gap-y-4">
              {VALUE_CHAIN.map((step, i) => (
                <div key={step.label} className="flex items-center gap-2 md:gap-3">
                  <Link
                    href={step.href}
                    className="w-32 h-36 md:w-40 md:h-44 rounded-2xl bg-white/95 border border-white/40 flex flex-col items-center text-center px-3 py-5 hover:bg-white transition-all text-primary-700"
                  >
                    {VALUE_CHAIN_ICONS[step.iconKey]}
                    <span className="flex-1 flex items-center justify-center text-xs md:text-sm font-bold text-gray-800 leading-tight whitespace-pre-line text-center mt-1.5">
                      {step.label}
                    </span>
                    <span className="inline-flex items-center justify-center gap-0.5 text-[11px] md:text-xs font-semibold text-primary-600">
                      View Products
                      <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                  {i < VALUE_CHAIN.length - 1 && (
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0 text-white/60">
                      <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer-tailored solutions / Equipment & systems ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* Customer-tailored solutions */}
          <div id="cases" className="mb-16 scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              Customer-Tailored Solutions
            </h3>
            <IndustryCaseShowcase items={caseStudies} logos={industryLogos} locale="en" />
          </div>

          {/* FactoriX equipment & systems */}
          <div id="equipment" className="scroll-mt-20">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
              FactoriX Equipment &amp; Systems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-start">
              {SOLUTIONS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  className="group relative overflow-hidden rounded-[5px] bg-gray-100 block"
                >
                  {s.image ? (
                    <img
                      src={s.image}
                      alt={s.label}
                      className="w-full aspect-[16/9] object-cover block group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="aspect-square" />
                  )}
                  {/* Dark overlay on hover */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                  {/* Top-left equipment tag + view lineup */}
                  <div className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col items-start gap-2">
                    <span className="text-xl md:text-3xl font-normal text-primary-900">
                      {s.tag}
                    </span>
                    <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary-900">
                      View Product Lineup
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="shrink-0">
                        <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI-integrated next-gen dispensing solution ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          {/* AFMS intro */}
          <div className="mb-16">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                  AI-Integrated Next-Gen Dispensing Solutions
                </h2>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
                  About AFMS
                </h3>
                <p className="text-base md:text-lg text-gray-500 leading-relaxed">
                  {AFMS_FEATURE.desc}
                </p>

                {/* Expected benefits */}
                <div className="mt-10">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight mb-6">
                    Expected Benefits
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {AFMS_BENEFITS.map((b) => (
                      <div key={b.title} className="rounded-xl border border-gray-200 bg-white p-6">
                        <div className="w-10 h-10 rounded-full bg-primary-50 border border-primary-200 flex items-center justify-center text-primary-700 mb-3">
                          {b.icon}
                        </div>
                        <p className="font-bold text-gray-900 mb-2">{b.title}</p>
                        <p className="text-sm text-gray-500 leading-relaxed">{b.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <Link
                href={AFMS_FEATURE.href}
                className="group relative overflow-hidden rounded-[5px] bg-gray-100 block w-full md:w-[85%] mx-auto"
              >
                <img
                  src={AFMS_FEATURE.image}
                  alt={AFMS_FEATURE.name}
                  className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 pointer-events-none" />
                <div className="absolute top-10 left-10 flex flex-col items-start gap-2">
                  <span className="text-2xl md:text-3xl font-normal text-white">
                    {AFMS_FEATURE.name}
                  </span>
                  <span className="text-2xl md:text-3xl font-normal text-white">
                    Liquid Auto-Calibration Dispensing System
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#196DDA]">
                    Learn More
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Frequently Asked Questions ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-14 flex items-end justify-between">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Frequently Asked Questions
            </h2>
            <Link href={ROUTES.support.qna} className="flex items-center gap-1 text-sm text-[#196DDA] hover:underline shrink-0">
              View All
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>

          <FaqTabs
            categories={[
              { key: "solution", label: "FactoriX Solutions", items: FAQ_SOLUTION },
              { key: "process", label: "Liquid Manufacturing Process", items: FAQ_PROCESS },
            ]}
            locale="en"
          />
        </div>
      </section>

      {/* ── FactoriX tech insights ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              FactoriX Tech Insights
            </h2>
          </div>

          {/* AI wearable / blog / YouTube / patents */}
          <div className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: AI wearable */}
              <div className="block rounded-lg overflow-hidden">
                <img
                  src="/ai웨어러블.png"
                  alt="AI Wearable New Business — CES 2026 Innovation Award"
                  className="w-full h-auto block"
                />
              </div>

              {/* Right: blog / YouTube / patents */}
              <div className="flex flex-col gap-4">
                <Link
                  href={`${ROUTES.resources}?category=tech-docs`}
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">Visit FactoriX Tech Blog</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <div className="flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-400 px-6 py-6">
                  <span className="text-lg md:text-xl font-semibold">Visit Demo Video YouTube Channel</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <Link
                  href={ROUTES.blog.news}
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">Visit Patents &amp; IR Resources</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Online consultation CTA */}
          <div className="bg-primary-700 rounded-xl px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight">
              Request an Online Consultation
            </h3>
            <Link
              href={ROUTES.support.meeting}
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-primary-700 text-sm font-bold rounded hover:bg-gray-100 transition-colors shrink-0"
            >
              Request Consultation
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
