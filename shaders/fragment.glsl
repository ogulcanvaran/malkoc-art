uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vCurvature;

float specBRDF(vec3 L, vec3 N, vec3 V, float roughness) {
  vec3  H    = normalize(L + V);
  float NdH  = max(dot(N, H), 0.0);
  float NdL  = max(dot(N, L), 0.0);
  float NdV  = max(dot(N, V), 0.0001);

  // GGX distribution — tight for lacquer look
  float a    = roughness * roughness;
  float a2   = a * a;
  float denom = (NdH * NdH * (a2 - 1.0) + 1.0);
  float D    = a2 / (3.14159 * denom * denom);

  // Schlick-Smith geometry
  float k    = roughness * 0.5;
  float G    = (NdL / (NdL * (1.0 - k) + k)) * (NdV / (NdV * (1.0 - k) + k));

  return D * G / (4.0 * NdV + 0.001);
}

float fresnel(vec3 V, vec3 N, float F0) {
  return F0 + (1.0 - F0) * pow(1.0 - max(dot(V, N), 0.0), 5.0);
}

void main() {
  vec3  V = normalize(vec3(0.0, 0.0, 1.0));
  vec3  N = normalize(vNormal);
  float e = vElevation;

  // ── Surface colour: deep glossy black ──────────────────────────────────────
  // Base: near-black, slightly warmer in the deepest valleys
  vec3  cDeep   = vec3(0.012, 0.010, 0.012); // deepest valley
  vec3  cMid    = vec3(0.028, 0.026, 0.032); // mid slopes
  vec3  cCrest  = vec3(0.055, 0.052, 0.062); // ridge crest (still very dark)

  float tMid    = smoothstep(-0.05, 0.14, e);
  float tCrest  = smoothstep( 0.12, 0.26, e);

  vec3 albedo   = mix(cDeep, cMid,   tMid);
  albedo        = mix(albedo, cCrest, tCrest);

  // ── Ambient occlusion from curvature (valleys are darker) ──────────────────
  float ao = clamp(1.0 - vCurvature * 0.008, 0.0, 1.0);
  albedo  *= ao;

  // ── Lighting ────────────────────────────────────────────────────────────────
  // Key light — moves gently with mouse, like studio light
  vec2 mShift   = (uMousePos - 0.5) * 0.40 * uMousePower;
  vec3 keyDir   = normalize(vec3(-0.45 + mShift.x, 0.70 + mShift.y, 1.0));
  float keyNdL  = max(dot(N, keyDir), 0.0);

  // Secondary fill from below-right
  vec3 fillDir  = normalize(vec3(0.6, -0.35, 0.7));
  float fillNdL = max(dot(N, fillDir), 0.0) * 0.14;

  // Rim light from behind-top
  vec3 rimDir   = normalize(vec3(-0.2, 0.9, 0.3));
  float rimNdL  = max(dot(N, rimDir), 0.0) * 0.08;

  // ── Specular — GGX lacquer (very tight, bright) ─────────────────────────────
  float roughness = 0.055; // almost mirror — like lacquered resin
  float spec      = specBRDF(keyDir, N, V, roughness);
  float specFill  = specBRDF(fillDir, N, V, 0.12) * 0.20;

  // Fresnel — edges catch more light
  float fres = fresnel(V, N, 0.04);

  // ── Compose ─────────────────────────────────────────────────────────────────
  vec3 col = albedo * (keyNdL * 0.30 + fillNdL + rimNdL + 0.04); // base shading
  col     += vec3(1.0) * spec  * 1.20;       // primary specular highlight
  col     += vec3(0.8, 0.85, 1.0) * specFill; // soft fill specular
  col     += albedo * fres * 0.35;            // fresnel edge lift

  // ── Ridge accent: bright line right on ridge crests ─────────────────────────
  float ridgeGlow = pow(tCrest, 3.0) * keyNdL;
  col += vec3(0.60, 0.62, 0.68) * ridgeGlow * 0.18;

  // ── Vignette ────────────────────────────────────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.65;
  float vig = smoothstep(1.0, 0.1, vd);
  col      *= mix(0.55, 1.0, vig);

  // ── Exposure + very subtle tone-map ─────────────────────────────────────────
  col  = col * 1.15;
  col  = col / (col + vec3(0.72)) * 1.12; // softer toe, preserves peak whites

  gl_FragColor = vec4(col, 1.0);
}
