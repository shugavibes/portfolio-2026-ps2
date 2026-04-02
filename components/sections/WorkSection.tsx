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
    <div className="flex flex-col items-center gap-6 w-full px-4">
      {/* Identity block */}
      <div className="text-center mb-2">
        <h1
          className="font-mono font-bold tracking-widest uppercase"
          style={{
            fontSize: 'clamp(1.4rem, 4vw, 2.2rem)',
            color: '#e8f4ff',
            textShadow: '0 0 20px rgba(0,136,255,0.5), 0 0 6px rgba(0,207,255,0.3)',
            letterSpacing: '0.18em',
          }}
        >
          {content.identity.name}
        </h1>
        <p
          className="font-mono mt-1"
          style={{
            fontSize: 'clamp(0.65rem, 1.5vw, 0.8rem)',
            color: '#334466',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
          }}
        >
          {content.identity.label}
        </p>
      </div>

      {/* Work icon row */}
      <div
        className="flex items-end justify-center gap-3 md:gap-5 flex-wrap"
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
      <div className="w-full max-w-2xl">
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
