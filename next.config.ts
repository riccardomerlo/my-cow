import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true,
  },
  // serverExternalPackages: ["cowsay"],
  /* config options here */
};

export default nextConfig;
