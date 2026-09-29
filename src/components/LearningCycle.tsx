import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { learningSteps } from '../data/explainerStory';

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function LearningCycle() {
  const root = useRef<HTMLDivElement>(null);
  const graphic = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  useGSAP(() => {
    const media = gsap.matchMedia();
    // Track the reading position on every viewport without hiding any step.
    gsap.utils.selector(root)<HTMLElement>('.learning-step').forEach((step, index) => {
      ScrollTrigger.create({ trigger: step, start: 'top 55%', end: 'bottom 55%', onEnter: () => setActive(index), onEnterBack: () => setActive(index) });
    });
    // No pin or scroll-driven motion on small/short screens or reduced motion.
    media.add('(min-width: 1024px) and (min-height: 650px) and (prefers-reduced-motion: no-preference)', () => {
      if (!root.current || !graphic.current) return;
      ScrollTrigger.create({
        trigger: root.current, start: 'top 120px',
        end: () => `+=${Math.max(0, root.current!.offsetHeight - graphic.current!.offsetHeight)}`,
        pin: graphic.current, pinSpacing: false, invalidateOnRefresh: true,
      });
    });
    return () => media.revert();
  }, { scope: root });

  return <div className="learning-cycle" ref={root}>
    <div className="learning-graphic" ref={graphic}>
      <p className="story-kicker">Một vòng học, hiểu sâu hơn</p>
      <ol className="learning-ring" aria-label="Bốn bước của vòng học tập">
        {learningSteps.map((step, index) => <li key={step.title} className={active === index ? 'is-current' : ''}><a href={`#learning-step-${index}`} aria-current={active === index ? 'step' : undefined}><span>0{index + 1}</span>{step.verb}<span aria-hidden="true">{index === 3 ? '↺' : '→'}</span></a></li>)}
      </ol>
      <p className="learning-desktop-hint">Cuộn để theo từng bước, hoặc chọn một bước.</p>
      <p className="learning-return">↺ Điều chỉnh để trở lại vận dụng, không dừng ở việc nhớ kiến thức.</p>
    </div>
    <ol className="learning-steps">
      {learningSteps.map((step, index) => <li key={step.title} id={`learning-step-${index}`} tabIndex={-1} className={`learning-step ${active === index ? 'is-current' : ''}`}>
        <span className="story-kicker">Bước 0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><p className="learning-question">{step.question}</p>
      </li>)}
    </ol>
  </div>;
}
