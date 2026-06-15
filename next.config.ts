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
  // rehype-mathjax is loaded via a runtime-only import (new Function) so the
  // build never executes MathJax. That hides it from the file tracer too, so
  // explicitly include it (and mathjax-full) in the serverless bundle.
  outputFileTracingIncludes: {
    '/api/render/word-html': [
      './node_modules/rehype-mathjax/**/*',
      './node_modules/mathjax-full/**/*',
    ],
  },
};

export default nextConfig;
