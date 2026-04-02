'use client';

import { FileRow } from '@/components/ui/FileRow';
import { content } from '@/content.config';

const ACCENT_COLORS: Record<string, string> = {
  '★': '#00cfff',
  '♦': '#7ab8f5',
  '●': '#0088ff',
};

export function MiscSection() {
  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* Section header */}
      <div
        className="flex items-center gap-3 mb-6 pb-3"
        style={{ borderBottom: '1px solid rgba(0, 71, 171, 0.3)' }}
      >
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: '#334466' }}
        >
          /
        </span>
        <span
          className="font-mono text-xs tracking-widest uppercase"
          style={{ color: '#0047ab', letterSpacing: '0.18em' }}
        >
          MISC
        </span>
        <span
          className="font-mono text-xs ml-auto"
          style={{ color: '#334466' }}
        >
          {content.misc.length} ENTRIES
        </span>
      </div>

      {/* File list */}
      <div className="flex flex-col">
        {content.misc.map((item, index) => (
          <FileRow
            key={item.id}
            index={index}
            title={item.text}
            description=""
            icon={item.icon}
            accentColor={ACCENT_COLORS[item.icon] ?? '#00cfff'}
          />
        ))}
      </div>
    </div>
  );
}
