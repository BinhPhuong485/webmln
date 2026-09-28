import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useLocation } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { motion } from '../motionTokens';
import './ShareQrNav.css';

const QRCodeCanvas = lazy(() => import('qrcode.react').then((module) => ({ default: module.QRCodeCanvas })));
const SITE_URL = (import.meta.env.VITE_SITE_URL || window.location.origin).replace(/\/+$/, '');
const SHARE_URL = `${SITE_URL}/`;
const isLocalAddress = /localhost|127\.0\.0\.1/.test(SITE_URL);
const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function ShareIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l4-4m0 0v6m0-6h-6M19 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6" /></svg>; }
function QrIcon() { return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM15 15h2v2h-2zm3-1h2v3h-2zm-3 5h5v1h-5z" /></svg>; }

function copyWithFallback(value: string) {
  const input = document.createElement('textarea'); input.value = value; input.setAttribute('readonly', ''); input.style.position = 'fixed'; input.style.opacity = '0';
  document.body.appendChild(input); input.select();
  const copied = document.execCommand('copy'); input.remove();
  return copied;
}

function QrModal({ closing, onRequestClose, onClosed, returnFocus }: { closing: boolean; onRequestClose: () => void; onClosed: () => void; returnFocus: () => void }) {
  const rootRef = useRef<HTMLDivElement | null>(null); const closeRef = useRef<HTMLButtonElement | null>(null);
  useGSAP(() => {
    const root = rootRef.current; if (!root) return;
    if (closing) { if (prefersReducedMotion()) { onClosed(); return; } gsap.to(root.querySelector('.qr-dialog'), { autoAlpha: 0, y: 12, scale: .98, duration: motion.duration.fast, ease: motion.easing.exit }); gsap.to(root.querySelector('.qr-backdrop'), { autoAlpha: 0, duration: motion.duration.fast, ease: motion.easing.exit, onComplete: onClosed }); return; }
    if (prefersReducedMotion()) { gsap.set(root, { autoAlpha: 1 }); return; }
    gsap.fromTo(root.querySelector('.qr-backdrop'), { autoAlpha: 0 }, { autoAlpha: 1, duration: motion.duration.base, ease: motion.easing.standard });
    gsap.fromTo(root.querySelector('.qr-dialog'), { autoAlpha: 0, y: 16, scale: .97 }, { autoAlpha: 1, y: 0, scale: 1, duration: motion.duration.base, ease: motion.easing.enter });
  }, { scope: rootRef, dependencies: [closing] });
  useEffect(() => {
    const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden';
    const focus = window.requestAnimationFrame(() => closeRef.current?.focus());
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') { onRequestClose(); return; } if (event.key !== 'Tab') return; const nodes = rootRef.current?.querySelectorAll<HTMLElement>('button:not(.qr-backdrop), a, input, [tabindex]:not([tabindex="-1"])'); if (!nodes?.length) return; const first = nodes[0]; const last = nodes[nodes.length - 1]; if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); } else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); } };
    document.addEventListener('keydown', onKeyDown); return () => { window.cancelAnimationFrame(focus); document.body.style.overflow = previousOverflow; document.removeEventListener('keydown', onKeyDown); returnFocus(); };
  }, [onRequestClose, returnFocus]);
  const download = () => { const canvas = rootRef.current?.querySelector<HTMLCanvasElement>('.qr-code-canvas'); if (!canvas) return; const link = document.createElement('a'); link.download = 'qr-triet-hoc.png'; link.href = canvas.toDataURL('image/png'); link.click(); };
  const copy = () => { if (navigator.clipboard?.writeText) void navigator.clipboard.writeText(SHARE_URL).catch(() => copyWithFallback(SHARE_URL)); else copyWithFallback(SHARE_URL); };
  return <div ref={rootRef} className="qr-modal" role="presentation"><button className="qr-backdrop" tabIndex={-1} aria-label="Đóng mã QR" onClick={onRequestClose} /><section className="qr-dialog" role="dialog" aria-modal="true" aria-labelledby="qr-title"><button ref={closeRef} className="qr-close" onClick={onRequestClose} aria-label="Đóng">×</button><p className="eyebrow">Chia sẻ bài học</p><h2 id="qr-title">Quét mã để mở trang</h2><Suspense fallback={<div className="qr-placeholder" aria-label="Đang tạo mã QR" />}><QRCodeCanvas className="qr-code-canvas" value={SHARE_URL} size={1024} level="Q" marginSize={4} bgColor="#ffffff" fgColor="#192532" includeMargin /></Suspense><input className="qr-link" readOnly value={SHARE_URL} aria-label="Liên kết trang chủ" onFocus={(event) => event.currentTarget.select()} />{isLocalAddress && <p className="qr-warning">Đây là địa chỉ máy bạn, điện thoại khác sẽ không mở được. Hãy đặt VITE_SITE_URL khi deploy.</p>}<div className="qr-actions"><button className="primary-btn" onClick={copy}>Sao chép liên kết</button><button className="qr-secondary" onClick={download}>Tải ảnh QR</button></div><button className="qr-text-close" onClick={onRequestClose}>Đóng</button></section></div>;
}

function ShareControls() {
  const [status, setStatus] = useState(''); const [modal, setModal] = useState<'closed' | 'open' | 'closing'>('closed'); const qrButtonRef = useRef<HTMLButtonElement | null>(null); const statusTimer = useRef<number | null>(null);
  useEffect(() => () => { if (statusTimer.current) window.clearTimeout(statusTimer.current); }, []);
  const announceCopied = () => { setStatus('Đã sao chép liên kết'); if (statusTimer.current) window.clearTimeout(statusTimer.current); statusTimer.current = window.setTimeout(() => setStatus(''), 2200); };
  const share = async () => { try { if (navigator.share) { await navigator.share({ title: 'Khi tư duy gặp đời sống', text: 'Khám phá sự thống nhất giữa lý luận và thực tiễn.', url: SHARE_URL }); return; } if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(SHARE_URL); else if (!copyWithFallback(SHARE_URL)) throw new Error('copy-failed'); announceCopied(); } catch (error) { if (error instanceof DOMException && error.name === 'AbortError') return; if (copyWithFallback(SHARE_URL)) announceCopied(); else setStatus(SHARE_URL); } };
  return <><div className="share-nav-controls"><button className="nav-utility" onClick={() => void share()} aria-label="Chia sẻ"><ShareIcon /><span>Chia sẻ</span></button><button ref={qrButtonRef} className="nav-utility" onClick={() => setModal('open')} aria-label="Mã QR"><QrIcon /><span>Mã QR</span></button><span className="share-status" role="status" aria-live="polite">{status}</span></div>{modal !== 'closed' && <QrModal closing={modal === 'closing'} onRequestClose={() => setModal('closing')} onClosed={() => setModal('closed')} returnFocus={() => qrButtonRef.current?.focus()} />}</>;
}

export function ShareQrNav() {
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const { pathname } = useLocation();
  useEffect(() => { const frame = window.requestAnimationFrame(() => setTarget(document.querySelector<HTMLElement>('.topnav'))); return () => { window.cancelAnimationFrame(frame); setTarget(null); }; }, [pathname]);
  return target ? createPortal(<ShareControls />, target) : null;
}
