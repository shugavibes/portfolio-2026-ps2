'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Fixed floating cube positions — no Math.random() to avoid hydration mismatch
const CUBES = [
  { x: 8,  y: 18, s: 5, d: 5.2, delay: 0.0 },
  { x: 22, y: 72, s: 3, d: 4.8, delay: 0.4 },
  { x: 38, y: 35, s: 7, d: 6.1, delay: 0.8 },
  { x: 51, y: 58, s: 4, d: 5.5, delay: 0.2 },
  { x: 63, y: 24, s: 6, d: 4.6, delay: 1.1 },
  { x: 74, y: 80, s: 3, d: 5.9, delay: 0.6 },
  { x: 85, y: 45, s: 5, d: 4.3, delay: 0.3 },
  { x: 14, y: 60, s: 4, d: 6.4, delay: 1.5 },
  { x: 44, y: 85, s: 6, d: 5.0, delay: 0.9 },
  { x: 92, y: 15, s: 3, d: 4.7, delay: 1.2 },
  { x: 30, y: 10, s: 5, d: 5.8, delay: 0.7 },
  { x: 68, y: 62, s: 4, d: 6.0, delay: 1.8 },
];

export function PlaySection() {
  const [phase, setPhase] = useState<'intro' | 'game'>('intro');

  useEffect(() => {
    // Show logo after brief black screen, then transition to game
    const t = setTimeout(() => setPhase('game'), 5800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative', background: '#000' }}>
      {/* Emulator iframe always mounted — ROM downloads during intro */}
      <iframe
        src="/emulator/index.html"
        style={{ width: '100%', height: '100%', border: 'none', display: 'block' }}
        allow="fullscreen; autoplay"
        title="Crash Bandicoot — PS1"
      />

      {/* PS1 startup animation overlay */}
      <AnimatePresence>
        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
            }}
          >
            {/* Floating cubes */}
            {CUBES.map((c, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: [0, 0.35, 0.2, 0.35], rotate: 360 }}
                transition={{ duration: c.d, delay: c.delay, repeat: Infinity, ease: 'linear' }}
                style={{
                  position: 'absolute',
                  left: `${c.x}%`,
                  top: `${c.y}%`,
                  width: c.s * 6,
                  height: c.s * 6,
                  border: '1px solid rgba(180,200,255,0.4)',
                  background: 'rgba(100,140,220,0.08)',
                }}
              />
            ))}

            {/* PlayStation logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, duration: 1.4, ease: 'easeOut' }}
              style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
            >
              <div
                style={{
                  fontSize: '3.8rem',
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  background: 'linear-gradient(180deg, #fff 0%, #c8d8f8 30%, #8aaae8 60%, #4466bb 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  textShadow: 'none',
                  filter: 'drop-shadow(0 0 24px rgba(100,160,255,0.5))',
                  userSelect: 'none',
                }}
              >
                PlayStation
              </div>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.6, duration: 1.0, ease: 'easeOut' }}
                style={{
                  height: 1,
                  background: 'linear-gradient(90deg, transparent, #4466bb88, transparent)',
                  marginTop: '0.6rem',
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
