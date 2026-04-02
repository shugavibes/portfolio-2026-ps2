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

const SECTION_TITLES = ['WORK.EXE', 'LATEST_IDEAS', 'MISC', 'CONNECT'];

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
      className="relative w-full overflow-hidden select-none"
      style={{ height: '100dvh', minHeight: '100vh' }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Layer 0: Background wave animation */}
      <PS2Background />

      {/* Layer 1: Main UI */}
      <div
        className="relative z-10 flex flex-col w-full"
        style={{ height: '100dvh', minHeight: '100vh' }}
      >
        {/* Top zone — section label (15% of viewport) */}
        <div
          className="flex items-end justify-center pb-3"
          style={{ height: '15%', flexShrink: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.span
              key={nav.activeSection}
              className="font-mono text-xs tracking-widest uppercase"
              style={{ color: '#1a3060', letterSpacing: '0.25em' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {SECTION_TITLES[nav.activeSection]}
            </motion.span>
          </AnimatePresence>
        </div>

        {/* Nav zone — PS2 icon bar (15% of viewport, vertically at ~30-45%) */}
        <div
          className="flex items-center justify-center"
          style={{ height: '15%', flexShrink: 0 }}
        >
          <PS2Nav
            activeSection={nav.activeSection}
            onSectionChange={(id: SectionId) => nav.goToSection(id)}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(0,71,171,0.4) 30%, rgba(0,207,255,0.2) 50%, rgba(0,71,171,0.4) 70%, transparent)',
            margin: '0 auto',
            width: '80%',
            flexShrink: 0,
          }}
        />

        {/* Content zone — section content (remaining ~65%) */}
        <div
          className="flex-1 flex items-start justify-center overflow-y-auto overflow-x-hidden pt-6 pb-16"
          style={{ minHeight: 0 }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={nav.activeSection}
              className="w-full flex justify-center"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.35, ease: 'easeInOut' }}
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

      {/* Layer 2: CRT overlays (scanlines + vignette) */}
      <Overlays />

      {/* BGM toggle — fixed bottom left */}
      <BGMToggle />
    </div>
  );
}
