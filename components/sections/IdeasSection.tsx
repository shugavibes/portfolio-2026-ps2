'use client';

import { FileRow } from '@/components/ui/FileRow';
import { content } from '@/content.config';

export function IdeasSection() {
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
          LATEST_IDEAS
        </span>
        <span
          className="font-mono text-xs ml-auto"
          style={{ color: '#334466' }}
        >
          {content.ideas.length} ENTRIES
        </span>
      </div>

      {/* File list */}
      <div className="flex flex-col">
        {content.ideas.map((idea, index) => (
          <FileRow
            key={idea.id}
            index={index}
            title={idea.title}
            description={idea.description}
            url={idea.url}
            accentColor="#00cfff"
          />
        ))}
      </div>
    </div>
  );
}
