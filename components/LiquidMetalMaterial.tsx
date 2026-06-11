'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls, folder } from 'leva';
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

  // ── Leva controls ────────────────────────────────────────────────────────────
  const { speed, scale, amplitude, warp, dragMult, yStretch, spread, roughness, specIntensity, mouseInfluence } = useControls({
    'Dalga': folder({
      speed:     { value: 0.050, min: 0.005, max: 0.15,  step: 0.005, label: 'Hız' },
      scale:     { value: 0.60,  min: 0.05,  max: 0.60,  step: 0.01,  label: 'Ölçek' },
      amplitude: { value: 0.62,  min: 0.10,  max: 1.50,  step: 0.02,  label: 'Genlik' },
      warp:      { value: 4.30,  min: 0.0,   max: 5.0,   step: 0.10,  label: 'Warp Gücü' },
      dragMult:  { value: 0.0,   min: 0.0,   max: 10.0,  step: 0.25,  label: 'Fare Sürükleme' },
      yStretch:  { value: 2.00,  min: 0.3,   max: 4.0,   step: 0.05,  label: 'Yataylık ↔' },
      spread:    { value: 2,     min: 0,     max: 2,     step: 1,     label: 'Genlik Dağılımı (0=merkez 1=3nokta 2=tam)' },
    }),
    'Işık / Renk': folder({
      roughness:      { value: 0.07,  min: 0.01, max: 0.50, step: 0.005, label: 'Pürüzlülük' },
      specIntensity:  { value: 1.10,  min: 0.0,  max: 4.0,  step: 0.05,  label: 'Spec Yoğunluk' },
      mouseInfluence: { value: 0.45,  min: 0.0,  max: 2.0,  step: 0.05,  label: 'Fare → Işık' },
    }),
  });

  const uniforms = useMemo(
    () => ({
      uTime:           { value: 0 },
      uMousePos:       { value: new THREE.Vector2(0.5, 0.5) },
      uMouseLag:       { value: new THREE.Vector2(0.5, 0.5) },
      uMousePower:     { value: 0 },
      uSpeed:          { value: 0.050 },
      uScale:          { value: 0.60 },
      uAmplitude:      { value: 0.62 },
      uWarp:           { value: 4.30 },
      uDragMult:       { value: 0.0 },
      uYStretch:       { value: 2.00 },
      uSpread:         { value: 2 },
      uRoughness:      { value: 0.07 },
      uSpecIntensity:  { value: 1.10 },
      uMouseInfluence: { value: 0.45 },
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

    // Leva değerlerini her kare güncelle
    u.uSpeed.value          = speed;
    u.uScale.value          = scale;
    u.uAmplitude.value      = amplitude;
    u.uWarp.value           = warp;
    u.uDragMult.value       = dragMult;
    u.uYStretch.value       = yStretch;
    u.uSpread.value         = spread;
    u.uRoughness.value      = roughness;
    u.uSpecIntensity.value  = specIntensity;
    u.uMouseInfluence.value = mouseInfluence;

    u.uTime.value = clock.getElapsedTime();

    const raw = new THREE.Vector2(mousePos.current.x, mousePos.current.y);
    u.uMousePos.value.lerp(raw, 0.008);
    u.uMouseLag.value.lerp(u.uMousePos.value, 0.002);

    const drag = u.uMousePos.value.clone().sub(u.uMouseLag.value);
    const dragLen = drag.length();
    const targetPower = Math.min(dragLen * 12.0, 1.0);
    const rate = targetPower > u.uMousePower.value ? 0.08 : 0.012;
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
