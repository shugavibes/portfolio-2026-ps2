'use client';

export function PlaySection() {
  return (
    <div style={{ width: '100%', height: '100%', background: '#000' }}>
      <iframe
        src="/emulator/index.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        allow="fullscreen; autoplay"
        title="Crash Bandicoot — PS1"
      />
    </div>
  );
}
