import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { INDUSTRIES, PROCESSES } from "@/lib/blogFilters";
import Hero from "@/components/Hero";
import TrustBar from "@/components/home/TrustBar";
import SolutionExplorer from "@/components/home/SolutionExplorer";
import FaqTabs from "@/components/home/FaqTabs";
import BlogCard from "@/components/blog/BlogCard";
import { sanityFetch } from "@/sanity/lib/live";
import {
  allCaseStudiesQuery,
  industryLogosQuery,
  featuredFaqsQuery,
  blogPostsByCategoryQuery,
  type CaseStudyWithTags,
  type IndustryLogo,
  type FaqItem,
  type BlogPostSummary,
} from "@/sanity/lib/queries";

export const metadata: Metadata = {
  title: {
    absolute: "팩토릭스 | AI 액상 충진 토출 디스펜싱·스마트팩토리 자동화시스템 전문기업",
  },
  description:
    "접착제·바이오 시약·전자재료의 정밀 토출부터 배합·혼합·탈포·충진·경화까지. 전문제조 엔지니어링 솔루션과 AI 자동보정 기술로 제조공정의 불량률을 낮추고 생산성을 높입니다.",
  keywords: [
    "팩토릭스", "Factorix", "산업용 디스펜서 업체", "액상 제조 솔루션",
    "정량토출", "정밀토출", "액상 충진 및 교반,탈포 설비 업체",
  ],
  alternates: {
    canonical: ROUTES.home,
    languages: { ko: ROUTES.home, en: ROUTES.en.home },
  },
  openGraph: {
    title: "팩토릭스 | AI 액상 충진 토출 디스펜싱·스마트팩토리 자동화시스템 전문기업",
    description:
      "접착제·바이오 시약·전자재료의 정밀 토출부터 배합·혼합·탈포·충진·경화까지. 전문제조 엔지니어링 솔루션과 AI 자동보정 기술로 제조공정의 불량률을 낮추고 생산성을 높입니다.",
    url: ROUTES.home,
    siteName: "팩토릭스 | Factorix",
    images: [{ url: "/og_img.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "팩토릭스 | AI 액상 충진 토출 디스펜싱·스마트팩토리 자동화시스템 전문기업",
    description:
      "접착제·바이오 시약·전자재료의 정밀 토출부터 배합·혼합·탈포·충진·경화까지. 전문제조 엔지니어링 솔루션과 AI 자동보정 기술로 제조공정의 불량률을 낮추고 생산성을 높입니다.",
    images: ["/og_img.png"],
  },
};

// TODO: 나머지 항목도 위키 콘텐츠 발행 후 개별 글 slug로 연결(현재는 발행 전이라 비활성 표시만)
const PROBLEM_TOPICS: { label: string; href?: string }[] = [
  { label: "액상 공정이 까다로운 이유는?" },
  { label: "우리 공장은 스마트 공장일까? 자가진단 5단계", href: `${ROUTES.blog.insight}/smartfactory-self-guide` },
];

const INDUSTRY_LABEL: Record<string, string> = Object.fromEntries(INDUSTRIES.map((i) => [i.key, i.label]));
const PROCESS_LABEL: Record<string, string> = Object.fromEntries(PROCESSES.map((p) => [p.key, p.label]));

// Sanity에 남아있는 구버전 짧은 산업군 값("bio", "research" 등)도 대응하기 위해
// 정식 키(bio-medical 등)와의 접두사 일치로 라벨을 찾고, 배지용으로 "·" 앞부분만 사용한다.
function shortIndustryLabel(raw: string): string {
  const exact = INDUSTRY_LABEL[raw];
  const full = exact ?? INDUSTRIES.find((i) => i.key.startsWith(raw) || raw.startsWith(i.key.split("-")[0]))?.label;
  return (full ?? raw).split("·")[0];
}

const FAQ_CATEGORY_LABELS: Record<string, string> = {
  solution: "FactoriX 솔루션",
  process: "액상 제조공정",
};

export default async function HomePage() {
  const { data: caseData } = await sanityFetch({ query: allCaseStudiesQuery });
  const caseStudies = ((caseData as CaseStudyWithTags[]) ?? []).slice(0, 3);
  const { data: logoData } = await sanityFetch({ query: industryLogosQuery });
  const industryLogos = (logoData as IndustryLogo[]) ?? [];
  const { data: faqData } = await sanityFetch({ query: featuredFaqsQuery });
  const faqs = (faqData as FaqItem[]) ?? [];
  const faqCategories = Object.entries(FAQ_CATEGORY_LABELS)
    .map(([key, label]) => ({ key, label, items: faqs.filter((f) => f.category === key) }))
    .filter((c) => c.items.length > 0);

  const { data: insightData } = await sanityFetch({ query: blogPostsByCategoryQuery, params: { category: "insight" } });
  const insightPosts = ((insightData as BlogPostSummary[]) ?? []).slice(0, 3);

  const faqJsonLd = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  return (
    <div className="flex flex-col">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}

      {/* ── Hero ── */}
      <Hero />

      {/* ── 트러스트바 ── */}
      <TrustBar logos={industryLogos} />

      {/* ── 까다로운 액상제조 공정, Factorix가 해결합니다 ── */}
      <section className="bg-white py-20 px-8">
        <div className="max-w-[1440px] mx-auto">
          <span className="block text-base md:text-lg font-semibold text-primary-700 tracking-widest uppercase mb-2">
            팩토릭스가 해결하는 과제
          </span>
          <h2 className="text-4xl md:text-5xl leading-tight mb-10 break-keep max-w-4xl">
            <span className="font-semibold text-gray-900">액상 소재의 정밀 토출 충진 공정을 해결하여</span>
            <br />
            <span className="font-normal text-gray-900">공정 편차는 줄이고, 품질 및 생산성 안정성을 높입니다.</span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8">
            <div className="border-t border-gray-200">
              {PROBLEM_TOPICS.map((topic) =>
                topic.href ? (
                  <Link
                    key={topic.label}
                    href={topic.href}
                    className="flex items-center justify-between gap-4 py-5 border-b border-gray-200"
                  >
                    <span className="text-lg font-medium text-gray-700">{topic.label}</span>
                    <span className="shrink-0 inline-flex h-8 items-center justify-center gap-1 rounded-full bg-gray-100 px-4 text-sm text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-600">
                      알아보기
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </Link>
                ) : (
                  <div key={topic.label} className="flex items-center justify-between gap-4 py-5 border-b border-gray-200">
                    <span className="text-lg font-medium text-gray-700">{topic.label}</span>
                    <span className="shrink-0 inline-flex h-8 items-center justify-center gap-1 rounded-full bg-gray-100 px-4 text-sm text-gray-400">
                      알아보기
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </div>
                )
              )}
            </div>

            <Link
              href={ROUTES.support.meeting}
              className="flex flex-col justify-center rounded-xl bg-gray-100 p-8 hover:bg-gray-200 transition-colors"
            >
              <span className="text-xl font-bold text-gray-900 leading-snug break-keep">
                우리 공정
                <br />
                간편 진단 받기 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── 공정별/장비별/산업군별 탐색 ── */}
      <SolutionExplorer />

      {/* ── 고객 적용사례 블로그 ── */}
      {caseStudies.length > 0 && (
        <section id="cases" className="bg-white py-20 px-8 scroll-mt-20">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <div>
                <span className="block text-base md:text-lg font-semibold text-primary-700 tracking-widest uppercase mb-2">
                  고객 적용사례
                </span>
                <h2 className="text-4xl md:text-5xl leading-tight break-keep">
                  <span className="font-bold text-gray-900">팩토릭스가 실제 제조현장에서 해결한</span>
                  <br />
                  <span className="font-normal text-gray-900">액상공정 사례를 확인해보세요.</span>
                </h2>
              </div>
              <Link
                href={ROUTES.blog.cases}
                className="hidden md:inline-flex items-center gap-1 text-primary-700 text-sm font-semibold hover:text-primary-900 transition-colors shrink-0"
              >
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {caseStudies.map((item, i) => (
                <BlogCard
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  thumbnailUrl={item.thumbnail?.asset?.url}
                  thumbnailAlt={item.thumbnail?.alt}
                  href={`${ROUTES.blog.cases}/${item.slug}`}
                  publishedAt={item.publishedAt}
                  tag={item.industries ? shortIndustryLabel(item.industries) : null}
                  processLabel={item.processes ? PROCESS_LABEL[item.processes] ?? item.processes : null}
                  colorIndex={i}
                  allBadgesPrimary
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href={ROUTES.blog.cases}
                className="inline-flex items-center gap-1 px-6 py-2.5 border border-primary-700 text-primary-700 text-sm font-semibold rounded hover:bg-primary-700 hover:text-white transition-colors shrink-0"
              >
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {faqCategories.length > 0 && (
        <section className="bg-white py-20 px-8">
          <div className="max-w-[1440px] mx-auto">
            <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                자주 묻는 질문 Q&amp;A
              </h2>
              <Link
                href={ROUTES.support.qna}
                className="inline-flex items-center gap-1 px-6 py-2.5 border border-primary-700 text-primary-700 text-sm font-semibold rounded hover:bg-primary-700 hover:text-white transition-colors shrink-0"
              >
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <FaqTabs categories={faqCategories} />
          </div>
        </section>
      )}

      {/* ── 인사이트 블로그 ── */}
      {insightPosts.length > 0 && (
        <section className="relative overflow-hidden py-20 px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/valuechain_bg.png" alt="" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/35" />
          <div className="relative max-w-[1440px] mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
              <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                제조사를 위한 인사이트
              </h2>
              <Link
                href={ROUTES.blog.insight}
                className="hidden md:inline-flex items-center gap-1 text-white text-sm font-semibold hover:text-white/70 transition-colors shrink-0"
              >
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {insightPosts.map((post, i) => (
                <BlogCard
                  key={post._id}
                  title={post.title}
                  description={post.description}
                  thumbnailUrl={post.thumbnail?.asset?.url}
                  thumbnailAlt={post.thumbnail?.alt}
                  href={`${ROUTES.blog.insight}/${post.slug}`}
                  publishedAt={post.publishedAt}
                  categoryLabel="인사이트"
                  colorIndex={i}
                />
              ))}
            </div>
            <div className="mt-8 flex justify-center md:hidden">
              <Link
                href={ROUTES.blog.insight}
                className="inline-flex items-center gap-1 px-6 py-2.5 border border-white/60 text-white text-sm font-semibold rounded hover:bg-white hover:text-black hover:border-white transition-colors shrink-0"
              >
                전체보기
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

    </div>
  );
}
