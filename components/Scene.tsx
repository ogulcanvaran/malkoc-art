'use client';

import { useRef, useCallback, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { LiquidMetalMaterial } from './LiquidMetalMaterial';
import { CentralSphere } from './CentralSphere';

// Sphere world-space radius — must match CentralSphere args[0]
const SPHERE_WORLD_RADIUS = 0.16;

function SceneContents({
  mousePos,
}: {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}) {
  return (
    <>
      <AdaptiveDpr pixelated />
      {/* Very dim lights — sphere only, wave surface lit by custom shader */}
      <ambientLight intensity={0.04} color="#0a0a18" />
      <directionalLight position={[-1.5, 2.5, 2.0]} intensity={0.55} color="#d0d4e8" />
      <directionalLight position={[ 2.0, -1.0, 1.5]} intensity={0.12} color="#7080a8" />
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
