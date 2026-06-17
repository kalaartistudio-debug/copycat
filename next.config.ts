import type { NextConfig } from "next";

// @mathjax/src uses package `#imports` aliases (e.g. `#root/root.js` →
// `.../mjs/components/mjs/root.js`).  Turbopack cannot resolve these via the
// package.json `imports` field, so we provide explicit aliases here.
// Paths must be project-relative (starting with `./`) for Turbopack.
// Only two files in the entire @mathjax/src MJS tree use `#root/*`; all other
// `#imports` aliases (#sre, #mhchem, #menu …) are for optional features that
// the latex plugin never loads.
const MJX_ROOT = './node_modules/@mathjax/src/mjs/components/mjs';

const nextConfig: NextConfig = {
  serverExternalPackages: [
    // remark-docx is bundled (not listed here) so turbopack can resolve
    // its @mathjax/src `#imports` aliases at build time.
    'shiki',
    '@shikijs/core',
  ],

  turbopack: {
    resolveAlias: {
      // Resolve @mathjax/src package-internal `#root/*` imports.
      '#root/root.js':     `${MJX_ROOT}/root.js`,
      '#root/sre-root.js': `${MJX_ROOT}/sre-root.js`,
    },
  },
};

export default nextConfig;
