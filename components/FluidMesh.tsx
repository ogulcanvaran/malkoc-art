'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useControls, folder } from 'leva';
import * as THREE from 'three';

// ── Uniforms injected into THREE's PBR vertex shader ─────────────────────────
const NOISE_UNIFORMS = /* glsl */`
  uniform float uTime;
  uniform float uScale;
  uniform float uAmp;
  uniform float uSpeed;
  uniform float uDrag;
  uniform vec2  uMouse;
  uniform vec2  uMouseLag;
`;

const NOISE_FUNCTIONS = /* glsl */`
  vec3 _h3(vec3 p) {
    p = fract(p * vec3(443.897, 441.423, 437.195));
    p += dot(p, p.yzx + 19.19);
    return fract(vec3((p.x+p.y)*p.z, (p.x+p.z)*p.y, (p.y+p.z)*p.x));
  }

  float _vn(vec3 p) {
    vec3 i = floor(p), f = fract(p);
    vec3 u = f*f*(3.0-2.0*f);
    return mix(
      mix(mix(_h3(i).x,         _h3(i+vec3(1,0,0)).x, u.x),
          mix(_h3(i+vec3(0,1,0)).x, _h3(i+vec3(1,1,0)).x, u.x), u.y),
      mix(mix(_h3(i+vec3(0,0,1)).x, _h3(i+vec3(1,0,1)).x, u.x),
          mix(_h3(i+vec3(0,1,1)).x, _h3(i+vec3(1,1,1)).x, u.x), u.y),
      u.z) * 2.0 - 1.0;
  }

  float _fbm(vec3 p) {
    float v = 0.0, a = 0.52;
    mat2 rot = mat2(0.8090, 0.5878, -0.5878, 0.8090);
    for (int i = 0; i < 4; i++) {
      v   += a * _vn(p);
      p.xy = rot * p.xy * 1.90;
      p.z *= 1.08;
      a   *= 0.50;
    }
    return v;
  }

  float _disp(vec2 pos) {
    float t    = uTime * uSpeed;
    vec2  drag = (uMouse - uMouseLag) * uDrag;
    return _fbm(vec3(pos * uScale + drag, t)) * uAmp;
  }
`;

const NORMAL_CHUNK = /* glsl */`
  float _eps = 0.016;
  float _d0  = _disp(position.xy);
  float _dR  = _disp(position.xy + vec2(_eps, 0.0));
  float _dU  = _disp(position.xy + vec2(0.0, _eps));
  vec3  _tg  = normalize(vec3(_eps * 2.0, 0.0,    _dR - _d0));
  vec3  _bt  = normalize(vec3(0.0,    _eps * 2.0, _dU - _d0));
  vec3  objectNormal = normalize(cross(_tg, _bt));
  #ifdef USE_TANGENT
    vec3 objectTangent = _tg;
  #endif
`;

const DISPLACE_CHUNK = /* glsl */`
  vec3 transformed = vec3(position.xy, position.z + _disp(position.xy));
`;

interface Props {
  mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

export function FluidMesh({ mousePos }: Props) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const shaderRef  = useRef<any>(null);
  const matRef     = useRef<THREE.MeshPhysicalMaterial | null>(null);
  const smoothMouse = useRef(new THREE.Vector2(0.5, 0.5));
  const lagMouse    = useRef(new THREE.Vector2(0.5, 0.5));

  // ── Leva controls ──────────────────────────────────────────────────────────
  const { scale, amplitude, speed, drag, metalness, roughness, envIntensity, tiltX } = useControls({
    'Noise': folder({
      scale:     { value: 0.11, min: 0.02, max: 0.40, step: 0.005, label: 'Ölçek' },
      amplitude: { value: 0.52, min: 0.0,  max: 1.20, step: 0.01,  label: 'Genlik' },
      speed:     { value: 0.011, min: 0.001, max: 0.05, step: 0.001, label: 'Hız' },
      drag:      { value: 0.5,  min: 0.0,  max: 2.0,  step: 0.05,  label: 'Fare Etkisi' },
    }),
    'Materyal': folder({
      metalness:   { value: 0.75, min: 0.0, max: 1.0, step: 0.01, label: 'Metalik' },
      roughness:   { value: 0.28, min: 0.0, max: 1.0, step: 0.01, label: 'Pürüzlülük' },
      envIntensity:{ value: 4.5,  min: 0.0, max: 10.0, step: 0.1, label: 'Env Yoğunluğu' },
    }),
    'Kamera/Mesh': folder({
      tiltX: { value: -0.10, min: -0.5, max: 0.5, step: 0.01, label: 'Eğim' },
    }),
  });

  const material = useMemo(() => {
    const mat = new THREE.MeshPhysicalMaterial({
      color:           new THREE.Color('#060607'),
      metalness:       0.75,
      roughness:       0.28,
      envMapIntensity: 4.5,
    });

    mat.onBeforeCompile = (shader) => {
      shader.uniforms.uTime     = { value: 0 };
      shader.uniforms.uScale    = { value: 0.11 };
      shader.uniforms.uAmp      = { value: 0.52 };
      shader.uniforms.uSpeed    = { value: 0.011 };
      shader.uniforms.uDrag     = { value: 0.5 };
      shader.uniforms.uMouse    = { value: new THREE.Vector2(0.5, 0.5) };
      shader.uniforms.uMouseLag = { value: new THREE.Vector2(0.5, 0.5) };

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `#include <common>\n${NOISE_UNIFORMS}\n${NOISE_FUNCTIONS}`
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <beginnormal_vertex>',
        NORMAL_CHUNK
      );
      shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        DISPLACE_CHUNK
      );

      shaderRef.current = shader;
    };

    matRef.current = mat;
    return mat;
  }, []);

  useEffect(() => () => material.dispose(), [material]);

  useFrame(({ clock }) => {
    const mat = matRef.current;
    if (mat) {
      mat.metalness       = metalness;
      mat.roughness       = roughness;
      mat.envMapIntensity = envIntensity;
    }

    if (!shaderRef.current) return;
    const raw = new THREE.Vector2(mousePos.current.x, mousePos.current.y);
    smoothMouse.current.lerp(raw, 0.001);
    lagMouse.current.lerp(smoothMouse.current, 0.0003);

    const u = shaderRef.current.uniforms;
    u.uTime.value     = clock.getElapsedTime();
    u.uScale.value    = scale;
    u.uAmp.value      = amplitude;
    u.uSpeed.value    = speed;
    u.uDrag.value     = drag;
    u.uMouse.value   .copy(smoothMouse.current);
    u.uMouseLag.value.copy(lagMouse.current);
  });

  return (
    <mesh rotation={[tiltX, 0, 0]}>
      <planeGeometry args={[6.0, 3.6, 200, 120]} />
      <primitive object={material} attach="material" />
    </mesh>
  );
}
