'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { WorkEntry } from '@/types';

// Matches PS2 screenshot 6: dark navy background, gold title, clean
// label → value data rows. No box borders, no chrome — just floating text.

interface DetailPanelProps {
  entry: WorkEntry;
  onClose: () => void;
}

type TabId = 'front' | 'back';

export function DetailPanel({ entry, onClose }: DetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('front');

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28, ease: 'easeOut' }}
      style={{
        background: 'linear-gradient(160deg, #000d28 0%, #000518 100%)',
        border: '1px solid #0e1e3a',
        borderRadius: 6,
        overflow: 'hidden',
        width: '100%',
        maxWidth: 580,
        margin: '0 auto',
      }}
    >
      {/* Header row — icon strip + company + tabs */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          padding: '0.75rem 1.4rem',
          borderBottom: '1px solid #0e1e3a',
        }}
      >
        {/* Tiny color chip — the only color on the page */}
        <div
          style={{
            width: 28,
            height: 20,
            borderRadius: 2,
            background: `linear-gradient(160deg, #0a0a12 0%, ${entry.color}44 100%)`,
            border: `1px solid ${entry.color}66`,
            flexShrink: 0,
          }}
        />

        {/* Title — gold, PS2 style */}
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.85rem',
            color: '#c8a800',
            letterSpacing: '0.06em',
            textShadow: '0 0 8px #c8a80055',
            flex: 1,
          }}
        >
          {entry.company}
        </span>

        {/* Tab switcher — minimal PS2 menu style */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['front', 'back'] as TabId[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.55rem',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: activeTab === tab ? '#2277ee' : '#2a3a54',
                textShadow: activeTab === tab ? '0 0 6px #2277ee88' : 'none',
                padding: '2px 4px',
              }}
            >
              {'▸'} {tab}
            </button>
          ))}

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.55rem',
              letterSpacing: '0.15em',
              color: '#2a3a54',
              marginLeft: '0.5rem',
              padding: '2px 4px',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '1.2rem 1.4rem', minHeight: 140 }}>
        <AnimatePresence mode="wait">
          {activeTab === 'front' ? (
            <motion.div
              key="front"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              {/* Role + dates — key/value style, PS2 Version Info aesthetic */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'max-content 1fr',
                  columnGap: '1.5rem',
                  rowGap: '0.4rem',
                  marginBottom: '1rem',
                }}
              >
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.7rem', color: '#556688', letterSpacing: '0.06em' }}>
                  Role
                </span>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.7rem', color: '#dce8f8', letterSpacing: '0.02em' }}>
                  {entry.role}
                </span>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.7rem', color: '#556688', letterSpacing: '0.06em' }}>
                  Period
                </span>
                <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.7rem', color: '#dce8f8' }}>
                  {entry.dates}
                </span>
              </div>

              {/* Bullets */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {entry.bullets.map((bullet, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      gap: '0.6rem',
                      fontFamily: 'var(--font-geist-mono), monospace',
                      fontSize: '0.68rem',
                      color: '#8090a8',
                      lineHeight: 1.6,
                    }}
                  >
                    <span style={{ color: '#1a3060', flexShrink: 0 }}>›</span>
                    {bullet}
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '0.7rem',
                  color: '#7090b0',
                  lineHeight: 1.85,
                  fontStyle: 'italic',
                }}
              >
                &ldquo;{entry.backContent}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer hint — like PS2 button prompts */}
      <div
        style={{
          padding: '0.5rem 1.4rem',
          borderTop: '1px solid #0a1428',
          display: 'flex',
          gap: '1.5rem',
        }}
      >
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.5rem', color: '#1a2a44', letterSpacing: '0.1em' }}>
          ✕ CLOSE
        </span>
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.5rem', color: '#1a2a44', letterSpacing: '0.1em' }}>
          △ SWITCH TAB
        </span>
      </div>
    </motion.div>
  );
}
