'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { playHover, playSelect } from '@/hooks/useAudio';

interface FileRowProps {
  index: number;
  title: string;
  description: string;
  icon?: string;
  url?: string;
  accentColor?: string;
  onClick?: () => void;
}

export function FileRow({
  index,
  title,
  description,
  icon,
  url,
  accentColor = '#2277ee',
  onClick,
}: FileRowProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    playSelect();
    if (url) {
      setActive(true);
      setTimeout(() => {
        setActive(false);
        window.open(url, '_blank', 'noopener,noreferrer');
      }, 320);
    }
    onClick?.();
  };

  return (
    <motion.div
      onClick={handleClick}
      onHoverStart={playHover}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.85rem',
        padding: '0.65rem 0.5rem',
        cursor: url ? 'pointer' : 'default',
        borderBottom: '1px solid #090f1e',
      }}
      whileHover={url ? { backgroundColor: 'rgba(20,50,100,0.18)' } : {}}
    >
      {/* Row number */}
      <span
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '0.58rem',
          color: '#1a2a44',
          minWidth: '1.4rem',
          textAlign: 'right',
          letterSpacing: '0.04em',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon (misc only) */}
      {icon && (
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.7rem',
            color: accentColor,
            minWidth: '1rem',
            opacity: 0.75,
          }}
        >
          {icon}
        </span>
      )}

      {/* Cursor */}
      <motion.span
        style={{
          fontFamily: 'var(--font-geist-mono), monospace',
          fontSize: '0.65rem',
          color: active ? accentColor : '#1a2a44',
          minWidth: '0.8rem',
        }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: active ? 1 : 0 }}
        transition={{ duration: 0.12 }}
      >
        ›
      </motion.span>

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.76rem',
            color: active ? '#dce8f8' : '#8898b8',
            letterSpacing: '0.02em',
          }}
        >
          {title}
        </span>
        {description && (
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.6rem',
              color: '#2a3a54',
              marginLeft: '0.75rem',
            }}
          >
            — {description}
          </span>
        )}
      </div>

      {/* Open indicator */}
      {url && (
        <motion.span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.55rem',
            color: accentColor,
            letterSpacing: '0.1em',
            textShadow: `0 0 6px ${accentColor}88`,
            flexShrink: 0,
          }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.15 }}
        >
          OPEN ▶
        </motion.span>
      )}
    </motion.div>
  );
}
