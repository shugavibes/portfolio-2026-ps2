'use client';

import { FileRow } from '@/components/ui/FileRow';
import { content } from '@/content.config';

const ICON_COLORS: Record<string, string> = {
  '★': '#2277ee',
  '♦': '#4499cc',
  '●': '#1a5599',
};

export function MiscSection() {
  return (
    <div style={{ width: '100%', maxWidth: 560, padding: '0 1rem' }}>
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
          Misc
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.55rem',
            color: '#1a2a44',
            letterSpacing: '0.08em',
          }}
        >
          {content.misc.length} entries
        </span>
      </div>

      {content.misc.map((item, index) => (
        <FileRow
          key={item.id}
          index={index}
          title={item.text}
          description=""
          icon={item.icon}
          accentColor={ICON_COLORS[item.icon] ?? '#2277ee'}
        />
      ))}
    </div>
  );
}
