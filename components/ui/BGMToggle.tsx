'use client';

import { useAudioContext } from '@/providers/AudioProvider';

export function BGMToggle() {
  const { muted, toggleMute } = useAudioContext();

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 left-6 z-50 font-mono text-xs tracking-widest uppercase transition-all duration-200 cursor-pointer"
      style={{
        color: muted ? '#334466' : '#00cfff',
        textShadow: muted ? 'none' : '0 0 8px #00cfff, 0 0 2px #00cfff',
        background: 'none',
        border: 'none',
        padding: '0.4rem 0.6rem',
        letterSpacing: '0.1em',
      }}
      aria-label={muted ? 'Unmute background music' : 'Mute background music'}
    >
      ♪ BGM: {muted ? 'OFF' : 'ON'}
    </button>
  );
}
