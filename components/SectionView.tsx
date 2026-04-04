'use client';

// When the user enters a section, this wrapper takes over the full screen.
//
// WORK.EXE (Browser):  gray radial gradient bg — PS2 memory card browser.
// All others:          dark navy bg — PS2 Version Info / System Config style.

import { motion } from 'framer-motion';
import type { SectionId } from '@/types';
import { playBack } from '@/hooks/useAudio';
import { WorkSection } from '@/components/sections/WorkSection';
import { IdeasSection } from '@/components/sections/IdeasSection';
import { MiscSection } from '@/components/sections/MiscSection';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { PlaySection } from '@/components/sections/PlaySection';

const SECTION_TITLES = ['Browser', 'Network', 'Random', 'Connect', 'Play'];

interface SectionViewProps {
  section: SectionId;
  selectedWork: number | null;
  focusedWork: number;
  onSelectWork: (i: number) => void;
  onCloseDetail: () => void;
  onBack: () => void;
}

export function SectionView({
  section,
  selectedWork,
  focusedWork,
  onSelectWork,
  onCloseDetail,
  onBack,
}: SectionViewProps) {
  const isWork = section === 0;
  const isPlay = section === 4;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      style={{
        position: 'absolute',
        inset: 0,
        // The memory card browser uses a gray gradient — faithful to PS2 screenshots 3-5
        // All other sections stay on dark navy
        background: isWork
          ? 'radial-gradient(ellipse at 50% 38%, #9a9a9a 0%, #686868 45%, #383838 100%)'
          : isPlay
          ? '#000008'
          : 'transparent',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Top bar — PS2 header row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.9rem 1.4rem',
          flexShrink: 0,
        }}
      >
        {/* Left: small icon + section label */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {/* PS2 logo / black square indicator */}
          <div
            style={{
              width: 22,
              height: 22,
              background: '#000',
              border: '1px solid #333',
              borderRadius: 2,
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-geist-mono), monospace',
              fontSize: '0.72rem',
              color: isWork ? '#cccccc' : '#556688',
              letterSpacing: '0.08em',
            }}
          >
            {SECTION_TITLES[section]}
          </span>
        </div>

        {/* Right: meta info (gold, PS2 style) */}
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.72rem',
            color: '#c8a800',
            letterSpacing: '0.06em',
            textShadow: '0 0 6px #c8a80044',
          }}
        >
          {isWork ? 'Your System Configuration' : 'System Information'}
        </span>
      </div>

      {/* Content */}
      <div
        style={{
          flex: 1,
          overflow: isPlay ? 'hidden' : 'hidden auto',
          display: 'flex',
          alignItems: isPlay ? 'stretch' : 'flex-start',
          justifyContent: 'center',
          padding: isPlay ? '0' : '0.5rem 1rem 1rem',
          minHeight: 0,
        }}
      >
        {section === 0 && (
          <WorkSection
            selectedWork={selectedWork}
            focusedWork={focusedWork}
            onSelectWork={onSelectWork}
            onCloseDetail={onCloseDetail}
          />
        )}
        {section === 1 && <IdeasSection />}
        {section === 2 && <MiscSection />}
        {section === 3 && <ConnectSection />}
        {section === 4 && <PlaySection />}
      </div>

      {/* Bottom hints — PS2 button prompts */}
      <div
        style={{
          flexShrink: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: '2.5rem',
          padding: '0.7rem 1.4rem',
          borderTop: isWork ? '1px solid rgba(0,0,0,0.2)' : '1px solid #0a1428',
        }}
      >
        <HintButton symbol="×" label="Enter" color="#4466bb" />
        <button
          onClick={() => { playBack(); onBack(); }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.65rem',
            color: '#334466',
            letterSpacing: '0.1em',
          }}
        >
          <span style={{ color: '#bb4444', fontSize: '0.8rem' }}>○</span>
          Back
        </button>
        <HintButton symbol="△" label="Options" color="#44aa66" />
      </div>
    </motion.div>
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
