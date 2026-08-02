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
    ];
  },
};

export default nextConfig;
