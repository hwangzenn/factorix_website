import type { Metadata } from "next";
import Link from "next/link";
import { getPostsByTag } from "@/lib/ghost";

export const metadata: Metadata = {
  title: "투자정보",
  description: "Factorix 투자 정보 IR",
};

export default async function IrPage() {
  const posts = await getPostsByTag("ir");

  return (
    <div className="max-w-5xl mx-auto px-6 py-20">
      <p className="text-sm text-primary-600 font-medium mb-2">자료실</p>
      <h1 className="text-4xl font-bold text-primary-800 mb-10">투자정보</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">등록된 투자정보가 없습니다.</p>
      ) : (
        <ul className="divide-y divide-gray-100">
          {posts.map((post) => (
            <li key={post.id} className="py-5">
              <Link href={`/resources/ir/${post.slug}`} className="font-medium text-gray-800 hover:text-primary-700 transition-colors">
                {post.title}
              </Link>
              {post.published_at && (
                <p className="text-sm text-gray-400 mt-1">
                  {new Date(post.published_at).toLocaleDateString("ko-KR")}
                </p>
              )}
              {post.excerpt && <p className="text-sm text-gray-500 mt-1">{post.excerpt}</p>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
