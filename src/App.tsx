import { lazy, Suspense } from 'react';import { BrowserRouter, Route, Routes } from 'react-router-dom';
const ExplainerPage=lazy(()=>import('./pages/ExplainerPage').then(module=>({default:module.ExplainerPage})));const GamePage=lazy(()=>import('./pages/GamePage').then(module=>({default:module.GamePage})));
export default function App(){return <BrowserRouter><Suspense fallback={null}><Routes><Route path="/" element={<ExplainerPage/>}/><Route path="/game" element={<GamePage/>}/></Routes></Suspense></BrowserRouter>}
