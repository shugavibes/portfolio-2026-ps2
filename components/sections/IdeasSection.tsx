'use client';

import { FileRow } from '@/components/ui/FileRow';
import { content } from '@/content.config';

export function IdeasSection() {
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: '0 1rem' }}>
      {/* PS2 panel header — gold label + dim meta */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: '0.6rem',
          marginBottom: '0.25rem',
          borderBottom: '1px solid #0a1428',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.75rem',
            color: '#c8a800',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            textShadow: '0 0 6px #c8a80044',
          }}
        >
          Latest Ideas
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.55rem',
            color: '#1a2a44',
            letterSpacing: '0.08em',
          }}
        >
          {content.ideas.length} entries
        </span>
      </div>

      {content.ideas.map((idea, index) => (
        <FileRow
          key={idea.id}
          index={index}
          title={idea.title}
          description={idea.description}
          url={idea.url}
          accentColor="#2277ee"
        />
      ))}
    </div>
  );
}
