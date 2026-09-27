// @ts-nocheck
import { useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment, Lightformer, useGLTF, useTexture } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import cardGLB from '../assets/lanyard/card.glb';
import lanyard from '../assets/lanyard/lanyard.png';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  onYank?: () => void;
  yankThreshold?: number;
}

export default function Lanyard({ position = [0, 0, 20], gravity = [0, -40, 0], fov = 20, transparent = true, onYank, yankThreshold = 3.5 }: LanyardProps) {
  return <div className="lanyard-wrapper"><Canvas camera={{ position, fov }} dpr={[1, 1.25]} gl={{ alpha: transparent }}><ambientLight intensity={Math.PI} /><Physics gravity={gravity}><Band onYank={onYank} threshold={yankThreshold} /></Physics><Environment><Lightformer intensity={5} position={[2, 4, 6]} scale={[20, 0.1, 1]} /></Environment></Canvas></div>;
}

function Band({ onYank, threshold }) {
  const fixed = useRef(), a = useRef(), b = useRef(), c = useRef(), card = useRef(), line = useRef(), off = useRef(new THREE.Vector3()), pull = useRef(0);
  const vec = new THREE.Vector3(), dir = new THREE.Vector3(), goal = new THREE.Vector3(), rest = new THREE.Vector3(2, 4, 0);
  const curve = useRef(new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [drag, setDrag] = useState(false);
  const { nodes, materials } = useGLTF(cardGLB);
  const rope = useTexture(lanyard);

  const cardMap = useMemo(() => {
    const baseMap = materials.base.map;
    const baseImg = baseMap?.image;
    if (!baseImg?.width || !baseImg?.height) return baseMap;

    const canvas = document.createElement('canvas');
    canvas.width = baseImg.width;
    canvas.height = baseImg.height;
    const context = canvas.getContext('2d');
    if (!context) return baseMap;
    context.drawImage(baseImg, 0, 0, canvas.width, canvas.height);

    const frontCanvas = document.createElement('canvas');
    frontCanvas.width = Math.round(canvas.width * FRONT_UV_RECT.w);
    frontCanvas.height = Math.round(canvas.height * FRONT_UV_RECT.h);
    const frontContext = frontCanvas.getContext('2d');
    if (!frontContext) return baseMap;

    // Keep the existing game-card design, but render it separately before atlas placement.
    const scaleX = frontCanvas.width / 512;
    const scaleY = frontCanvas.height / 768;
    frontContext.fillStyle = '#192532';
    frontContext.fillRect(0, 0, frontCanvas.width, frontCanvas.height);
    frontContext.fillStyle = '#ec6a31';
    frontContext.fillRect(0, 0, 512 * scaleX, 70 * scaleY);
    frontContext.fillStyle = '#f5f1e9';
    frontContext.font = `bold ${26 * scaleY}px Arial`;
    frontContext.fillText('FPT • PHIL', 36 * scaleX, 45 * scaleY);
    frontContext.strokeStyle = '#ec6a31';
    frontContext.lineWidth = 5 * Math.min(scaleX, scaleY);
    frontContext.strokeRect(38 * scaleX, 120 * scaleY, 436 * scaleX, 350 * scaleY);
    frontContext.fillStyle = '#ec6a31';
    frontContext.font = `bold ${62 * scaleY}px Arial`;
    frontContext.fillText('GAME', 126 * scaleX, 225 * scaleY);
    frontContext.fillStyle = '#f5f1e9';
    frontContext.font = `bold ${35 * scaleY}px Arial`;
    frontContext.fillText('KIỂM TRA', 112 * scaleX, 280 * scaleY);
    frontContext.fillStyle = '#ec6a31';
    frontContext.beginPath();
    frontContext.arc(170 * scaleX, 555 * scaleY, 48 * Math.min(scaleX, scaleY), 0, Math.PI * 2);
    frontContext.arc(342 * scaleX, 555 * scaleY, 48 * Math.min(scaleX, scaleY), 0, Math.PI * 2);
    frontContext.fill();
    frontContext.fillStyle = '#f5f1e9';
    frontContext.font = `bold ${21 * scaleY}px Arial`;
    frontContext.fillText('GIẬT THẺ ĐỂ CHƠI', 118 * scaleX, 675 * scaleY);

    const drawFitted = (image, rect) => {
      const rx = rect.x * canvas.width, ry = rect.y * canvas.height, rw = rect.w * canvas.width, rh = rect.h * canvas.height;
      const scale = Math.max(rw / image.width, rh / image.height);
      const dw = image.width * scale, dh = image.height * scale;
      const dx = rx + (rw - dw) / 2, dy = ry + (rh - dh) / 2;
      context.save();
      context.beginPath();
      context.rect(rx, ry, rw, rh);
      context.clip();
      context.drawImage(image, dx, dy, dw, dh);
      context.restore();
    };

    drawFitted(frontCanvas, FRONT_UV_RECT);
    // BACK_UV_RECT remains exactly as baked in the original GLB texture atlas.
    void BACK_UV_RECT;
    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.needsUpdate = true;
    return composite;
  }, [materials.base.map]);

  const p = { type: 'dynamic', colliders: false, angularDamping: 4, linearDamping: 4 };
  useRopeJoint(fixed, a, [[0, 0, 0], [0, 0, 0], 1]); useRopeJoint(a, b, [[0, 0, 0], [0, 0, 0], 1]); useRopeJoint(b, c, [[0, 0, 0], [0, 0, 0], 1]); useSphericalJoint(c, card, [[0, 0, 0], [0, 1.5, 0]]);
  useFrame((s) => { if (drag) { vec.set(s.pointer.x, s.pointer.y, 0.5).unproject(s.camera); dir.copy(vec).sub(s.camera.position).normalize(); goal.copy(vec).add(dir.multiplyScalar(s.camera.position.length())).sub(off.current); pull.current = Math.max(pull.current, goal.distanceTo(rest)); card.current.setNextKinematicTranslation(goal); } if (line.current) { curve.current.points[0].copy(c.current.translation()); curve.current.points[1].copy(b.current.translation()); curve.current.points[2].copy(a.current.translation()); curve.current.points[3].copy(fixed.current.translation()); line.current.geometry.setPoints(curve.current.getPoints(20)); } });
  const down = (event) => { event.target.setPointerCapture(event.pointerId); off.current.copy(event.point).sub(card.current.translation()); pull.current = 0; setDrag(true); };
  const up = (event) => { event.target.releasePointerCapture(event.pointerId); setDrag(false); if (pull.current >= threshold) onYank?.(); };
  return <><group position={[0, 4, 0]}><RigidBody ref={fixed} {...p} type="fixed" /><RigidBody ref={a} position={[0.5, 0, 0]} {...p}><BallCollider args={[0.1]} /></RigidBody><RigidBody ref={b} position={[1, 0, 0]} {...p}><BallCollider args={[0.1]} /></RigidBody><RigidBody ref={c} position={[1.5, 0, 0]} {...p}><BallCollider args={[0.1]} /></RigidBody><RigidBody ref={card} position={[2, 0, 0]} {...p} type={drag ? 'kinematicPosition' : 'dynamic'}><CuboidCollider args={[0.8, 1.125, 0.01]} /><group scale={2.25} position={[0, -1.2, -0.05]} onPointerDown={down} onPointerUp={up}><mesh geometry={nodes.card.geometry}><meshPhysicalMaterial map={cardMap} roughness={0.65} metalness={0.25} /></mesh><mesh geometry={nodes.clip.geometry} material={materials.metal} /><mesh geometry={nodes.clamp.geometry} material={materials.metal} /></group></RigidBody></group><mesh ref={line}><meshLineGeometry /><meshLineMaterial color="#ec6a31" depthTest={false} resolution={[1000, 1000]} useMap map={rope} repeat={[-4, 1]} lineWidth={1} /></mesh></>;
}
