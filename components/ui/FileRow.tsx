'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

interface FileRowProps {
  index: number;
  title: string;
  description: string;
  rightLabel?: string;
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
  accentColor = '#00cfff',
  onClick,
}: FileRowProps) {
  const [active, setActive] = useState(false);

  const handleClick = () => {
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
      className="file-row"
      style={{
        borderLeft: active ? `2px solid ${accentColor}` : '2px solid transparent',
        background: active ? `rgba(0, 71, 171, 0.15)` : 'transparent',
      }}
      whileHover={{
        background: 'rgba(0, 71, 171, 0.1)',
        borderLeft: `2px solid ${accentColor}88`,
      }}
      onClick={handleClick}
    >
      {/* Index */}
      <span
        className="font-mono text-xs shrink-0"
        style={{ color: '#334466', minWidth: '1.5rem', textAlign: 'right' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      {/* Icon (misc only) */}
      {icon && (
        <span
          className="font-mono text-xs shrink-0"
          style={{ color: accentColor, minWidth: '1rem' }}
        >
          {icon}
        </span>
      )}

      {/* Cursor */}
      <motion.span
        className="font-mono text-xs shrink-0"
        style={{ color: accentColor }}
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        animate={{ opacity: active ? 1 : 0 }}
      >
        {'›'}
      </motion.span>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <span
          className="font-mono text-sm tracking-wide"
          style={{
            color: active ? '#e8f4ff' : '#a0b8d8',
            textShadow: active ? `0 0 6px ${accentColor}44` : 'none',
          }}
        >
          {title}
        </span>
        <span
          className="font-mono text-xs ml-3"
          style={{ color: '#334466' }}
        >
          — {description}
        </span>
      </div>

      {/* Open prompt */}
      {url && (
        <motion.span
          className="font-mono text-xs shrink-0"
          style={{ color: accentColor, textShadow: `0 0 6px ${accentColor}` }}
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          OPEN ▶
        </motion.span>
      )}
    </motion.div>
  );
}
