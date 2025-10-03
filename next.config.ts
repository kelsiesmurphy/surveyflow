import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fearless-mandrill-152.convex.site",
        port: "",
        pathname: "/getImage",
      },
    ],
  },
};

export default nextConfig;
