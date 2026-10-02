import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from '../motionTokens';
import './NotFoundPage.css';

gsap.registerPlugin(useGSAP);

export function NotFoundPage() {
  const rootRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    gsap.from('.not-found-content > *', { autoAlpha: 0, y: 16, duration: motion.duration.base, stagger: 0.1, ease: motion.easing.standard });
  }, { scope: rootRef });

  return <main className="not-found-page" ref={rootRef}><nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link></nav><section className="not-found-content"><p className="eyebrow">404 · Lạc hướng</p><h1>Trang này không tồn tại —<br />có lẽ bạn đã rẽ nhầm hướng<br />giữa lý luận và thực tiễn.</h1><Link className="primary-btn" to="/">Về trang bài học</Link></section></main>;
}
