import { useEffect, useLayoutEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { motion } from '../motionTokens';
import { pairs } from '../data/pairs';
import './WireGamePage.css';

type Point = { x: number; y: number };
type DragWire = { pairId: string; start: Point; current: Point };
type Connection = { pairId: string };
type TemporaryWire = { from: Point; to: Point };

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const cablePath = (from: Point, to: Point) => {
  const bend = Math.max(56, Math.abs(to.x - from.x) * 0.48);
  return `M ${from.x} ${from.y} C ${from.x + bend} ${from.y}, ${to.x - bend} ${to.y}, ${to.x} ${to.y}`;
};

export function WireGamePage() {
  const rootRef = useRef<HTMLElement | null>(null);
  const boardRef = useRef<HTMLDivElement | null>(null);
  const leftSockets = useRef(new Map<string, HTMLSpanElement>());
  const rightSockets = useRef(new Map<string, HTMLSpanElement>());
  const wrongTimer = useRef<number | null>(null);
  const ignoreRightClick = useRef(false);
  const [rightColumn, setRightColumn] = useState(() => shuffle(pairs));
  const [connections, setConnections] = useState<Connection[]>([]);
  const [drag, setDrag] = useState<DragWire | null>(null);
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [wrongWire, setWrongWire] = useState<TemporaryWire | null>(null);
  const [mistakes, setMistakes] = useState(0);
  const [time, setTime] = useState(0);
  const [started, setStarted] = useState(false);
  const [, setLayoutVersion] = useState(0);
  const done = connections.length === pairs.length;
  const isConnected = (pairId: string) => connections.some((connection) => connection.pairId === pairId);

  const socketPoint = (side: 'left' | 'right', pairId: string): Point | null => {
    const board = boardRef.current;
    const socket = (side === 'left' ? leftSockets : rightSockets).current.get(pairId);
    if (!board || !socket) return null;
    const boardRect = board.getBoundingClientRect();
    const rect = socket.getBoundingClientRect();
    return { x: rect.left - boardRect.left + rect.width / 2, y: rect.top - boardRect.top + rect.height / 2 };
  };

  const startClock = () => { if (!started) setStarted(true); };
  const pulse = (pairId: string) => {
    if (reducedMotion()) return;
    const targets = [leftSockets.current.get(pairId), rightSockets.current.get(pairId)].filter((node): node is HTMLSpanElement => Boolean(node));
    gsap.fromTo(targets, { scale: 1 }, { scale: 1.25, duration: motion.duration.fast, ease: motion.easing.enter, yoyo: true, repeat: 1 });
  };
  const showWrong = (from: Point, to: Point) => {
    setMistakes((value) => value + 1);
    setSelectedLeft(null);
    setDrag(null);
    if (reducedMotion()) { setWrongWire(null); return; }
    setWrongWire({ from, to });
    window.requestAnimationFrame(() => {
      const path = rootRef.current?.querySelector<SVGPathElement>('.wire-preview--wrong');
      if (path) gsap.fromTo(path, { x: -5 }, { x: 5, duration: motion.duration.instant, ease: motion.easing.standard, yoyo: true, repeat: 3 });
    });
    if (wrongTimer.current) window.clearTimeout(wrongTimer.current);
    wrongTimer.current = window.setTimeout(() => setWrongWire(null), 500);
  };
  const attemptConnection = (leftId: string, rightId: string, from: Point, to: Point) => {
    if (done || isConnected(leftId)) return;
    if (leftId === rightId) {
      setConnections((previous) => previous.some((item) => item.pairId === leftId) ? previous : [...previous, { pairId: leftId }]);
      setSelectedLeft(null); setDrag(null); pulse(leftId);
    } else showWrong(from, to);
  };

  useEffect(() => {
    if (!started || done) return;
    const timer = window.setInterval(() => setTime((value) => value + 1), 1000);
    return () => window.clearInterval(timer);
  }, [started, done]);

  useLayoutEffect(() => {
    const updateLayout = () => setLayoutVersion((value) => value + 1);
    const frame = window.requestAnimationFrame(updateLayout);
    window.addEventListener('resize', updateLayout);
    return () => { window.cancelAnimationFrame(frame); window.removeEventListener('resize', updateLayout); };
  }, []);

  useEffect(() => () => { if (wrongTimer.current) window.clearTimeout(wrongTimer.current); }, []);

  useEffect(() => {
    if (!drag) return;
    const stopTouchScroll = (event: TouchEvent) => event.preventDefault();
    const move = (event: PointerEvent) => {
      const board = boardRef.current;
      if (!board) return;
      const rect = board.getBoundingClientRect();
      setDrag((current) => current ? { ...current, current: { x: event.clientX - rect.left, y: event.clientY - rect.top } } : null);
    };
    const end = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>('[data-wire-right]') : null;
      const rightId = target?.dataset.wireRight;
      if (rightId) {
        const endPoint = socketPoint('right', rightId);
        if (endPoint) { ignoreRightClick.current = true; window.setTimeout(() => { ignoreRightClick.current = false; }, 0); attemptConnection(drag.pairId, rightId, drag.start, endPoint); return; }
      }
      setDrag(null);
    };
    document.addEventListener('touchmove', stopTouchScroll, { passive: false });
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end, { once: true });
    return () => { document.removeEventListener('touchmove', stopTouchScroll); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', end); };
  }, [drag]);

  const onLeftPointerDown = (event: ReactPointerEvent<HTMLButtonElement>, pairId: string) => {
    if (done || isConnected(pairId)) return;
    event.preventDefault(); startClock();
    const start = socketPoint('left', pairId);
    if (!start) return;
    setSelectedLeft(pairId); setDrag({ pairId, start, current: start });
  };
  const onLeftClick = (pairId: string) => { if (done || isConnected(pairId)) return; startClock(); setSelectedLeft(pairId); };
  const onRightClick = (pairId: string) => {
    if (ignoreRightClick.current || !selectedLeft || done || isConnected(pairId)) return;
    const from = socketPoint('left', selectedLeft); const to = socketPoint('right', pairId);
    if (from && to) attemptConnection(selectedLeft, pairId, from, to);
  };
  const reset = () => { if (wrongTimer.current) window.clearTimeout(wrongTimer.current); setRightColumn(shuffle(pairs)); setConnections([]); setDrag(null); setSelectedLeft(null); setWrongWire(null); setMistakes(0); setTime(0); setStarted(false); };

  return <main className="game-page wire-page" ref={rootRef}><nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link><Link to="/game">← Chọn game</Link></nav><header className="game-hero"><p className="eyebrow">Luyện hiểu ý · 06 cặp</p><h1>Nối nguyên lý<br/>với <mark>tình huống.</mark></h1><p>Gợi ý: xem lại mục 02, 03 và 05 ở trang bài học.</p></header><section className="game-board wire-board-shell"><div className="game-stats"><span>Đã nối <b>{connections.length}/{pairs.length}</b></span><span>Nối sai <b>{mistakes}</b></span><span>Thời gian <b>{time}s</b></span></div>{!done ? <div className="wire-board" ref={boardRef}>{connections.map(({ pairId }) => { const from = socketPoint('left', pairId); const to = socketPoint('right', pairId); return from && to ? <svg className="wire-layer" key={pairId} aria-hidden="true"><path className="wire-path wire-path--correct" d={cablePath(from, to)} /></svg> : null; })}<svg className="wire-layer" aria-hidden="true">{drag && <path className="wire-path wire-path--drag" d={cablePath(drag.start, drag.current)} />}{wrongWire && <path className="wire-path wire-preview--wrong" d={cablePath(wrongWire.from, wrongWire.to)} />}</svg><div className="wire-column wire-column--left">{pairs.map((pair) => <button key={pair.id} className={`wire-item wire-item--left ${selectedLeft === pair.id ? 'is-selected' : ''} ${isConnected(pair.id) ? 'is-connected' : ''}`} onPointerDown={(event) => onLeftPointerDown(event, pair.id)} onClick={() => onLeftClick(pair.id)} disabled={isConnected(pair.id)}><span>{pair.concept}</span><span className="wire-socket" ref={(node) => { if (node) leftSockets.current.set(pair.id, node); else leftSockets.current.delete(pair.id); }} /></button>)}</div><div className="wire-column wire-column--right">{rightColumn.map((pair) => <button key={pair.id} data-wire-right={pair.id} className={`wire-item wire-item--right ${isConnected(pair.id) ? 'is-connected' : ''}`} onClick={() => onRightClick(pair.id)} disabled={isConnected(pair.id)}><span className="wire-socket" ref={(node) => { if (node) rightSockets.current.set(pair.id, node); else rightSockets.current.delete(pair.id); }} /><span>{pair.example}</span></button>)}</div></div> : <div className="game-result"><p className="eyebrow">Hoàn thành toàn bộ 06 dây</p><h2>Bạn đã nối được<br/>tư duy với thực tiễn.</h2><p><b>{mistakes}</b> lần nối sai · <b>{time}</b> giây</p><button className="primary-btn" onClick={reset}>Chơi lại ↺</button></div>}</section></main>;
}
