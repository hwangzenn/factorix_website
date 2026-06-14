import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getPostsByTag } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "전기/전자 적용사례",
  description: "Factorix 전기·전자 산업 액제제조 솔루션 적용사례",
};

export default async function ElectronicsCasePage() {
  const posts = await getPostsByTag("case-electronics");

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">적용사례 · 산업별</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">전기/전자</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500 mb-16">콘텐츠 준비 중입니다.</p>
      ) : (
        <ul className="space-y-6 mb-16">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-100 pb-6">
              <Link href={`/cases/industry/electronics/${post.slug}`} className="text-lg font-semibold text-gray-800 hover:text-primary-700">{post.title}</Link>
              {post.excerpt && <p className="text-gray-500 mt-2 text-sm">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-4">
        <Link href={ROUTES.support.poc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">도입 문의</Link>
        <Link href={ROUTES.solutions.standalone.dispenser} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">AI 디스펜서</Link>
      </div>
    </div>
  );
}
