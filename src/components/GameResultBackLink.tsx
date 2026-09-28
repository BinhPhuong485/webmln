import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import './GameResultBackLink.css';

export function GameResultBackLink() {
  const [target, setTarget] = useState<HTMLSpanElement | null>(null);
  useEffect(() => {
    let slot: HTMLSpanElement | null = null;
    const place = () => {
      if (slot?.isConnected) return;
      const replay = document.querySelector<HTMLElement>('.game-result .primary-btn');
      if (!replay) { setTarget(null); return; }
      slot = document.createElement('span'); slot.className = 'game-result-back-slot';
      replay.insertAdjacentElement('afterend', slot); setTarget(slot);
    };
    const observer = new MutationObserver(place); observer.observe(document.body, { childList: true, subtree: true }); place();
    return () => { observer.disconnect(); slot?.remove(); };
  }, []);
  return target ? createPortal(<Link className="game-result-back-link" to="/game">← Chọn game</Link>, target) : null;
}
