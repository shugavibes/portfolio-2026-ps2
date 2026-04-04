'use client';

// PLAY section — EmulatorJS PS1 emulator running entirely in-browser.
// Same-origin iframe (/emulator/index.html) so no cross-origin restrictions.
//
// To activate: drop your Crash Bandicoot ROM file named
//   crash-bandicoot.bin  (or crash-bandicoot.cue + matching .bin tracks)
// into the public/emulator/ directory, then redeploy.

export function PlaySection() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <iframe
        src="/emulator/index.html"
        style={{
          width: '100%',
          height: '100%',
          border: 'none',
          display: 'block',
        }}
        allow="fullscreen; autoplay"
        title="Crash Bandicoot — PS1"
      />
    </div>
  );
}
