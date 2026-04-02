'use client';

import { createContext, useContext, useEffect, useRef } from 'react';
import { useAudio } from '@/hooks/useAudio';

interface AudioContextValue {
  started: boolean;
  muted: boolean;
  start: () => void;
  toggleMute: () => void;
}

const AudioCtx = createContext<AudioContextValue>({
  started: false,
  muted: false,
  start: () => {},
  toggleMute: () => {},
});

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const audio = useAudio();
  const startedRef = useRef(false);

  // Start on first user interaction
  useEffect(() => {
    const handler = () => {
      if (!startedRef.current) {
        startedRef.current = true;
        audio.start();
      }
    };
    window.addEventListener('click', handler, { once: true });
    window.addEventListener('keydown', handler, { once: true });
    window.addEventListener('touchstart', handler, { once: true });
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('touchstart', handler);
    };
  }, [audio]);

  return <AudioCtx.Provider value={audio}>{children}</AudioCtx.Provider>;
}

export function useAudioContext() {
  return useContext(AudioCtx);
}
