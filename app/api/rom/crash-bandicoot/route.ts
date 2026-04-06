// Serves the ROM with CORS so shuga.blog can fetch it directly.
export const runtime = 'edge';

const ROM_URL =
  'https://github.com/shugavibes/portfolio-2026-ps2/releases/download/v1.0-assets/Crash.Bandicoot.USA.bin';

const CORS = {
  'Access-Control-Allow-Origin': 'https://shuga.blog',
  'Access-Control-Allow-Methods': 'GET, HEAD',
};

async function resolveUrl(): Promise<string> {
  const r = await fetch(ROM_URL, { redirect: 'manual' });
  return r.headers.get('location') ?? ROM_URL;
}

export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function HEAD() {
  const url = await resolveUrl();
  const r = await fetch(url, { method: 'HEAD' });
  const headers: Record<string, string> = {
    ...CORS,
    'Content-Type': 'application/octet-stream',
    'Accept-Ranges': 'bytes',
  };
  const cl = r.headers.get('Content-Length');
  if (cl) headers['Content-Length'] = cl;
  return new Response(null, { status: 200, headers });
}

export async function GET() {
  const url = await resolveUrl();
  const upstream = await fetch(url);

  if (!upstream.ok) {
    return new Response(`upstream ${upstream.status}`, { status: 502, headers: CORS });
  }

  const headers: Record<string, string> = {
    ...CORS,
    'Content-Type': 'application/octet-stream',
    'Cache-Control': 'public, max-age=86400',
  };
  const cl = upstream.headers.get('Content-Length');
  if (cl) headers['Content-Length'] = cl;

  return new Response(upstream.body, { status: 200, headers });
}
