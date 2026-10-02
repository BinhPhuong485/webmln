import { createPortal } from 'react-dom';
import { useLayoutEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from 'gsap';
import { useNavigate } from 'react-router-dom';
import Lanyard from './Lanyard';
import { motion } from '../motionTokens';
export function YankLanyard(){
  const navigate=useNavigate();
  const[target,setTarget]=useState<HTMLElement|null>(null);
  const handoffRef=useRef<HTMLDivElement>(null);
  const isLeavingRef=useRef(false);
  const { contextSafe } = useGSAP(() => undefined, { scope: handoffRef });
  useLayoutEffect(()=>{const nav=document.querySelector<HTMLElement>('.topnav');const link=document.querySelector<HTMLAnchorElement>('.topnav a[href="/game"]');const hero=document.querySelector<HTMLElement>('.story-site .story-hero');if(!nav||!link||!hero)return;link.classList.add('topnav-game-link');const routeNavigate=(event:MouseEvent)=>{event.preventDefault();navigate('/game')};link.addEventListener('click',routeNavigate);setTarget(hero);return()=>{link.classList.remove('topnav-game-link');link.removeEventListener('click',routeNavigate)}},[navigate]);
  useLayoutEffect(()=>{if(!target)return;const card=handoffRef.current?.querySelector<HTMLElement>('.lanyard-wrapper');const link=document.querySelector<HTMLElement>('.topnav a[href="/game"]');if(!card||!link)return;const place=()=>{const heroRect=target.getBoundingClientRect();const linkRect=link.getBoundingClientRect();const width=card.offsetWidth;const left=linkRect.left+linkRect.width/2-width/2-heroRect.left;card.style.left=`${Math.max(8,Math.min(left,target.clientWidth-width-8))}px`;card.style.top=`${linkRect.bottom-heroRect.top+7}px`};place();addEventListener('resize',place);return()=>removeEventListener('resize',place)},[target]);
  const startGame=contextSafe(()=>{
    if(isLeavingRef.current)return;
    isLeavingRef.current=true;
    const card=handoffRef.current?.querySelector<HTMLElement>('.lanyard-wrapper');
    if(!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches){navigate('/game');return;}
    gsap.timeline({defaults:{overwrite:'auto'}}).to(card,{autoAlpha:0,scale:0.94,duration:motion.duration.fast,ease:motion.easing.standard,onComplete:()=>navigate('/game')});
  });
  return target?createPortal(<div ref={handoffRef} className="lanyard-handoff"><Lanyard position={[0,0,20]} gravity={[0,-40,0]} yankThreshold={3.5} onYank={startGame}/></div>,target):null;
}
