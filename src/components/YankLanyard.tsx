import { createPortal } from 'react-dom';
import { useLayoutEffect, useState } from 'react';
import Lanyard from './Lanyard';
export function YankLanyard(){
  const[target,setTarget]=useState<HTMLElement|null>(null);
  useLayoutEffect(()=>{const nav=document.querySelector<HTMLElement>('.topnav');const link=document.querySelector<HTMLAnchorElement>('.topnav a[href="/game"]');if(!nav||!link)return;link.style.borderBottom='2px solid #ec6a31';link.style.paddingBottom='.3rem';const fullNavigate=(event:MouseEvent)=>{event.preventDefault();window.location.assign('/game')};link.addEventListener('click',fullNavigate);setTarget(nav);return()=>link.removeEventListener('click',fullNavigate)},[]);
  useLayoutEffect(()=>{if(!target)return;const card=document.querySelector<HTMLElement>('.lanyard-wrapper');const link=document.querySelector<HTMLElement>('.topnav a[href="/game"]');if(!card||!link)return;const place=()=>{const rect=link.getBoundingClientRect();const width=card.offsetWidth;card.style.left=`${Math.max(8,Math.min(rect.left+rect.width/2-width/2,document.documentElement.clientWidth-width-8))}px`;card.style.top=`${rect.bottom+7}px`};place();addEventListener('resize',place);return()=>removeEventListener('resize',place)},[target]);
  return target?createPortal(<Lanyard position={[0,0,20]} gravity={[0,-40,0]} yankThreshold={3.5} onYank={()=>window.setTimeout(()=>window.location.assign('/game'),250)}/>,target):null;
}
