import { useEffect, useState } from 'react';
import './InterfaceIcons.css';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => setVisible(window.scrollY > 480);
    updateVisibility();
    window.addEventListener('scroll', updateVisibility, { passive: true });
    return () => window.removeEventListener('scroll', updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return <button className={`scroll-to-top ${visible ? 'is-visible' : ''}`} type="button" onClick={scrollToTop} aria-label="Lên đầu trang">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 14 6-6 6 6M12 8v10" /></svg>
  </button>;
}
