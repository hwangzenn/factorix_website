import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import Hero from "@/components/Hero";
import TrustBar from "@/components/home/TrustBar";
import SolutionExplorer from "@/components/home/SolutionExplorer";
import { sanityFetch } from "@/sanity/lib/live";
import {
  industryLogosQuery,
  type IndustryLogo,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: "AI Liquid Manufacturing & Dispensing Solutions",
  description: "Factorix is a B2B specialist supplying AI-powered ultra-precision dispensing automation systems.",
  keywords: [
    "Factorix", "liquid manufacturing", "dispensing automation", "AI smart factory",
    "dispenser", "filling machine",
  ],
  alternates: {
    canonical: ROUTES.en.home,
    languages: { ko: ROUTES.home, en: ROUTES.en.home },
  },
  openGraph: { locale: "en_US" },
};

const PROBLEMS: { num: string; title: string; icon: React.ReactNode }[] = [
  {
    num: "01",
    title: "Constantly Changing Variables",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M3 13c2-7 4-7 6 0s4 7 6 0 4-7 6 0" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "High Defect Rates",
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
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7 md:w-9 md:h-9">
        <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6l7-3z" />
        <path d="M9.5 9l2 2-2 3.5M14.5 9l-2 2 2 3.5" />
      </svg>
    ),
  },
];

const AFMS_IMAGE = "/장비시스템/자동보정 시스템.png";

export default async function EnHomePage() {
  const { data: logoData } = await sanityFetch({ query: industryLogosQuery });
  const industryLogos = (logoData as IndustryLogo[]) ?? [];

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <Hero locale="en" />

      {/* ── Trust bar ── */}
      <TrustBar logos={industryLogos} locale="en" />

      {/* ── Demanding liquid processes, Factorix solves them ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 items-center">
            <div className="text-left">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Demanding Liquid Processes,<br />Challenges on the Factory Floor
              </h2>
              <p className="text-lg md:text-xl text-gray-500 leading-relaxed">
                Adhesives, bio-reagents, pastes, and other core materials for advanced industries —{" "}
                <strong className="font-bold text-gray-900">precisely dispensing liquids in exact quantities</strong> is extremely difficult.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6">
              {PROBLEMS.map((p) => (
                <div key={p.num} className="rounded-xl border border-gray-200 p-5 md:p-6">
                  <span className="text-primary-700 block mb-3">{p.icon}</span>
                  <span className="text-sm font-bold text-gray-300 block mb-2">{p.num}</span>
                  <h3 className="text-base md:text-lg font-bold text-gray-900">{p.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Explore by process / equipment / industry ── */}
      <SolutionExplorer locale="en" />

      {/* ── FactoriX tech insights ── */}
      <section className="bg-gray-50 py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              FactoriX Tech Insights
            </h2>
          </div>

          {/* CES award / blog / YouTube / patents */}
          <div className="mb-14">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left: CES award */}
              <Link href={`${ROUTES.blog.news}/ces-2026`} className="block rounded-lg overflow-hidden">
                <img
                  src={AFMS_IMAGE}
                  alt="FactoriX CES 2026 Innovation Award"
                  className="w-full h-auto block"
                />
              </Link>

              {/* Right: blog / YouTube / patents */}
              <div className="flex flex-col gap-4">
                <a
                  href="https://blog.naver.com/factorix"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">Naver Blog</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <a
                  href="https://www.youtube.com/@FactoriX-t9f"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex-1 flex items-center justify-between gap-3 rounded-lg border border-gray-200 text-gray-800 px-6 py-6 hover:bg-primary-700 hover:border-primary-700 hover:text-white transition-colors"
                >
                  <span className="text-lg md:text-xl font-semibold">Visit Demo Video YouTube Channel</span>
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="none" className="shrink-0">
                    <path d="M4 12L12 4M12 4H6M12 4V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
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
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">
                Request an Online Consultation
              </h3>
              <p className="text-sm text-primary-100">Backed by 1,000+ R&amp;D projects and 200+ partner companies</p>
            </div>
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
