'use client';

import { useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { FluidSurface } from './FluidSurface';

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
        orthographic
        camera={{ position: [0, 0, 1], near: 0, far: 2 }}
        gl={{
          antialias:       false, // fullscreen quad'da gerek yok
          alpha:           false,
          powerPreference: 'high-performance',
          stencil:         false,
          depth:           false,
        }}
        dpr={[0.85, 1.1]}
        style={{ background: '#050505' }}
      >
        <AdaptiveDpr pixelated />
        <FluidSurface mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
