export interface CycleStage {
  id: string;
  title: string;
  example: string;
  hint: string;
}

export const cycleStages: CycleStage[] = [
  { id: 'practice', title: 'Thực tiễn', example: 'Nhóm đi khảo sát và làm thử một bản mẫu', hint: 'Nhận thức bắt đầu từ đâu?' },
  { id: 'sensory', title: 'Nhận thức cảm tính', example: 'Ghi lại những gì quan sát, nghe và thấy được từ người dùng', hint: 'Hãy nghĩ về điều con người trực tiếp quan sát và cảm nhận.' },
  { id: 'rational', title: 'Nhận thức lý tính', example: 'Phân tích, khái quát thành nhận định và kế hoạch', hint: 'Bước nào biến dữ liệu rời rạc thành nhận định?' },
  { id: 'verification', title: 'Quay lại thực tiễn để kiểm nghiệm', example: 'Triển khai kế hoạch, đo kết quả rồi điều chỉnh', hint: 'Kế hoạch cần quay lại đâu để được kiểm nghiệm?' }
];
