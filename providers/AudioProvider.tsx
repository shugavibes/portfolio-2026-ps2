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
  // Use a ref so the effect never needs to re-register listeners
  const startRef = useRef(audio.start);
  startRef.current = audio.start;
  const firedRef = useRef(false);

  useEffect(() => {
    const handler = () => {
      if (firedRef.current) return;
      firedRef.current = true;
      startRef.current();
    };

    window.addEventListener('click', handler);
    window.addEventListener('keydown', handler);
    window.addEventListener('touchstart', handler);
    return () => {
      window.removeEventListener('click', handler);
      window.removeEventListener('keydown', handler);
      window.removeEventListener('touchstart', handler);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — register once, use ref to stay current

  return <AudioCtx.Provider value={audio}>{children}</AudioCtx.Provider>;
}

export function useAudioContext() {
  return useContext(AudioCtx);
}
