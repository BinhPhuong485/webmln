# FPT•PHIL - Khi tư duy gặp đời sống

Website học tập tương tác cho chủ đề **"Thống nhất giữa lý luận và thực tiễn trong đào tạo bậc Đại học tại FPT"**. Dự án được xây dựng như một sản phẩm sáng tạo cho học phần Triết học Mác - Lênin, kết hợp bài đọc trực quan, minh hoạ 3D, video tóm tắt và các trò chơi tự kiểm tra.

## Tech stack

- React `19.1.1` + React DOM `19.1.1`
- TypeScript `5.8.3`
- Vite `7.1.7`
- React Router DOM `7.9.4`
- GSAP `3.13.0` và `@gsap/react` `2.1.2`
- Three.js `0.186.1`, React Three Fiber `9.8.1`, Drei `10.7.9`, Rapier `2.2.0`, MeshLine `3.3.1`
- `qrcode.react` `4.2.0` cho mã QR phía client

## Routes

| Route | Trang | Mô tả |
| --- | --- | --- |
| `/` | Bài học | Trang giải thích gồm phần mở đầu, 6 chặng nội dung, video tóm tắt, nguồn tham khảo và phụ lục AI Usage. |
| `/game` | Chọn trò chơi | Hiển thị 4 trò chơi cùng tiến độ hoàn thành lưu trên trình duyệt. |
| `/game/ghep-the` | Ghép thẻ | Lật thẻ để ghép 6 khái niệm với 6 tình huống tương ứng. Có lượt gợi ý và giai đoạn ghi nhớ trước khi chơi. |
| `/game/noi-day` | Nối dây | Nối khái niệm với tình huống bằng kéo-thả hoặc chọn lần lượt hai đầu nối. |
| `/game/vong-nhan-thuc` | Vòng nhận thức | Xếp 4 giai đoạn nhận thức theo đúng thứ tự, qua 2 vòng: tên giai đoạn và ví dụ. |
| `/game/truong-nhom` | Trưởng nhóm đồ án | Chọn cách xử lý cho 5 tình huống và xem sự cân bằng giữa lý luận suông, thực tiễn mù quáng và sự thống nhất. |
| `*` | 404 | Trang báo đường dẫn không tồn tại và liên kết quay về bài học. |

## Tính năng chính

- Bài học một trang với animation GSAP/ScrollTrigger, có hỗ trợ `prefers-reduced-motion`.
- Tiêu đề Hero dạng StrokeText và thanh điều hướng theo dõi các chặng nội dung.
- Thẻ đeo dây 3D tương tác bằng React Three Fiber/Rapier; giật thẻ có thể chuyển đến khu trò chơi.
- Video YouTube được lazy-load: iframe chỉ được tạo sau khi người dùng bấm phát.
- Chia sẻ liên kết qua Web Share API hoặc sao chép clipboard; tạo mã QR ngay trên trình duyệt và tải ảnh PNG.
- Tiến độ 4 trò chơi được lưu trong `localStorage`; khi hoàn thành đủ, người chơi nhận popup chúc mừng.
- Nút quay lên đầu trang, hiệu ứng ClickSpark và giao diện responsive cho desktop lẫn mobile.

## Chạy local

Yêu cầu: Node.js và npm.

```bash
git clone https://github.com/BinhPhuong485/webmln.git
cd webmln
npm install
```

Tạo file `.env` ở thư mục gốc nếu cần liên kết chia sẻ/mã QR trỏ đến URL deploy:

```env
VITE_SITE_URL=https://webmln-tawny.vercel.app
```

`VITE_SITE_URL` là biến môi trường duy nhất hiện được đọc trong code. Nếu không tạo `.env`, ứng dụng dùng `window.location.origin`; cách này vẫn dùng được ở local nhưng mã QR local không mở được trên thiết bị khác.

Khởi động môi trường phát triển:

```bash
npm run dev
```

Các script có sẵn:

```bash
npm run dev      # chạy Vite development server
npm run build    # kiểm tra TypeScript và tạo bản production trong dist/
npm run preview  # xem thử bản production đã build
```

## Build và deploy

```bash
npm run build
npm run preview
```

Dự án đang được deploy trên Vercel: <https://webmln-tawny.vercel.app/>.

File `vercel.json` cấu hình rewrite mọi đường dẫn về `index.html`. Đây là yêu cầu cần thiết để các route phía client như `/game/noi-day` vẫn hoạt động khi người dùng tải lại trang hoặc mở trực tiếp URL trên Vercel.

## Sử dụng AI trong quá trình làm bài

Xem phần kê khai chi tiết ngay trong website tại [Phụ lục AI Usage](https://webmln-tawny.vercel.app/#ai-usage).
