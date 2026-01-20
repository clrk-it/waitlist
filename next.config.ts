import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Static export for Azure Static Web Apps - DISABLED for local dev with API routes */
  /* For production on Azure SWA, uncomment and use Azure Functions for API */
  // output: "export",
  output: "standalone",

  /* Compression and optimization settings */
  compress: true,
  poweredByHeader: false,
  productionBrowserSourceMaps: false,

  /* Image optimization */
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  /* Headers for caching and performance */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Cache-Control",
            value: "public, max-age=3600, must-revalidate",
          },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  /* Rewrites for API optimization */
  async rewrites() {
    return {
      beforeFiles: [],
      afterFiles: [],
      fallback: [],
    };
  },
};

export default nextConfig;
