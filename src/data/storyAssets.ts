import project from '../assets/story/project-placeholder.svg';
import ojt from '../assets/story/ojt-placeholder.svg';
import conflict from '../assets/story/case-conflict.svg';
import knowledge from '../assets/story/case-knowledge.svg';
import solution from '../assets/story/case-solution.svg';
import testing from '../assets/story/case-testing.svg';
import revision from '../assets/story/case-revision.svg';

// Replace paths, alt text and captions together when the group supplies real material.
// Original SVG artwork authored for this project; no external/stock assets.
export const placeholderCaption = 'Hình minh họa — sẽ thay bằng tư liệu của nhóm';
export const storyAssets = {
  project: { src: project, alt: 'Bảng công việc và ba thành viên cùng phát triển đồ án', caption: 'Đồ án nhóm: biến yêu cầu thành sản phẩm.' },
  ojt: { src: ojt, alt: 'Máy tính kết nối với môi trường làm việc tại doanh nghiệp', caption: 'OJT: vận dụng kiến thức trong bối cảnh công việc.' },
  conflict: { src: conflict, alt: 'Hai yêu cầu cùng hướng vào một ô đặt phòng có dấu xung đột', caption: 'Mốc 1 · Nhận diện đặt trùng.' },
  knowledge: { src: knowledge, alt: 'Sách mở với hai thành phần được nối bằng mũi tên', caption: 'Mốc 2 · Đối chiếu kiến thức.' },
  solution: { src: solution, alt: 'Các yêu cầu đi qua cơ chế kiểm soát trước khi ghi vào dữ liệu', caption: 'Mốc 3 · Thiết kế cách xử lý.' },
  testing: { src: testing, alt: 'Hai yêu cầu đồng thời và bảng kiểm có cả dấu đạt lẫn lỗi', caption: 'Mốc 4 · Kiểm tra cả kết quả và giới hạn.' },
  revision: { src: revision, alt: 'Hai mũi tên vòng quanh bản điều chỉnh có dấu kiểm', caption: 'Mốc 5 · Sửa, thử lại và tiếp tục học.' },
} as const;
export type StoryAssetKey = keyof typeof storyAssets;
