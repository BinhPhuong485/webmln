export const guidingQuestion = 'Sinh viên Đại học FPT biến kiến thức đã học thành năng lực giải quyết vấn đề thực tế như thế nào, và trải nghiệm thực tế giúp họ điều chỉnh, phát triển hiểu biết ấy ra sao?';

export const chapters = [
  { id: 'opening', label: 'Mở đầu' },
  { id: 'concepts', label: '01 · Hai vế' },
  { id: 'practice', label: '02 · Thực tiễn' },
  { id: 'learning', label: '03 · Vòng học tập' },
  { id: 'fpt', label: '04 · Tại FPT' },
  { id: 'case-study', label: 'Theo dấu đồ án' },
  { id: 'pitfalls', label: '05 · Hai lối rẽ' },
  { id: 'conclusion', label: '06 · Kết luận' },
  { id: 'video-summary', label: '07 · Video' },
  { id: 'references', label: 'Nguồn & AI Usage' },
] as const;

export const practiceRoles = [
  { title: 'Cơ sở', text: 'Thực tiễn cung cấp chất liệu để hình thành tri thức; lý luận khái quát các mối liên hệ bản chất từ đó.', example: 'Quan sát cách người dùng đặt phòng giúp nhóm nhận diện nhu cầu và các tình huống cần mô hình hóa.' },
  { title: 'Động lực', text: 'Vấn đề và nhu cầu của thực tiễn thúc đẩy nhận thức phát triển.', example: 'Lỗi đặt trùng khiến nhóm phải tìm hiểu sâu hơn về giao dịch và xử lý đồng thời.' },
  { title: 'Mục đích', text: 'Nhận thức hướng tới phục vụ hoạt động thực tiễn, cải biến hiện thực.', example: 'Học về dữ liệu để xây dựng cách đặt phòng đáng tin cậy, không chỉ để nhớ định nghĩa.' },
  { title: 'Tiêu chuẩn chân lý', text: 'Thực tiễn là tiêu chuẩn kiểm tra tính đúng đắn của nhận thức.', example: 'Cho nhiều yêu cầu cùng chạy để kiểm tra giả định “cách xử lý này ngăn được đặt trùng” trong điều kiện thử đã xác định.' },
];

export const learningSteps = [
  { title: 'Học nguyên lý', verb: 'Hiểu', text: 'Nắm khái niệm, điều kiện áp dụng và mối liên hệ; đặt một câu hỏi có thể kiểm tra.', question: 'Điều gì cần đúng, và trong điều kiện nào?' },
  { title: 'Vận dụng vào dự án', verb: 'Làm', text: 'Chuyển kiến thức thành mục tiêu, thiết kế và thao tác cụ thể trong bối cảnh của nhóm.', question: 'Ta sẽ làm gì để giải quyết vấn đề?' },
  { title: 'Nhận phản hồi / kiểm nghiệm', verb: 'Đối chiếu', text: 'Đối chiếu kết quả hành động với mục tiêu; ghi lại cả lỗi, điều kiện thử và phản hồi người dùng.', question: 'Điều gì phù hợp? Điều gì chưa giải thích được?' },
  { title: 'Điều chỉnh & tiếp tục vận dụng', verb: 'Phát triển', text: 'Phân tích nguyên nhân, sửa cách hiểu và cách làm rồi thử lại. Kinh nghiệm được tổng kết để hiểu sâu hơn.', question: 'Lần vận dụng tiếp theo cần thay đổi điều gì?' },
];

export const sources = {
  curriculum: { title: 'FPT · Khung chương trình Hệ thống thông tin (2025)', url: 'https://daihoc.fpt.edu.vn/wp-content/uploads/2025/04/Inforgraphic-Khungchuongtrinh-HTTT.pdf' },
  ojt: { title: 'FPT · Thông báo Orientation OJT Spring 2026 (30/10/2025)', url: 'https://daihoc.fpt.edu.vn/thong-bao-huong-dan/ojt-spring-2026-thong-bao-tham-du-orientation-ojt/' },
};

export const caseSteps = [
  { title: 'Phát hiện vấn đề', asset: 'conflict', heading: 'Một phòng, hai lượt đặt?', text: 'Trong tình huống giả định, hai người thử cùng đặt một phòng vào một khung giờ và đều nhận thông báo thành công.', takeaway: 'Ghi lại thao tác và thời điểm xảy ra lỗi. Một lần đặt riêng lẻ thành công chưa đủ để kết luận hệ thống xử lý đúng khi dùng đồng thời.' },
  { title: 'Tìm hiểu kiến thức', asset: 'knowledge', heading: 'Hiểu điều kiện để đặt phòng đúng', text: 'Nhóm đối chiếu kiến thức về giao dịch, tính nhất quán dữ liệu và các thao tác đồng thời với lỗi vừa gặp.', takeaway: 'Xác định yêu cầu: các lượt đặt hợp lệ của cùng một phòng không được chồng lấn thời gian. Cần xét cả điều kiện áp dụng giải pháp.' },
  { title: 'Thiết kế giải pháp', asset: 'solution', heading: 'Biến nguyên lý thành cách làm', text: 'Nhóm thiết kế kiểm tra và ghi nhận lượt đặt trong một cơ chế xử lý nhất quán; bổ sung ràng buộc hoặc cơ chế khóa phù hợp ở phía máy chủ.', takeaway: 'Không chỉ vô hiệu hóa nút trên một màn hình: nhiều người vẫn có thể gửi yêu cầu từ các thiết bị khác nhau.' },
  { title: 'Thử đồng thời', asset: 'testing', heading: 'Đối chiếu với tiêu chí đã đặt', text: 'Giả định khi chạy thử hai yêu cầu cùng khung giờ, chỉ một yêu cầu được chấp nhận. Nhóm tiếp tục thử các khoảng giờ chồng lấn và phát hiện một trường hợp chưa được xử lý.', takeaway: 'Kết quả thử chỉ có giá trị trong phạm vi đã kiểm tra. Không suy rộng thành “hệ thống luôn đúng” hay bằng chứng về chất lượng đào tạo.' },
  { title: 'Sửa & thử lại', asset: 'revision', heading: 'Phản hồi làm hiểu biết cụ thể hơn', text: 'Nhóm sửa cách kiểm tra khoảng thời gian, bổ sung ca kiểm thử và chạy lại cả các ca cũ. Với lỗi mới, vòng tìm hiểu và vận dụng tiếp tục.', takeaway: 'Từ hiểu “tránh trùng khung giờ” đến hiểu rõ hơn về chồng lấn thời gian, tính đồng thời và giới hạn của phép thử.' },
] as const;

export const decisionOptions = [
  { label: 'Áp dụng máy móc', title: 'Nguy cơ giáo điều', text: 'Chép một giải pháp trong tài liệu rồi coi nó đúng ở mọi hoàn cảnh sẽ bỏ qua cách chia khung giờ, dữ liệu và số yêu cầu thực tế. Cần phân tích điều kiện áp dụng, không chỉ viện dẫn lý thuyết.' },
  { label: 'Chỉ theo kinh nghiệm', title: 'Nguy cơ kinh nghiệm chủ nghĩa', text: '“Mình đặt thử một lần thấy ổn” không đủ để bỏ qua khả năng đặt đồng thời. Cần khái quát từ kinh nghiệm, đối chiếu nguyên lý và mở rộng việc kiểm tra.' },
  { label: 'Kết hợp lý luận và kiểm nghiệm', title: 'Một hướng xử lý phù hợp', text: 'Dùng nguyên lý để xác định yêu cầu và thiết kế; thử các tình huống có căn cứ, ghi nhận kết quả, phân tích sai lệch rồi sửa và thử lại. Lý luận và thực tiễn cùng tham gia vào quyết định.' },
];
