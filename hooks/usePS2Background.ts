'use client';

import { useEffect, useRef } from 'react';

// The PS2 background is near-pure black. The "atmosphere" is extremely subtle —
// a very faint blue-black fog with almost imperceptible slow movement.
// No visible waves — just the void, barely alive.

interface Mote {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  driftX: number;
  driftY: number;
  phase: number;
}

function createMotes(count: number): Mote[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    radius: 0.4 + Math.random() * 1.2,
    opacity: 0.04 + Math.random() * 0.1,
    driftX: (Math.random() - 0.5) * 0.012,
    driftY: (Math.random() - 0.5) * 0.008,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function usePS2Background(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const motesRef = useRef<Mote[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    motesRef.current = createMotes(25);

    const draw = (timestamp: number) => {
      const w = canvas.width;
      const h = canvas.height;
      const t = timestamp * 0.001;

      // Pure void — almost black, very faint deep blue gradient
      const bg = ctx.createRadialGradient(w * 0.5, h * 0.45, 0, w * 0.5, h * 0.45, w * 0.7);
      bg.addColorStop(0, '#00020e');
      bg.addColorStop(1, '#000008');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      // Motes — barely visible drifting light particles
      motesRef.current.forEach((m) => {
        m.x += m.driftX;
        m.y += m.driftY;
        if (m.x < -4) m.x = w + 4;
        if (m.x > w + 4) m.x = -4;
        if (m.y < -4) m.y = h + 4;
        if (m.y > h + 4) m.y = -4;

        const pulse = m.opacity * (0.5 + 0.5 * Math.sin(t * 0.4 + m.phase));
        const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.radius * 4);
        grd.addColorStop(0, `rgba(100, 160, 255, ${pulse})`);
        grd.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grd;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius * 4, 0, Math.PI * 2);
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [canvasRef]);
}
