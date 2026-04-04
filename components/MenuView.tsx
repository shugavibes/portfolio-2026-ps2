'use client';

// The PS2 browser selection screen — faithfully reproduced.
//
// Layout (from the reference screenshots):
//   Black void.
//   Left-center: animated dot cluster icon (changes per focused item).
//   Right of cluster: vertical list of section names.
//     Active item — large, electric blue.
//     Inactive items — smaller, dim gray, stacked below.
//   Bottom: button hints (× Enter | △ Version).

import { motion, AnimatePresence } from 'framer-motion';
import { DotClusterIcon } from '@/components/ui/DotClusterIcon';
import { playHover, playSelect } from '@/hooks/useAudio';

const SECTIONS = [
  { id: 0, label: 'Browser' },
  { id: 1, label: 'Network' },
  { id: 2, label: 'Random cool things' },
  { id: 3, label: 'Connect' },
  { id: 4, label: 'Play' },
];

interface MenuViewProps {
  focusedMenu: number;
  onFocus: (i: number) => void;
  onEnter: () => void;
}

export function MenuView({ focusedMenu, onFocus, onEnter }: MenuViewProps) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Centre block: dot cluster + label list */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '3.5rem',
          // Slightly above centre to make room for bottom hints
          marginTop: '-4vh',
        }}
      >
        {/* Left: animated dot cluster — larger for presence */}
        <div style={{ width: 140, height: 140, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={focusedMenu}
              initial={{ opacity: 0, scale: 0.65 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.65 }}
              transition={{ duration: 0.22 }}
            >
              <DotClusterIcon sectionId={focusedMenu} isActive size={120} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: vertical label list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          {SECTIONS.map((s, i) => {
            const isActive = i === focusedMenu;
            return (
              <motion.button
                key={s.id}
                onClick={() => { playSelect(); onFocus(i); onEnter(); }}
                onMouseEnter={() => { playHover(); onFocus(i); }}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                animate={{
                  opacity: isActive ? 1 : 0.6,
                }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: isActive ? '1.7rem' : '1rem',
                    fontWeight: 400,
                    letterSpacing: isActive ? '0.04em' : '0.06em',
                    color: isActive ? '#2277ee' : '#7a99cc',
                    textShadow: isActive
                      ? '0 0 24px #2277ee88, 0 0 8px #2277ee55'
                      : 'none',
                    display: 'block',
                    lineHeight: 1,
                    transition: 'font-size 0.2s ease, color 0.2s ease',
                  }}
                >
                  {s.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Bottom button hints — PS2 style */}
      <div
        style={{
          position: 'absolute',
          bottom: '2.5rem',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '3rem',
        }}
      >
        <HintButton symbol="×" label="Enter" color="#4466bb" />
        <HintButton symbol="△" label="Version" color="#44aa66" />
      </div>
    </div>
  );
}

function HintButton({ symbol, label, color }: { symbol: string; label: string; color: string }) {
  return (
    <span
      style={{
        fontFamily: 'var(--font-geist-mono), monospace',
        fontSize: '0.65rem',
        color: '#334466',
        letterSpacing: '0.1em',
        display: 'flex',
        alignItems: 'center',
        gap: '0.4rem',
      }}
    >
      <span style={{ color, fontSize: '0.8rem' }}>{symbol}</span>
      {label}
    </span>
  );
}
