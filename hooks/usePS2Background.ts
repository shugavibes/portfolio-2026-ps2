'use client';

import { useEffect, useRef } from 'react';

interface WaveRibbon {
  baseY: number;
  amplitude: number;
  frequency: number;
  speed: number;
  phase: number;
  r: number;
  g: number;
  b: number;
  opacity: number;
  width: number;
}

interface Particle {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number;
  phase: number;
}

function createWaves(): WaveRibbon[] {
  return [
    { baseY: 0.25, amplitude: 0.06, frequency: 1.2, speed: 0.003, phase: 0, r: 0, g: 71, b: 171, opacity: 0.12, width: 0.15 },
    { baseY: 0.42, amplitude: 0.05, frequency: 0.9, speed: 0.0025, phase: 1.2, r: 0, g: 136, b: 255, opacity: 0.09, width: 0.18 },
    { baseY: 0.58, amplitude: 0.07, frequency: 1.5, speed: 0.004, phase: 2.5, r: 0, g: 207, b: 255, opacity: 0.07, width: 0.12 },
    { baseY: 0.72, amplitude: 0.04, frequency: 0.7, speed: 0.002, phase: 0.8, r: 0, g: 71, b: 171, opacity: 0.1, width: 0.2 },
    { baseY: 0.35, amplitude: 0.08, frequency: 1.8, speed: 0.005, phase: 3.7, r: 0, g: 100, b: 200, opacity: 0.06, width: 0.1 },
  ];
}

function createParticles(count: number): Particle[] {
  return Array.from({ length: count }, () => ({
    x: Math.random(),
    y: Math.random(),
    radius: 0.5 + Math.random() * 1.5,
    opacity: 0.1 + Math.random() * 0.3,
    speed: 0.00005 + Math.random() * 0.0001,
    phase: Math.random() * Math.PI * 2,
  }));
}

export function usePS2Background(canvasRef: React.RefObject<HTMLCanvasElement | null>) {
  const wavesRef = useRef<WaveRibbon[]>(createWaves());
  const particlesRef = useRef<Particle[]>(createParticles(40));
  const rafRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const SCALE = 0.5; // render at half resolution for performance

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr * SCALE;
      canvas.height = h * dpr * SCALE;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.scale(dpr * SCALE, dpr * SCALE);
    };

    resize();
    window.addEventListener('resize', resize);

    const drawBackground = (w: number, h: number) => {
      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, '#00001a');
      grad.addColorStop(0.5, '#000520');
      grad.addColorStop(1, '#00001a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    const drawWave = (wave: WaveRibbon, w: number, h: number) => {
      const SEGMENTS = 80;
      const segW = w / SEGMENTS;

      ctx.beginPath();
      for (let i = 0; i <= SEGMENTS; i++) {
        const x = i * segW;
        const nx = i / SEGMENTS; // normalized 0-1
        const y =
          wave.baseY * h +
          Math.sin(nx * Math.PI * 2 * wave.frequency + wave.phase) * wave.amplitude * h +
          Math.sin(nx * Math.PI * 3.7 * wave.frequency + wave.phase * 0.7) * wave.amplitude * 0.4 * h;

        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }

      // Close path with ribbon width
      for (let i = SEGMENTS; i >= 0; i--) {
        const x = i * segW;
        const nx = i / SEGMENTS;
        const y =
          wave.baseY * h +
          Math.sin(nx * Math.PI * 2 * wave.frequency + wave.phase) * wave.amplitude * h +
          Math.sin(nx * Math.PI * 3.7 * wave.frequency + wave.phase * 0.7) * wave.amplitude * 0.4 * h +
          wave.width * h;
        ctx.lineTo(x, y);
      }
      ctx.closePath();

      const ribbonGrad = ctx.createLinearGradient(0, wave.baseY * h, 0, (wave.baseY + wave.width) * h);
      ribbonGrad.addColorStop(0, `rgba(${wave.r},${wave.g},${wave.b},0)`);
      ribbonGrad.addColorStop(0.4, `rgba(${wave.r},${wave.g},${wave.b},${wave.opacity})`);
      ribbonGrad.addColorStop(0.6, `rgba(${wave.r},${wave.g},${wave.b},${wave.opacity})`);
      ribbonGrad.addColorStop(1, `rgba(${wave.r},${wave.g},${wave.b},0)`);
      ctx.fillStyle = ribbonGrad;
      ctx.fill();
    };

    const drawParticle = (p: Particle, w: number, h: number, time: number) => {
      const pulse = p.opacity * (0.6 + 0.4 * Math.sin(time * 2 + p.phase));
      const grd = ctx.createRadialGradient(
        p.x * w, p.y * h, 0,
        p.x * w, p.y * h, p.radius * 3
      );
      grd.addColorStop(0, `rgba(0, 207, 255, ${pulse})`);
      grd.addColorStop(1, 'rgba(0, 207, 255, 0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(p.x * w, p.y * h, p.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const draw = (timestamp: number) => {
      const dt = timestamp - timeRef.current;
      timeRef.current = timestamp;
      const time = timestamp * 0.001;

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.clearRect(0, 0, w, h);
      drawBackground(w, h);

      // Advance wave phases
      wavesRef.current.forEach((wave) => {
        wave.phase += wave.speed * dt;
        drawWave(wave, w, h);
      });

      // Drift particles upward slowly
      particlesRef.current.forEach((p) => {
        p.y -= p.speed * dt;
        if (p.y < 0) p.y = 1; // wrap to bottom
        drawParticle(p, w, h, time);
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
