import { sources } from '../data/explainerStory';

const aiFields = [
  ['Công cụ', '[Nhóm cần điền] Tên công cụ, phiên bản/model nếu biết, ngày sử dụng và thành viên sử dụng.'],
  ['Mục đích', '[Nhóm cần điền] Công đoạn có AI hỗ trợ: gợi ý nội dung, viết mã, tạo hình minh họa, kiểm tra…'],
  ['Prompt chính', '[Nhóm cần điền] Đính kèm nguyên văn prompt và các yêu cầu chỉnh sửa quan trọng. Không thay bằng một prompt mẫu không thực sự dùng.'],
  ['Đầu ra', '[Nhóm cần điền] Đoạn nội dung, tệp mã, hình hoặc ý tưởng đã sử dụng; liên kết tới bản lưu có thể đối chiếu.'],
  ['Phần nhóm tự sửa / biên soạn', '[Nhóm cần điền] Ai đã sửa phần nào, đã loại bỏ hay hiệu chỉnh nội dung gì, và lý do.'],
  ['Nguồn kiểm chứng', '[Nhóm cần điền] Nguồn đã đọc, trang/mục đã đối chiếu, ngày kiểm tra và kết quả xác minh. Danh sách nguồn ở trên chưa thay thế việc nhóm tự kiểm chứng.'],
  ['Cam kết liêm chính học thuật', '[Nhóm cần xác nhận trước khi nộp] Công khai phạm vi hỗ trợ của AI, chịu trách nhiệm về nội dung, không trình bày tình huống giả định như dữ liệu thật, và tuân thủ quy định học phần.'],
];

export function ExplainerReferences() {
  return <section className="section story-references" id="references" tabIndex={-1} aria-labelledby="references-title">
    <p className="story-kicker">Đọc tiếp & đối chiếu</p><h2 id="references-title">Nguồn và trách nhiệm<br />với nội dung.</h2>
    <ol className="reference-list">
      <li><strong>Bộ Giáo dục và Đào tạo (2021).</strong> <cite>Giáo trình Triết học Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị).</cite> NXB Chính trị quốc gia Sự thật.
        <p className="editorial-note">Cần nhóm đối chiếu bản giáo trình đang sử dụng và điền trang/mục về thực tiễn, nhận thức và quan hệ lý luận – thực tiễn trước khi nộp. Chưa ghi số trang vì chưa xác minh bản tài liệu.</p>
      </li>
      <li><a href={sources.curriculum.url}>{sources.curriculum.title} ↗</a><p>Dùng để xác nhận định hướng vận dụng kiến thức vào công việc và dự án trong giai đoạn OJT của chương trình này; không suy rộng thành số liệu hiệu quả đào tạo.</p></li>
      <li><a href={sources.ojt.url}>{sources.ojt.title} ↗</a><p>Dùng để xác nhận cách gọi học kỳ tại doanh nghiệp và hoạt động hướng dẫn OJT. Điều kiện cụ thể cần xem thông báo theo ngành, cơ sở và học kỳ.</p></li>
    </ol>
    <p className="story-note">Nguồn FPT được truy cập ngày 29/09/2026. Vòng học tập, tình huống đặt phòng và SVG là phần minh họa được biên soạn cho website, không trích nguyên văn giáo trình và không phải tư liệu thực địa.</p>
    <details className="ai-usage" id="ai-usage"><summary>Phụ lục AI Usage <span>Nhóm cần hoàn thiện trước khi nộp</span></summary><div>
      <p>Đây là khung kê khai, chưa phải lời xác nhận về quá trình làm việc của nhóm. Điền các mục dưới đây bằng lịch sử sử dụng thực tế.</p>
      <dl>{aiFields.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}</dl>
    </div></details>
  </section>;
}
