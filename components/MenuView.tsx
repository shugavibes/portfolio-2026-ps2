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

const SECTIONS = [
  { id: 0, label: 'Browser' },
  { id: 1, label: 'Network' },
  { id: 2, label: 'System Config' },
  { id: 3, label: 'Connect' },
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
        {/* Left: animated dot cluster — changes with focused item */}
        <div style={{ width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={focusedMenu}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.2 }}
            >
              <DotClusterIcon sectionId={focusedMenu} isActive size={64} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: vertical label list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
          {SECTIONS.map((s, i) => {
            const isActive = i === focusedMenu;
            return (
              <motion.button
                key={s.id}
                onClick={() => { onFocus(i); onEnter(); }}
                onMouseEnter={() => onFocus(i)}
                style={{
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  textAlign: 'left',
                }}
                animate={{
                  opacity: isActive ? 1 : 0.32,
                }}
                transition={{ duration: 0.2 }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: isActive ? '1.35rem' : '0.82rem',
                    fontWeight: isActive ? 400 : 300,
                    letterSpacing: isActive ? '0.04em' : '0.06em',
                    color: isActive ? '#2277ee' : '#556688',
                    textShadow: isActive
                      ? '0 0 20px #2277ee66, 0 0 6px #2277ee44'
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
