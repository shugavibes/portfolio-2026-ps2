'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';

export function ConnectSection() {
  const [loading, setLoading] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleConnect = (id: string, url: string) => {
    setActiveId(id);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveId(null);
      window.open(url, '_blank', 'noopener,noreferrer');
    }, 420);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4">
      {/* System panel */}
      <div className="ps2-panel rounded-xl overflow-hidden">
        {/* Panel header */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderBottom: '1px solid rgba(0, 71, 171, 0.4)' }}
        >
          <span
            className="font-mono text-xs tracking-widest uppercase"
            style={{ color: '#00cfff', textShadow: '0 0 6px #00cfff' }}
          >
            SYSTEM / CONNECT
          </span>
          <span
            className="font-mono text-xs"
            style={{ color: '#334466' }}
          >
            {content.identity.name.toUpperCase()}
          </span>
        </div>

        {/* Menu items */}
        <div className="py-2">
          {content.connect.map((item) => {
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleConnect(item.id, item.url)}
                className="w-full text-left font-mono cursor-pointer transition-all duration-150"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  borderLeft: isActive ? '2px solid #00cfff' : '2px solid transparent',
                  backgroundColor: isActive ? 'rgba(0, 71, 171, 0.15)' : 'transparent',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(0, 71, 171, 0.1)';
                  (e.currentTarget as HTMLButtonElement).style.borderLeft = '2px solid rgba(0, 207, 255, 0.5)';
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.borderLeft = '2px solid transparent';
                  }
                }}
              >
                <span style={{ color: '#0047ab', fontSize: '0.7rem' }}>›</span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    color: isActive ? '#e8f4ff' : '#a0b8d8',
                    letterSpacing: '0.08em',
                    textShadow: isActive ? '0 0 6px rgba(0,207,255,0.3)' : 'none',
                  }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <span
                    className="ml-auto font-mono text-xs"
                    style={{ color: '#00cfff', textShadow: '0 0 6px #00cfff' }}
                  >
                    LOADING...
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className="px-5 py-3 flex items-center justify-between"
          style={{ borderTop: '1px solid rgba(0, 71, 171, 0.2)' }}
        >
          <span className="font-mono text-xs" style={{ color: '#1a2a4a' }}>
            SELECT: OPEN IN NEW TAB
          </span>
          <span className="font-mono text-xs" style={{ color: '#1a2a4a' }}>
            ESC: BACK
          </span>
        </div>
      </div>

      {/* Full-screen loading overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            <span
              className="font-mono tracking-widest uppercase"
              style={{
                color: '#00cfff',
                fontSize: '1rem',
                textShadow: '0 0 16px #00cfff, 0 0 4px #00cfff',
                letterSpacing: '0.3em',
              }}
            >
              LOADING...
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
