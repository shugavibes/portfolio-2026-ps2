'use client';

import { motion } from 'framer-motion';

// Each icon is a constellation of glowing dots — faithful to the actual PS2
// browser menu where icons are floating light-points in space, not box shapes.

interface Dot {
  cx: number;
  cy: number;
  r: number;
  brightness: number; // 0-1
}

// Dot patterns per section — abstract arrangements in 44×44 viewBox
const DOT_PATTERNS: Record<number, Dot[]> = {
  // WORK.EXE — disc/ring of dots
  0: [
    { cx: 22, cy: 22, r: 2.2, brightness: 1 },
    { cx: 22, cy: 10, r: 1.6, brightness: 0.8 },
    { cx: 31, cy: 14, r: 1.4, brightness: 0.7 },
    { cx: 34, cy: 22, r: 1.6, brightness: 0.8 },
    { cx: 31, cy: 30, r: 1.4, brightness: 0.7 },
    { cx: 22, cy: 34, r: 1.6, brightness: 0.8 },
    { cx: 13, cy: 30, r: 1.4, brightness: 0.6 },
    { cx: 10, cy: 22, r: 1.6, brightness: 0.7 },
    { cx: 13, cy: 14, r: 1.4, brightness: 0.6 },
  ],
  // LATEST_IDEAS — signal/broadcast triangle pointing up
  1: [
    { cx: 22, cy: 8,  r: 2.0, brightness: 1 },
    { cx: 14, cy: 20, r: 1.6, brightness: 0.8 },
    { cx: 30, cy: 20, r: 1.6, brightness: 0.8 },
    { cx: 8,  cy: 32, r: 1.4, brightness: 0.6 },
    { cx: 22, cy: 28, r: 1.5, brightness: 0.7 },
    { cx: 36, cy: 32, r: 1.4, brightness: 0.6 },
  ],
  // MISC — organic scattered cluster
  2: [
    { cx: 18, cy: 12, r: 1.8, brightness: 0.9 },
    { cx: 30, cy: 10, r: 1.4, brightness: 0.7 },
    { cx: 10, cy: 22, r: 1.5, brightness: 0.8 },
    { cx: 24, cy: 22, r: 2.0, brightness: 1 },
    { cx: 34, cy: 26, r: 1.4, brightness: 0.7 },
    { cx: 16, cy: 33, r: 1.5, brightness: 0.6 },
    { cx: 28, cy: 36, r: 1.8, brightness: 0.8 },
  ],
  // CONNECT — envelope/message arrangement (rectangle corners + center)
  3: [
    { cx: 10, cy: 14, r: 1.8, brightness: 0.8 },
    { cx: 34, cy: 14, r: 1.8, brightness: 0.8 },
    { cx: 22, cy: 18, r: 2.0, brightness: 1 },
    { cx: 10, cy: 30, r: 1.8, brightness: 0.8 },
    { cx: 34, cy: 30, r: 1.8, brightness: 0.8 },
    { cx: 16, cy: 22, r: 1.4, brightness: 0.6 },
    { cx: 28, cy: 22, r: 1.4, brightness: 0.6 },
  ],
  // PLAY — triangle play-button shape
  4: [
    { cx: 14, cy: 12, r: 2.0, brightness: 1 },
    { cx: 14, cy: 22, r: 2.0, brightness: 1 },
    { cx: 14, cy: 32, r: 2.0, brightness: 1 },
    { cx: 22, cy: 17, r: 1.8, brightness: 0.9 },
    { cx: 22, cy: 27, r: 1.8, brightness: 0.9 },
    { cx: 30, cy: 22, r: 2.2, brightness: 1 },
  ],
};

interface DotClusterIconProps {
  sectionId: number;
  isActive: boolean;
  size?: number;
}

export function DotClusterIcon({ sectionId, isActive, size = 44 }: DotClusterIconProps) {
  const dots = DOT_PATTERNS[sectionId] ?? DOT_PATTERNS[0];

  // Active: bright white-blue dots with glow
  // Inactive: very dim blue-gray dots
  const activeFill = '#c8e0ff';
  const inactiveFill = '#1a2a44';

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id={`glow-active-${sectionId}`} x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id={`glow-idle-${sectionId}`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {dots.map((dot, i) => (
        <motion.circle
          key={i}
          cx={dot.cx}
          cy={dot.cy}
          r={dot.r}
          fill={isActive ? activeFill : inactiveFill}
          filter={
            isActive
              ? `url(#glow-active-${sectionId})`
              : `url(#glow-idle-${sectionId})`
          }
          animate={
            isActive
              ? {
                  opacity: [
                    dot.brightness * 0.75,
                    dot.brightness,
                    dot.brightness * 0.75,
                  ],
                }
              : { opacity: dot.brightness * 0.25 }
          }
          transition={
            isActive
              ? {
                  duration: 1.8 + i * 0.18,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: i * 0.08,
                }
              : { duration: 0.4 }
          }
        />
      ))}
    </svg>
  );
}
