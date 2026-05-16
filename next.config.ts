import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'remark-docx',
    '@mathjax/src',
    'mathjax-full',
    'rehype-mathjax',
    'shiki',
    '@shikijs/core',
  ],
};

export default nextConfig;
