'use client';

import { motion } from 'framer-motion';
import type { SectionId, NavSection } from '@/types';

const SECTIONS: NavSection[] = [
  { id: 0, emoji: '💿', label: 'WORK.EXE' },
  { id: 1, emoji: '📡', label: 'LATEST_IDEAS' },
  { id: 2, emoji: '🎮', label: 'MISC' },
  { id: 3, emoji: '📬', label: 'CONNECT' },
];

interface PS2NavProps {
  activeSection: SectionId;
  onSectionChange: (id: SectionId) => void;
}

export function PS2Nav({ activeSection, onSectionChange }: PS2NavProps) {
  return (
    <nav
      className="flex items-center justify-center gap-8 md:gap-14"
      aria-label="Main navigation"
    >
      {SECTIONS.map((section) => {
        const isActive = section.id === activeSection;
        return (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className="flex flex-col items-center gap-2 cursor-pointer bg-transparent border-none"
            animate={{
              scale: isActive ? 1.25 : 0.85,
              opacity: isActive ? 1 : 0.35,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            whileHover={{ opacity: isActive ? 1 : 0.65, scale: isActive ? 1.28 : 0.95 }}
            aria-label={section.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Icon tile */}
            <motion.div
              className="flex items-center justify-center rounded-lg"
              style={{
                width: 56,
                height: 56,
                background: isActive
                  ? 'rgba(0, 71, 171, 0.3)'
                  : 'rgba(51, 68, 102, 0.2)',
                border: `1px solid ${isActive ? 'rgba(0, 207, 255, 0.7)' : 'rgba(51, 68, 102, 0.4)'}`,
                boxShadow: isActive
                  ? '0 0 20px rgba(0, 207, 255, 0.3), 0 0 6px rgba(0, 136, 255, 0.4), inset 0 0 12px rgba(0, 71, 171, 0.2)'
                  : 'none',
              }}
              animate={{
                boxShadow: isActive
                  ? [
                      '0 0 20px rgba(0,207,255,0.3), 0 0 6px rgba(0,136,255,0.4)',
                      '0 0 28px rgba(0,207,255,0.5), 0 0 10px rgba(0,136,255,0.6)',
                      '0 0 20px rgba(0,207,255,0.3), 0 0 6px rgba(0,136,255,0.4)',
                    ]
                  : '0 0 0px transparent',
              }}
              transition={isActive ? { duration: 2, repeat: Infinity, ease: 'easeInOut' } : { duration: 0.3 }}
            >
              <span style={{ fontSize: 28, lineHeight: 1 }}>{section.emoji}</span>
            </motion.div>

            {/* Label */}
            <span
              className="font-mono text-center"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.12em',
                color: isActive ? '#00cfff' : '#334466',
                textShadow: isActive ? '0 0 6px #00cfff' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {section.label}
            </span>
          </motion.button>
        );
      })}
    </nav>
  );
}
