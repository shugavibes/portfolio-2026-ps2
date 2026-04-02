'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { content } from '@/content.config';

export function ConnectSection() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
    <div style={{ width: '100%', maxWidth: 520, padding: '0 1rem' }}>
      {/* Header — PS2 system config style */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          paddingBottom: '0.6rem',
          marginBottom: '0.5rem',
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
          Connect
        </span>
        <span
          style={{
            fontFamily: 'var(--font-geist-mono), monospace',
            fontSize: '0.55rem',
            color: '#1a2a44',
            letterSpacing: '0.08em',
          }}
        >
          {content.identity.name.toUpperCase()}
        </span>
      </div>

      {/* Menu items */}
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {content.connect.map((item) => {
          const isActive = activeId === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleConnect(item.id, item.url)}
              style={{
                background: isActive ? 'rgba(15, 35, 80, 0.5)' : 'none',
                border: 'none',
                borderBottom: '1px solid #090f1e',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '0.85rem 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.85rem',
                transition: 'background 0.15s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'rgba(15,35,80,0.25)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLButtonElement).style.background = 'none';
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '0.65rem',
                  color: isActive ? '#2277ee' : '#1a2a44',
                  minWidth: '0.8rem',
                }}
              >
                ›
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-geist-mono), monospace',
                  fontSize: '0.82rem',
                  color: isActive ? '#dce8f8' : '#6070a0',
                  letterSpacing: '0.06em',
                  flex: 1,
                  textShadow: isActive ? '0 0 8px #dce8f833' : 'none',
                }}
              >
                {item.label}
              </span>
              {isActive && (
                <span
                  style={{
                    fontFamily: 'var(--font-geist-mono), monospace',
                    fontSize: '0.58rem',
                    color: '#2277ee',
                    letterSpacing: '0.12em',
                    textShadow: '0 0 6px #2277ee88',
                  }}
                >
                  LOADING...
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer hints */}
      <div style={{ display: 'flex', gap: '2rem', marginTop: '1.2rem' }}>
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.5rem', color: '#111e36', letterSpacing: '0.1em' }}>
          × ENTER
        </span>
        <span style={{ fontFamily: 'var(--font-geist-mono), monospace', fontSize: '0.5rem', color: '#111e36', letterSpacing: '0.1em' }}>
          ○ BACK
        </span>
      </div>

      {/* LOADING overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="loading-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <span
              style={{
                fontFamily: 'var(--font-geist-mono), monospace',
                fontSize: '0.9rem',
                color: '#2277ee',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                textShadow: '0 0 16px #2277ee88',
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
