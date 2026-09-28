export interface Pair {
  id: string;
  concept: string;
  example: string;
}

export const pairs: Pair[] = [
  { id: 'basis', concept: 'Thực tiễn là cơ sở', example: 'Đồ án xuất phát từ một vấn đề thật của người dùng hoặc doanh nghiệp' },
  { id: 'motivation', concept: 'Thực tiễn là động lực', example: 'Khó khăn gặp khi làm dự án thúc đẩy nhóm tìm hiểu thêm kiến thức và công nghệ mới' },
  { id: 'purpose', concept: 'Thực tiễn là mục đích', example: 'Sản phẩm cuối cùng phải giải quyết được nhu cầu thật, không chỉ để nộp bài' },
  { id: 'truth', concept: 'Tiêu chuẩn chân lý', example: 'Triển khai thử giải pháp và đo kết quả thực tế để biết giả thuyết đúng hay sai' },
  { id: 'direction', concept: 'Lý luận định hướng', example: 'Dùng mô hình, khung phương pháp đã học để chọn phương án trước khi bắt tay làm' },
  { id: 'dogma', concept: 'Bệnh giáo điều', example: 'Áp dụng nguyên xi mẫu có sẵn dù không phù hợp bối cảnh của dự án' }
];
