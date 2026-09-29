import { useEffect, useRef, useState } from 'react';
import { chapters } from '../data/explainerStory';

export function StoryNavigation() {
  const [active, setActive] = useState<string>('opening');
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const reached = chapters.filter(({ id }) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= 170);
      setActive(reached.at(-1)?.id ?? 'opening');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    update();
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', schedule); };
  }, []);
  const links = () => chapters.map(({ id, label }) => <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>{label}</a>);
  return <nav className="story-nav" aria-label="Các chặng của bài học">
    <div className="story-nav-desktop">{links()}</div>
    <details ref={menu} className="story-nav-mobile" onKeyDown={(event) => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}>
      <summary><span>Đang xem: {chapters.find(({ id }) => id === active)?.label}</span><span aria-hidden="true">☰</span></summary>
      <div>{links()}</div>
    </details>
  </nav>;
}
