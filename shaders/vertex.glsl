uniform float uTime;
uniform vec2  uMousePos;    // 0..1 smoothed
uniform float uMousePower;  // 0..1 velocity-based
uniform vec2  uMouseDelta;  // raw delta this frame

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vCurvature;

// ── Smooth gradient noise ────────────────────────────────────────────────────

vec3 hash3(vec3 p) {
  p = vec3(
    dot(p, vec3(127.1, 311.7,  74.7)),
    dot(p, vec3(269.5, 183.3, 246.1)),
    dot(p, vec3(113.5, 271.9, 124.6))
  );
  return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
}

float gnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f*f*f*(f*(f*6.0 - 15.0) + 10.0);
  return mix(
    mix(mix(dot(hash3(i+vec3(0,0,0)),f-vec3(0,0,0)),
            dot(hash3(i+vec3(1,0,0)),f-vec3(1,0,0)),u.x),
        mix(dot(hash3(i+vec3(0,1,0)),f-vec3(0,1,0)),
            dot(hash3(i+vec3(1,1,0)),f-vec3(1,1,0)),u.x),u.y),
    mix(mix(dot(hash3(i+vec3(0,0,1)),f-vec3(0,0,1)),
            dot(hash3(i+vec3(1,0,1)),f-vec3(1,0,1)),u.x),
        mix(dot(hash3(i+vec3(0,1,1)),f-vec3(0,1,1)),
            dot(hash3(i+vec3(1,1,1)),f-vec3(1,1,1)),u.x),u.y),
    u.z);
}

// ── Ridge noise — creates sharp fold ridges like in lacquer sculptures ───────
// Inverts valleys into crests, giving that "fabric fold" ridge profile
float ridge(float n, float sharpness) {
  n = abs(n);                         // valley → ridge
  n = pow(1.0 - n, sharpness);       // sharpen the crest
  return n;
}

// ── Sculpture-grade fold field ───────────────────────────────────────────────
// 4 octaves of ridge noise with rotating coordinate frames
float sculptureField(vec3 p) {
  float v    = 0.0;
  float amp  = 1.0;
  float freq = 1.0;

  // Rotation matrices to break grid alignment and create sweeping S-curves
  mat2 rot45 = mat2(0.7071, -0.7071, 0.7071, 0.7071);
  mat2 rot22 = mat2(0.9239, -0.3827, 0.3827, 0.9239);

  // Octave 1 — large sweeping folds (dominant structure)
  v += ridge(gnoise(p * freq * 0.9), 2.5) * amp;
  p.xy = rot45 * p.xy;
  amp  *= 0.52; freq *= 1.9;

  // Octave 2 — mid folds crossing over
  v += ridge(gnoise(p * freq * 0.9), 2.8) * amp;
  p.xy = rot22 * p.xy;
  amp  *= 0.50; freq *= 2.1;

  // Octave 3 — smaller surface ripples
  v += ridge(gnoise(p * freq * 0.9), 3.0) * amp;
  p.xy = rot45 * p.xy;
  amp  *= 0.48; freq *= 2.0;

  // Octave 4 — fine detail
  v += ridge(gnoise(p * freq * 0.9), 2.5) * amp;

  return v;
}

// ── Mouse drag displacement ──────────────────────────────────────────────────
// Creates a gaussian "push" on the surface at the cursor position,
// proportional to movement speed → dragging thick liquid
float mousePush(vec2 uv, vec2 center, float power) {
  float d = length(uv - center);
  // Wide soft gaussian — the push spreads out like viscous material
  float gaussian = exp(-d * d * 5.5);
  return gaussian * power * 0.22;
}

void main() {
  vUv = uv;

  // ── Base surface — very slow drift ──────────────────────────────────────────
  float t = uTime * 0.07; // slow — the sculpture doesn't rush

  vec3 p = vec3(position.xy * 0.62, t);

  float base = sculptureField(p);

  // ── Mouse drag deformation ───────────────────────────────────────────────────
  // Second sculpture sample offset by mouse direction — surface "follows" mouse
  vec2 dragOffset = uMouseDelta * 1.8 * uMousePower;
  vec3 pDragged   = vec3((position.xy + dragOffset) * 0.62, t + 0.3);
  float dragged   = sculptureField(pDragged);

  // Blend base and dragged field near mouse
  float mouseDist   = length(vUv - uMousePos);
  float mouseRadius = smoothstep(0.55, 0.0, mouseDist); // influence radius ~55% of screen
  float field       = mix(base, dragged, mouseRadius * uMousePower * 0.65);

  // Additional gaussian push at cursor
  float push = mousePush(vUv, uMousePos, uMousePower);

  float elev = field * 0.28 + push;

  // Edge fade — clean borders
  float edge = 1.0 - smoothstep(0.38, 0.50, length(vUv - 0.5));
  elev *= edge;

  vElevation = elev;

  // ── Normal via finite differences ────────────────────────────────────────────
  float eps = 0.007;
  float hL  = (sculptureField(vec3((position.xy + vec2(-eps,  0.0)) * 0.62, t)) * 0.28 + mousePush(vUv + vec2(-eps, 0.0), uMousePos, uMousePower)) * edge;
  float hR  = (sculptureField(vec3((position.xy + vec2( eps,  0.0)) * 0.62, t)) * 0.28 + mousePush(vUv + vec2( eps, 0.0), uMousePos, uMousePower)) * edge;
  float hD  = (sculptureField(vec3((position.xy + vec2( 0.0, -eps)) * 0.62, t)) * 0.28 + mousePush(vUv + vec2( 0.0, -eps), uMousePos, uMousePower)) * edge;
  float hU  = (sculptureField(vec3((position.xy + vec2( 0.0,  eps)) * 0.62, t)) * 0.28 + mousePush(vUv + vec2( 0.0,  eps), uMousePos, uMousePower)) * edge;

  vNormal    = normalize(vec3(hL - hR, hD - hU, eps * 2.2));
  vCurvature = (hL + hR + hD + hU - 4.0 * elev) / (eps * eps); // laplacian → AO approx

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
