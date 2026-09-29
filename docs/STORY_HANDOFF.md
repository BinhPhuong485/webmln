# Bàn giao tuyến bài MLN111

## Tuyến nội dung

Mở đầu bằng lỗi đặt trùng → 01 định nghĩa và sơ đồ hai chiều → 02 bốn vai trò của thực tiễn → 03 lý luận định hướng và vòng học tập → 04 đồ án/OJT → năm mốc đồ án giả định → 05 hai khuynh hướng và một quyết định → 06 trả lời câu hỏi xuyên suốt → nguồn và AI Usage.

Giữ số mục 01–06 để các gợi ý trong game Nối dây và Trưởng nhóm đồ án vẫn đúng. Không đổi dữ liệu, luật chơi, routing hay QR.

## Tương tác và bảo trì

- `StoryNavigation`: chặng đang đọc, menu gọn dưới 1200 px; cleanup scroll/resize listener và requestAnimationFrame.
- `TheoryPracticeDiagram`: giữ hai chiều bấm/chạm, rút ngắn ví dụ và liên kết tới trường hợp đầy đủ.
- `LearningCycle`: ScrollTrigger ghim hình trên màn hình rộng từ 1024 px, cao từ 650 px, khi không giảm chuyển động. Các bước luôn có nội dung trong trang. `gsap.matchMedia` và `useGSAP` hoàn nguyên pin/trigger khi đổi breakpoint hoặc unmount.
- `FptExperiences`: mở từng thẻ bằng nút, đóng tại đầu/cuối; nội dung đóng có `inert` và `aria-hidden`; nút đóng cuối trả focus về nút mở. CSS grid chuyển chiều cao trong 220 ms.
- `ProjectCaseStudy`: năm mốc bấm/chạm; panel giữ diện tích để hạn chế nhảy trang; không có kết quả nghiên cứu thật.
- `DecisionReflection`: ba hướng lựa chọn, giải thích ngay, không tính điểm; liên kết game Trưởng nhóm đồ án.
- `ExplainerReferences`: nguồn, dấu nhắc đối chiếu giáo trình và bảy trường AI Usage chưa khai thay nhóm.
- CSS mới được giới hạn trong trang bài học hoặc class riêng; không thêm package.
- Sửa nhỏ `Lanyard`: guard ref vật lý trong frame callback; `YankLanyard` giới hạn vị trí canvas trong viewport. Không thay thiết kế thẻ.

## Ảnh tạm cần thay

Tất cả ở `src/assets/story/`, là SVG gốc tạo cho project, không tải từ stock và không mô phỏng bằng chứng thực địa. Đường dẫn, alt và caption tập trung trong `src/data/storyAssets.ts`.

| Tệp | Tư liệu nhóm có thể cung cấp |
| --- | --- |
| `project-placeholder.svg` | Ảnh/bảng công việc của đồ án nhóm đã được phép sử dụng |
| `ojt-placeholder.svg` | Ảnh hoạt động OJT có sự đồng ý và không lộ dữ liệu doanh nghiệp |
| `case-conflict.svg` | Màn hình hoặc nhật ký mô tả lỗi thực tế, nếu có |
| `case-knowledge.svg` | Tài liệu hoặc ghi chú phân tích của nhóm |
| `case-solution.svg` | Sơ đồ thiết kế hoặc ảnh phần triển khai của nhóm |
| `case-testing.svg` | Ca kiểm thử và kết quả đã được ghi nhận |
| `case-revision.svg` | Bản sửa và kết quả thử lại có thể đối chiếu |

Nhãn hiện tại: **Hình minh họa — sẽ thay bằng tư liệu của nhóm**. Nếu không có tư liệu thật, có thể giữ SVG và nhãn minh họa. Chỉ đổi câu chuyện thành trường hợp thật khi có tài liệu đối chiếu; việc thay ảnh không tự biến nội dung giả định thành dữ kiện.

## Danh sách tệp của phần triển khai

- Trang và giao diện: `src/pages/ExplainerPage.tsx`, `src/pages/ExplainerStory.css`.
- Thành phần mới: `src/components/StoryNavigation.tsx`, `LearningCycle.tsx`, `FptExperiences.tsx`, `ProjectCaseStudy.tsx`, `DecisionReflection.tsx`, `ExplainerReferences.tsx`, `StoryFigure.tsx` (tất cả trong `src/components/`).
- Sơ đồ từ lượt trước: cập nhật `src/components/TheoryPracticeDiagram.tsx`; giữ `TheoryPracticeDiagram.css` đã có trong workspace, chưa được Git theo dõi từ lượt trước.
- Sửa ổn định hiển thị: `src/components/Lanyard.tsx`, `src/components/YankLanyard.tsx`.
- Nội dung và manifest ảnh: `src/data/explainerStory.ts`, `src/data/storyAssets.ts`.
- Khai báo module SVG: `src/assets.d.ts`.
- Bảy SVG trong `src/assets/story/` liệt kê ở bảng trên.
- Tài liệu bàn giao: `docs/STORY_HANDOFF.md`.

Không sửa `package.json`, lockfile, hook animation hiện có, CSS responsive toàn cục, các tệp game, `App.tsx` hay thành phần QR.

## Nguồn đã đối chiếu

Truy cập 29/09/2026:

- [FPT: Khung chương trình Hệ thống thông tin](https://daihoc.fpt.edu.vn/wp-content/uploads/2025/04/Inforgraphic-Khungchuongtrinh-HTTT.pdf): định hướng vận dụng kiến thức/kỹ năng vào công việc và dự án trong OJT. Không dùng số liệu tuyển dụng hoặc hiệu quả đào tạo.
- [FPT: Orientation OJT Spring 2026, 30/10/2025](https://daihoc.fpt.edu.vn/thong-bao-huong-dan/ojt-spring-2026-thong-bao-tham-du-orientation-ojt/): cách gọi học kỳ tại doanh nghiệp và hoạt động hướng dẫn. Website không suy rộng các điều kiện cụ thể thành quy định chung cho mọi ngành/khóa/cơ sở.
- Giáo trình: Bộ GD&ĐT, *Giáo trình Triết học Mác – Lênin (Dành cho bậc đại học hệ không chuyên lý luận chính trị)*, NXB Chính trị quốc gia Sự thật, 2021. **Nhóm cần cung cấp/đối chiếu bản đang dùng để xác nhận trang và mục; chưa ghi số trang.**

## Kiểm tra thực hiện

- `npm run build`: gồm `tsc -b` và Vite; đạt. Vite vẫn cảnh báo chunk lớn do trang bài học mang phần 3D hiện có.
- Desktop 1440×1000: hai chiều sơ đồ, bốn ví dụ mở rộng, hai thẻ FPT và đóng trả focus, đủ năm mốc đồ án, ba hướng quyết định, đủ bảy trường AI Usage.
- Mobile viewport 390×844 và 320×740: menu chặng, bố cục dọc, không pin/khóa cuộn, mở/đóng OJT, mốc thử đồng thời và lựa chọn tình huống; không tràn ngang sau sửa canvas.
- Viewport trình chiếu 1366×768: pin ở khoảng 120 px, toàn bộ hình nằm trong viewport; bước hiện tại và tên chặng cập nhật đúng.
- Bàn phím: Enter chọn ba phương án, phím cách đổi chiều sơ đồ; focus trở về nút OJT sau khi đóng.
- QR: canvas được dựng, Escape đóng hộp thoại; liên kết là localhost trong môi trường dev. Chưa quét bằng điện thoại thật.
- Game: lật một thẻ Ghép thẻ, nối đúng một cặp Nối dây, đặt đúng một thẻ Vòng nhận thức, chọn phương án và nhận phản hồi ở Trưởng nhóm. Đây là smoke test, chưa chơi hết mọi vòng.
- Rời bài học: không còn pin spacer/nav; quay lại desktop có đúng một pin spacer, không nhân đôi. Console không ghi nhận lỗi trong lượt kiểm tra sau sửa.
- `prefers-reduced-motion`: rà soát media query và cleanup của GSAP; chưa bật được tùy chọn hệ điều hành trong môi trường browser kiểm tra. Cần nhóm kiểm tra trên thiết bị thật.

## Nhóm cần hoàn thiện trước khi nộp

1. Đối chiếu thuật ngữ và trang giáo trình với bản tài liệu được giảng viên sử dụng.
2. Cung cấp ảnh/tư liệu có quyền sử dụng, tên nguồn và bối cảnh; nếu không có, giữ nhãn giả định/minh họa.
3. Khai AI Usage dựa trên lịch sử thật: công cụ, mục đích, prompt, đầu ra, phần tự sửa, nguồn kiểm chứng và cam kết. Khung trên web hiện là văn bản biên tập, không phải form lưu dữ liệu.
4. Xem trực tiếp trên máy chiếu và điện thoại; thử trình đọc màn hình và cài đặt giảm chuyển động.
5. Xác nhận `VITE_SITE_URL` cho bản triển khai để QR trỏ tới URL công khai. Không thay cấu hình này trong lượt chỉnh sửa.
