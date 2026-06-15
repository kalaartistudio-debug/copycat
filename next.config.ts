import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'remark-docx',
    '@mathjax/src',
    'mathjax-full',
    'rehype-mathjax',
    'rehype-mathjax/svg',
    'shiki',
    '@shikijs/core',
  ],
};

export default nextConfig;
