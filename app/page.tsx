'use client';

import { AnimatePresence } from 'framer-motion';
import { PS2Background } from '@/components/background/PS2Background';
import { Overlays } from '@/components/overlay/Overlays';
import { BGMToggle } from '@/components/ui/BGMToggle';
import { MenuView } from '@/components/MenuView';
import { SectionView } from '@/components/SectionView';
import { useNavigation } from '@/hooks/useNavigation';

export default function Home() {
  const nav = useNavigation();

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100dvh',
        minHeight: '100vh',
        overflow: 'hidden',
        background: '#000008',
      }}
    >
      {/* Background — only fully visible on the main menu (black void) */}
      <PS2Background />

      {/* Views */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 10 }}>
        <AnimatePresence mode="wait">
          {nav.view === 'menu' ? (
            <div key="menu" style={{ position: 'absolute', inset: 0 }}>
              <MenuView
                focusedMenu={nav.focusedMenu}
                onFocus={nav.focusMenu}
                onEnter={nav.enterSection}
              />
            </div>
          ) : (
            <SectionView
              key={`section-${nav.activeSection}`}
              section={nav.activeSection}
              selectedWork={nav.selectedWork}
              focusedWork={nav.focusedWork}
              onSelectWork={nav.selectWork}
              onCloseDetail={nav.closeDetail}
              onBack={nav.backToMenu}
            />
          )}
        </AnimatePresence>
      </div>

      <Overlays />
      <BGMToggle />
    </div>
  );
}
