import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      { source: "/solutions/standalone/:path*", destination: "/solutions/equipment/:path*", permanent: true },
      { source: "/solutions/ai/:path*", destination: "/solutions/equipment-systems/:path*", permanent: true },
      { source: "/en/solutions/ai/:path*", destination: "/en/solutions/equipment-systems/:path*", permanent: true },
      { source: "/blog/guide-intro/:path*", destination: "/blog/wiki/:path*", permanent: true },
      { source: "/solutions/equipment-systems/smart-factory/:path*", destination: "/solutions/automation-system/:path*", permanent: true },
      { source: "/solutions/equipment-systems/auto-calibration/:path*", destination: "/blog/news/ces-2026", permanent: true },
      { source: "/en/solutions/equipment-systems/auto-calibration/:path*", destination: "/blog/news/ces-2026", permanent: true },
    ];
  },
};

export default nextConfig;
