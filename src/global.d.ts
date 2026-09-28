export {};
declare global {
  interface ImportMetaEnv { readonly VITE_SITE_URL?: string; }
  interface ImportMeta { readonly env: ImportMetaEnv; }
}
declare module '*.glb';
declare module '*.png';
declare module 'meshline' { export const MeshLineGeometry: any; export const MeshLineMaterial: any; }
declare global { namespace JSX { interface IntrinsicElements { meshLineGeometry: any; meshLineMaterial: any; } } }
