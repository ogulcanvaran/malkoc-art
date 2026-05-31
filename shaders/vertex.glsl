uniform float uTime;
uniform vec2  uMousePos;     // 0..1 normalised, very slowly smoothed
uniform vec2  uMouseLag;     // slowly-smoothed copy — drag = pos - lag
uniform float uMousePower;

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
  return fbm(p + vec3(warp * 2.20, 0.0)); // stronger warp = more flowing curves
}

void main() {
  vUv = uv;

  float t = uTime * 0.050; // glacial drift

  // ── Mouse drag offset ────────────────────────────────────────────────────────
  vec2 drag = (uMousePos - uMouseLag) * 3.5;

  // Very low frequency → huge sweeping folds that fill the entire screen
  vec3 p = vec3(
    position.x * 0.22 + drag.x * uMousePower,
    position.y * 0.22 + drag.y * uMousePower,
    t
  );

  float elev = warpedFbm(p) * 0.60; // deep relief — screen-filling 3D surface

  // Minimal edge fade — surface goes nearly edge to edge like LOUD SRL
  vec2  uvCentered = vUv - 0.5;
  float edge = 1.0 - smoothstep(0.62, 0.72, length(uvCentered));
  elev *= edge;

  vElevation = elev;

  // ── Normal via finite differences ────────────────────────────────────────────
  float eps = 0.012; // larger eps matches larger fold scale
  float hL = warpedFbm(p + vec3(-eps, 0.0,  0.0)) * 0.60 * edge;
  float hR = warpedFbm(p + vec3( eps, 0.0,  0.0)) * 0.60 * edge;
  float hD = warpedFbm(p + vec3( 0.0, -eps, 0.0)) * 0.60 * edge;
  float hU = warpedFbm(p + vec3( 0.0,  eps, 0.0)) * 0.60 * edge;

  vNormal = normalize(vec3(hL - hR, hD - hU, eps * 1.4));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
