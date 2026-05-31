uniform float uTime;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vGradient;

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

// 4 octaves — performanslı ama yeterince zengin
float fbm(vec3 p) {
  float v = 0.0, a = 0.54;
  mat3 rot = mat3(0.8660, 0.5000, 0.0, -0.5000, 0.8660, 0.0, 0.0, 0.0, 1.0);
  for (int i = 0; i < 4; i++) {
    v += a * vnoise(p);
    p  = rot * p * 1.90;
    a *= 0.50;
  }
  return v;
}

// Tek warp — double warp'a göre 3x daha hafif, aynı organik his
float liquidField(vec3 p) {
  vec2 w = vec2(fbm(p + vec3(1.7, 9.2, 3.5)), fbm(p + vec3(8.3, 2.8, 5.1)));
  return fbm(p + vec3(w * 2.50, 0.0));
}

void main() {
  vUv = uv;

  float t    = uTime * 0.048;
  vec2  drag = (uMousePos - uMouseLag) * 3.5;

  vec3 p = vec3(
    position.x * 0.18 + drag.x * uMousePower,
    position.y * 0.18 + drag.y * uMousePower,
    t
  );

  float elev = liquidField(p) * 0.70;
  float edge = 1.0 - smoothstep(0.58, 0.72, length(vUv - 0.5));
  elev *= edge;
  vElevation = elev;

  float eps = 0.010;
  float eR  = liquidField(p + vec3(eps, 0.0, 0.0)) * 0.70;
  float eU  = liquidField(p + vec3(0.0, eps, 0.0)) * 0.70;

  vec2 grad = vec2(elev - eR, elev - eU) / eps;
  vGradient = length(grad);
  vNormal   = normalize(vec3(-grad.x, -grad.y, 1.0));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
