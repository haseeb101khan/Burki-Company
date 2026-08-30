import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // A stray package-lock.json in the user profile made Turbopack infer the
    // wrong workspace root. Pin it to this project.
    root: process.cwd(),
  },
  images: {
    /**
     * Nothing remote. Every image the site serves lives in `public/`, so Next's
     * own optimiser handles them from disk — no CDN, no custom loader, and no
     * request that can fail because a service in another country is slow.
     */
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
