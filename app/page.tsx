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
      style={{ position: 'relative', width: '100%', height: '100dvh', minHeight: '100vh', overflow: 'hidden' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Layer 0: Near-black background */}
      <PS2Background />

      {/* Layer 1: UI */}
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
        {/* Top void — 35% — lots of black space, PS2 feel */}
        <div style={{ flex: '0 0 35%' }} />

        {/* Nav zone — icon clusters centered at ~35% from top */}
        <div
          style={{
            flexShrink: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingBottom: '1.2rem',
          }}
        >
          <PS2Nav
            activeSection={nav.activeSection}
            onSectionChange={(id: SectionId) => nav.goToSection(id)}
          />
        </div>

        {/* Thin separator line */}
        <div
          style={{
            flexShrink: 0,
            height: 1,
            margin: '0 auto',
            width: '40%',
            background:
              'linear-gradient(90deg, transparent, #0e2040 30%, #1a3860 50%, #0e2040 70%, transparent)',
          }}
        />

        {/* Content zone — slides between sections */}
        <div
          style={{
            flex: 1,
            overflow: 'hidden auto',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            paddingTop: '2rem',
            paddingBottom: '4rem',
            minHeight: 0,
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={nav.activeSection}
              style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
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

      {/* Layer 2: CRT overlays */}
      <Overlays />

      {/* BGM toggle */}
      <BGMToggle />
    </div>
  );
}
