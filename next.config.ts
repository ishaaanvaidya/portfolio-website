import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // basePath: "/my-portfolio",  // Commented out for local dev
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;