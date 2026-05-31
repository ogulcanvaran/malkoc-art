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
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  // Smoothed delta — decays slowly so drag trails linger like viscous material
  const smoothDelta = useRef(new THREE.Vector2(0, 0));

  const uniforms = useMemo(
    () => ({
      uTime:       { value: 0 },
      uMousePos:   { value: new THREE.Vector2(0.5, 0.5) },
      uMousePower: { value: 0 },
      uMouseDelta: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(
      viewport.width  + 0.5,
      viewport.height + 0.5,
      240,
      240
    );
  }, [viewport.width, viewport.height]);

  useFrame(({ clock }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    u.uTime.value = clock.getElapsedTime();

    // Smooth position — slower lerp = heavier/more viscous feeling
    const targetPos = new THREE.Vector2(mousePos.current.x, mousePos.current.y);
    u.uMousePos.value.lerp(targetPos, 0.04);

    // Accumulate raw delta, decay slowly — drag feels heavy and persistent
    smoothDelta.current.lerp(
      new THREE.Vector2(mouseVel.current.x, mouseVel.current.y),
      0.12
    );
    // Decay back to zero when mouse is still
    smoothDelta.current.multiplyScalar(0.93);
    u.uMouseDelta.value.copy(smoothDelta.current);

    // Mouse power from speed — builds fast, decays slowly like thick fluid
    const speed = Math.sqrt(mouseVel.current.x ** 2 + mouseVel.current.y ** 2);
    const targetPower = Math.min(speed * 22, 1.0);
    const decayRate   = targetPower > u.uMousePower.value ? 0.10 : 0.025; // slow decay
    u.uMousePower.value = THREE.MathUtils.lerp(u.uMousePower.value, targetPower, decayRate);
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
