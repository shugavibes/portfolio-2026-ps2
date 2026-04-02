'use client';

import { AnimatePresence } from 'framer-motion';
import { WorkIcon } from '@/components/ui/WorkIcon';
import { DetailPanel } from '@/components/ui/DetailPanel';
import { content } from '@/content.config';

interface WorkSectionProps {
  selectedWork: number | null;
  focusedWork: number;
  onSelectWork: (index: number) => void;
  onCloseDetail: () => void;
}

export function WorkSection({
  selectedWork,
  focusedWork,
  onSelectWork,
  onCloseDetail,
}: WorkSectionProps) {
  const selectedEntry = selectedWork !== null ? content.work[selectedWork] : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.8rem',
        width: '100%',
        padding: '0 1rem',
      }}
    >
      {/* Identity block — PS2 "Version Information" aesthetic */}
      <div style={{ textAlign: 'center' }}>
        <h1
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: 'clamp(1.2rem, 3.5vw, 1.8rem)',
            fontWeight: 400,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2277ee',
            textShadow: '0 0 16px #2277ee55, 0 0 4px #2277ee44',
            margin: 0,
          }}
        >
          {content.identity.name}
        </h1>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.62rem',
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: '#2a3a54',
            marginTop: '0.35rem',
          }}
        >
          {content.identity.label}
        </p>
      </div>

      {/* Work icon row — memory card browser style */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
        }}
        role="list"
        aria-label="Work experiences"
      >
        {content.work.map((entry, index) => (
          <div key={entry.id} role="listitem">
            <WorkIcon
              entry={entry}
              index={index}
              isSelected={selectedWork === index}
              isFocused={focusedWork === index && selectedWork === null}
              onClick={() => onSelectWork(index)}
            />
          </div>
        ))}
      </div>

      {/* Detail panel */}
      <div style={{ width: '100%', maxWidth: 580 }}>
        <AnimatePresence mode="wait">
          {selectedEntry && (
            <DetailPanel
              key={selectedEntry.id}
              entry={selectedEntry}
              onClose={onCloseDetail}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
