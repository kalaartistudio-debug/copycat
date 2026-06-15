import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    'remark-docx',
    'shiki',
    '@shikijs/core',
  ],
};

export default nextConfig;
