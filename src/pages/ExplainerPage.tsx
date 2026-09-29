import { useEffect, useRef, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { YankLanyard } from '../components/YankLanyard';
import { TheoryPracticeDiagram } from '../components/TheoryPracticeDiagram';
import { StoryNavigation } from '../components/StoryNavigation';
import { LearningCycle } from '../components/LearningCycle';
import { FptExperiences } from '../components/FptExperiences';
import { ProjectCaseStudy } from '../components/ProjectCaseStudy';
import { DecisionReflection } from '../components/DecisionReflection';
import { ExplainerReferences } from '../components/ExplainerReferences';
import { guidingQuestion, practiceRoles, sources } from '../data/explainerStory';
import { useHeroEntrance, useProgressScroll, useSection01Scroll, useSection02Scroll, useSection03Scroll, useSection04Scroll, useSection05Scroll, useSection06Scroll, useSectionNumberParallax } from '../hooks/useExplainerScroll';
import './ExplainerScroll.css';
import './ExplainerStory.css';

function Heading({ number, label, children }: { number: string; label: string; children: ReactNode }) {
  return <>{number === '01' && <YankLanyard />}<header className="section-heading"><span>{number}</span><div><p className="eyebrow">{label}</p><h2>{children}</h2></div></header></>;
}

export function ExplainerPage() {
  const root = useRef<HTMLElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  useHeroEntrance(root); useProgressScroll(root, bar); useSectionNumberParallax(root); useSection01Scroll(root); useSection02Scroll(root); useSection03Scroll(root); useSection04Scroll(root); useSection05Scroll(root); useSection06Scroll(root);

  useEffect(() => {
    let disposed = false;
    let refreshTimer: number | null = null;
    const refresh = () => {
      if (disposed) return;
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 140);
    };
    const observer = root.current ? new ResizeObserver(refresh) : null;
    if (root.current) observer?.observe(root.current);
    document.fonts?.ready.then(refresh).catch(refresh);
    window.addEventListener('load', refresh, { once: true });
    window.addEventListener('orientationchange', refresh);
    refresh();
    return () => {
      disposed = true;
      if (refreshTimer !== null) window.clearTimeout(refreshTimer);
      observer?.disconnect();
      window.removeEventListener('load', refresh);
      window.removeEventListener('orientationchange', refresh);
    };
  }, []);

  return <main className="site story-site" ref={root}>
    <a className="story-skip" href="#concepts">Bỏ qua mở đầu, đến bài học</a>
    <div className="reading"><span ref={bar} /></div>
    <nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link><Link to="/game">Chơi game ↗</Link></nav>
    <section className="hero story-hero" id="opening" tabIndex={-1}>
      <p className="eyebrow hero-reveal">MLN111 · Thống nhất giữa lý luận và thực tiễn trong đào tạo bậc Đại học tại FPT</p>
      <h1 className="hero-reveal">Khi tư duy<br />gặp <mark>đời sống.</mark></h1>
      <div className="story-opening hero-reveal">
        <p className="story-kicker">Tình huống giả định để minh họa</p>
        <p>Nhóm sinh viên FPT lên kế hoạch làm ứng dụng đặt phòng học nhóm. Bản thử trông ổn — cho đến khi hai người dùng cùng đặt một phòng và đều nhận thông báo thành công.</p>
        <p className="story-opening-question">Vậy nhóm cần sửa sản phẩm, hay còn cần xem lại cách hiểu của mình?</p>
      </div>
      <div className="hero-bottom hero-reveal"><div><p className="story-kicker">Câu hỏi xuyên suốt</p><p>{guidingQuestion}</p></div><a className="round-btn" href="#concepts" aria-label="Bắt đầu tìm hiểu lý luận và thực tiễn">↓</a></div>
    </section>

    <StoryNavigation />

    <section className="section definitions" id="concepts" tabIndex={-1}>
      <Heading number="01" label="Hai điểm xuất phát">Hiểu đúng hai vế<br />của một nguyên tắc.</Heading>
      <div className="definition-pair">
        <article className="definition-theory"><b>A</b><p className="eyebrow">Lý luận là gì?</p><h3>Hệ thống tri thức được khái quát từ thực tiễn.</h3><p>Phản ánh những mối liên hệ bản chất, quy luật của sự vật; giúp con người nhận thức và hành động có định hướng.</p></article>
        <i className="definition-link" aria-hidden="true">↔</i>
        <article className="definition-practice"><b>B</b><p className="eyebrow">Thực tiễn là gì?</p><h3>Hoạt động vật chất có mục đích, mang tính lịch sử – xã hội.</h3><p>Đó là toàn bộ hoạt động của con người nhằm cải biến tự nhiên và xã hội. Các hình thức cơ bản: sản xuất vật chất, hoạt động chính trị – xã hội và thực nghiệm khoa học.</p></article>
      </div>
      <TheoryPracticeDiagram />
      <p className="story-transition">Hai vế gắn bó, nhưng vai trò không giống nhau. Trước hết, thực tiễn đóng góp gì cho nhận thức? <a href="#practice">Đến chặng 02 →</a></p>
    </section>

    <section className="section practice-section" id="practice" tabIndex={-1}>
      <div><Heading number="02" label="Từ đời sống đến tư duy">Thực tiễn<br />không đứng sau lý luận.</Heading><p className="section-lead">Thực tiễn là cơ sở, động lực, mục đích của nhận thức và tiêu chuẩn của chân lý.</p><p className="story-note">Ví dụ học tập dưới đây tiếp tục tình huống giả định về đồ án đặt phòng.</p></div>
      <div className="role-orbit">{practiceRoles.map((role, index) => <article className="role-card" key={role.title}><span>0{index + 1}</span><h3>{role.title}</h3><p>{role.text}</p><details className="role-example"><summary>Xem ví dụ học tập</summary><p>{role.example}</p></details></article>)}</div>
      <p className="story-caution">Một phép thử sản phẩm chỉ kiểm tra giả định trong điều kiện cụ thể; nó không chứng minh mọi kết luận về giáo dục hay chất lượng đào tạo của FPT.</p>
      <p className="story-transition">Từ thực tiễn, ta phát triển hiểu biết. Hiểu biết ấy quay lại hướng dẫn hành động như thế nào? <a href="#learning">Đến chặng 03 →</a></p>
    </section>

    <section className="section theory-section" id="learning" tabIndex={-1}>
      <span className="theory-glow" aria-hidden="true" /><b className="theory-star" aria-hidden="true">✦</b>
      <div className="theory-content"><Heading number="03" label="Từ tư duy đến hành động">Lý luận là<br />ngọn đèn dẫn lối.</Heading><p className="lead">Lý luận định hướng, thực tiễn kiểm nghiệm. Học tập cần cả hai.</p><p className="line theory-line"><strong>Định hướng mục tiêu</strong> — xác định vấn đề và kết quả cần đạt.</p><p className="line theory-line"><strong>Lựa chọn phương pháp</strong> — phân tích điều kiện, dự kiến khả năng và rủi ro.</p><p className="line theory-line"><strong>Xây dựng cách đánh giá</strong> — đối chiếu kết quả với tiêu chí, nhận ra điều cần điều chỉnh.</p></div>
      <div className="story-learning-block"><p className="story-note">Vòng học tập dưới đây minh họa việc vận dụng nguyên tắc triết học trong học tập; không phải sơ đồ trích nguyên văn từ giáo trình.</p><LearningCycle /></div>
      <p className="story-transition">Vòng học này có thể diễn ra trong những bối cảnh nào ở đại học? <a href="#fpt">Khám phá đồ án và OJT →</a></p>
    </section>

    <section className="section fpt-section" id="fpt" tabIndex={-1}>
      <Heading number="04" label="Tại Đại học FPT">Học để làm,<br />làm để hiểu sâu.</Heading>
      <p className="story-intro">Đồ án nhóm và học kỳ tại doanh nghiệp tạo bối cảnh để nhìn rõ mối liên hệ giữa kiến thức, hành động và phản hồi. Chọn một thẻ để mở chuỗi học → làm → phản hồi.</p>
      <p className="story-source">Trong khung chương trình Hệ thống thông tin của FPT, OJT hướng tới vận dụng kiến thức, kỹ năng vào công việc và dự án dưới sự hướng dẫn. <a href={sources.curriculum.url}>Nguồn chính thức: khung chương trình ↗</a></p>
      <FptExperiences />
      <p className="story-transition">Để thấy cụ thể hơn, hãy theo dấu một đồ án từ lúc gặp lỗi đến khi sửa cách làm. <a href="#case-study">Theo dấu đồ án →</a></p>
    </section>

    <section className="section story-case-section" id="case-study" tabIndex={-1} aria-labelledby="case-title">
      <p className="story-kicker">Cận cảnh chặng 04 · Một trường hợp xuyên suốt</p><h2 id="case-title">Từ “đặt được phòng”<br />đến hiểu vì sao đặt trùng.</h2>
      <ProjectCaseStudy />
      <p className="story-transition">Cùng một lỗi, cách tiếp cận khác nhau dẫn đến những lựa chọn khác nhau. <a href="#pitfalls">Đến chặng 05 →</a></p>
    </section>

    <section className="section split-section" id="pitfalls" tabIndex={-1}>
      <Heading number="05" label="Khi một vế bị bỏ quên">Hai lối rẽ<br />cần tránh.</Heading>
      <div className="split-comparison"><span className="split-divider" aria-hidden="true" /><article><p className="eyebrow">Bệnh giáo điều</p><h3>Thuộc lý thuyết,<br />quên hoàn cảnh.</h3><p>Trong đồ án giả định: chép cách đặt lịch từ một mẫu có sẵn, bỏ qua việc người dùng được chọn các khoảng giờ chồng lấn. Giải pháp có cơ sở nhưng áp dụng sai điều kiện vẫn có thể thất bại.</p></article><article><p className="eyebrow">Bệnh kinh nghiệm chủ nghĩa</p><h3>Làm theo kinh nghiệm,<br />xem nhẹ lý luận.</h3><p>Chỉ dựa vào một lần đặt thử thành công rồi cho rằng không thể đặt trùng. Kinh nghiệm riêng lẻ bị tuyệt đối hóa, khiến nhóm bỏ qua vấn đề xử lý đồng thời.</p></article></div>
      <DecisionReflection />
      <p className="story-transition">Kết hợp phân tích lý thuyết, thử nghiệm và tổng kết kết quả giúp ta trở lại câu hỏi ban đầu. <a href="#conclusion">Đến kết luận →</a></p>
    </section>

    <section className="section conclusion" id="conclusion" tabIndex={-1}>
      <Heading number="06" label="Trả lời câu hỏi đầu trang">Biết nghĩ.<br />Biết làm.<br />Biết học từ điều đã làm.</Heading>
      <div><p className="story-conclusion-question">{guidingQuestion}</p><p className="conclusion-copy"><span className="conclusion-line">Sinh viên biến kiến thức thành năng lực bằng cách dùng lý luận để xác định mục tiêu, chọn phương pháp và tiêu chí giải quyết vấn đề;</span><span className="conclusion-line"> vận dụng trong đồ án hoặc công việc, đối chiếu kết quả và phản hồi với dự kiến;</span><span className="conclusion-line"> rồi tổng kết, điều chỉnh cách hiểu, cách làm và tiếp tục vận dụng.</span></p><strong className="conclusion-statement">Lý luận hướng dẫn hành động; thực tiễn cho cơ hội vận dụng, kiểm nghiệm và phát triển hiểu biết.</strong><p className="story-conclusion-note">Đó là cách vận dụng nguyên tắc, không phải lời khẳng định rằng mọi trải nghiệm tự động tạo ra năng lực. Phản tư và tổng kết có căn cứ là phần không thể bỏ qua.</p><Link className="primary-btn" to="/game">Tự vận dụng qua 04 trò chơi ↗</Link><a className="story-link" href="#references">Xem nguồn & phụ lục AI Usage ↓</a></div>
    </section>
    <ExplainerReferences />
    <footer>Triết học Mác – Lênin <span>Bài thuyết trình MLN111 · 2026</span><a href="#references">Nguồn & AI Usage ↑</a></footer>
  </main>;
}
