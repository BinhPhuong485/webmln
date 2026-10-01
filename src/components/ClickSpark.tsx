import { useCallback, useEffect, useRef, useState, type MouseEvent, type ReactNode } from 'react';
import './ClickSpark.css';

interface Spark {
  x: number;
  y: number;
  angle: number;
  startTime: number;
}

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  easing?: 'linear' | 'ease-in' | 'ease-in-out' | 'ease-out';
  extraScale?: number;
  children: ReactNode;
}

export default function ClickSpark({
  sparkColor = '#fff',
  sparkSize = 10,
  sparkRadius = 15,
  sparkCount = 8,
  duration = 400,
  easing = 'ease-out',
  extraScale = 1,
  children,
}: ClickSparkProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sparksRef = useRef<Spark[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  const easeFunc = useCallback((progress: number) => {
    switch (easing) {
      case 'linear': return progress;
      case 'ease-in': return progress * progress;
      case 'ease-in-out': return progress < 0.5 ? 2 * progress * progress : -1 + (4 - 2 * progress) * progress;
      default: return progress * (2 - progress);
    }
  }, [easing]);

  const draw = useCallback((timestamp: number) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, canvas.width / ratio, canvas.height / ratio);
    sparksRef.current = sparksRef.current.filter((spark) => {
      const elapsed = timestamp - spark.startTime;
      if (elapsed >= duration) return false;

      const eased = easeFunc(elapsed / duration);
      const distance = eased * sparkRadius * extraScale;
      const lineLength = sparkSize * (1 - eased);
      const x1 = spark.x + distance * Math.cos(spark.angle);
      const y1 = spark.y + distance * Math.sin(spark.angle);
      const x2 = spark.x + (distance + lineLength) * Math.cos(spark.angle);
      const y2 = spark.y + (distance + lineLength) * Math.sin(spark.angle);

      context.strokeStyle = sparkColor;
      context.lineWidth = 2;
      context.beginPath();
      context.moveTo(x1, y1);
      context.lineTo(x2, y2);
      context.stroke();
      return true;
    });

    animationFrameRef.current = sparksRef.current.length ? window.requestAnimationFrame(draw) : null;
  }, [duration, easeFunc, extraScale, sparkColor, sparkRadius, sparkSize]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    let resizeTimeout: number | null = null;
    const resizeCanvas = () => {
      const { width, height } = parent.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };
    const handleResize = () => {
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      resizeTimeout = window.setTimeout(resizeCanvas, 100);
    };

    const observer = new ResizeObserver(handleResize);
    observer.observe(parent);
    resizeCanvas();
    return () => {
      observer.disconnect();
      if (resizeTimeout) window.clearTimeout(resizeTimeout);
      if (animationFrameRef.current) window.cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const now = performance.now();
    sparksRef.current.push(...Array.from({ length: sparkCount }, (_, index) => ({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      angle: (2 * Math.PI * index) / sparkCount,
      startTime: now,
    })));
    if (!animationFrameRef.current) animationFrameRef.current = window.requestAnimationFrame(draw);
  };

  return <div className="click-spark" onClick={handleClick}>
    <canvas ref={canvasRef} className="click-spark__canvas" aria-hidden="true" />
    {children}
  </div>;
}
