precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;

varying vec2 vUv;

vec3 hash3(vec3 p) {
  p = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract(vec3((p.x+p.y)*p.z, (p.x+p.z)*p.y, (p.y+p.z)*p.x));
}

float vnoise(vec3 p) {
  vec3 i = floor(p), f = fract(p);
  vec3 u = f*f*(3.0 - 2.0*f);
  return mix(
    mix(mix(hash3(i+vec3(0,0,0)).x, hash3(i+vec3(1,0,0)).x, u.x),
        mix(hash3(i+vec3(0,1,0)).x, hash3(i+vec3(1,1,0)).x, u.x), u.y),
    mix(mix(hash3(i+vec3(0,0,1)).x, hash3(i+vec3(1,0,1)).x, u.x),
        mix(hash3(i+vec3(0,1,1)).x, hash3(i+vec3(1,1,1)).x, u.x), u.y),
    u.z) * 2.0 - 1.0;
}

float fbm(vec3 p) {
  float v = 0.0, a = 0.52;
  mat2 rot = mat2(0.8660, 0.5000, -0.5000, 0.8660);
  for (int i = 0; i < 4; i++) {
    v   += a * vnoise(p);
    p.xy = rot * p.xy * 1.90;
    p.z *= 1.18;
    a   *= 0.50;
  }
  return v;
}

float liquidSurface(vec3 p) {
  vec2 w = vec2(fbm(p + vec3(1.7, 9.2, 3.5)),
                fbm(p + vec3(8.3, 2.8, 5.1)));
  return fbm(p + vec3(w * 3.80, 0.0));
}

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
  float aspect = uResolution.x / uResolution.y;
  vec2  p2d    = vec2(uv.x * aspect, uv.y);

  float t    = uTime * 0.020;
  vec2  drag = (uMousePos - uMouseLag) * 2.0;

  // Düşük frekans = büyük, geniş LOUD benzeri foldlar
  vec3 sp = vec3(
    p2d.x * 0.30 + drag.x,
    p2d.y * 0.30 + drag.y,
    t
  );

  float h  = liquidSurface(sp);
  float eps = 0.0028;
  float hx  = liquidSurface(sp + vec3(eps, 0.0, 0.0));
  float hy  = liquidSurface(sp + vec3(0.0, eps, 0.0));

  vec3 N = normalize(vec3(h - hx, h - hy, eps * 1.5));
  vec3 V = vec3(0.0, 0.0, 1.0);
  float NdV = max(dot(N, V), 0.0);

  // Nötr koyu gri — LOUD rengi
  float tH     = smoothstep(-0.35, 0.50, h);
  vec3  albedo = mix(
    vec3(0.004, 0.004, 0.005),
    vec3(0.026, 0.026, 0.030),
    tH
  );

  vec2  mD     = (uMousePos - 0.5) * 0.40;
  vec3  keyDir = normalize(vec3(-0.30 + mD.x, 0.90 + mD.y, 1.0));
  float NdK    = max(dot(N, keyDir), 0.0);
  vec3  H_key  = normalize(keyDir + V);

  vec3  fillDir = normalize(vec3(0.60, -0.40, 0.80));
  float NdF     = max(dot(N, fillDir), 0.0);
  vec3  H_fill  = normalize(fillDir + V);

  // Çok keskin ana highlight + geniş glow — LOUD'un imzası
  float spec1 = GGX(N, H_key,  0.07) * NdK * 2.80;
  float spec2 = GGX(N, H_key,  0.22) * NdK * 1.20;
  float spec3 = GGX(N, H_key,  0.48) * NdK * 0.50;
  float spec4 = GGX(N, H_fill, 0.24) * NdF * 0.28;
  float fres  = schlick(NdV, 0.04) * 0.40;

  vec3 col = albedo * (0.10 + NdK * 0.38 + NdF * 0.08);
  col += vec3(1.00, 0.99, 0.97) * spec1;
  col += vec3(0.92, 0.93, 0.94) * spec2;
  col += vec3(0.80, 0.82, 0.85) * spec3;
  col += vec3(0.68, 0.70, 0.74) * spec4;
  col += vec3(0.52, 0.55, 0.62) * fres;

  // Vignette
  float vd = length(vUv - 0.5) * 1.90;
  col *= mix(0.14, 1.0, smoothstep(1.08, 0.02, vd));

  // Filmic — yüksek kontrast
  col  = col * 1.40;
  col  = col / (col + vec3(0.45)) * 1.10;
  col  = pow(max(col, vec3(0.0)), vec3(0.84));

  gl_FragColor = vec4(col, 1.0);
}
