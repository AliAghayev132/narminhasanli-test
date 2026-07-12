import { fileURLToPath } from 'node:url'

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Pin the workspace root to this package. Without this, Turbopack gets
  // confused by the root-level package.json (convenience scripts only, not
  // a workspace) and the pnpm-workspace.yaml sitting right here.
  turbopack: {
    root: fileURLToPath(new URL('.', import.meta.url)),
  },

  // Do not advertise the framework in the response headers.
  poweredByHeader: false,

  // Fail-safe: keep React strict mode on for better warnings in development.
  reactStrictMode: true,

  images: {
    // Placeholder remote pattern. Tighten `hostname` to your real asset/CDN
    // host(s) before going to production (e.g. images.example.com).
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Basic security headers applied to every route. Extend as needed
  // (e.g. a strict Content-Security-Policy tuned to your app).
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ]
  },
}

export default nextConfig
