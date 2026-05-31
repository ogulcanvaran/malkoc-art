uniform float uTime;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;

// ── Smooth value noise ───────────────────────────────────────────────────────

float hash(vec3 p) {
  p  = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),u.x),
        mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),u.x),u.y),
    mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),u.x),
        mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),u.x),u.y),
    u.z) * 2.0 - 1.0;
}

// 5-octave FBM with rotated frames — smooth, no grid artifacts
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

// Single warp pass — sweeping organic S-curves
float warpedFbm(vec3 p) {
  vec2 w = vec2(
    fbm(p + vec3(1.7, 9.2, 3.5)),
    fbm(p + vec3(8.3, 2.8, 5.1))
  );
  return fbm(p + vec3(w * 2.20, 0.0));
}

void main() {
  vUv = uv;

  float t = uTime * 0.050;

  vec2 drag = (uMousePos - uMouseLag) * 3.5;

  // Large organic folds — same amplitude everywhere, sphere floats on top
  vec3 p = vec3(
    position.x * 0.22 + drag.x * uMousePower,
    position.y * 0.22 + drag.y * uMousePower,
    t
  );

  float elev = warpedFbm(p) * 0.60;

  // Only fade at the very outer edge — surface fills the screen
  float edge = 1.0 - smoothstep(0.60, 0.72, length(vUv - 0.5));
  elev *= edge;

  vElevation = elev;

  // Normal via finite differences
  float eps = 0.012;
  float hL = warpedFbm(p + vec3(-eps, 0.0,  0.0)) * 0.60 * (1.0 - smoothstep(0.60,0.72,length(vUv+vec2(-eps,0.0)-0.5)));
  float hR = warpedFbm(p + vec3( eps, 0.0,  0.0)) * 0.60 * (1.0 - smoothstep(0.60,0.72,length(vUv+vec2( eps,0.0)-0.5)));
  float hD = warpedFbm(p + vec3( 0.0, -eps, 0.0)) * 0.60 * (1.0 - smoothstep(0.60,0.72,length(vUv+vec2(0.0,-eps)-0.5)));
  float hU = warpedFbm(p + vec3( 0.0,  eps, 0.0)) * 0.60 * (1.0 - smoothstep(0.60,0.72,length(vUv+vec2(0.0, eps)-0.5)));

  vNormal = normalize(vec3(hL - hR, hD - hU, eps * 1.4));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
