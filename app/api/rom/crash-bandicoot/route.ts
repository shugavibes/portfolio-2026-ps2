// Edge runtime streams the 490MB ROM from Archive.org without timeout.
// Proxying through our domain avoids CORS issues in EmulatorJS.
export const runtime = 'edge';

export async function GET() {
  const upstream = await fetch(
    'https://archive.org/download/crash-bandicoot-usa_202411/Crash%20Bandicoot%20%28USA%29.bin',
  );

  if (!upstream.ok) {
    return new Response('ROM unavailable', { status: 502 });
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
