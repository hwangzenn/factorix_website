import type { Metadata } from "next";
import { sanityFetch } from "@/sanity/lib/live";
import { allFaqsQuery, type FaqItem } from "@/sanity/lib/queries";
import FaqTabs from "@/components/home/FaqTabs";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Q&A",
  description: "Factorix 자주 묻는 질문",
};

const FAQ_CATEGORY_LABELS: Record<string, string> = {
  solution: "FactoriX 솔루션",
  process: "액상 제조공정",
};

export default async function QnaPage() {
  const { data } = await sanityFetch({ query: allFaqsQuery });
  const faqs = (data as FaqItem[]) ?? [];
  const faqCategories = Object.entries(FAQ_CATEGORY_LABELS)
    .map(([key, label]) => ({ key, label, items: faqs.filter((f) => f.category === key) }))
    .filter((c) => c.items.length > 0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">고객지원</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">Q&amp;A</h1>
      {faqCategories.length > 0 ? (
        <FaqTabs categories={faqCategories} />
      ) : (
        <p className="text-gray-500">콘텐츠 준비 중입니다.</p>
      )}
    </div>
  );
}
