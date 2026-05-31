precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMousePos;   // 0..1 smoothed
uniform vec2  uMouseLag;   // slow copy — drag = pos - lag

varying vec2 vUv;

// ── Hash + smooth value noise ────────────────────────────────────────────────

vec3 hash3(vec3 p) {
  p = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract(vec3((p.x+p.y)*p.z, (p.x+p.z)*p.y, (p.y+p.z)*p.x));
}

float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f*f*(3.0 - 2.0*f);
  float n000 = hash3(i+vec3(0,0,0)).x;
  float n100 = hash3(i+vec3(1,0,0)).x;
  float n010 = hash3(i+vec3(0,1,0)).x;
  float n110 = hash3(i+vec3(1,1,0)).x;
  float n001 = hash3(i+vec3(0,0,1)).x;
  float n101 = hash3(i+vec3(1,0,1)).x;
  float n011 = hash3(i+vec3(0,1,1)).x;
  float n111 = hash3(i+vec3(1,1,1)).x;
  return mix(
    mix(mix(n000,n100,u.x), mix(n010,n110,u.x), u.y),
    mix(mix(n001,n101,u.x), mix(n011,n111,u.x), u.y),
    u.z) * 2.0 - 1.0;
}

// 4-oktav FBM — her oktav döndürülmüş koordinatta (grid artifact yok)
float fbm(vec3 p) {
  float v = 0.0, a = 0.52;
  mat2 rot = mat2(0.8660, 0.5000, -0.5000, 0.8660);
  for (int i = 0; i < 4; i++) {
    v   += a * vnoise(p);
    p.xy = rot * p.xy * 1.90;
    p.z *= 1.20;
    a   *= 0.50;
  }
  return v;
}

// Tek warp — LOUD benzeri organik sıvı kıvrımlar
float liquidSurface(vec3 p) {
  vec2 w = vec2(fbm(p + vec3(1.7, 9.2, 3.5)),
                fbm(p + vec3(8.3, 2.8, 5.1)));
  return fbm(p + vec3(w * 2.40, 0.0));
}

// ── GGX specular ─────────────────────────────────────────────────────────────

float GGX(vec3 N, vec3 H, float roughness) {
  float a  = roughness * roughness;
  float nh = max(dot(N, H), 0.0);
  float d  = nh * nh * (a*a - 1.0) + 1.0;
  return a*a / (3.14159 * d*d + 1e-5);
}

float schlick(float cosA, float F0) {
  return F0 + (1.0 - F0) * pow(1.0 - cosA, 5.0);
}

void main() {
  vec2 uv = vUv;

  // Aspect ratio düzeltme
  float aspect = uResolution.x / uResolution.y;
  vec2  p2d    = vec2(uv.x * aspect, uv.y);

  float t    = uTime * 0.042; // yavaş, viskoz

  // Mouse drag → yüzeyi iter gibi
  vec2 drag  = (uMousePos - uMouseLag) * 3.0;

  // Noise uzay örneği — çok düşük frekans = büyük akışkan kıvrımlar
  vec3 sp = vec3(
    p2d.x * 0.55 + drag.x,
    p2d.y * 0.55 + drag.y,
    t
  );

  // ── Yüzey yüksekliği + normal ────────────────────────────────────────────────
  float h  = liquidSurface(sp);

  // Analitik normal: FBM gradyantından
  float eps = 0.003;
  float hx  = liquidSurface(sp + vec3(eps, 0.0, 0.0));
  float hy  = liquidSurface(sp + vec3(0.0, eps, 0.0));

  vec3 N = normalize(vec3(h - hx, h - hy, eps * 1.8));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float NdV = max(dot(N, V), 0.0);

  // ── Albedo: derin siyah obsidyen, tepelerde çok koyu lacivert ───────────────
  float tH     = smoothstep(-0.30, 0.50, h);
  vec3  albedo = mix(
    vec3(0.005, 0.004, 0.008),   // vadi: saf siyah
    vec3(0.042, 0.038, 0.062),   // tepe: koyu lacivert-siyah
    tH
  );

  // ── Işıklar ──────────────────────────────────────────────────────────────────
  // Key light — mouse ile yavaşça kayar
  vec2  mD     = (uMousePos - 0.5) * 0.50;
  vec3  keyDir = normalize(vec3(-0.50 + mD.x, 0.80 + mD.y, 1.0));
  float NdK    = max(dot(N, keyDir), 0.0);
  vec3  H_key  = normalize(keyDir + V);

  // Fill light
  vec3  fillDir = normalize(vec3(0.55, -0.35, 0.85));
  float NdF     = max(dot(N, fillDir), 0.0);
  vec3  H_fill  = normalize(fillDir + V);

  // Rim light
  vec3  rimDir = normalize(vec3(-0.25, 0.15, 0.60));
  float NdR    = max(dot(N, rimDir), 0.0);

  // ── Specular: geniş, fold boyunca yayılır (LOUD gibi) ───────────────────────
  float spec1 = GGX(N, H_key,  0.14) * NdK * 1.20; // ana highlight
  float spec2 = GGX(N, H_key,  0.32) * NdK * 0.55; // yumuşak geniş glow
  float spec3 = GGX(N, H_fill, 0.26) * NdF * 0.25; // fill yansıması

  // Fresnel — fold kenarları rim
  float fres = schlick(NdV, 0.04) * 0.22;

  // ── Kompozisyon ──────────────────────────────────────────────────────────────
  vec3 col  = albedo * (0.15 + NdK * 0.50 + NdF * 0.12 + NdR * 0.05);
  col      += vec3(0.96, 0.97, 1.00) * spec1;
  col      += vec3(0.80, 0.85, 1.00) * spec2;
  col      += vec3(0.70, 0.78, 1.00) * spec3;
  col      += vec3(0.45, 0.52, 0.75) * fres;

  // ── Vignette — köşeler karardı, merkez parlak ────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.80;
  col      *= mix(0.28, 1.0, smoothstep(1.08, 0.04, vd));

  // ── Filmic tone map ──────────────────────────────────────────────────────────
  col  = col * 1.22;
  col  = col / (col + vec3(0.58)) * 1.08;
  col  = pow(max(col, vec3(0.0)), vec3(0.88));

  gl_FragColor = vec4(col, 1.0);
}
