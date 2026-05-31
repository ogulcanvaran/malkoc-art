'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';

interface LiquidMetalMaterialProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export function LiquidMetalMaterial({ mousePos }: LiquidMetalMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:      { value: 0 },
      uMouse:     { value: 0 },
      uMousePos:  { value: new THREE.Vector2(0.5, 0.5) },
      uDistortion:{ value: 0 },
    }),
    []
  );

  const geometry = useMemo(() => {
    // High subdivision for smooth morphing surface
    return new THREE.PlaneGeometry(
      viewport.width  + 1,
      viewport.height + 1,
      220,
      220
    );
  }, [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    u.uTime.value = clock.getElapsedTime();

    // Smooth mouse tracking
    const target = new THREE.Vector2(
      mousePos.current.x,
      mousePos.current.y
    );
    u.uMousePos.value.lerp(target, 0.04);
    u.uMouse.value = THREE.MathUtils.lerp(u.uMouse.value, 1.0, 0.02);
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        side={THREE.FrontSide}
      />
    </mesh>
  );
}
