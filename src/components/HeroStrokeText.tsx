import { useEffect, useState } from 'react';
import StrokeText from './StrokeText';

const fontSizeForViewport = () => {
  if (typeof window === 'undefined') return 112;
  if (window.innerWidth < 768) return Math.min(83, Math.max(58, window.innerWidth * 0.16));
  return Math.min(160, Math.max(64, window.innerWidth * 0.1));
};

export function HeroStrokeText() {
  const [fontSize, setFontSize] = useState(fontSizeForViewport);

  useEffect(() => {
    const update = () => setFontSize(fontSizeForViewport());
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const props = {
    strokeWidth: 1.6,
    drawDuration: 1.8,
    fillDelay: 0.15,
    stagger: 0.04,
    ease: 'power2.out',
    trigger: 'mount' as const,
    fillMode: 'wipe' as const,
    fontSize,
    fontWeight: 700,
    letterSpacing: Math.round(fontSize * -0.05),
  };

  return (
    <span className="hero-stroke-lines" aria-label="Khi tư duy gặp đời sống.">
      <StrokeText className="hero-stroke-line" text="Khi tư duy" strokeColor="#192532" fillColor="#192532" {...props} />
      <StrokeText className="hero-stroke-line" text="gặp đời sống." accentStart={4} accentFillColor="#ec6a31" accentStrokeColor="#ec6a31" strokeColor="#192532" fillColor="#192532" {...props} />
    </span>
  );
}
