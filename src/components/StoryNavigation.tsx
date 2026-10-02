import { createPortal } from 'react-dom';
import { useEffect, useRef, useState } from 'react';
import { chapters } from '../data/explainerStory';

export function StoryNavigation() {
  const [active, setActive] = useState<string>('opening');
  const [target, setTarget] = useState<HTMLElement | null>(null);
  const menu = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setTarget(document.querySelector<HTMLElement>('.story-site .topnav')));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const sections = chapters
      .map(({ id }) => document.getElementById(id))
      .filter((section): section is HTMLElement => section instanceof HTMLElement);
    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: '-18% 0px -58% 0px', threshold: [0.01, 0.35, 0.7] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const links = () => chapters.map(({ id, label }) => (
    <a key={id} href={`#${id}`} aria-current={active === id ? 'location' : undefined} onClick={() => { if (menu.current) menu.current.open = false; }}>
      {label}
    </a>
  ));

  const navigation = <div className="story-nav" role="navigation" aria-label="Các chặng của bài học">
    <div className="story-nav-desktop">{links()}</div>
    <details ref={menu} className="story-nav-mobile" onKeyDown={(event) => { if (event.key === 'Escape' && menu.current) { menu.current.open = false; menu.current.querySelector('summary')?.focus(); } }}>
      <summary><span>{chapters.find(({ id }) => id === active)?.label}</span><span aria-hidden="true">☰</span></summary>
      <div>{links()}</div>
    </details>
  </div>;

  return target ? createPortal(navigation, target) : null;
}
