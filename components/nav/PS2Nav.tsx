'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { DotClusterIcon } from '@/components/ui/DotClusterIcon';
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
    <div className="relative flex items-center justify-center" style={{ gap: '3.5rem' }}>
      {SECTIONS.map((section) => {
        const isActive = section.id === activeSection;

        return (
          <motion.button
            key={section.id}
            onClick={() => onSectionChange(section.id)}
            className="relative flex flex-col items-center cursor-pointer border-none bg-transparent"
            style={{ padding: 0 }}
            animate={{ opacity: isActive ? 1 : 0.28 }}
            whileHover={{ opacity: isActive ? 1 : 0.5 }}
            transition={{ duration: 0.35 }}
            aria-label={section.label}
            aria-current={isActive ? 'page' : undefined}
          >
            {/* Dot cluster icon */}
            <motion.div
              animate={{ scale: isActive ? 1.2 : 0.82 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
            >
              <DotClusterIcon sectionId={section.id} isActive={isActive} size={44} />
            </motion.div>

            {/* Label — only rendered at full opacity for active */}
            <motion.span
              animate={{
                opacity: isActive ? 1 : 0.4,
                y: isActive ? 0 : 2,
              }}
              transition={{ duration: 0.3 }}
              style={{
                display: 'block',
                marginTop: '0.55rem',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.2em',
                color: isActive ? '#2277ee' : '#2a3a54',
                textShadow: isActive ? '0 0 8px #2277ee88' : 'none',
                whiteSpace: 'nowrap',
                textTransform: 'uppercase',
              }}
            >
              {section.label}
            </motion.span>

            {/* Selection cursor underline — PS2 style */}
            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ scaleX: 0, opacity: 0 }}
                  animate={{ scaleX: 1, opacity: 1 }}
                  exit={{ scaleX: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    position: 'absolute',
                    bottom: -6,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: 20,
                    height: 1,
                    background: '#2277ee',
                    boxShadow: '0 0 6px #2277ee',
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
