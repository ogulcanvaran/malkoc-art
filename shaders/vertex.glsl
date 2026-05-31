uniform float uTime;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vGradient;   // slope magnitude → fold edge detector
varying float vCurvature;  // laplacian → caustic focusing

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

// 6-octave FBM — extra octave vs before for more surface richness
float fbm(vec3 p) {
  float v = 0.0, a = 0.52;
  mat3 rot = mat3(
     0.8660,  0.5000, 0.0,
    -0.5000,  0.8660, 0.0,
     0.0,     0.0,    1.0
  );
  for (int i = 0; i < 6; i++) {
    v += a * vnoise(p);
    p  = rot * p * 1.88;
    a *= 0.50;
  }
  return v;
}

// Double-warp: first warp, then warp again with that result
// Creates the dense, self-folding viscous liquid look
float liquidField(vec3 p) {
  // First warp layer
  vec3 q = vec3(
    fbm(p + vec3(0.0,  0.0, 0.0)),
    fbm(p + vec3(5.2,  1.3, 2.8)),
    fbm(p + vec3(2.4,  7.1, 1.6))
  );
  // Second warp with first result — creates that "folding into itself" feel
  vec3 r = vec3(
    fbm(p + 1.8 * q + vec3(1.7, 9.2, 5.1)),
    fbm(p + 1.8 * q + vec3(8.3, 2.8, 1.2)),
    fbm(p + 1.8 * q + vec3(3.3, 7.6, 4.4))
  );
  return fbm(p + 1.4 * r);
}

void main() {
  vUv = uv;

  float t = uTime * 0.045; // slow viscous drift

  vec2 drag = (uMousePos - uMouseLag) * 3.5;

  vec3 p = vec3(
    position.x * 0.28 + drag.x * uMousePower,
    position.y * 0.28 + drag.y * uMousePower,
    t
  );

  float elev = liquidField(p) * 0.58;

  // Edge fade — only at outermost rim
  float edge = 1.0 - smoothstep(0.58, 0.72, length(vUv - 0.5));
  elev *= edge;

  vElevation = elev;

  // ── Finite differences — tight eps for crisp fold lines ─────────────────────
  float eps = 0.009;
  float eL  = liquidField(p + vec3(-eps, 0.0,  0.0)) * 0.58 * (1.0 - smoothstep(0.58,0.72,length(vUv+vec2(-eps,0.0)-0.5)));
  float eR  = liquidField(p + vec3( eps, 0.0,  0.0)) * 0.58 * (1.0 - smoothstep(0.58,0.72,length(vUv+vec2( eps,0.0)-0.5)));
  float eD  = liquidField(p + vec3( 0.0, -eps, 0.0)) * 0.58 * (1.0 - smoothstep(0.58,0.72,length(vUv+vec2(0.0,-eps)-0.5)));
  float eU  = liquidField(p + vec3( 0.0,  eps, 0.0)) * 0.58 * (1.0 - smoothstep(0.58,0.72,length(vUv+vec2(0.0, eps)-0.5)));

  vec2  grad     = vec2(eR - eL, eU - eD) / (2.0 * eps);
  vGradient      = length(grad);                          // steep = fold edge
  vCurvature     = (eL + eR + eD + eU - 4.0 * elev) / (eps * eps); // laplacian

  vNormal = normalize(vec3(eL - eR, eD - eU, eps * 1.6));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
