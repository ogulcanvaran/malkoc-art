'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { LiquidMetalMaterial } from './LiquidMetalMaterial';

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
          depth:           false,
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
