import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { motion } from '../motionTokens';
import { pairs } from '../data/pairs';
import { markGameDone } from '../utils/progress';
import { shouldShowCongratsAfterCompletion, syncCongratsCycle } from '../utils/congrats';
import { CongratsModal } from '../components/CongratsModal';
import './GamePage.css';

type Card = { id: string; pair: string; text: string; kind: 'concept' | 'example' };
const cards: Card[] = pairs.flatMap((pair) => [{ id: `${pair.id}-concept`, pair: pair.id, text: pair.concept, kind: 'concept' as const }, { id: `${pair.id}-example`, pair: pair.id, text: pair.example, kind: 'example' as const }]);
const shuffle = (items: Card[]) => [...items].sort(() => Math.random() - 0.5);
const TOTAL = pairs.length;

export function MemoryGamePage() {
  const completionRecorded = useRef(false); const [showCongrats, setShowCongrats] = useState(false); const [deck, setDeck] = useState(() => shuffle(cards)); const [open, setOpen] = useState<string[]>([]); const [matched, setMatched] = useState<Set<string>>(() => new Set()); const [moves, setMoves] = useState(0); const [time, setTime] = useState(0); const [started, setStarted] = useState(false); const [locked, setLocked] = useState(false); const done = matched.size === TOTAL;
  useEffect(() => { if (!started || done) return; const timer = window.setInterval(() => setTime((value) => value + 1), 1000); return () => window.clearInterval(timer); }, [started, done]);
  useEffect(() => { syncCongratsCycle(); }, []);
  useEffect(() => { if (!done || completionRecorded.current) return; completionRecorded.current = true; if (shouldShowCongratsAfterCompletion(markGameDone('ghep-the'))) setShowCongrats(true); }, [done]);
  useEffect(() => { if (open.length !== 2) return; const selected = open.map((id) => deck.find((card) => card.id === id)!); const correct = selected[0].pair === selected[1].pair; const elements = open.map((id) => document.querySelector<HTMLElement>(`[data-card="${id}"]`)).filter((element): element is HTMLElement => Boolean(element)); setMoves((value) => value + 1); setLocked(true); if (correct) { setMatched((previous) => new Set(previous).add(selected[0].pair)); gsap.to(elements, { scale: 1.04, duration: motion.duration.fast, ease: motion.easing.enter, yoyo: true, repeat: 1 }); window.setTimeout(() => { setOpen([]); setLocked(false); }, 250); } else { gsap.to(elements, { x: 7, duration: motion.duration.instant, yoyo: true, repeat: 3 }); window.setTimeout(() => { setOpen([]); setLocked(false); }, 1400); } }, [open, deck]);
  const flip = (card: Card) => { if (locked || done || open.includes(card.id) || matched.has(card.pair)) return; if (!started) setStarted(true); setOpen((previous) => [...previous, card.id]); };
  const reset = () => { setDeck(shuffle(cards)); setOpen([]); setMatched(new Set()); setMoves(0); setTime(0); setStarted(false); setLocked(false); };
  return <><main className="game-page"><nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link><Link to="/game">← Chọn game</Link></nav><header className="game-hero"><p className="eyebrow">Tự kiểm tra · 06 cặp</p><h1>Ghép ý tưởng<br/>với <mark>hành động.</mark></h1><p>Lật hai thẻ để ghép một khái niệm với tình huống tương ứng trong học tập và thực hành ở đại học.</p></header><section className="game-board"><div className="game-stats"><span>Lượt ghép <b>{moves}</b></span><span>Đã khớp <b>{matched.size}/{TOTAL}</b></span><span>Thời gian <b>{time}s</b></span></div>{!done ? <div className="memory-grid">{deck.map((card) => { const shown = open.includes(card.id) || matched.has(card.pair); return <button key={card.id} data-card={card.id} className={`memory-card ${shown ? 'is-open' : ''}`} onClick={() => flip(card)}><span className="card-inner"><span className="card-face card-back">✦</span><span className={`card-face card-front ${card.kind}`}>{card.text}</span></span></button>; })}</div> : <div className="game-result"><p className="eyebrow">Hoàn thành toàn bộ 06 cặp</p><h2>Bạn đã nối được<br/>tư duy với thực tiễn.</h2><p><b>{moves}</b> lượt ghép · <b>{time}</b> giây</p><button className="primary-btn" onClick={reset}>Chơi lại ↺</button></div>}</section></main><CongratsModal open={showCongrats} onClose={() => setShowCongrats(false)} /></>;
}
