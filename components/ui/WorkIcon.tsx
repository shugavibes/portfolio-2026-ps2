'use client';

import { motion } from 'framer-motion';
import type { WorkEntry } from '@/types';
import { playHover, playSelect } from '@/hooks/useAudio';

// PS2 memory card save icon: dark square, near-black, with a bright inner
// glow that pulses on selection. No color fill — the glow IS the identity.
// When selected: white-blue light radiates from center, casts a halo below.

interface WorkIconProps {
  entry: WorkEntry;
  index: number;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
}

const ICON_SIZE = 80;

export function WorkIcon({ entry, isSelected, isFocused, onClick }: WorkIconProps) {
  return (
    <motion.button
      onClick={() => { playSelect(); onClick(); }}
      onHoverStart={playHover}
      className="flex flex-col items-center cursor-pointer bg-transparent border-none"
      style={{ padding: 0, gap: 8 }}
      animate={{
        scale: isSelected ? 1.12 : isFocused ? 1.04 : 1,
        opacity: isSelected ? 1 : isFocused ? 0.9 : 0.65,
      }}
      whileHover={{ scale: isSelected ? 1.14 : 1.06, opacity: 0.9 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      {/* Memory card tile */}
      <div style={{ position: 'relative', width: ICON_SIZE, height: ICON_SIZE }}>
        {/* Base tile — dark, near-black with slight tint from entry.color */}
        <motion.div
          style={{
            width: ICON_SIZE,
            height: ICON_SIZE,
            borderRadius: 4,
            background: `linear-gradient(160deg, #0a0a12 0%, ${entry.color}18 100%)`,
            border: `1px solid ${isSelected ? '#334466' : '#111820'}`,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Inner glow — the PS2 signature: a bright centered light spot */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              background: isSelected
                ? `radial-gradient(ellipse at 50% 55%, rgba(200,225,255,0.55) 0%, rgba(140,190,255,0.18) 40%, transparent 70%)`
                : `radial-gradient(ellipse at 50% 55%, rgba(180,210,255,0.12) 0%, transparent 60%)`,
            }}
            animate={
              isSelected
                ? {
                    opacity: [0.75, 1, 0.75],
                  }
                : { opacity: 1 }
            }
            transition={
              isSelected
                ? { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
          />

          {/* Company logo — centered in the tile */}
          {entry.logo && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0',
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={entry.logo}
                alt={entry.company}
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'cover',
                  opacity: isSelected ? 1 : 0.8,
                }}
              />
            </div>
          )}

          {/* Color accent bar at bottom — thin, like a label strip */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 3,
              background: entry.color,
              opacity: isSelected ? 0.9 : 0.3,
            }}
          />
        </motion.div>

        {/* Drop shadow glow — below the tile, PS2 style */}
        {isSelected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              position: 'absolute',
              bottom: -10,
              left: '50%',
              transform: 'translateX(-50%)',
              width: ICON_SIZE * 0.7,
              height: 10,
              background: 'rgba(180, 215, 255, 0.5)',
              borderRadius: '50%',
              filter: 'blur(8px)',
            }}
          />
        )}
      </div>

      {/* Label */}
      <span
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '0.56rem',
          letterSpacing: '0.08em',
          color: isSelected ? '#c8a800' : '#2a3a54',
          textShadow: isSelected ? '0 0 6px #c8a80066' : 'none',
          maxWidth: ICON_SIZE + 16,
          whiteSpace: 'normal',
          textAlign: 'center',
          textTransform: 'uppercase',
          lineHeight: 1.4,
        }}
      >
        {entry.label}
      </span>
    </motion.button>
  );
}
