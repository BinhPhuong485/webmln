import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { motion } from '../motionTokens';
import './GameHubPage.css';

gsap.registerPlugin(useGSAP);

export function GamePage() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeline = gsap.timeline({ defaults: { ease: motion.easing.standard } });
    timeline
      .from('.game-hero .eyebrow', { autoAlpha: 0, y: 12, duration: motion.duration.base })
      .from('.game-hero h1', { autoAlpha: 0, y: 22, duration: motion.duration.slow, ease: motion.easing.enter }, '-=0.16')
      .from('.game-hero > p:last-child', { autoAlpha: 0, y: 14, duration: motion.duration.base }, '-=0.36')
      .from('.game-choice-card', {
        autoAlpha: 0,
        y: 20,
        scale: 0.985,
        duration: motion.duration.base,
        stagger: 0.1,
      }, '-=0.08');
  }, { scope: rootRef });

  return (
    <main ref={rootRef} className="game-page game-hub">
      <nav className="topnav">
        <Link to="/">FPT<span>•</span>PHIL</Link>
        <Link to="/">← Về bài học</Link>
      </nav>

      <header className="game-hero">
        <p className="eyebrow">Tự kiểm tra · 04 trò chơi</p>
        <h1>Chọn cách<br />để <mark>kết nối.</mark></h1>
        <p>Mỗi trò chơi giúp bạn nhìn lại mối quan hệ giữa lý luận và thực tiễn theo một cách khác.</p>
      </header>

      <section className="game-choice-grid" aria-label="Chọn trò chơi">
        <Link className="game-choice-card memory-choice" to="/game/ghep-the">
          <span className="choice-mark">✦</span><span className="eyebrow">Trò chơi 01</span>
          <strong>Ghép thẻ</strong><p>Luyện trí nhớ</p><span className="choice-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link className="game-choice-card wire-choice" to="/game/noi-day">
          <span className="choice-mark">⌁</span><span className="eyebrow">Trò chơi 02</span>
          <strong>Nối dây</strong><p>Luyện hiểu ý</p><span className="choice-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link className="game-choice-card cycle-choice" to="/game/vong-nhan-thuc">
          <span className="choice-mark">↺</span><span className="eyebrow">Trò chơi 03</span>
          <strong>Vòng nhận thức</strong><p>Luyện quy trình nhận thức</p><span className="choice-arrow" aria-hidden="true">↗</span>
        </Link>
        <Link className="game-choice-card lead-choice" to="/game/truong-nhom">
          <span className="choice-mark">⌁</span><span className="eyebrow">Trò chơi 04</span>
          <strong>Trưởng nhóm đồ án</strong><p>Luyện vận dụng khi ra quyết định</p><span className="choice-arrow" aria-hidden="true">↗</span>
        </Link>
      </section>
    </main>
  );
}
