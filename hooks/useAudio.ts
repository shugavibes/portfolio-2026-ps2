'use client';

import { useCallback, useRef, useState } from 'react';

interface AudioState {
  started: boolean;
  muted: boolean;
}

interface AudioActions {
  start: () => void;
  toggleMute: () => void;
}

export function useAudio(): AudioState & AudioActions {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);

  const ctxRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);

  const start = useCallback(() => {
    if (ctxRef.current) return; // already started

    const ctx = new AudioContext();
    ctxRef.current = ctx;

    // ── Oscillators ──────────────────────────────────────────
    const createOsc = (freq: number, gain: number) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.value = freq;
      g.gain.value = gain;
      osc.connect(g);
      return { osc, gain: g };
    };

    const osc1 = createOsc(65, 0.4);   // fundamental
    const osc2 = createOsc(130, 0.18); // octave
    const osc3 = createOsc(195, 0.07); // fifth

    // ── LFO (amplitude tremolo) ──────────────────────────────
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    lfo.type = 'sine';
    lfo.frequency.value = 0.08;
    lfoGain.gain.value = 0.12;

    // ── Mix gain (LFO target) ────────────────────────────────
    const mixGain = ctx.createGain();
    mixGain.gain.value = 0.5;
    lfo.connect(lfoGain);
    lfoGain.connect(mixGain.gain);

    // ── Filter ───────────────────────────────────────────────
    const filter = ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 280;
    filter.Q.value = 0.8;

    // ── Compressor ───────────────────────────────────────────
    const compressor = ctx.createDynamicsCompressor();
    compressor.threshold.value = -24;
    compressor.knee.value = 30;
    compressor.ratio.value = 4;
    compressor.attack.value = 0.003;
    compressor.release.value = 0.25;

    // ── Master gain ──────────────────────────────────────────
    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.12;
    masterGainRef.current = masterGain;

    // ── Signal chain ─────────────────────────────────────────
    [osc1.gain, osc2.gain, osc3.gain].forEach((g) => g.connect(mixGain));
    mixGain.connect(filter);
    filter.connect(compressor);
    compressor.connect(masterGain);
    masterGain.connect(ctx.destination);

    // ── Start everything ─────────────────────────────────────
    [osc1.osc, osc2.osc, osc3.osc, lfo].forEach((o) => o.start());

    setStarted(true);
  }, []);

  const toggleMute = useCallback(() => {
    if (!masterGainRef.current || !ctxRef.current) {
      // Start on first interaction if not started
      start();
      return;
    }
    const ctx = ctxRef.current;
    const masterGain = masterGainRef.current;

    setMuted((prev) => {
      const nextMuted = !prev;
      masterGain.gain.setTargetAtTime(
        nextMuted ? 0 : 0.12,
        ctx.currentTime,
        0.1
      );
      return nextMuted;
    });
  }, [start]);

  return { started, muted, start, toggleMute };
}
