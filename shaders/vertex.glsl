uniform float uTime;
uniform vec2  uMousePos;   // 0..1 normalised, smoothed
uniform float uMousePower; // 0..1 lerped in

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying vec3  vWorldPos;

// ── Smooth noise primitives ──────────────────────────────────────────────────

vec3 hash3(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7, 74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

// Gradient noise (Simplex-style, smooth C2)
float gnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * f * (f * (f * 6.0 - 15.0) + 10.0); // quintic

  return mix(
    mix(
      mix(dot(hash3(i + vec3(0,0,0)), f - vec3(0,0,0)),
          dot(hash3(i + vec3(1,0,0)), f - vec3(1,0,0)), u.x),
      mix(dot(hash3(i + vec3(0,1,0)), f - vec3(0,1,0)),
          dot(hash3(i + vec3(1,1,0)), f - vec3(1,1,0)), u.x), u.y),
    mix(
      mix(dot(hash3(i + vec3(0,0,1)), f - vec3(0,0,1)),
          dot(hash3(i + vec3(1,0,1)), f - vec3(1,0,1)), u.x),
      mix(dot(hash3(i + vec3(0,1,1)), f - vec3(0,1,1)),
          dot(hash3(i + vec3(1,1,1)), f - vec3(1,1,1)), u.x), u.y),
    u.z
  );
}

// ── Calm FBM — only 4 octaves, low frequency ────────────────────────────────
float fbm(vec3 p) {
  float v = 0.0;
  float a = 0.5;
  // Each octave rotated slightly to break grid alignment
  mat3 rot = mat3(
     0.8,  0.6, 0.0,
    -0.6,  0.8, 0.0,
     0.0,  0.0, 1.0
  );
  for (int i = 0; i < 4; i++) {
    v += a * gnoise(p);
    p  = rot * p * 2.0;
    a *= 0.48;
  }
  return v;
}

// ── Single-layer domain warp — keeps it from looking chaotic ────────────────
float warp(vec3 p) {
  // One level of warping only (not double-warp)
  vec3 q = vec3(
    fbm(p + vec3(0.0,  0.0, 0.0)),
    fbm(p + vec3(3.7,  1.9, 2.3)),
    0.0
  );
  return fbm(p + 1.6 * q);
}

void main() {
  vUv = uv;

  // Very slow drift — the surface barely breathes
  float t = uTime * 0.08;

  // Mouse gently tilts the warp origin
  vec2 mOffset = (uMousePos - 0.5) * 0.22 * uMousePower;

  vec3 p = vec3(
    position.x * 0.55 + mOffset.x,
    position.y * 0.55 + mOffset.y,
    t
  );

  float elev = warp(p) * 0.30;

  // Attenuate toward screen edges for clean border fade
  float edgeFade = 1.0 - smoothstep(0.35, 0.5, length(vUv - 0.5));
  elev *= edgeFade;

  vElevation = elev;
  vWorldPos  = vec3(position.xy, elev);

  // Finite-difference normal for smooth lighting
  float eps = 0.008;
  float hL = warp(p + vec3(-eps, 0.0, 0.0)) * 0.30 * edgeFade;
  float hR = warp(p + vec3( eps, 0.0, 0.0)) * 0.30 * edgeFade;
  float hD = warp(p + vec3(0.0, -eps, 0.0)) * 0.30 * edgeFade;
  float hU = warp(p + vec3(0.0,  eps, 0.0)) * 0.30 * edgeFade;

  vNormal = normalize(vec3(hL - hR, hD - hU, eps * 2.5));

  vec3 displaced = vec3(position.xy, elev);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
}
