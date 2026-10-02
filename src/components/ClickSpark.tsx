import { useCallback, useEffect, useRef, type MouseEvent, type ReactNode } from 'react';
import './ClickSpark.css';

interface Particle { active: boolean; x: number; y: number; cos: number; sin: number; startTime: number; }
interface ClickSparkProps { sparkColor?: string; sparkSize?: number; sparkRadius?: number; sparkCount?: number; duration?: number; easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out'; extraScale?: number; children: ReactNode; }

const MAX_BURSTS = 3;
const PARTICLES_PER_BURST = 5;
const PARTICLE_POOL_SIZE = MAX_BURSTS * PARTICLES_PER_BURST;

function ease(progress: number, easing: NonNullable<ClickSparkProps['easing']>) {
  switch (easing) {
    case 'linear': return progress;
    case 'ease-in': return progress * progress;
    case 'ease-in-out': return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
    default: return progress * (2 - progress);
  }
}

export default function ClickSpark({ sparkColor = '#fff', sparkSize = 9, sparkRadius = 16, sparkCount = PARTICLES_PER_BURST, duration = 360, easing = 'ease-out', extraScale = 1, children }: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>(Array.from({ length: PARTICLE_POOL_SIZE }, () => ({ active: false, x: 0, y: 0, cos: 0, sin: 0, startTime: 0 })));
  const burstEndsRef = useRef<number[]>([]);
  const viewportRef = useRef({ width: 0, height: 0 });
  const reducedMotionRef = useRef(false);
  const configRef = useRef({ sparkColor, sparkSize, sparkRadius, duration, easing, extraScale });
  configRef.current = { sparkColor, sparkSize, sparkRadius, duration, easing, extraScale };

  const draw = useCallback((timestamp: number) => {
    const context = contextRef.current;
    if (!context) return;
    const { width, height } = viewportRef.current;
    const config = configRef.current;
    context.clearRect(0, 0, width, height);
    context.strokeStyle = config.sparkColor;
    context.lineWidth = 2;
    let hasActiveParticles = false;
    for (const particle of particlesRef.current) {
      if (!particle.active) continue;
      const elapsed = timestamp - particle.startTime;
      if (elapsed >= config.duration) { particle.active = false; continue; }
      hasActiveParticles = true;
      const progress = elapsed / config.duration;
      const eased = ease(progress, config.easing);
      const distance = eased * config.sparkRadius * config.extraScale;
      const lineLength = config.sparkSize * (1 - eased);
      context.globalAlpha = 1 - progress;
      context.beginPath();
      context.moveTo(particle.x + distance * particle.cos, particle.y + distance * particle.sin);
      context.lineTo(particle.x + (distance + lineLength) * particle.cos, particle.y + (distance + lineLength) * particle.sin);
      context.stroke();
    }
    context.globalAlpha = 1;
    animationFrameRef.current = hasActiveParticles ? window.requestAnimationFrame(draw) : null;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    contextRef.current = context;
    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      viewportRef.current = { width, height };
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const clearParticles = () => {
      for (const particle of particlesRef.current) particle.active = false;
      burstEndsRef.current = [];
      if (animationFrameRef.current !== null) window.cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
      context.clearRect(0, 0, viewportRef.current.width, viewportRef.current.height);
    };
    const onVisibilityChange = () => { if (document.hidden) clearParticles(); };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });
    document.addEventListener('visibilitychange', onVisibilityChange);
    return () => { window.removeEventListener('resize', resizeCanvas); document.removeEventListener('visibilitychange', onVisibilityChange); clearParticles(); contextRef.current = null; };
  }, [draw]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => { reducedMotionRef.current = media.matches; };
    updatePreference();
    media.addEventListener('change', updatePreference);
    return () => media.removeEventListener('change', updatePreference);
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current) return;
    const now = performance.now();
    const config = configRef.current;
    burstEndsRef.current = burstEndsRef.current.filter((endsAt) => endsAt > now);
    if (burstEndsRef.current.length >= MAX_BURSTS) return;
    burstEndsRef.current.push(now + config.duration);
    const count = Math.max(1, Math.min(sparkCount, PARTICLES_PER_BURST));
    let particleIndex = 0;
    for (let index = 0; index < count; index += 1) {
      while (particleIndex < particlesRef.current.length && particlesRef.current[particleIndex].active) particleIndex += 1;
      const particle = particlesRef.current[particleIndex];
      if (!particle) break;
      const angle = (Math.PI * 2 * index) / count;
      particle.active = true;
      particle.x = event.clientX;
      particle.y = event.clientY;
      particle.cos = Math.cos(angle);
      particle.sin = Math.sin(angle);
      particle.startTime = now;
      particleIndex += 1;
    }
    if (animationFrameRef.current === null) animationFrameRef.current = window.requestAnimationFrame(draw);
  };

  return <div className="click-spark" onClick={handleClick}><canvas ref={canvasRef} className="click-spark__canvas" aria-hidden="true" />{children}</div>;
}
