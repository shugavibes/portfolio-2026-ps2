'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SectionId } from '@/types';
import { playHover, playSelect, playBack } from '@/hooks/useAudio';

export type View = 'menu' | 'section';

interface NavState {
  view: View;
  focusedMenu: number;   // 0-3: which menu item is highlighted
  activeSection: SectionId; // which section we entered
  selectedWork: number | null;
  focusedWork: number;
}

interface NavActions {
  focusMenu: (i: number) => void;
  enterSection: () => void;
  backToMenu: () => void;
  selectWork: (i: number) => void;
  closeDetail: () => void;
}

const TOTAL_SECTIONS = 5;
const TOTAL_WORK = 6;

export function useNavigation(): NavState & NavActions {
  const [view, setView] = useState<View>('menu');
  const [focusedMenu, setFocusedMenu] = useState(0);
  const [activeSection, setActiveSection] = useState<SectionId>(0);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [focusedWork, setFocusedWork] = useState(0);

  const focusMenu = useCallback((i: number) => {
    setFocusedMenu(Math.max(0, Math.min(TOTAL_SECTIONS - 1, i)));
  }, []);

  const enterSection = useCallback(() => {
    setActiveSection(focusedMenu as SectionId);
    setView('section');
    setSelectedWork(null);
    setFocusedWork(0);
  }, [focusedMenu]);

  const backToMenu = useCallback(() => {
    setView('menu');
    setSelectedWork(null);
  }, []);

  const selectWork = useCallback((i: number) => {
    setSelectedWork((prev) => (prev === i ? null : i));
    setFocusedWork(i);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedWork(null);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (view === 'menu') {
        if (e.key === 'ArrowUp')   { e.preventDefault(); playHover(); setFocusedMenu((f) => Math.max(0, f - 1)); }
        if (e.key === 'ArrowDown') { e.preventDefault(); playHover(); setFocusedMenu((f) => Math.min(TOTAL_SECTIONS - 1, f + 1)); }
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playSelect(); enterSection(); }
      } else {
        if (e.key === 'Escape') { playBack(); backToMenu(); }
        if (activeSection === 0) {
          if (e.key === 'ArrowLeft')  { playHover(); setFocusedWork((f) => ((f - 1 + TOTAL_WORK) % TOTAL_WORK)); }
          if (e.key === 'ArrowRight') { playHover(); setFocusedWork((f) => (f + 1) % TOTAL_WORK); }
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); playSelect(); selectWork(focusedWork); }
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [view, activeSection, focusedWork, enterSection, backToMenu, selectWork]);

  return { view, focusedMenu, activeSection, selectedWork, focusedWork,
           focusMenu, enterSection, backToMenu, selectWork, closeDetail };
}
