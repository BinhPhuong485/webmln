import Lanyard from './Lanyard';
export function YankLanyard(){
  return <Lanyard position={[0,0,20]} gravity={[0,-40,0]} yankThreshold={3.5} onYank={()=>window.setTimeout(()=>window.location.assign('/game'),250)}/>;
}
