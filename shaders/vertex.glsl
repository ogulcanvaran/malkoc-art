uniform float uTime;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;
uniform float uMousePower;
uniform float uSpeed;
uniform float uScale;
uniform float uAmplitude;
uniform float uWarp;
uniform float uDragMult;
uniform float uYStretch;
uniform float uSpread;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;

// ── Smooth value noise (no discontinuities) ──────────────────────────────────

float hash(vec3 p) {
  p  = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f); // C1 smooth step

  return mix(
    mix(mix(hash(i+vec3(0,0,0)), hash(i+vec3(1,0,0)), u.x),
        mix(hash(i+vec3(0,1,0)), hash(i+vec3(1,1,0)), u.x), u.y),
    mix(mix(hash(i+vec3(0,0,1)), hash(i+vec3(1,0,1)), u.x),
        mix(hash(i+vec3(0,1,1)), hash(i+vec3(1,1,1)), u.x), u.y),
    u.z) * 2.0 - 1.0;
}

// ── Smooth FBM — 5 octaves, slow drift ──────────────────────────────────────
// No ridges, no sharp inversions — pure smooth organic waves
float fbm(vec3 p) {
  float v = 0.0, a = 0.55;
  mat3 rot = mat3(
     0.8660,  0.5000, 0.0,
    -0.5000,  0.8660, 0.0,
     0.0,     0.0,    1.0
  );
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p  = rot * p * 1.85;
    a *= 0.50;
  }
  return v;
}

// ── Single warp pass — stronger warp for sweeping S-curves ──────────────────
float warpedFbm(vec3 p) {
  vec2 warp = vec2(
    fbm(p + vec3(1.7, 9.2, 3.5)),
    fbm(p + vec3(8.3, 2.8, 5.1))
  );
  return fbm(p + vec3(warp * uWarp, 0.0));
}

void main() {
  vUv = uv;

  float t = uTime * uSpeed;

  vec2 drag = (uMousePos - uMouseLag) * uDragMult;

  vec3 p = vec3(
    position.x * uScale              + drag.x * uMousePower,
    position.y * uScale * uYStretch  + drag.y * uMousePower,
    t
  );

  float elev = warpedFbm(p) * uAmplitude;

  // ── Genlik maskesi — uSpread: 0=tek merkez, 1=3 nokta, 2=tam yüzey ──────────
  vec2 uvc = vUv - 0.5;
  float edge;
  if (uSpread < 0.5) {
    // Tek merkez (orijinal)
    edge = 1.0 - smoothstep(0.38, 0.50, length(uvc));
  } else if (uSpread < 1.5) {
    // 3 merkez: sol, sağ, üst-orta
    vec2 c1 = vec2(-0.28, 0.00);
    vec2 c2 = vec2( 0.28, 0.00);
    vec2 c3 = vec2( 0.00, 0.18);
    float f1 = 1.0 - smoothstep(0.20, 0.32, length(uvc - c1));
    float f2 = 1.0 - smoothstep(0.20, 0.32, length(uvc - c2));
    float f3 = 1.0 - smoothstep(0.18, 0.30, length(uvc - c3));
    edge = clamp(f1 + f2 + f3, 0.0, 1.0);
  } else {
    // Tam yüzey — sadece kenar sönümleme
    float ex = 1.0 - smoothstep(0.42, 0.50, abs(uvc.x));
    float ey = 1.0 - smoothstep(0.42, 0.50, abs(uvc.y));
    edge = ex * ey;
  }
  elev *= edge;

  vElevation = elev;

  // ── Normal via finite differences ─────────────────────────────────────────────
  float eps = uScale * 0.055 + 0.010;
  float hL = warpedFbm(p + vec3(-eps, 0.0,  0.0)) * uAmplitude * edge;
  float hR = warpedFbm(p + vec3( eps, 0.0,  0.0)) * uAmplitude * edge;
  float hD = warpedFbm(p + vec3( 0.0, -eps, 0.0)) * uAmplitude * edge;
  float hU = warpedFbm(p + vec3( 0.0,  eps, 0.0)) * uAmplitude * edge;

  vNormal = normalize(vec3(hL - hR, hD - hU, eps * 1.4));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
