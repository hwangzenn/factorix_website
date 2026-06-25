import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SanityLive } from "@/sanity/lib/live";

const geist = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Factorix", template: "%s | Factorix" },
  description: "액제제조 솔루션 · AI 웨어러블 디바이스 B2B 전문 기업",
  icons: { icon: "/logo_simple.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geist.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1 pt-20">{children}</main>
        <Footer />
        <SanityLive />
      </body>
    </html>
  );
}
