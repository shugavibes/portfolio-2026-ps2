import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy the Crash Bandicoot ROM through our domain so EmulatorJS can
      // fetch it without CORS issues (Archive.org CDN has no CORS headers).
      {
        source: '/rom/crash-bandicoot',
        destination: 'https://archive.org/download/crash-bandicoot-usa_202411/Crash%20Bandicoot%20%28USA%29.bin',
      },
    ];
  },
};

export default nextConfig;
