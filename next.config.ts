import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fearless-mandrill-152.convex.site",
        pathname: "/getImage*",
      },
    ],
  },
};

export default nextConfig;
