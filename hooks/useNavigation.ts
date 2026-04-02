'use client';

import { useState, useEffect, useCallback } from 'react';
import type { SectionId } from '@/types';

const TOTAL_SECTIONS = 4;
const TOTAL_WORK = 6;

interface NavigationState {
  activeSection: SectionId;
  selectedWork: number | null;
  focusedWork: number;
}

interface NavigationActions {
  goToSection: (id: SectionId) => void;
  nextSection: () => void;
  prevSection: () => void;
  selectWork: (index: number) => void;
  closeDetail: () => void;
  nextWork: () => void;
  prevWork: () => void;
}

export function useNavigation(): NavigationState & NavigationActions {
  const [activeSection, setActiveSection] = useState<SectionId>(0);
  const [selectedWork, setSelectedWork] = useState<number | null>(null);
  const [focusedWork, setFocusedWork] = useState<number>(0);

  const goToSection = useCallback((id: SectionId) => {
    setActiveSection(id);
    setSelectedWork(null);
  }, []);

  const nextSection = useCallback(() => {
    setActiveSection((s) => (((s + 1) % TOTAL_SECTIONS) as SectionId));
    setSelectedWork(null);
  }, []);

  const prevSection = useCallback(() => {
    setActiveSection((s) => ((((s - 1) + TOTAL_SECTIONS) % TOTAL_SECTIONS) as SectionId));
    setSelectedWork(null);
  }, []);

  const selectWork = useCallback((index: number) => {
    setSelectedWork((prev) => (prev === index ? null : index));
    setFocusedWork(index);
  }, []);

  const closeDetail = useCallback(() => {
    setSelectedWork(null);
  }, []);

  const nextWork = useCallback(() => {
    setFocusedWork((f) => (f + 1) % TOTAL_WORK);
  }, []);

  const prevWork = useCallback(() => {
    setFocusedWork((f) => ((f - 1) + TOTAL_WORK) % TOTAL_WORK);
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeSection === 0) {
        // Work section — arrow keys navigate work icons
        if (e.key === 'ArrowRight') {
          if (selectedWork !== null) {
            nextWork();
          } else {
            nextSection();
          }
          return;
        }
        if (e.key === 'ArrowLeft') {
          if (selectedWork !== null) {
            prevWork();
          } else {
            prevSection();
          }
          return;
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectWork(focusedWork);
          return;
        }
        if (e.key === 'Escape') {
          closeDetail();
          return;
        }
      } else {
        if (e.key === 'ArrowRight') { nextSection(); return; }
        if (e.key === 'ArrowLeft') { prevSection(); return; }
        if (e.key === 'Escape') { closeDetail(); return; }
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [activeSection, selectedWork, focusedWork, nextSection, prevSection, nextWork, prevWork, selectWork, closeDetail]);

  return {
    activeSection,
    selectedWork,
    focusedWork,
    goToSection,
    nextSection,
    prevSection,
    selectWork,
    closeDetail,
    nextWork,
    prevWork,
  };
}
