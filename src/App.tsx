import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShareQrNav } from './components/ShareQrNav';
import { GameResultBackLink } from './components/GameResultBackLink';
import { ScrollToTopButton } from './components/ScrollToTopButton';
import ClickSpark from './components/ClickSpark';

const ExplainerPage = lazy(() => import('./pages/ExplainerPage').then((module) => ({ default: module.ExplainerPage })));
const GamePage = lazy(() => import('./pages/GamePage').then((module) => ({ default: module.GamePage })));
const MemoryGamePage = lazy(() => import('./pages/MemoryGamePage').then((module) => ({ default: module.MemoryGamePage })));
const WireGamePage = lazy(() => import('./pages/WireGamePage').then((module) => ({ default: module.WireGamePage })));
const CycleGamePage = lazy(() => import('./pages/CycleGamePage').then((module) => ({ default: module.CycleGamePage })));
const TeamLeadGamePage = lazy(() => import('./pages/TeamLeadGamePage').then((module) => ({ default: module.TeamLeadGamePage })));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage').then((module) => ({ default: module.NotFoundPage })));

export default function App() {
  return <ClickSpark sparkColor="#ec6a31" sparkSize={9} sparkRadius={18} sparkCount={8} duration={400}><BrowserRouter><Suspense fallback={null}><Routes><Route path="/" element={<ExplainerPage />} /><Route path="/game" element={<GamePage />} /><Route path="/game/ghep-the" element={<MemoryGamePage />} /><Route path="/game/noi-day" element={<WireGamePage />} /><Route path="/game/vong-nhan-thuc" element={<CycleGamePage />} /><Route path="/game/truong-nhom" element={<TeamLeadGamePage />} /><Route path="*" element={<NotFoundPage />} /></Routes><ShareQrNav /><GameResultBackLink /><ScrollToTopButton /></Suspense></BrowserRouter></ClickSpark>;
}
