import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from '../motionTokens';
import './CongratsModal.css';

interface CongratsModalProps {
  open: boolean;
  onClose: () => void;
}

const focusableSelector = 'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CongratsModal({ open, onClose }: CongratsModalProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();

  useGSAP(() => {
    if (!open || !rootRef.current || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.fromTo(rootRef.current.querySelector('.congrats-modal__panel'), { autoAlpha: 0, y: 14, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: motion.duration.slow, ease: motion.easing.enter });
  }, { scope: rootRef, dependencies: [open], revertOnUpdate: true });

  useEffect(() => {
    if (!open) return;
    previouslyFocusedRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 0);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onClose(); return; }
      if (event.key !== 'Tab') return;
      const focusable = Array.from(rootRef.current?.querySelectorAll<HTMLElement>(focusableSelector) ?? []);
      if (!focusable.length) return;
      const first = focusable[0]; const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => { window.clearTimeout(focusTimer); document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', handleKeyDown); previouslyFocusedRef.current?.focus(); };
  }, [open, onClose]);

  if (!open) return null;
  const goToLesson = () => { onClose(); navigate('/'); };
  return <div className="congrats-modal" ref={rootRef} role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <section className="congrats-modal__panel" role="dialog" aria-modal="true" aria-labelledby="congrats-title" aria-describedby="congrats-description">
      <span className="congrats-modal__mark" aria-hidden="true">✦</span><p className="eyebrow">FPT • PHIL</p><h2 id="congrats-title">Hoàn thành cả<br /><mark>4 trò chơi!</mark></h2><p id="congrats-description">Bạn đã nối được tư duy với thực tiễn qua đủ 4 thử thách.</p>
      <div className="congrats-modal__actions"><button className="primary-btn" onClick={goToLesson}>Về trang bài học</button><button ref={closeButtonRef} className="congrats-modal__close" onClick={onClose}>Đóng</button></div>
    </section>
  </div>;
}
