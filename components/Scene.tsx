'use client';

import { useRef, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { AdaptiveDpr } from '@react-three/drei';
import { LiquidMetalMaterial } from './LiquidMetalMaterial';

export function Scene() {
  const mousePos = useRef({ x: 0.5, y: 0.5 });
  const mouseVel = useRef({ x: 0, y: 0 });
  const lastMouse = useRef({ x: 0.5, y: 0.5 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const nx = e.clientX / window.innerWidth;
    const ny = 1.0 - e.clientY / window.innerHeight;

    // Velocity = delta normalised position per frame
    mouseVel.current = {
      x: nx - lastMouse.current.x,
      y: ny - lastMouse.current.y,
    };

    mousePos.current  = { x: nx, y: ny };
    lastMouse.current = { x: nx, y: ny };
  }, []);

  return (
    <div
      className="absolute inset-0 w-full h-full"
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 1.6], fov: 52, near: 0.1, far: 100 }}
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
        <LiquidMetalMaterial mousePos={mousePos} mouseVel={mouseVel} />
      </Canvas>
    </div>
  );
}
