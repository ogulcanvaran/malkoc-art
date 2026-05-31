'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';

interface LiquidMetalMaterialProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  sphereWorldRadius: number;
}

export function LiquidMetalMaterial({ mousePos, sphereWorldRadius }: LiquidMetalMaterialProps) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:         { value: 0 },
      uMousePos:     { value: new THREE.Vector2(0.5, 0.5) },
      uMouseLag:     { value: new THREE.Vector2(0.5, 0.5) },
      uMousePower:   { value: 0 },
      uSphereRadius: { value: 0.16 },
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

    // Keep sphere radius in UV space synced with viewport
    // UV range 0-1 maps to viewport.height world units (vertical)
    u.uSphereRadius.value = sphereWorldRadius / viewport.height;

    const raw = new THREE.Vector2(mousePos.current.x, mousePos.current.y);

    // 10x slower — almost imperceptible drift
    u.uMousePos.value.lerp(raw, 0.0008);
    u.uMouseLag.value.lerp(u.uMousePos.value, 0.0002);

    const drag      = u.uMousePos.value.clone().sub(u.uMouseLag.value);
    const dragLen   = drag.length();
    const targetPower = Math.min(dragLen * 12.0, 1.0);
    const rate        = targetPower > u.uMousePower.value ? 0.08 : 0.012;
    u.uMousePower.value = THREE.MathUtils.lerp(u.uMousePower.value, targetPower, rate);
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, 0, 0]}>
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
