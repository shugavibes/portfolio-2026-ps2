'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import type { WorkEntry } from '@/types';

interface DetailPanelProps {
  entry: WorkEntry;
  onClose: () => void;
}

type TabId = 'front' | 'back';

export function DetailPanel({ entry, onClose }: DetailPanelProps) {
  const [activeTab, setActiveTab] = useState<TabId>('front');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="ps2-panel relative w-full max-w-2xl mx-auto rounded-xl overflow-hidden"
    >
      {/* Header bar */}
      <div
        className="flex items-center justify-between px-5 py-3"
        style={{
          borderBottom: '1px solid rgba(0, 71, 171, 0.4)',
          background: 'rgba(0, 5, 30, 0.5)',
        }}
      >
        <div className="flex items-center gap-3">
          {/* Color indicator */}
          <div
            className="rounded"
            style={{
              width: 10,
              height: 10,
              background: entry.color,
              boxShadow: `0 0 6px ${entry.color}`,
            }}
          />
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: '#00cfff', textShadow: '0 0 6px #00cfff' }}
          >
            {entry.company}
          </span>
          <span className="font-mono text-xs" style={{ color: '#334466' }}>
            / {entry.dates}
          </span>
        </div>

        {/* Tab toggle */}
        <div className="flex items-center gap-1">
          {(['front', 'back'] as TabId[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className="font-mono text-xs tracking-widest uppercase px-3 py-1 rounded cursor-pointer transition-all duration-150"
              style={{
                background: activeTab === tab ? 'rgba(0, 71, 171, 0.4)' : 'transparent',
                border: `1px solid ${activeTab === tab ? 'rgba(0, 207, 255, 0.5)' : 'rgba(51, 68, 102, 0.4)'}`,
                color: activeTab === tab ? '#00cfff' : '#334466',
                textShadow: activeTab === tab ? '0 0 4px #00cfff' : 'none',
              }}
            >
              {'▸'} {tab}
            </button>
          ))}

          <button
            onClick={onClose}
            className="ml-3 cursor-pointer transition-opacity duration-150 hover:opacity-80"
            style={{
              background: 'none',
              border: 'none',
              color: '#334466',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Close detail panel"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-5" style={{ minHeight: 160 }}>
        <AnimatePresence mode="wait">
          {activeTab === 'front' ? (
            <motion.div
              key="front"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.2 }}
            >
              {/* Role */}
              <p
                className="font-mono text-sm mb-4 tracking-wide"
                style={{ color: '#e8f4ff', textShadow: '0 0 4px rgba(232,244,255,0.2)' }}
              >
                {entry.role}
              </p>

              {/* Bullets */}
              <ul className="space-y-2">
                {entry.bullets.map((bullet, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 font-mono text-xs leading-relaxed"
                    style={{ color: '#a0b8d8' }}
                  >
                    <span style={{ color: '#0047ab', flexShrink: 0, marginTop: 1 }}>›</span>
                    {bullet}
                  </li>
                ))}
              </ul>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.2 }}
            >
              <p
                className="font-mono text-xs leading-relaxed italic"
                style={{ color: '#a0b8d8', lineHeight: 1.8 }}
              >
                &ldquo;{entry.backContent}&rdquo;
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
