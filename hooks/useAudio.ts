'use client';

import { useCallback, useRef, useState } from 'react';

// Module-level refs so the audio context persists across renders and
// is shared between the provider and the BGM toggle without closure issues.
let _ctx: AudioContext | null = null;
let _masterGain: GainNode | null = null;
let _started = false;

function buildAudioGraph() {
  if (_started) return;
  _started = true;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const AudioCtx = window.AudioContext ?? (window as any).webkitAudioContext;
  const ctx = new AudioCtx() as AudioContext;
  _ctx = ctx;

  // ── Oscillators ────────────────────────────────────────────
  const makeOsc = (freq: number, gain: number) => {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.value = freq;
    g.gain.value = gain;
    osc.connect(g);
    osc.start();
    return g;
  };

  const osc1 = makeOsc(65, 0.45);   // fundamental drone
  const osc2 = makeOsc(130, 0.2);   // octave
  const osc3 = makeOsc(195, 0.08);  // fifth harmonic

  // ── LFO — slow amplitude tremolo ───────────────────────────
  const lfo = ctx.createOscillator();
  const lfoGain = ctx.createGain();
  lfo.type = 'sine';
  lfo.frequency.value = 0.08;
  lfoGain.gain.value = 0.15;
  lfo.start();

  // ── Mix → filter → compressor → master ────────────────────
  const mixGain = ctx.createGain();
  mixGain.gain.value = 0.5;
  lfo.connect(lfoGain);
  lfoGain.connect(mixGain.gain);

  const filter = ctx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 260;
  filter.Q.value = 0.7;

  const compressor = ctx.createDynamicsCompressor();
  compressor.threshold.value = -22;
  compressor.knee.value = 30;
  compressor.ratio.value = 4;
  compressor.attack.value = 0.005;
  compressor.release.value = 0.3;

  const masterGain = ctx.createGain();
  masterGain.gain.value = 0.12;
  _masterGain = masterGain;

  [osc1, osc2, osc3].forEach((g) => g.connect(mixGain));
  mixGain.connect(filter);
  filter.connect(compressor);
  compressor.connect(masterGain);
  masterGain.connect(ctx.destination);

  // Resume in case browser started it suspended
  ctx.resume();
}

// ── UI Sound Effects ────────────────────────────────────────────────────────
// All synthesized — no audio files. Three sounds matching PS2 UI feedback:
//   playHover  — brief soft tick when cursor moves to a new item
//   playSelect — two-tone ascending blip when confirming a selection
//   playBack   — descending blip when pressing back/cancel

function uiTone(freq: number, gainPeak: number, duration: number, delay = 0) {
  if (!_ctx) return;
  const ctx = _ctx;
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = freq;
  const t = ctx.currentTime + delay;
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(gainPeak, t + 0.008);
  g.gain.exponentialRampToValueAtTime(0.0001, t + duration);
  osc.connect(g);
  g.connect(ctx.destination);
  osc.start(t);
  osc.stop(t + duration + 0.01);
}

export function playHover() {
  // Single soft tick — 900 Hz, very quiet, 60 ms
  uiTone(900, 0.055, 0.06);
}

export function playSelect() {
  // Two-tone ascending: 660 Hz then 990 Hz — PS2 confirm feel
  uiTone(660, 0.1, 0.1, 0);
  uiTone(990, 0.12, 0.1, 0.07);
}

export function playBack() {
  // Two-tone descending: 880 Hz then 550 Hz — cancel/back feel
  uiTone(880, 0.09, 0.09, 0);
  uiTone(550, 0.07, 0.1, 0.07);
}

export function useAudio() {
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const startedStateRef = useRef(false);

  const start = useCallback(() => {
    if (startedStateRef.current) return;
    startedStateRef.current = true;
    buildAudioGraph();
    setStarted(true);
  }, []);

  const toggleMute = useCallback(() => {
    if (!_started) {
      start();
      return;
    }
    if (!_ctx || !_masterGain) return;

    setMuted((prev) => {
      const next = !prev;
      _masterGain!.gain.setTargetAtTime(next ? 0 : 0.12, _ctx!.currentTime, 0.08);
      return next;
    });
  }, [start]);

  return { started, muted, start, toggleMute };
}
