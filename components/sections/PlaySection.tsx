'use client';

// PLAY section — Archive.org hosted Crash Bandicoot PS1 emulator.
// Uses Archive.org's built-in browser emulator, no ROM hosting needed.

export function PlaySection() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000008' }}>
      <iframe
        src="https://archive.org/embed/crash-bandicoot-usa_202411"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="fullscreen; autoplay"
        allowFullScreen
        title="Crash Bandicoot — PS1"
      />
    </div>
  );
}
