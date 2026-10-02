# Tích hợp origin/main vào dev — 02/10/2026

## Mốc đối chiếu và bảo toàn công việc

- Repository: `BinhPhuong485/webmln`; remote `origin`: `https://github.com/BinhPhuong485/webmln.git`.
- Nhánh khi bắt đầu và nhánh thực hiện toàn bộ chỉnh sửa/commit: `dev`.
- Commit `dev` ban đầu: `e9a345149803343c2425cde4c45952877c452344` — `feat(mln111): complete theory-practice interactive presentation`.
- Commit `origin/main` được tích hợp: `fa644623c8d5fbf32b065726125fabcae0719054` — `fix layout mobile`.
- Merge base: `b89aefa` — `add animation trang game`.
- Working tree sạch; không có MERGE_HEAD, REBASE_HEAD, rebase-merge hay rebase-apply. Không cần stash, không có công việc chưa commit bị ghi đè.
- `dev` local đã tồn tại. Sau fetch, kiểm tra `git ls-remote --heads origin dev` thành công và không trả ref: remote `dev` chưa tồn tại, không có commit remote dev cần tích hợp. Giữ lịch sử dev local hiện hữu.
- Thực hiện `git merge --no-ff --no-commit origin/main` trên dev. Trong merge này, **ours / stage 2 / HEAD là dev**, **theirs / stage 3 là origin/main**; stage 1 là merge base. Không dùng lựa chọn ours/theirs hàng loạt.
- Fetch/Git metadata và network cần quyền ngoài sandbox; các lần lỗi quyền/kết nối ban đầu được chạy lại qua cơ chế cấp quyền. Không dùng reset hard, clean hoặc force push.

## Conflict 1 — src/components/YankLanyard.tsx

**Vùng conflict:** effect gắn sự kiện điều hướng, effect định vị dây đeo và callback kéo thẻ.

- Main: dùng `useNavigate` và `navigate('/game')` thay cho tải lại toàn trang; effect phụ thuộc `navigate`; giữ công thức căn giữa thẻ theo nút game.
- Dev: còn `window.location.assign('/game')`, nhưng giới hạn vị trí ngang của canvas trong viewport để tránh tràn.
- Đã đọc ba phiên bản base/dev/main, cùng Lanyard, App, CSS liên quan và diff của các nhánh.
- **Quyết định:** giữ implementation routing mới của main trong cả click và kéo thẻ, chỉ bổ sung `Math.max/Math.min` giới hạn vị trí từ dev vào công thức `left`.
- **Lý do:** routing của main thay thế cách tải lại trang cũ; giới hạn vị trí là sửa lỗi độc lập, không có implementation tương đương ở main.
- **Ảnh hưởng:** điều hướng game qua React Router, bố cục dây đeo và chống cuộn ngang. Giữ listener cleanup của main, không đổi thiết kế/physics.

## Conflict 2 — src/pages/ExplainerPage.tsx

**Vùng conflict:** import và phần render từ nav/hero đến footer (Git gom vào một hunk lớn do cấu trúc JSX hai phía khác nhau).

- Main: thêm `HeroStrokeText`, `ArrowUpRightIcon`, scroll cue; thêm `VideoSection`; chuyển CTA game xuống sau video; cập nhật hook kết luận để không phụ thuộc CTA trong conclusion.
- Dev: có tuyến bài học, tình huống mở đầu, câu hỏi xuyên suốt, StoryNavigation, sơ đồ hai chiều, LearningCycle, FptExperiences, ProjectCaseStudy, DecisionReflection, ExplainerReferences/AI Usage; có id chặng, skip link, nhãn minh họa và guard callback refresh sau unmount.
- Đã so sánh diff main với merge base, bản dev, component hero/video, CSS responsive và hook kết luận.
- **Quyết định theo vùng:**
  1. Gộp import cần dùng từ hai phía, không giữ mảng nội dung tĩnh cũ trùng với các component tương tác của dev.
  2. Dùng HeroStrokeText và icon SVG của main thay tiêu đề HTML/icon ký tự cũ. Giữ tình huống mở đầu và câu hỏi xuyên suốt của dev.
  3. Dùng cách trình bày scroll cue từ main thay nút tròn cũ. Cue được render thành anchor tới `#concepts` để giữ chức năng bắt đầu bài bằng bàn phím/bấm từ dev; không để `aria-hidden` trên toàn cue.
  4. Giữ sáu chặng tương tác, nội dung minh họa, nguồn/AI Usage, skip link, id chặng và guard refresh của dev: đây là chức năng riêng chưa được thay thế trên main.
  5. Giữ VideoSection của main nguyên implementation, đặt sau kết luận. Bọc bằng phần tử `#video-summary` để menu chặng có đích điều hướng.
  6. Theo main, chỉ giữ CTA game chính ở `game-navigation` sau video; bỏ CTA trùng trong conclusion, giữ nhãn tự vận dụng của dev và dùng icon main. Nguồn/AI Usage tiếp tục xuất hiện phía sau.
- **Lý do:** các tính năng mới hai phía bổ sung cho nhau. Ưu tiên implementation mới của main ở hero/video/routing, không bỏ các tương tác học tập riêng của dev.
- **Ảnh hưởng:** hero, điều hướng nội trang, bài học, video và đường vào game. Không thay logic bốn game, QR hoặc dữ liệu tiến độ từ main.

## Điều chỉnh ngoài vùng conflict để tích hợp

| Tệp | Điều chỉnh | Lý do và ảnh hưởng |
| --- | --- | --- |
| `src/pages/ExplainerStory.css` | Hero của trang kể chuyện có padding-bottom 7rem; `.story-hero .hero-bottom` dùng `top:auto; padding-bottom:0`. | Main có offset desktop `top:-84px` cho hero ngắn, còn dev có tình huống mở đầu ở giữa. Override hẹp tránh chồng chữ và chừa chỗ cho scroll cue, không sửa CSS responsive chung của main. |
| `src/data/explainerStory.ts` | Thêm chặng `07 · Video`, đích `video-summary`. | Tích hợp video mới vào chức năng theo dõi chặng của dev. |
| `docs/merge-conflict-log.md` | Thêm bản ghi này. | Lưu mốc commit, quyết định và kết quả kiểm tra. |

Các file còn lại từ main được merge tự động và giữ nguyên: favicon/poster/video, App/404, ClickSpark, nút lên đầu trang, stroke text, cập nhật mobile, game/progress/congrats và hook kết luận. Các file riêng của dev được giữ nguyên, bao gồm guard physics của Lanyard. Không thay dependency/lockfile. `docs/STORY_HANDOFF.md` là bản bàn giao lịch sử của lượt trước, không được dùng làm báo cáo kiểm tra cho merge này.

## Kiểm tra

- `npm run build` chạy cả `tsc -b` và `vite build`: đạt; cảnh báo chunk >500 kB vẫn còn, không phải lỗi build.
- Package chỉ có dev/build/preview; không có script test hoặc lint riêng.
- Không còn conflict marker trong source/docs. Rà diff với dev ban đầu và origin/main: ngoài thay đổi tự động từ main, chỉ hai file conflict và hai chỉnh sửa tích hợp nêu trên thay đổi; không bỏ component tương tác riêng của dev.
- Trình duyệt local, desktop 1366×768: hero SVG hiển thị, các khối mở đầu/câu hỏi/scroll cue không chồng nhau; menu không tràn. Hai chiều sơ đồ đổi đúng (có thử phím cách); LearningCycle ghim và cập nhật bước. Video/poster xuất hiện một lần; CTA game chính xuất hiện một lần sau video.
- Mobile 390×844: hero không chồng chữ; không cuộn ngang; không có pin spacer; menu chọn được chặng Video và hiển thị tên chặng tương ứng. Poster tải thành công.
- Link game ở topnav đi qua routing của main; bốn route game đều mở được và quay về hub. Hub hiển thị tiến độ 0/4 ở session kiểm tra. Rời bài học không còn pin spacer. QR dựng canvas và đóng bằng Escape.
- Console không có error trong lượt kiểm tra. Đây là smoke test tích hợp, không phải chơi hết các vòng game hoặc xác minh chứng nhận. Không thử phát hết video YouTube hoặc thay đổi thiết lập reduced-motion của hệ điều hành.

## Lịch sử và xuất bản

Commit merge chứa bản ghi này có parent thứ nhất là dev ban đầu, parent thứ hai là commit main nêu trên. Có thể đối chiếu bằng `git show --format=fuller --stat` và `git rev-list --parents -n 1` trên commit merge. Chỉ push bình thường tới `origin/dev`; không commit/push main. Kết quả push và SHA cuối được báo riêng sau khi máy chủ xác nhận để không ghi trước một kết quả chưa xảy ra.
