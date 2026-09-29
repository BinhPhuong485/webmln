import { useId, useState } from 'react';
import './TheoryPracticeDiagram.css';

const directions = [
  {
    label: 'Thực tiễn → Lý luận',
    title: 'Từ trải nghiệm đến nhận thức',
    explanation: 'Thực tiễn cung cấp chất liệu, đặt ra vấn đề và là tiêu chuẩn kiểm nghiệm nhận thức. Qua tổng kết và khái quát thực tiễn, con người bổ sung, điều chỉnh và phát triển lý luận.',
    example: 'Trong đồ án đặt phòng giả định của nhóm sinh viên FPT, lỗi đặt trùng đặt ra vấn đề cần hiểu về xử lý đồng thời; các lần thử giúp nhóm đối chiếu và điều chỉnh cách hiểu.',
  },
  {
    label: 'Lý luận → Thực tiễn',
    title: 'Từ nhận thức đến hành động',
    explanation: 'Lý luận định hướng mục tiêu, phương pháp và cách đánh giá khi hành động. Việc vận dụng cần phù hợp với điều kiện cụ thể và tiếp tục được kiểm nghiệm trong thực tiễn.',
    example: 'Trong cùng đồ án, kiến thức về giao dịch và tính nhất quán dữ liệu định hướng cách thiết kế, với tiêu chí các lượt đặt hợp lệ của một phòng không được chồng lấn thời gian.',
  },
] as const;

export function TheoryPracticeDiagram() {
  const [selected, setSelected] = useState<number | null>(null);
  const id = useId();

  return <section className="tp-diagram" aria-labelledby={`${id}-title`}>
    <p className="tp-kicker">Khám phá mối quan hệ hai chiều</p>
    <h3 id={`${id}-title`}>Lý luận ↔ Thực tiễn</h3>
    <p id={`${id}-hint`} className="tp-hint">Chọn một chiều để khám phá. Bấm hoặc chạm; dùng Tab rồi Enter hoặc phím cách khi thao tác bằng bàn phím.</p>

    <div className="tp-map" aria-hidden="true">
      <strong>Thực tiễn</strong>
      <svg viewBox="0 0 300 100" focusable="false">
        <defs><marker id={`${id}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" /></marker></defs>
        <path className={`tp-path ${selected === 0 ? 'is-active' : ''}`} d="M 15 30 H 280" markerEnd={`url(#${id}-arrow)`} />
        <path className={`tp-path ${selected === 1 ? 'is-active' : ''}`} d="M 285 70 H 20" markerEnd={`url(#${id}-arrow)`} />
      </svg>
      <strong>Lý luận</strong>
    </div>

    <div className="tp-controls" role="group" aria-label="Chọn chiều quan hệ" aria-describedby={`${id}-hint`}>
      {directions.map((direction, index) => <button key={direction.label} type="button" aria-pressed={selected === index} aria-controls={`${id}-detail`} onClick={() => setSelected(index)}>
        <span className="tp-choice-mark" aria-hidden="true">{selected === index ? '●' : '○'}</span>{direction.label}
      </button>)}
    </div>

    <div id={`${id}-detail`} className="tp-details" aria-live="polite" aria-atomic="true">
      <div className={`tp-panel tp-intro ${selected === null ? 'is-visible' : ''}`} aria-hidden={selected !== null}>
        <h4>Hai chiều, một quá trình thống nhất.</h4>
        <p>Thực tiễn góp phần hình thành và kiểm nghiệm lý luận; lý luận trở lại hướng dẫn thực tiễn. Chọn một chiều ở trên để đọc giải thích và ví dụ.</p>
        <p className="tp-example-label">Tình huống giả định để minh họa · Đồ án đặt phòng học nhóm</p>
        <p>Các ví dụ giả định về sinh viên FPT dưới đây không phải dữ kiện hay kết quả khảo sát thực tế.</p>
      </div>
      {directions.map((direction, index) => <div key={direction.label} className={`tp-panel ${selected === index ? 'is-visible' : ''}`} aria-hidden={selected !== index}>
        <p className="tp-direction">{direction.label}</p>
        <h4>{direction.title}</h4>
        <p>{direction.explanation}</p>
        <p className="tp-example-label">Tình huống giả định để minh họa · Đồ án đặt phòng học nhóm</p>
        <p>{direction.example}</p>
        <p className="tp-disclaimer">Ví dụ giả định, không phải dữ kiện hay kết quả khảo sát thực tế của FPT.</p>
      </div>)}
    </div>
    <a className="story-link" href="#case-study">Theo dõi đầy đủ 5 mốc của đồ án →</a>
  </section>;
}
