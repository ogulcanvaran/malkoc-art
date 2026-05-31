'use client';

import { useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { LiquidMetalMaterial } from './LiquidMetalMaterial';
import { CentralSphere } from './CentralSphere';

// Sphere world-space radius — must match CentralSphere args[0]
const SPHERE_WORLD_RADIUS = 0.22;

function SceneContents({
  mousePos,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <AdaptiveDpr pixelated />
      {/* Inline lights — no external HDR fetch */}
      <ambientLight intensity={0.08} color="#1a1a2e" />
      <directionalLight position={[-2, 3, 2]} intensity={0.6} color="#c8ccd8" />
      <directionalLight position={[3, -1, 1]} intensity={0.15} color="#8090b0" />
      <LiquidMetalMaterial
        mousePos={mousePos}
        sphereWorldRadius={SPHERE_WORLD_RADIUS}
      />
      <CentralSphere />
    </>
  );
}

export function Scene() {
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mousePos.current = {
        x: e.clientX / window.innerWidth,
        y: 1.0 - e.clientY / window.innerHeight,
      };
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 1.55], fov: 50, near: 0.1, far: 100 }}
        gl={{
          antialias:       true,
          alpha:           false,
          powerPreference: 'high-performance',
          stencil:         false,
          depth:           true, // need depth for sphere over plane
        }}
        dpr={[1, 1.5]}
        style={{ background: '#050505' }}
      >
        <SceneContents mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
