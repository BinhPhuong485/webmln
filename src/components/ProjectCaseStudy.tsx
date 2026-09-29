import { useId, useState } from 'react';
import { caseSteps } from '../data/explainerStory';
import { StoryFigure } from './StoryFigure';

export function ProjectCaseStudy() {
  const [active, setActive] = useState(0);
  const id = useId();
  return <div className="project-case">
    <p className="story-note">Tình huống giả định để minh họa · Ứng dụng đặt phòng học nhóm. Các diễn biến và kết quả thử dưới đây không phải dữ liệu dự án thật hay khảo sát của FPT.</p>
    <p className="story-instruction">Chọn một mốc để theo dõi cách hiểu và cách làm thay đổi.</p>
    <div className="case-milestones" role="group" aria-label="Các mốc của đồ án">
      {caseSteps.map((step, index) => <button type="button" key={step.title} aria-pressed={active === index} aria-controls={`${id}-panel`} onClick={() => setActive(index)}><span>0{index + 1}</span>{step.title}</button>)}
    </div>
    <div id={`${id}-panel`} className="case-panels" aria-live="polite" aria-atomic="true">
      {caseSteps.map((step, index) => <div key={step.title} className={`case-panel ${active === index ? 'is-active' : ''}`} aria-hidden={active !== index}>
        <StoryFigure asset={step.asset} />
        <div className="case-copy"><p className="story-kicker">Mốc 0{index + 1} / 05</p><h3>{step.heading}</h3><p>{step.text}</p><div className="case-takeaway"><strong>Điều cần rút ra</strong><p>{step.takeaway}</p></div></div>
      </div>)}
    </div>
  </div>;
}
