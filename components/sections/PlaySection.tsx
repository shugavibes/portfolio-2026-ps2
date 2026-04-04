'use client';

// PLAY section — embeds a browser-based game via iframe.
// Set GAME_URL to the emulator URL once confirmed.
// If the site blocks iframes (X-Frame-Options), swap in EmulatorJS instead.

const GAME_URL = ''; // ← paste the URL here

export function PlaySection() {
  if (!GAME_URL) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          gap: '1rem',
          padding: '2rem',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.75rem',
            color: '#c8a800',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
          }}
        >
          INSERT DISC
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.6rem',
            color: '#334466',
            letterSpacing: '0.1em',
          }}
        >
          No game URL configured.
        </span>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src={GAME_URL}
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="fullscreen"
        title="Crash Bandicoot"
      />
    </div>
  );
}
