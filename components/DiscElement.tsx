'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls, folder } from 'leva';
import * as THREE from 'three';
import vertexShader from '@/shaders/vertex.glsl';
import fragmentShader from '@/shaders/fragment.glsl';

export function DiscElement() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef  = useRef<THREE.ShaderMaterial>(null!);
  const { viewport } = useThree();

  // ── Leva: Disk klasörü ───────────────────────────────────────────────────────
  const {
    diskRadius,
    diskPosX, diskPosY,
    tiltX, tiltY,
    rotSpeed,
    dSpeed, dScale, dAmplitude, dWarp, dYStretch,
    dRoughness, dSpec,
    dPeakRing, dPeakWidth,
  } = useControls({
    'Disk': folder({
      diskRadius: { value: 0.42, min: 0.10, max: 0.75, step: 0.01, label: 'Yarıçap' },
      diskPosX:   { value: 0.00, min: -1.0, max: 1.0,  step: 0.02, label: 'Konum X' },
      diskPosY:   { value: 0.00, min: -0.8, max: 0.8,  step: 0.02, label: 'Konum Y' },
      tiltX:      { value: -0.30, min: -1.2, max: 1.2, step: 0.02, label: 'Eğim X (derinlik)' },
      tiltY:      { value:  0.10, min: -1.2, max: 1.2, step: 0.02, label: 'Eğim Y' },
      rotSpeed:   { value: 0.0025, min: 0.0, max: 0.02, step: 0.0005, label: 'Dönüş Hızı' },
    }),
    'Disk / Dalga': folder({
      dSpeed:      { value: 0.030, min: 0.002, max: 0.12,  step: 0.002, label: 'Hız' },
      dScale:      { value: 0.72,  min: 0.10,  max: 1.40,  step: 0.02,  label: 'Ölçek (kıvrım sıklığı)' },
      dAmplitude:  { value: 1.10,  min: 0.20,  max: 2.50,  step: 0.05,  label: 'Genlik (derinlik)' },
      dWarp:       { value: 3.80,  min: 0.0,   max: 5.0,   step: 0.10,  label: 'Warp (bükülme)' },
      dYStretch:   { value: 1.20,  min: 0.3,   max: 4.0,   step: 0.05,  label: 'Yataylık ↔' },
      dPeakRing:   { value: 0.26,  min: 0.05,  max: 0.48,  step: 0.01,  label: 'Halka Yarıçapı (8 zirve)' },
      dPeakWidth:  { value: 0.18,  min: 0.04,  max: 0.45,  step: 0.01,  label: 'Zirve Genişliği (yumuşaklık)' },
    }),
    'Disk / Işık': folder({
      dRoughness: { value: 0.040, min: 0.005, max: 0.40, step: 0.005, label: 'Pürüzlülük' },
      dSpec:      { value: 2.00,  min: 0.0,   max: 5.0,  step: 0.10,  label: 'Parlaklık' },
    }),
  });

  // Disk yarıçapını viewport birimine çevir
  const radius = Math.min(viewport.width, viewport.height) * diskRadius;

  const geometry = useMemo(
    () => new THREE.CircleGeometry(radius, 200, 200),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [Math.round(radius * 100)]
  );

  const uniforms = useMemo(() => ({
    uTime:           { value: 0 },
    uMousePos:       { value: new THREE.Vector2(0.5, 0.5) },
    uMouseLag:       { value: new THREE.Vector2(0.5, 0.5) },
    uMousePower:     { value: 0 },
    uSpeed:          { value: 0.030 },
    uScale:          { value: 0.72 },
    uAmplitude:      { value: 1.10 },
    uWarp:           { value: 3.80 },
    uDragMult:       { value: 0 },
    uYStretch:       { value: 1.20 },
    uSpread:         { value: 0 },   // dairesel geçiş — CircleGeometry'e tam uyum
    uRoughness:      { value: 0.040 },
    uSpecIntensity:  { value: 2.00 },
    uMouseInfluence: { value: 0 },
  }), []);

  useFrame(({ clock }) => {
    if (!meshRef.current || !matRef.current) return;

    // Saat yönünde sürekli dönüş (Z ekseni)
    meshRef.current.rotation.z -= rotSpeed;

    // Eğimi uygula (X,Y sabittir, sadece Z döner)
    meshRef.current.rotation.x = tiltX;
    meshRef.current.rotation.y = tiltY;

    // Konumu güncelle (viewport biriminde)
    const hw = viewport.width  * 0.5;
    const hh = viewport.height * 0.5;
    meshRef.current.position.set(diskPosX * hw, diskPosY * hh, 0.03);

    // Leva değerlerini shader'a aktar
    const u = matRef.current.uniforms;
    u.uTime.value          = clock.getElapsedTime();
    u.uSpeed.value         = dSpeed;
    u.uScale.value         = dScale;
    u.uAmplitude.value     = dAmplitude;
    u.uWarp.value          = dWarp;
    u.uYStretch.value      = dYStretch;
    u.uRoughness.value     = dRoughness;
    u.uSpecIntensity.value = dSpec;
  });

  return (
    <mesh ref={meshRef} geometry={geometry}>
      <shaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
      />
    </mesh>
  );
}
