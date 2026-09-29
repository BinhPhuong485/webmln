import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { decisionOptions } from '../data/explainerStory';

export function DecisionReflection() {
  const [choice, setChoice] = useState<number | null>(null);
  const id = useId();
  return <div className="decision-reflection">
    <p className="story-kicker">Thử một quyết định</p><h3>Gặp lỗi đặt trùng, bạn chọn hướng nào?</h3>
    <p>Tiếp tục tình huống giả định. Chọn một hướng để xem hệ quả; có thể đổi lựa chọn để so sánh.</p>
    <div className="decision-choices" role="group" aria-label="Chọn hướng xử lý lỗi đặt trùng">
      {decisionOptions.map((option, index) => <button type="button" key={option.label} aria-pressed={choice === index} aria-controls={`${id}-feedback`} onClick={() => setChoice(index)}>{option.label}</button>)}
    </div>
    <div id={`${id}-feedback`} className="decision-feedback" aria-live="polite" aria-atomic="true">
      {choice === null ? <p>Chọn một phương án để khám phá. Đây là câu hỏi suy ngẫm, không tính điểm.</p> : <div key={choice}><h4>{decisionOptions[choice].title}</h4><p>{decisionOptions[choice].text}</p></div>}
    </div>
    <Link className="story-link" to="/game/truong-nhom">Vận dụng tiếp trong game “Trưởng nhóm đồ án” ↗</Link>
  </div>;
}
