import type { Metadata } from "next";
import Link from "next/link";
import { ROUTES } from "@/lib/routes";
import { getPostsByTag } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "웨어러블 디바이스 적용사례",
  description: "Factorix AI 웨어러블 디바이스 제품유형별 적용사례",
};

export default async function ProductWearableCasePage() {
  const posts = await getPostsByTag("case-wearable");

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">적용사례 · 제품유형별</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">웨어러블 디바이스</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500 mb-16">콘텐츠 준비 중입니다.</p>
      ) : (
        <ul className="space-y-6 mb-16">
          {posts.map((post) => (
            <li key={post.id} className="border-b border-gray-100 pb-6">
              <Link href={`/cases/product/wearable/${post.slug}`} className="text-lg font-semibold text-gray-800 hover:text-primary-700">{post.title}</Link>
              {post.excerpt && <p className="text-gray-500 mt-2 text-sm">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
      <div className="flex gap-4">
        <Link href={ROUTES.support.wearablePoc} className="inline-flex px-6 py-3 bg-primary-700 text-white font-semibold rounded-md hover:bg-primary-800 transition-colors">웨어러블 PoC 문의</Link>
        <Link href={ROUTES.wearable.intro} className="inline-flex px-6 py-3 border border-primary-700 text-primary-700 font-semibold rounded-md hover:bg-primary-50 transition-colors">디바이스 소개</Link>
      </div>
    </div>
  );
}
