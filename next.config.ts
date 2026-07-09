import type { NextConfig } from "next";

// When deployed to a GitHub Pages *project* site the app is served from a
// subpath (e.g. https://<org>.github.io/landing-page/), so assets need a
// matching basePath. The deploy workflow sets NEXT_PUBLIC_BASE_PATH=/landing-page
// — the same var lib/asset.ts uses to prefix raw <video>/<img> src values.
// Leave it unset for a root/user-org page or a custom domain (CNAME).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  basePath,
  turbopack: {
    // Pin the workspace root to this directory so Next stops inferring it
    // from a stray lockfile higher up the filesystem (Next 16 `turbopack.root`).
    root: __dirname,
  },
};

export default nextConfig;
