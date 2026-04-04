'use client';

import { useState, useEffect } from 'react';

export function PlaySection() {
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.data?.type === 'rom-progress') {
        const v = Math.min(100, Math.round(e.data.value));
        setProgress(v);
        if (v >= 100) setTimeout(() => setDone(true), 800);
      }
    }
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', background: '#000' }}>

      {/* Download progress bar — sits between top bar and emulator */}
      {!done && (
        <div style={{
          flexShrink: 0,
          padding: '0.45rem 1rem',
          background: '#000008',
          borderBottom: '1px solid #0a1428',
          display: 'flex',
          alignItems: 'center',
          gap: '0.8rem',
        }}>
          <span style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.58rem',
            letterSpacing: '0.12em',
            color: '#4466bb',
            whiteSpace: 'nowrap',
          }}>
            {progress === 0 ? 'Initialising…' : `Loading… ${progress}%`}
          </span>
          <div style={{
            flex: 1,
            height: 3,
            background: 'rgba(34,119,238,0.15)',
            borderRadius: 2,
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'linear-gradient(90deg, #2255cc, #44aaff)',
              boxShadow: '0 0 8px #2277ee88',
              borderRadius: 2,
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>
      )}

      <iframe
        src="/emulator/index.html"
        style={{ flex: 1, border: 'none', display: 'block', minHeight: 0 }}
        allow="fullscreen; autoplay"
        title="Crash Bandicoot — PS1"
      />
    </div>
  );
}
