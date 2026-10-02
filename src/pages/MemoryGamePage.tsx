import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { motion } from '../motionTokens';
import { pairs } from '../data/pairs';
import { markGameDone } from '../utils/progress';
import { shouldShowCongratsAfterCompletion, syncCongratsCycle } from '../utils/congrats';
import { CongratsModal } from '../components/CongratsModal';
import './GamePage.css';

gsap.registerPlugin(useGSAP);

type Card = { id: string; pair: string; text: string; kind: 'concept' | 'example' };
type GamePhase = 'memorize' | 'playing';

const cards: Card[] = pairs.flatMap((pair) => [
  { id: `${pair.id}-concept`, pair: pair.id, text: pair.concept, kind: 'concept' as const },
  { id: `${pair.id}-example`, pair: pair.id, text: pair.example, kind: 'example' as const },
]);
const shuffle = (items: Card[]) => [...items].sort(() => Math.random() - 0.5);
const TOTAL = pairs.length;
const PREVIEW_DURATION = 2800;
const HINT_DURATION = 1250;
const PREVIEW_IDS = cards.map((card) => card.id);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function MemoryGamePage() {
  const completionRecorded = useRef(false);
  const boardRef = useRef<HTMLElement>(null);
  const hintTimer = useRef<number | null>(null);
  const [showCongrats, setShowCongrats] = useState(false);
  const [deck, setDeck] = useState(() => shuffle(cards));
  const [open, setOpen] = useState<string[]>([]);
  const [matched, setMatched] = useState<Set<string>>(() => new Set());
  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);
  const [phase, setPhase] = useState<GamePhase>('memorize');
  const [countdown, setCountdown] = useState(3);
  const [locked, setLocked] = useState(true);
  const [hintPair, setHintPair] = useState<string | null>(null);
  const [hintsLeft, setHintsLeft] = useState(2);
  const done = matched.size === TOTAL;

  useGSAP(() => {
    if (phase !== 'memorize' || reduceMotion()) return;
    const cardNodes = boardRef.current?.querySelectorAll<HTMLElement>('.memory-card');
    if (!cardNodes?.length) return;
    gsap.fromTo(cardNodes, { autoAlpha: 0, scale: 0.96 }, {
      autoAlpha: 1,
      scale: 1,
      duration: motion.duration.fast,
      ease: motion.easing.standard,
      stagger: 0.025,
      overwrite: 'auto',
    });
  }, { scope: boardRef, dependencies: [phase, deck], revertOnUpdate: true });

  useEffect(() => {
    if (phase !== 'memorize') return;
    const startedAt = performance.now();
    const reveal = window.setTimeout(() => setOpen(PREVIEW_IDS), 50);
    const interval = window.setInterval(() => {
      setCountdown(Math.max(1, Math.ceil((PREVIEW_DURATION - (performance.now() - startedAt)) / 1000)));
    }, 100);
    const finish = window.setTimeout(() => {
      setOpen([]);
      setCountdown(0);
      setPhase('playing');
      setLocked(false);
    }, PREVIEW_DURATION);
    return () => { window.clearTimeout(reveal); window.clearInterval(interval); window.clearTimeout(finish); };
  }, [phase]);

  useEffect(() => {
    if (phase !== 'playing' || done) return;
    const timer = window.setInterval(() => setTime((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [phase, done]);

  useEffect(() => { syncCongratsCycle(); }, []);
  useEffect(() => () => { if (hintTimer.current !== null) window.clearTimeout(hintTimer.current); }, []);

  useEffect(() => {
    if (!done || completionRecorded.current) return;
    completionRecorded.current = true;
    if (shouldShowCongratsAfterCompletion(markGameDone('ghep-the'))) setShowCongrats(true);
  }, [done]);

  useEffect(() => {
    if (open.length !== 2 || hintPair) return;
    const selected = open.map((id) => deck.find((card) => card.id === id)!);
    const correct = selected[0].pair === selected[1].pair;
    const elements = open.map((id) => boardRef.current?.querySelector<HTMLElement>(`[data-card="${id}"]`)).filter((element): element is HTMLElement => Boolean(element));
    setMoves((value) => value + 1);
    setLocked(true);

    if (correct) {
      setMatched((previous) => new Set(previous).add(selected[0].pair));
      if (!reduceMotion()) gsap.to(elements, { scale: 1.04, duration: motion.duration.fast, ease: motion.easing.enter, yoyo: true, repeat: 1 });
      const release = window.setTimeout(() => { setOpen([]); setLocked(false); }, 250);
      return () => window.clearTimeout(release);
    }

    if (!reduceMotion()) gsap.to(elements, { x: 7, duration: motion.duration.instant, yoyo: true, repeat: 3, ease: motion.easing.standard });
    const release = window.setTimeout(() => { setOpen([]); setLocked(false); }, 1400);
    return () => window.clearTimeout(release);
  }, [deck, hintPair, open]);

  const flip = (card: Card) => {
    if (phase !== 'playing' || locked || done || open.includes(card.id) || matched.has(card.pair)) return;
    setOpen((previous) => [...previous, card.id]);
  };

  const showHint = () => {
    if (phase !== 'playing' || locked || open.length || done || hintsLeft === 0) return;
    const unresolved = pairs.filter((pair) => !matched.has(pair.id));
    const pair = unresolved[Math.floor(Math.random() * unresolved.length)];
    if (!pair) return;
    setLocked(true);
    setHintsLeft((value) => value - 1);
    setHintPair(pair.id);
    setOpen([`${pair.id}-concept`, `${pair.id}-example`]);
    const hintNodes = [`${pair.id}-concept`, `${pair.id}-example`].map((id) => boardRef.current?.querySelector<HTMLElement>(`[data-card="${id}"]`)).filter((element): element is HTMLElement => Boolean(element));
    if (!reduceMotion()) gsap.fromTo(hintNodes, { scale: 0.96 }, { scale: 1, duration: motion.duration.fast, ease: motion.easing.enter, stagger: 0.05, overwrite: 'auto' });
    hintTimer.current = window.setTimeout(() => {
      setOpen([]);
      setHintPair(null);
      setLocked(false);
      hintTimer.current = null;
    }, HINT_DURATION);
  };

  const reset = () => {
    if (hintTimer.current !== null) window.clearTimeout(hintTimer.current);
    hintTimer.current = null;
    setDeck(shuffle(cards)); setOpen([]); setMatched(new Set()); setMoves(0); setTime(0);
    setPhase('memorize'); setCountdown(3); setLocked(true); setHintPair(null); setHintsLeft(2);
  };

  return <><main className="game-page" ref={boardRef}>
    <nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link><Link to="/game">← Chọn game</Link></nav>
    <header className="game-hero"><p className="eyebrow">Tự kiểm tra · 06 cặp</p><h1>Ghép ý tưởng<br />với <mark>hành động.</mark></h1><p>Lật hai thẻ để ghép một khái niệm với tình huống tương ứng trong học tập và thực hành ở đại học.</p></header>
    <section className="game-board">
      <div className="game-stats memory-stats"><span>Lượt ghép <b>{moves}</b></span><span>Đã khớp <b>{matched.size}/{TOTAL}</b></span><span>Thời gian <b>{time}s</b></span><button className="memory-hint-button" type="button" onClick={showHint} disabled={phase !== 'playing' || locked || open.length > 0 || hintsLeft === 0} aria-label={hintsLeft === 0 ? 'Đã dùng hết lượt gợi ý' : `Gợi ý, còn ${hintsLeft} lượt`}>Gợi ý <b>({hintsLeft})</b></button></div>
      {!done ? <>{phase === 'memorize' && <p className="memory-countdown" role="status" aria-live="polite">Ghi nhớ: {countdown}s</p>}{hintPair && <p className="memory-countdown" role="status">Gợi ý đang mở một cặp chưa ghép.</p>}<div className="memory-grid">{deck.map((card) => { const shown = open.includes(card.id) || matched.has(card.pair); return <button key={card.id} data-card={card.id} className={`memory-card memory-card--${card.kind} ${shown ? 'is-open' : ''}`} onClick={() => flip(card)} disabled={phase !== 'playing' || locked || matched.has(card.pair)}><span className="card-inner"><span className="card-face card-back">✦</span><span className={`card-face card-front ${card.kind}`}>{card.text}</span></span></button>; })}</div></> : <div className="game-result"><p className="eyebrow">Hoàn thành toàn bộ 06 cặp</p><h2>Bạn đã nối được<br />tư duy với thực tiễn.</h2><p><b>{moves}</b> lượt ghép · <b>{time}</b> giây</p><button className="primary-btn" onClick={reset}>Chơi lại ↺</button></div>}
    </section>
  </main><CongratsModal open={showCongrats} onClose={() => setShowCongrats(false)} /></>;
}
