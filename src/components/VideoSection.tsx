import { useState } from 'react';
import './VideoSection.css';

const VIDEO_ID = 'miic8pgcWeA';
const POSTER_SRC = '/videos/tom-tat-poster.jpg';

function PlayIcon() {
  return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>;
}

export function VideoSection() {
  const [started, setStarted] = useState(false);
  const [posterFailed, setPosterFailed] = useState(false);
  const [embedLoaded, setEmbedLoaded] = useState(false);

  return <section className="section video-section" aria-labelledby="video-section-title">
    <header className="section-heading">
      <span>07</span>
      <div>
        <p className="eyebrow">Tóm tắt trực quan</p>
        <h2 id="video-section-title">Xem lại trong<br />2 phút.</h2>
      </div>
    </header>
    <p className="video-section__lead">Tóm tắt nhanh nội dung đã đọc ở trên.</p>

    <div className="video-plaque" data-state={started ? (embedLoaded ? 'success' : 'loading') : posterFailed ? 'error' : 'default'}>
      <div className="video-plaque__rail" aria-hidden="true"><span>VIDEO</span><i /></div>
      <div className="video-plaque__frame">
        {!started ? <>
          {posterFailed ? <div className="video-plaque__fallback" aria-hidden="true"><span>07</span><b>Lý luận<br />và Thực tiễn</b></div> : <img className="video-plaque__poster" src={POSTER_SRC} alt="Minh hoạ tóm tắt Lý luận và Thực tiễn" onError={() => setPosterFailed(true)} />}
          <div className="video-plaque__veil" />
          <div className="video-plaque__caption"><span>Video tóm tắt</span><p>Lý luận ↔ Thực tiễn</p></div>
          <button className="video-plaque__play" type="button" onClick={() => setStarted(true)} aria-label="Phát video tóm tắt Lý luận và Thực tiễn"><PlayIcon /><span>Phát video</span></button>
        </> : <>
          {!embedLoaded && <div className="video-plaque__loading" role="status">Đang mở video…</div>}
          <iframe
            className="video-plaque__embed"
            src={`https://www.youtube-nocookie.com/embed/${VIDEO_ID}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
            title="Video tóm tắt mối quan hệ giữa lý luận và thực tiễn"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
            onLoad={() => setEmbedLoaded(true)}
          />
        </>}
      </div>
      <div className="video-plaque__meta"><span>07 / Tóm tắt</span><span>02 phút</span></div>
    </div>
  </section>;
}
