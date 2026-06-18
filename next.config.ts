import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  allowedDevOrigins: ['192.168.1.37'],
  // basePath: "/my-portfolio",  Commented out for local dev
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;