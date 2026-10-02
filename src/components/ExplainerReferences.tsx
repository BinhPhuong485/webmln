import { sources } from '../data/explainerStory';

type AiField = {
  label: string;
  text?: string;
  placeholder: string;
};

const aiFields: AiField[] = [
  {
    label: 'Công cụ',
    text: 'Claude (Anthropic), model Claude Sonnet 5, giao diện chat claude.ai, sử dụng qua nhiều phiên trò chuyện trong quá trình làm bài. OpenAI Codex (CLI), model GPT-5.6 Terra Medium, chạy cục bộ trên máy để viết và sửa mã nguồn theo các prompt từ Claude. Thành viên trực tiếp thao tác: Bình Phương.',
    placeholder: '',
  },
  {
    label: 'Mục đích',
    text: 'Claude: lên ý tưởng cấu trúc website, thiết kế từng tính năng (các phần lý thuyết, 4 trò chơi, video tóm tắt, chia sẻ/mã QR, hiệu ứng giao diện), soạn prompt kỹ thuật chi tiết để Codex thực thi, rà soát độ chính xác nội dung triết học so với cách trình bày phổ biến của học phần, gợi ý cải thiện trải nghiệm khi trò chơi bị đánh giá là khó, hướng dẫn quy trình dùng Git và triển khai lên Vercel, chẩn đoán và hướng dẫn khắc phục các lỗi hiệu năng/giao diện phát sinh. Codex: trực tiếp viết, sửa và tối ưu mã nguồn React + TypeScript theo các prompt đã được xác nhận trước khi gửi.',
    placeholder: '',
  },
  {
    label: 'Prompt chính',
    placeholder: '[Nhóm cần điền] Đính kèm nguyên văn prompt và các yêu cầu chỉnh sửa quan trọng. Không thay bằng một prompt mẫu không thực sự dùng.',
  },
  {
    label: 'Đầu ra',
    text: 'Mã nguồn các phần: trang lý thuyết, 4 trò chơi, thẻ tương tác 3D, hệ thống chia sẻ và mã QR, video tóm tắt, trang này (Phụ lục AI Usage). Repo GitHub: https://github.com/BinhPhuong485/webmln.git. Bản deploy Vercel: https://webmln-tawny.vercel.app/.',
    placeholder: '',
  },
  {
    label: 'Phần nhóm tự sửa / biên soạn',
    placeholder: '[Nhóm cần điền] Ai đã sửa phần nào, đã loại bỏ hay hiệu chỉnh nội dung gì, và lý do.',
  },
  {
    label: 'Nguồn kiểm chứng',
    text: 'Giáo trình Triết học Mác – Lênin, Bộ Giáo dục và Đào tạo — nội dung lý luận và thực tiễn trong các phần lý thuyết của trang được rà soát dựa trên cách trình bày phổ biến của học phần này. Riêng các ví dụ liên hệ tại Đại học FPT, một số nguồn công khai đã được đối chiếu (như thông báo OJT của trường, xem mục nguồn ở trên); các ví dụ khác (như hoạt động khởi nghiệp, dự án nhóm) mang tính minh hoạ, chưa được xác minh là hoạt động chính thức áp dụng cho mọi ngành/khoá.',
    placeholder: '[Nhóm cần điền: tên giáo trình/slide cụ thể của lớp đã dùng để đối chiếu, trang/mục đã xem, ngày kiểm tra]',
  },
  {
    label: 'Cam kết liêm chính học thuật',
    text: 'Nhóm công khai phạm vi hỗ trợ của AI như mô tả ở các mục trên, chịu trách nhiệm về toàn bộ nội dung cuối cùng của bài làm, không trình bày các ví dụ minh hoạ hoặc tình huống giả định như dữ liệu đã được xác minh chính thức, và tuân thủ quy định của học phần về việc sử dụng AI trong bài làm.',
    placeholder: '[Nhóm cần xác nhận trước khi nộp]',
  },
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
      <dl>{aiFields.map(({ label, text, placeholder }) => <div key={label}><dt>{label}</dt><dd>{text}{text && placeholder ? ' ' : null}{placeholder && <span className="ai-placeholder">{placeholder}</span>}</dd></div>)}</dl>
    </div></details>
  </section>;
}
