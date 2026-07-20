import type { Metadata } from "next"
import Link from "next/link"
import { sanityFetch } from "@/sanity/lib/live"
import { productsByCategoryQuery, type ProductItem } from "@/sanity/lib/queries"
import { ROUTES } from "@/lib/routes"
import ContentCard from "@/components/content/ContentCard"
import ContentCardGrid from "@/components/content/ContentCardGrid"

export const revalidate = 3600

export const metadata: Metadata = {
  title: "AI Auto-Calibration Dispensing System AFMS | Factorix",
  description: "AFMS is an AI manufacturing intelligence system that learns and auto-calibrates dispensing conditions through real-time material analysis and Vision AI.",
  alternates: {
    canonical: ROUTES.en.autoCalibration,
    languages: { ko: ROUTES.solutions.ai.autoCalibration, en: ROUTES.en.autoCalibration },
  },
  openGraph: { locale: "en_US" },
}

const FEATURES = [
  {
    num: "01",
    en: "AI FLUID LEARNING",
    title: "Intelligent Material Property Learning",
    desc: "Real-time learning of viscosity, temperature, humidity, and material characteristics",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M8 30c2-8 4-12 12-12s10 4 12 12" />
        <path d="M20 8v10" />
        <circle cx="20" cy="6" r="2" fill="currentColor" stroke="none" />
        <path d="M12 20l-4 2M28 20l4 2" />
      </svg>
    ),
  },
  {
    num: "02",
    en: "SMART DISPENSING CONTROL",
    title: "Precision Dispensing & Path Control",
    desc: "Real-time optimal control of dispensing volume, pressure, speed, and dispensing path",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <circle cx="20" cy="20" r="12" />
        <path d="M20 8v4M20 28v4M8 20h4M28 20h4" />
        <circle cx="20" cy="20" r="3" fill="currentColor" stroke="none" />
        <path d="M20 20l6-6" />
      </svg>
    ),
  },
  {
    num: "03",
    en: "VISION AI INSPECTION",
    title: "Vision AI Quality Inspection",
    desc: "Detects dots, lines, coating area, and internal micro air bubbles to predict defects",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M4 20c4-8 8-12 16-12s12 4 16 12c-4 8-8 12-16 12S8 28 4 20z" />
        <circle cx="20" cy="20" r="5" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "04",
    en: "SELF CALIBRATION",
    title: "Real-Time Autonomous Error Correction",
    desc: "Automatic correction of pressure, speed, and dispensing volume",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M20 6a14 14 0 0 1 0 28" strokeDasharray="4 2" />
        <path d="M20 6a14 14 0 0 0 0 28" />
        <path d="M20 14v6l4 4" />
        <circle cx="20" cy="20" r="2" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    num: "05",
    en: "MANUFACTURING DATA PLATFORM",
    title: "Integrated Process Data Platform",
    desc: "Unified storage of process and quality data, production history management, and continuous learning",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <ellipse cx="20" cy="10" rx="12" ry="4" />
        <path d="M8 10v8c0 2.2 5.4 4 12 4s12-1.8 12-4v-8" />
        <path d="M8 18v8c0 2.2 5.4 4 12 4s12-1.8 12-4v-8" />
      </svg>
    ),
  },
]

const EFFECTS = [
  {
    label: "Process Stability",
    desc: "Consistent quality regardless of operator skill level",
    icon: "⚙️",
  },
  {
    label: "Cost Reduction",
    desc: "Minimizes scrap costs and rework time from defects",
    icon: "💰",
  },
  {
    label: "Intelligent Transformation",
    desc: "Builds a smart factory foundation that integrates with existing equipment",
    icon: "🏭",
  },
]

export default async function EnAutoCalibrationPage() {
  const { data } = await sanityFetch({
    query: productsByCategoryQuery,
    params: { category: "ai-auto-calibration" },
  })
  const products = (data as ProductItem[]) ?? []

  return (
    <div className="flex flex-col">

      {/* ── Intro ── */}
      <section className="bg-[#0f1f3d] text-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-300 tracking-widest uppercase mb-6">AI AUTO-CALIBRATION SYSTEM · AFMS</p>
          <h1 className="text-3xl md:text-4xl font-bold leading-snug mb-8 max-w-2xl">
            Is your process still<br />
            <span className="text-blue-300">relying on gut feeling?</span>
          </h1>
          <div className="max-w-2xl space-y-4 text-blue-100/80 leading-relaxed">
            <p>
              Subtle changes in the physical properties of core materials — adhesives, silver paste,
              bio-reagents — determine whether your final product is defective.
            </p>
            <p>
              Stop leaving a manufacturing environment that shifts with conditions and operator skill
              <strong className="text-white"> to human intuition.</strong>
            </p>
          </div>
        </div>
      </section>

      {/* ── Product overview ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-3">PRODUCT OVERVIEW</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                AFMS<br />The Standard for Manufacturing Intelligence
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                AFMS is an <strong className="text-gray-900">intelligent manufacturing system</strong> that links real-time material analysis
                with vision data to autonomously learn and auto-calibrate dispensing conditions.
              </p>
              <div className="flex gap-3">
                <Link
                  href={ROUTES.support.poc}
                  className="inline-flex px-5 py-2.5 bg-[#196DDA] text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Contact Us
                </Link>
                <Link
                  href={`${ROUTES.blog.cases}?industry=electronics`}
                  className="inline-flex px-5 py-2.5 border border-[#196DDA] text-[#196DDA] text-sm font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gray-100">
              <img
                src="/blue3/자동보정 시스템.png"
                alt="AFMS AI Auto-Calibration Dispensing System"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Core functions ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">CORE FUNCTIONS</p>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-12">5 Automation Architectures</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f) => (
              <div key={f.num} className="bg-white rounded-2xl p-7 border border-gray-100 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-[#196DDA]/40 tracking-widest">{f.num}</span>
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#196DDA]">
                    {f.icon}
                  </div>
                </div>
                <p className="text-[10px] font-bold text-[#196DDA]/60 tracking-widest uppercase mb-1">{f.en}</p>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Expected results ── */}
      <section className="bg-[#196DDA] text-white py-20 px-8">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs font-bold text-blue-200 tracking-widest uppercase mb-2">EXPECTED RESULTS</p>
          <h2 className="text-2xl md:text-3xl font-bold mb-12">Metrics That Change After Adoption</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EFFECTS.map((e) => (
              <div key={e.label} className="bg-white/10 rounded-2xl p-8 border border-white/20">
                <p className="text-3xl mb-4">{e.icon}</p>
                <h3 className="text-lg font-bold text-white mb-2">{e.label}</h3>
                <p className="text-sm text-blue-100/80 leading-relaxed">{e.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Product lineup (Sanity) ── */}
      {products.length > 0 && (
        <section className="bg-white py-20 px-8">
          <div className="max-w-5xl mx-auto">
            <p className="text-xs font-bold text-[#196DDA] tracking-widest uppercase mb-2">PRODUCTS</p>
            <h2 className="text-2xl font-bold text-gray-900 mb-10">Product Lineup</h2>
            <ContentCardGrid isEmpty={false}>
              {products.map((p) => (
                <ContentCard
                  key={p._id}
                  title={p.title}
                  description={p.description ?? p.summary}
                  thumbnailUrl={p.thumbnail?.asset?.url}
                  thumbnailAlt={p.thumbnail?.alt}
                  href={`${ROUTES.solutions.ai.autoCalibration}/${p.slug}`}
                />
              ))}
            </ContentCardGrid>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <section className="bg-gray-50 py-16 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-1">Considering AFMS for Your Facility?</h2>
            <p className="text-gray-500 text-sm">We&apos;ll analyze your process and propose the optimal configuration.</p>
          </div>
          <div className="flex gap-3 shrink-0">
            <Link
              href={ROUTES.support.poc}
              className="inline-flex px-6 py-3 bg-[#196DDA] text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors text-sm"
            >
              PoC Inquiry
            </Link>
            <Link
              href={ROUTES.support.demoTest}
              className="inline-flex px-6 py-3 border border-[#196DDA] text-[#196DDA] font-semibold rounded-lg hover:bg-blue-50 transition-colors text-sm"
            >
              Request Evaluation Test
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
