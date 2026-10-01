import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { scenarios, type DecisionType, type ScenarioOption } from '../data/scenarios';
import { motion } from '../motionTokens';
import { markGameDone } from '../utils/progress';
import { shouldShowCongratsAfterCompletion, syncCongratsCycle } from '../utils/congrats';
import { CongratsModal } from '../components/CongratsModal';
import './TeamLeadGamePage.css';

type Counts = Record<DecisionType, number>;
const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const initialCounts = (): Counts => ({ dogma: 0, empirical: 0, unity: 0 });

export function TeamLeadGamePage() {
  const completionRecorded = useRef(false); const rootRef = useRef<HTMLElement | null>(null); const needleRef = useRef<HTMLDivElement | null>(null);
  const [showCongrats, setShowCongrats] = useState(false); const [index, setIndex] = useState(0); const [options, setOptions] = useState(() => shuffle(scenarios[0].options)); const [choice, setChoice] = useState<ScenarioOption | null>(null); const [counts, setCounts] = useState<Counts>(initialCounts); const [balance, setBalance] = useState(0);
  useGSAP(() => { if (!needleRef.current) return; if (reduceMotion()) gsap.set(needleRef.current, { rotate: balance * 24 }); else gsap.to(needleRef.current, { rotate: balance * 24, duration: motion.duration.base, ease: motion.easing.standard, overwrite: 'auto' }); }, { scope: rootRef, dependencies: [balance] });
  const scenario = scenarios[index]; const finished = index >= scenarios.length;
  useEffect(() => { syncCongratsCycle(); }, []);
  useEffect(() => { if (!finished || completionRecorded.current) return; completionRecorded.current = true; if (shouldShowCongratsAfterCompletion(markGameDone('truong-nhom'))) setShowCongrats(true); }, [finished]);
  const choose = (option: ScenarioOption) => { if (choice) return; setChoice(option); setCounts((value) => ({ ...value, [option.type]: value[option.type] + 1 })); setBalance(option.type === 'dogma' ? -1 : option.type === 'empirical' ? 1 : 0); };
  const next = () => { const nextIndex = index + 1; if (nextIndex < scenarios.length) { setIndex(nextIndex); setOptions(shuffle(scenarios[nextIndex].options)); setChoice(null); } else setIndex(nextIndex); };
  const result = useMemo(() => { if (counts.unity >= 4) return { title: 'Nhóm trưởng cân bằng', body: 'bạn biết nghĩ và biết làm.' }; if (counts.dogma > counts.empirical && counts.unity < 4) return { title: 'Nhóm trưởng thiên lý thuyết', body: 'gợi ý xem lại mục 05 (bệnh giáo điều).' }; if (counts.empirical > counts.dogma && counts.unity < 4) return { title: 'Nhóm trưởng thiên kinh nghiệm', body: 'gợi ý xem lại mục 05 (bệnh kinh nghiệm chủ nghĩa).' }; return { title: 'Nhóm trưởng đang tìm điểm cân bằng', body: 'gợi ý xem lại mục 02 và 03.' }; }, [counts]);
  const reset = () => { setIndex(0); setOptions(shuffle(scenarios[0].options)); setChoice(null); setCounts(initialCounts()); setBalance(0); };
  return <><main className="game-page team-page" ref={rootRef}><nav className="topnav"><Link to="/">FPT<span>•</span>PHIL</Link><Link to="/game">← Chọn game</Link></nav><header className="game-hero"><p className="eyebrow">Luyện vận dụng khi ra quyết định · 05 tình huống</p><h1>Trưởng nhóm<br/><mark>đồ án.</mark></h1><p>Chọn cách xử lý, xem tác động của nó lên sự cân bằng giữa lý luận và thực tiễn.</p></header><section className="game-board team-board">{!finished ? <><div className="balance-meter" aria-label="Thang cân bằng lý luận và thực tiễn"><span>Lý luận suông</span><div className="balance-track"><div ref={needleRef} className="balance-needle" /></div><span>Thực tiễn mù quáng</span><b>Thống nhất</b></div><p className="eyebrow">Tình huống {index + 1}/{scenarios.length} · {scenario.title}</p><h2>{scenario.prompt}</h2><div className="scenario-options">{options.map((option) => <button key={option.text} className={`scenario-option ${choice === option ? `is-${option.type}` : ''}`} onClick={() => choose(option)} disabled={Boolean(choice)}>{option.text}</button>)}</div>{choice && <div className={`scenario-feedback is-${choice.type}`}><p>{choice.explanation}</p><button className="primary-btn" onClick={next}>{index + 1 === scenarios.length ? 'Xem kết quả ↗' : 'Tình huống tiếp theo →'}</button></div>}</> : <div className="game-result"><p className="eyebrow">Hoàn thành 05 tình huống</p><h2>{result.title}</h2><p>{result.body}</p><p className="result-counts">Thống nhất <b>{counts.unity}</b> · Lý luận suông <b>{counts.dogma}</b> · Thực tiễn mù quáng <b>{counts.empirical}</b></p><button className="primary-btn" onClick={reset}>Chơi lại ↺</button></div>}</section></main><CongratsModal open={showCongrats} onClose={() => setShowCongrats(false)} /></>;
}
