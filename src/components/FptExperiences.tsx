import { useId, useRef, useState } from 'react';
import { sources } from '../data/explainerStory';
import { StoryFigure } from './StoryFigure';

const experiences = [
  { key: 'project', title: 'Đồ án', subtitle: 'Từ kiến thức đến một sản phẩm có thể thử', steps: [
    ['Học', 'Vận dụng phân tích yêu cầu, thiết kế dữ liệu và kiểm thử vào một sản phẩm nhóm.'],
    ['Làm', 'Khi ghép các phần việc, nhóm phải xử lý yêu cầu chưa rõ, ràng buộc thời gian và cách phối hợp.'],
    ['Phản hồi', 'Nhận góp ý, xem lỗi và đối chiếu tiêu chí; từ đó làm rõ yêu cầu, sửa thiết kế và phân công.'],
  ] },
  { key: 'ojt', title: 'OJT', subtitle: 'Đưa kiến thức vào bối cảnh doanh nghiệp', steps: [
    ['Học', 'Đối chiếu kiến thức chuyên môn với quy trình và yêu cầu công việc được giao.'],
    ['Làm', 'Tình huống minh họa: một nhiệm vụ có dữ liệu thiếu hoặc yêu cầu thay đổi, buộc sinh viên hỏi lại và điều chỉnh cách làm.'],
    ['Phản hồi', 'Góp ý của người hướng dẫn giúp nhận ra khoảng trống kiến thức, bổ sung kỹ năng và thử cách làm phù hợp hơn.'],
  ] },
] as const;

export function FptExperiences() {
  const [open, setOpen] = useState<number | null>(null);
  const id = useId();
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);
  return <div className="experience-rail story-experiences">
    {experiences.map((item, index) => <article className="experience-card story-experience" key={item.key}>
      <StoryFigure asset={item.key} />
      <div className="experience-summary"><p className="story-kicker">Không gian vận dụng · 0{index + 1}</p><h3>{item.title}</h3><p>{item.subtitle}</p>
        <button className="story-button" ref={(node) => { buttons.current[index] = node; }} type="button" aria-expanded={open === index} aria-controls={`${id}-${item.key}`} onClick={() => setOpen(open === index ? null : index)}>{open === index ? 'Thu gọn' : 'Khám phá'} {item.title} <span aria-hidden="true">{open === index ? '−' : '+'}</span></button>
      </div>
      <div id={`${id}-${item.key}`} className={`experience-expansion ${open === index ? 'is-open' : ''}`} aria-hidden={open !== index} inert={open !== index}>
        <div><div className="experience-detail">
          <ol>{item.steps.map(([label, text]) => <li key={label}><strong>{label}</strong><p>{text}</p></li>)}</ol>
          {item.key === 'ojt' && <p className="story-source">Thông tin chương trình: FPT gọi OJT là học kỳ tại doanh nghiệp. <a href={sources.ojt.url}>Xem thông báo chính thức ↗</a></p>}
          <button className="story-text-button" type="button" onClick={() => { setOpen(null); buttons.current[index]?.focus(); }}>Đóng chi tiết {item.title} ↑</button>
        </div></div>
      </div>
    </article>)}
  </div>;
}
