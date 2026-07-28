import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.sanity.io" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.factorix.co.kr" }],
        destination: "https://factorix.co.kr/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
