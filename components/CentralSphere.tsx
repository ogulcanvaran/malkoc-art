'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function CentralSphere() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    // Slow clockwise rotation — ~1 full turn per 105 seconds (matches spiral)
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.06;
    // Very subtle wobble on X for organic feel
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.04) * 0.04;
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0.18]}>
      <sphereGeometry args={[0.16, 128, 128]} />
      <meshPhysicalMaterial
        color={new THREE.Color(0x020203)}
        metalness={0.88}
        roughness={0.03}
        reflectivity={1.0}
        clearcoat={1.0}
        clearcoatRoughness={0.015}
        envMapIntensity={0.6}
      />
    </mesh>
  );
}
