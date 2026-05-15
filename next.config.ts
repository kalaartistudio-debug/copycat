import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['remark-docx', '@mathjax/src', 'mathjax-full'],
};

export default nextConfig;
