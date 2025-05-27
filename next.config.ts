import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  env: {
    API_URL:
      process.env.API_URL || "https://jsonplaceholder.typicode.com",
  },
};

export default nextConfig;
