import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://factorix.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Factorix", template: "%s | Factorix" },
  description: "액제제조 솔루션 · AI 웨어러블 디바이스 B2B 전문 기업",
  icons: { icon: "/logo_simple.png" },
  openGraph: {
    title: "Factorix | AI-Powered Dispensing",
    description: "AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업",
    url: SITE_URL,
    siteName: "Factorix",
    images: [{ url: "/og-image.png", width: 1200, height: 630 }],
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Factorix | AI-Powered Dispensing",
    description: "AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업",
    images: ["/og-image.png"],
  },
  alternates: { canonical: SITE_URL },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Factorix",
  url: SITE_URL,
  logo: `${SITE_URL}/logo_simple.png`,
  description: "AI 기반 초정밀 디스펜싱 자동화 시스템과 AI 웨어러블 디바이스 전문 기업",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "sales",
    availableLanguage: ["Korean", "English"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
