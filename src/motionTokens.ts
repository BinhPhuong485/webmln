export const motion = {
  duration: { instant: 0.15, fast: 0.25, base: 0.4, slow: 0.7 },
  easing: { standard: 'power2.out', enter: 'back.out(1.4)', exit: 'power1.in' },
} as const;
