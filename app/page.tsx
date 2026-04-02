'use client';

import { useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { PS2Background } from '@/components/background/PS2Background';
import { PS2Nav } from '@/components/nav/PS2Nav';
import { Overlays } from '@/components/overlay/Overlays';
import { BGMToggle } from '@/components/ui/BGMToggle';
import { WorkSection } from '@/components/sections/WorkSection';
import { IdeasSection } from '@/components/sections/IdeasSection';
import { MiscSection } from '@/components/sections/MiscSection';
import { ConnectSection } from '@/components/sections/ConnectSection';
import { useNavigation } from '@/hooks/useNavigation';
import type { SectionId } from '@/types';

export default function Home() {
  const nav = useNavigation();
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) >= 60) {
      if (delta < 0) nav.nextSection();
      else nav.prevSection();
    }
    touchStartX.current = null;
  };

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '100vh',
        overflow: 'hidden',
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <PS2Background />

      <div
        style={{
          position: 'relative',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          minHeight: '100vh',
        }}
      >
        {/* Top breathing room — small, just enough PS2 void feel */}
        <div style={{ flex: '0 0 10%', minHeight: 40 }} />

        {/* Nav — icon clusters */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '1rem',
          }}
        >
          <PS2Nav
            activeSection={nav.activeSection}
            onSectionChange={(id: SectionId) => nav.goToSection(id)}
          />
        </div>

        {/* Thin separator */}
        <div
          style={{
            flexShrink: 0,
            height: 1,
            margin: '0 auto',
            width: '50%',
            background:
              'linear-gradient(90deg, transparent, #0e2040 30%, #1a3860 50%, #0e2040 70%, transparent)',
          }}
        />

        {/* Content — takes all remaining space, scrollable */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '1.6rem',
            paddingBottom: '3.5rem',
            minHeight: 0,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={nav.activeSection}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, x: 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -36 }}
              transition={{ duration: 0.28, ease: 'easeInOut' }}
            >
              {nav.activeSection === 0 && (
                <WorkSection
                  selectedWork={nav.selectedWork}
                  focusedWork={nav.focusedWork}
                  onSelectWork={nav.selectWork}
                  onCloseDetail={nav.closeDetail}
                />
              )}
              {nav.activeSection === 1 && <IdeasSection />}
              {nav.activeSection === 2 && <MiscSection />}
              {nav.activeSection === 3 && <ConnectSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <Overlays />
      <BGMToggle />
    </div>
  );
}
