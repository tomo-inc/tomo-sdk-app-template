import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  transpilePackages: ['@tomo-inc/tomo-web-sdk']
};

export default nextConfig;
