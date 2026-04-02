'use client';

import { motion } from 'framer-motion';
import type { WorkEntry } from '@/types';

interface WorkIconProps {
  entry: WorkEntry;
  index: number;
  isSelected: boolean;
  isFocused: boolean;
  onClick: () => void;
}

export function WorkIcon({ entry, isSelected, isFocused, onClick }: WorkIconProps) {
  const active = isSelected || isFocused;

  return (
    <motion.button
      onClick={onClick}
      className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none shrink-0"
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.96 }}
      animate={{
        scale: isSelected ? 1.1 : 1,
      }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Disc tile */}
      <motion.div
        className="relative flex items-center justify-center rounded-xl"
        style={{
          width: 96,
          height: 96,
          background: entry.color,
          border: `1px solid ${isSelected ? 'rgba(0, 207, 255, 0.9)' : active ? 'rgba(0, 207, 255, 0.5)' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: isSelected
            ? `0 0 30px ${entry.color}66, 0 0 12px rgba(0,207,255,0.5), inset 0 0 20px rgba(0,0,0,0.3)`
            : active
            ? `0 0 16px ${entry.color}44, 0 0 6px rgba(0,207,255,0.3)`
            : `0 0 8px ${entry.color}22`,
        }}
        animate={{
          boxShadow: isSelected
            ? [
                `0 0 24px ${entry.color}66, 0 0 10px rgba(0,207,255,0.4)`,
                `0 0 36px ${entry.color}88, 0 0 16px rgba(0,207,255,0.7)`,
                `0 0 24px ${entry.color}66, 0 0 10px rgba(0,207,255,0.4)`,
              ]
            : `0 0 8px ${entry.color}22`,
        }}
        transition={isSelected ? { duration: 1.8, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.25 }}
      >
        {/* Glossy highlight */}
        <div
          style={{
            position: 'absolute',
            top: 6,
            left: 8,
            right: 8,
            height: '35%',
            background: 'linear-gradient(180deg, rgba(255,255,255,0.18) 0%, transparent 100%)',
            borderRadius: '8px 8px 50% 50%',
            pointerEvents: 'none',
          }}
        />

        {/* Abbreviation */}
        <span
          className="font-mono font-bold tracking-widest select-none"
          style={{
            fontSize: entry.abbreviation.length > 2 ? '0.85rem' : '1.1rem',
            color: isSelected ? '#ffffff' : 'rgba(255,255,255,0.75)',
            textShadow: isSelected ? '0 0 8px rgba(255,255,255,0.6)' : 'none',
            letterSpacing: '0.1em',
          }}
        >
          {entry.abbreviation}
        </span>
      </motion.div>

      {/* Label */}
      <span
        className="font-mono text-center"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.08em',
          color: isSelected ? '#e8f4ff' : '#334466',
          textShadow: isSelected ? '0 0 4px rgba(232,244,255,0.4)' : 'none',
          maxWidth: 96,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {entry.label}
      </span>
    </motion.button>
  );
}
