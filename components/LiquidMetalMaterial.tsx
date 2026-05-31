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
  const matRef  = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uMousePos:   { value: new THREE.Vector2(0.5, 0.5) }, // fast-smoothed
      uMouseLag:   { value: new THREE.Vector2(0.5, 0.5) }, // slow-smoothed (drag = pos - lag)
      uMousePower: { value: 0 },
    }),
    []
  );

  const geometry = useMemo(() => new THREE.PlaneGeometry(
    viewport.width  + 0.5,
    viewport.height + 0.5,
    220, 220
  ), [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    u.uTime.value = clock.getElapsedTime();

    const raw = new THREE.Vector2(mousePos.current.x, mousePos.current.y);

    // Fast position — follows mouse with mild smoothing
    u.uMousePos.value.lerp(raw, 0.07);

    // Lag position — much slower, always behind
    // Drag = uMousePos - uMouseLag gives the displacement vector
    u.uMouseLag.value.lerp(u.uMousePos.value, 0.018);

    // Power = magnitude of drag vector, clamped
    const drag = u.uMousePos.value.clone().sub(u.uMouseLag.value);
    const dragLen = drag.length();
    const targetPower = Math.min(dragLen * 9.0, 1.0);

    // Builds quickly, decays slowly → thick fluid feel
    const rate = targetPower > u.uMousePower.value ? 0.12 : 0.03;
    u.uMousePower.value = THREE.MathUtils.lerp(u.uMousePower.value, targetPower, rate);
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
