'use client';

import { useRef } from 'react';
import { usePS2Background } from '@/hooks/usePS2Background';

export function PS2Background() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  usePS2Background(canvasRef);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}
