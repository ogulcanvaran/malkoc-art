'use client';

import { useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { LiquidMetalMaterial } from './LiquidMetalMaterial';

export function Scene() {
  const mousePos = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    mousePos.current = {
      x: e.clientX / window.innerWidth,
      y: 1.0 - e.clientY / window.innerHeight,
    };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1.8], fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: 'high-performance',
          stencil: false,
          depth: false,
        }}
        dpr={[1, 1.5]}
        style={{ background: '#050505' }}
      >
        <AdaptiveDpr pixelated />
        <LiquidMetalMaterial mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
