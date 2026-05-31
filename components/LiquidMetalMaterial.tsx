'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';

interface LiquidMetalMaterialProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
  mouseVel: React.MutableRefObject<{ x: number; y: number }>;
}

export function LiquidMetalMaterial({ mousePos, mouseVel }: LiquidMetalMaterialProps) {
  const meshRef  = useRef<THREE.Mesh>(null!);
  const matRef   = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uMousePos:   { value: new THREE.Vector2(0.5, 0.5) },
      uMousePower: { value: 0 },
    }),
    []
  );

  // Build geometry once per viewport size
  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      viewport.width  + 0.5,
      viewport.height + 0.5,
      200,
      200
    );
  }, [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    u.uTime.value = clock.getElapsedTime();

    // Smooth position tracking
    const target = new THREE.Vector2(mousePos.current.x, mousePos.current.y);
    u.uMousePos.value.lerp(target, 0.05);

    // Mouse power: ramps up with movement speed, decays when still
    const speed = Math.sqrt(mouseVel.current.x ** 2 + mouseVel.current.y ** 2);
    const targetPower = THREE.MathUtils.clamp(speed * 18, 0, 1);
    u.uMousePower.value = THREE.MathUtils.lerp(u.uMousePower.value, targetPower, 0.06);
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
