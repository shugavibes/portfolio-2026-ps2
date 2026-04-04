// Proxy the ROM from GitHub releases through our domain.
// Browser can't fetch it directly (CORS), but server-side fetch has no CORS restrictions.
export const runtime = 'edge';

export async function GET() {
  const upstream = await fetch(
    'https://github.com/shugavibes/portfolio-2026-ps2/releases/download/v1.0-assets/Crash.Bandicoot.USA.bin',
    { redirect: 'follow' },
  );

  if (!upstream.ok) {
    return new Response(`ROM fetch failed: ${upstream.status}`, { status: 502 });
  }

  return new Response(upstream.body, {
    status: 200,
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': upstream.headers.get('Content-Length') ?? '',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
