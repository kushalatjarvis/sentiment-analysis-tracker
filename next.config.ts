import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dynamic-media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "media-cdn.tripadvisor.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  reactStrictMode: false,
};

export default nextConfig;
