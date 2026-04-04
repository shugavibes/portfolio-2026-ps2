import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // Proxy ifr.html through our domain so the iframe is same-origin.
      // This lets parent.code / parent.butt be readable by the emulator script.
      {
        source: '/ps1-ifr',
        destination: 'https://www.ps1fun.com/ifr.html',
      },
      // Proxy all emulator assets (JS, CSS, WASM, images) ps1fun.com serves under /ps/
      {
        source: '/ps/:path*',
        destination: 'https://www.ps1fun.com/ps/:path*',
      },
    ];
  },
};

export default nextConfig;
