'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import vertexShader   from '@/shaders/fluid.vert.glsl';
import fragmentShader from '@/shaders/fluid.frag.glsl';

interface FluidSurfaceProps {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export function FluidSurface({ mousePos }: FluidSurfaceProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { size } = useThree();

  const uniforms = useMemo(() => ({
    uTime:       { value: 0 },
    uResolution: { value: new THREE.Vector2(size.width, size.height) },
    uMousePos:   { value: new THREE.Vector2(0.5, 0.5) },
    uMouseLag:   { value: new THREE.Vector2(0.5, 0.5) },
  }), [size.width, size.height]);

  useFrame(({ clock, size: s }) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;

    u.uTime.value = clock.getElapsedTime();
    u.uResolution.value.set(s.width, s.height);

    const raw = new THREE.Vector2(mousePos.current.x, mousePos.current.y);

    // Çok yavaş — heavy liquid feel
    u.uMousePos.value.lerp(raw, 0.0010);
    u.uMouseLag.value.lerp(u.uMousePos.value, 0.00025);
  });

  // Clip space'i dolduran tek quad: [-1,-1] → [1,1]
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.Float32BufferAttribute([
      -1, -1, 0,   1, -1, 0,   1,  1, 0,
      -1, -1, 0,   1,  1, 0,  -1,  1, 0,
    ], 3));
    geo.setAttribute('uv', new THREE.Float32BufferAttribute([
      0, 0,  1, 0,  1, 1,
      0, 0,  1, 1,  0, 1,
    ], 2));
    return geo;
  }, []);

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}
