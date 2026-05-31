uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;

// GGX specular — lacquer tight highlight
float GGX(vec3 N, vec3 H, float roughness) {
  float a    = roughness * roughness;
  float NdH  = max(dot(N, H), 0.0);
  float denom = NdH * NdH * (a * a - 1.0) + 1.0;
  return (a * a) / (3.14159 * denom * denom + 1e-5);
}

float schlick(vec3 V, vec3 N, float F0) {
  return F0 + (1.0 - F0) * pow(1.0 - max(dot(V, N), 0.0), 5.0);
}

void main() {
  vec3  V = normalize(vec3(0.0, 0.0, 1.0));
  vec3  N = normalize(vNormal);
  float e = vElevation;

  // ── Deep black surface — heykel gibi: sadece yansıma var, gri yok ───────────
  vec3 cDeep  = vec3(0.008, 0.007, 0.010); // derin vadi — neredeyse siyah
  vec3 cMid   = vec3(0.028, 0.025, 0.038); // orta eğim — çok koyu lacivert
  vec3 cCrest = vec3(0.055, 0.050, 0.075); // tepe — görünür ama yine koyu

  float tMid   = smoothstep(-0.22, 0.08, e);
  float tCrest = smoothstep( 0.06, 0.42, e);

  vec3 albedo  = mix(cDeep, cMid,   tMid);
  albedo       = mix(albedo, cCrest, tCrest);

  // ── Key light — mouse ile kayar ──────────────────────────────────────────────
  vec2  mOff   = (uMousePos - 0.5) * 0.50;
  vec3  keyDir = normalize(vec3(-0.50 + mOff.x, 0.80 + mOff.y, 1.0));
  vec3  H_key  = normalize(keyDir + V);
  float NdL    = max(dot(N, keyDir), 0.0);

  // Çok düşük roughness → ayna gibi parlak nokta (heykel lacquer)
  float rough  = 0.042;
  float spec   = GGX(N, H_key, rough) * NdL * 1.20;

  // Dolgu ışık — fold derinliği okumak için
  vec3  fillDir = normalize(vec3(0.60, -0.35, 0.80));
  vec3  H_fill  = normalize(fillDir + V);
  float fillNdL = max(dot(N, fillDir), 0.0);
  float specF   = GGX(N, H_fill, 0.10) * fillNdL * 0.22;

  // Fresnel — fold kenarlarında parlak rim
  float fres = schlick(V, N, 0.03) * 0.28;

  // ── Kompozisyon ─────────────────────────────────────────────────────────────
  // Diffuse katkı çok düşük tutuldu — siyahı bozmadan fold geometrisi okunuyor
  vec3 col  = albedo * (0.30 + NdL * 0.35);
  col      += vec3(1.00) * spec;
  col      += vec3(0.88, 0.92, 1.00) * specF;
  col      += vec3(0.60, 0.65, 0.80) * fres;

  // ── Vignette ─────────────────────────────────────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.75;
  float vig = smoothstep(1.05, 0.08, vd);
  col      *= mix(0.40, 1.0, vig);

  // ── Tone map ─────────────────────────────────────────────────────────────────
  col = col * 1.15;
  col = pow(col / (col + vec3(0.68)) * 1.08, vec3(0.91));

  gl_FragColor = vec4(col, 1.0);
}
