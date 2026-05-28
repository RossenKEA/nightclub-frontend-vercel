import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nightclub-491m.onrender.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;