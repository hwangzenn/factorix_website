import { client } from "@/sanity/lib/client";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://factorix.co.kr";

type FeedItem = {
  title: string;
  slug: string;
  category: string;
  publishedAt: string | null;
  description: string | null;
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const items = await client.fetch<FeedItem[]>(
    `*[_type == "referenceMaterial" && isPublic == true]
     | order(publishedAt desc) [0...50] {
       title,
       "slug": slug.current,
       category,
       publishedAt,
       description
     }`
  );

  const rssItems = items
    .map((item) => {
      const link = `${SITE_URL}/resources/${item.category}/${item.slug}`;
      const pubDate = item.publishedAt
        ? new Date(item.publishedAt).toUTCString()
        : "";
      return `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${link}</link>
      <guid>${link}</guid>${pubDate ? `\n      <pubDate>${pubDate}</pubDate>` : ""}${item.description ? `\n      <description>${escapeXml(item.description)}</description>` : ""}
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Factorix</title>
    <link>${SITE_URL}</link>
    <description>액제제조 솔루션 · AI 웨어러블 디바이스 B2B 전문 기업</description>
    <language>ko</language>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
