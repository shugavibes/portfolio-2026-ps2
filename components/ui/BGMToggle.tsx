'use client';

import { useAudioContext } from '@/providers/AudioProvider';

export function BGMToggle() {
  const { muted, toggleMute } = useAudioContext();

  return (
    <button
      onClick={toggleMute}
      style={{
        position: 'fixed',
        bottom: '1.4rem',
        left: '1.4rem',
        zIndex: 50,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        padding: '0.3rem 0.4rem',
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '0.52rem',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: muted ? '#1a2a44' : '#2277ee',
        textShadow: muted ? 'none' : '0 0 8px #2277ee66',
        transition: 'color 0.2s ease, text-shadow 0.2s ease',
      }}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
    >
      ♪ BGM: {muted ? 'OFF' : 'ON'}
    </button>
  );
}
