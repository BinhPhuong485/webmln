import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ShareQrNav } from './components/ShareQrNav';
import { GameResultBackLink } from './components/GameResultBackLink';

const ExplainerPage = lazy(() => import('./pages/ExplainerPage').then((module) => ({ default: module.ExplainerPage })));
const GamePage = lazy(() => import('./pages/GamePage').then((module) => ({ default: module.GamePage })));
const MemoryGamePage = lazy(() => import('./pages/MemoryGamePage').then((module) => ({ default: module.MemoryGamePage })));
const WireGamePage = lazy(() => import('./pages/WireGamePage').then((module) => ({ default: module.WireGamePage })));
const CycleGamePage = lazy(() => import('./pages/CycleGamePage').then((module) => ({ default: module.CycleGamePage })));
const TeamLeadGamePage = lazy(() => import('./pages/TeamLeadGamePage').then((module) => ({ default: module.TeamLeadGamePage })));

export default function App() {
  return <BrowserRouter><Suspense fallback={null}><Routes><Route path="/" element={<ExplainerPage />} /><Route path="/game" element={<GamePage />} /><Route path="/game/ghep-the" element={<MemoryGamePage />} /><Route path="/game/noi-day" element={<WireGamePage />} /><Route path="/game/vong-nhan-thuc" element={<CycleGamePage />} /><Route path="/game/truong-nhom" element={<TeamLeadGamePage />} /></Routes><ShareQrNav /><GameResultBackLink /></Suspense></BrowserRouter>;
}
