uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;

// GGX specular — tight lacquer highlight
float GGX(vec3 N, vec3 H, float roughness) {
  float a    = roughness * roughness;
  float NdH  = max(dot(N, H), 0.0);
  float denom = NdH * NdH * (a * a - 1.0) + 1.0;
  return (a * a) / (3.14159 * denom * denom + 1e-5);
}

// Schlick fresnel
float schlick(vec3 V, vec3 N, float F0) {
  float cosA = max(dot(V, N), 0.0);
  return F0 + (1.0 - F0) * pow(1.0 - cosA, 5.0);
}

void main() {
  vec3  V = normalize(vec3(0.0, 0.0, 1.0));
  vec3  N = normalize(vNormal);
  float e = vElevation;

  // ── Dark navy-black base — matches LOUD SRL reference ───────────────────────
  // Folds need to be *visible*: a very dark charcoal-indigo base so the
  // geometry reads clearly in shadow, not absolute black
  // Darker valleys, more visible mid-tones — matches LOUD's dark navy surface
  vec3 cShadow = vec3(0.014, 0.012, 0.020); // near-black indigo valley
  vec3 cBase   = vec3(0.055, 0.052, 0.075); // dark navy on mid slopes
  vec3 cRaise  = vec3(0.095, 0.090, 0.125); // visible charcoal on raised folds

  float tBase  = smoothstep(-0.25, 0.12, e);
  float tRaise = smoothstep( 0.08, 0.45, e);

  vec3 albedo  = mix(cShadow, cBase,  tBase);
  albedo       = mix(albedo,  cRaise, tRaise);

  // ── Cinematic key light — follows mouse ──────────────────────────────────────
  vec2  mOff   = (uMousePos - 0.5) * 0.50;
  vec3  keyDir = normalize(vec3(-0.40 + mOff.x, 0.65 + mOff.y, 1.0));
  vec3  H_key  = normalize(keyDir + V);
  float NdL    = max(dot(N, keyDir), 0.0);

  // Slightly higher roughness so highlight spreads across large folds
  float rough  = 0.065;
  float spec   = GGX(N, H_key, rough) * NdL * 1.10;

  // Fill light — opposite corner, reveals fold structure
  vec3  fillDir = normalize(vec3(0.55, -0.30, 0.75));
  vec3  H_fill  = normalize(fillDir + V);
  float fillNdL = max(dot(N, fillDir), 0.0);
  float specF   = GGX(N, H_fill, 0.12) * fillNdL * 0.18;

  // Fresnel — bright on fold edges and glancing surfaces
  float fres   = schlick(V, N, 0.03) * 0.30;

  // ── Compose ──────────────────────────────────────────────────────────────────
  vec3 col = albedo * 0.85;          // ambient — surface reads in shadow too
  col     += albedo * NdL * 0.55; // diffuse shading shows fold depth
  col     += vec3(1.00) * spec;      // primary hot spot
  col     += vec3(0.85, 0.90, 1.00) * specF; // cool secondary
  col     += vec3(0.65, 0.68, 0.80) * fres;  // fresnel rim on fold edges

  // ── Subtle vignette — darken corners, keep centre bright ─────────────────────
  float vd  = length(vUv - 0.5) * 1.70;
  float vig = smoothstep(1.05, 0.10, vd);
  col      *= mix(0.45, 1.0, vig);

  // ── Tone map ─────────────────────────────────────────────────────────────────
  col  = col * 1.10;
  col  = pow(col / (col + vec3(0.70)) * 1.06, vec3(0.92));

  gl_FragColor = vec4(col, 1.0);
}
