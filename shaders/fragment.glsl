uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vGradient;

float GGX(vec3 N, vec3 H, float roughness) {
  float a     = roughness * roughness;
  float NdH   = max(dot(N, H), 0.0);
  float denom = NdH * NdH * (a * a - 1.0) + 1.0;
  return (a * a) / (3.14159 * denom * denom + 1e-5);
}

float schlick(float cosA, float F0) {
  return F0 + (1.0 - F0) * pow(1.0 - cosA, 5.0);
}

void main() {
  vec3  V   = normalize(vec3(0.0, 0.0, 1.0));
  vec3  N   = normalize(vNormal);
  float NdV = max(dot(N, V), 0.0);
  float e   = vElevation;

  // ── Renk: derin siyah vadi → koyu lacivert tepe ──────────────────────────────
  // LOUD referansındaki gibi: vadilar saf siyah, tepeler çok koyu gri-lacivert
  float tSurface = smoothstep(-0.25, 0.45, e);
  vec3  albedo   = mix(
    vec3(0.005, 0.004, 0.007),   // vadi: saf siyah
    vec3(0.048, 0.044, 0.065),   // tepe: çok koyu lacivert-gri
    tSurface
  );

  // ── Işık ─────────────────────────────────────────────────────────────────────
  vec2  mOff   = (uMousePos - 0.5) * 0.55;
  vec3  keyDir = normalize(vec3(-0.50 + mOff.x, 0.80 + mOff.y, 1.0));
  float NdK    = max(dot(N, keyDir), 0.0);
  vec3  H_key  = normalize(keyDir + V);

  // ── Specular: yüksek roughness = fold boyunca uzanan GENIŞ highlight ─────────
  // LOUD'daki o büyük yumuşak parlaklık buradan geliyor
  float spec1 = GGX(N, H_key, 0.16) * NdK * 1.10;  // ana geniş highlight
  float spec2 = GGX(N, H_key, 0.38) * NdK * 0.45;  // çok geniş soft glow

  // Fill light — karşı taraftan yumuşak dolgu
  vec3  fillDir = normalize(vec3(0.55, -0.30, 0.85));
  float NdF     = max(dot(N, fillDir), 0.0);
  float specF   = GGX(N, normalize(fillDir+V), 0.28) * NdF * 0.20;

  // ── Diffuse — fold derinliği okunur ─────────────────────────────────────────
  vec3  col  = albedo * (0.18 + NdK * 0.45 + NdF * 0.10);

  // ── Specular ekle ────────────────────────────────────────────────────────────
  col += vec3(0.95, 0.97, 1.00) * spec1;
  col += vec3(0.80, 0.85, 1.00) * spec2;
  col += vec3(0.75, 0.80, 1.00) * specF;

  // ── Fresnel — fold kenarlarında ince rim ────────────────────────────────────
  col += vec3(0.45, 0.52, 0.72) * schlick(NdV, 0.04) * 0.20;

  // ── Vignette ────────────────────────────────────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.75;
  col      *= mix(0.32, 1.0, smoothstep(1.06, 0.06, vd));

  // ── Filmic — kontrastı yüksek tut, siyahları ez ──────────────────────────────
  col  = col * 1.20;
  col  = col / (col + vec3(0.60)) * 1.08;
  col  = pow(col, vec3(0.88));

  gl_FragColor = vec4(col, 1.0);
}
