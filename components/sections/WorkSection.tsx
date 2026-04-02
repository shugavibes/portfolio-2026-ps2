'use client';

// Inside the "Browser" section — matches the PS2 memory card browser.
// Gray radial gradient bg (set by SectionView), icons in a grid,
// identity block at top (like the memory card info), detail panel on select.

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

export function WorkSection({ selectedWork, focusedWork, onSelectWork, onCloseDetail }: WorkSectionProps) {
  const selectedEntry = selectedWork !== null ? content.work[selectedWork] : null;

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1.5rem',
        width: '100%',
        maxWidth: 680,
      }}
    >
      {/* Identity — PS2 "memory card owner" label style */}
      <div style={{ alignSelf: 'flex-start', paddingLeft: '0.5rem' }}>
        <p
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.62rem',
            color: '#888',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {content.identity.label}
        </p>
        <h1
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '1.1rem',
            fontWeight: 400,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: '#dddddd',
            margin: '0.1rem 0 0',
          }}
        >
          {content.identity.name}
        </h1>
      </div>

      {/* Icon grid — 3 columns × 2 rows, like the PS2 save file grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2rem 2rem',
          width: '100%',
        }}
        role="list"
        aria-label="Work experiences"
      >
        {content.work.map((entry, index) => (
          <div
            key={entry.id}
            role="listitem"
            style={{ display: 'flex', justifyContent: 'center' }}
          >
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

      {/* Detail panel — slides in when an icon is selected */}
      <div style={{ width: '100%' }}>
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
