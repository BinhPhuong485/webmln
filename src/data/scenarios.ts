export type DecisionType = 'dogma' | 'empirical' | 'unity';

export interface ScenarioOption {
  type: DecisionType;
  text: string;
  explanation: string;
}

export interface Scenario {
  id: string;
  title: string;
  prompt: string;
  options: ScenarioOption[];
}

export const scenarios: Scenario[] = [
  { id: 'start', title: 'Khởi động đề tài', prompt: 'Nhóm nhận đề tài làm một ứng dụng cho sinh viên. Bạn quyết định thế nào?', options: [
    { type: 'dogma', text: "Áp ngay mô hình tính năng 'chuẩn' trong slide môn học, không cần khảo sát.", explanation: 'Áp máy móc kết luận có sẵn mà không xét bối cảnh là biểu hiện của bệnh giáo điều.' },
    { type: 'empirical', text: 'Bắt tay code ngay theo ý tưởng của bạn từng làm dự án tương tự, khỏi đọc tài liệu.', explanation: 'Dựa hoàn toàn vào kinh nghiệm riêng, bỏ qua tri thức khái quát là biểu hiện của bệnh kinh nghiệm chủ nghĩa.' },
    { type: 'unity', text: 'Khảo sát vài sinh viên trước, rồi dùng khung phân tích đã học để xác định vấn đề cần giải quyết.', explanation: 'Thực tiễn cung cấp dữ liệu, lý luận giúp định hướng cách phân tích: hai vế thống nhất.' }
  ] },
  { id: 'feedback', title: 'Phản hồi trái kế hoạch', prompt: 'Bản thử nghiệm nhận phản hồi khác với kế hoạch ban đầu.', options: [
    { type: 'dogma', text: "Giữ nguyên kế hoạch vì nó 'đúng theo lý thuyết'.", explanation: 'Thực tiễn là tiêu chuẩn kiểm nghiệm; bỏ qua phản hồi thực tế là tách lý luận khỏi thực tiễn.' },
    { type: 'empirical', text: 'Sửa theo từng phản hồi lẻ, không ghi lại hay tìm điểm chung.', explanation: 'Không khái quát các trường hợp riêng thành nhận định chung nên khó tiến bộ có hệ thống.' },
    { type: 'unity', text: 'Tổng hợp phản hồi, tìm điểm chung, điều chỉnh kế hoạch rồi thử lại.', explanation: 'Đây là vòng thực tiễn → khái quát → quay lại thực tiễn.' }
  ] },
  { id: 'conflict', title: 'Bất đồng trong nhóm', prompt: 'Một bạn dựa vào lý thuyết, một bạn dựa vào kinh nghiệm, hai bên không nhường nhau.', options: [
    { type: 'dogma', text: "Chọn ý kiến dựa trên lý thuyết vì 'có trong giáo trình'.", explanation: 'Có trong sách chưa đảm bảo phù hợp với hoàn cảnh cụ thể.' },
    { type: 'empirical', text: 'Chọn ý kiến của người có nhiều kinh nghiệm nhất.', explanation: 'Kinh nghiệm quý nhưng cần được kiểm chứng và khái quát, không nên tuyệt đối hoá.' },
    { type: 'unity', text: 'Thử cả hai cách trên một mẫu nhỏ, so kết quả rồi quyết định.', explanation: 'Dùng thực tiễn để kiểm nghiệm cả hai quan điểm.' }
  ] },
  { id: 'deadline', title: 'Thiếu thời gian', prompt: 'Còn hai tuần là nộp bài mà công việc chưa xong.', options: [
    { type: 'dogma', text: 'Dành phần lớn thời gian hoàn thiện tài liệu phân tích, giảm thời gian thử nghiệm.', explanation: 'Lý luận không được kiểm nghiệm bằng thực tiễn thì dễ trở nên hình thức.' },
    { type: 'empirical', text: "Bỏ phần phân tích, làm nhanh cho kịp vì 'quen tay rồi'.", explanation: 'Thiếu định hướng lý luận thì hành động dễ tự phát, mò mẫm.' },
    { type: 'unity', text: 'Thu hẹp phạm vi nhưng giữ đủ vòng: phân tích ngắn gọn → làm bản mẫu → kiểm chứng.', explanation: 'Giảm quy mô nhưng vẫn giữ sự thống nhất giữa nghĩ và làm.' }
  ] },
  { id: 'after', title: 'Sau khi nộp bài', prompt: 'Đồ án đã nộp xong.', options: [
    { type: 'dogma', text: 'Nộp báo cáo theo mẫu, coi như xong.', explanation: 'Hoàn thành hình thức mà không rút ra tri thức mới từ thực tiễn.' },
    { type: 'empirical', text: "Không ghi lại gì vì 'lần sau làm tiếp là được'.", explanation: 'Kinh nghiệm không được tổng kết thì khó nâng lên thành tri thức chung.' },
    { type: 'unity', text: 'Tổng kết bài học, đối chiếu với lý thuyết đã học và bổ sung vào phương pháp cho lần sau.', explanation: 'Tri thức quay lại phục vụ thực tiễn tiếp theo.' }
  ] }
];
