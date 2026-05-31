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

  // ── Pure black chrome base — NO grey ────────────────────────────────────────
  // Black lacquer/resin: albedo is essentially zero
  // All visible colour comes from specular reflections only
  vec3 albedo = vec3(0.006, 0.005, 0.007);

  // Very subtle depth tint in deep valleys (cooler/bluer) to read the geometry
  float depth   = smoothstep(0.0, -0.18, e);
  albedo       += vec3(0.004, 0.004, 0.010) * depth;

  // ── Cinematic key light — follows mouse ──────────────────────────────────────
  vec2  mOff   = (uMousePos - 0.5) * 0.50;
  vec3  keyDir = normalize(vec3(-0.40 + mOff.x, 0.65 + mOff.y, 1.0));
  vec3  H_key  = normalize(keyDir + V);
  float NdL    = max(dot(N, keyDir), 0.0);

  // Roughness very low → mirror-like lacquer highlight
  float rough  = 0.045;
  float spec   = GGX(N, H_key, rough) * NdL * 0.90;

  // Second smaller light for fold depth reading
  vec3  fillDir = normalize(vec3(0.55, -0.30, 0.75));
  vec3  H_fill  = normalize(fillDir + V);
  float fillNdL = max(dot(N, fillDir), 0.0);
  float specF   = GGX(N, H_fill, 0.09) * fillNdL * 0.12;

  // Fresnel — bright white on glancing angles (fold edges)
  float fres   = schlick(V, N, 0.03) * 0.22;

  // ── Compose — pure reflective, no grey fill ──────────────────────────────────
  vec3 col = albedo * 0.18;          // tiny ambient — keeps absolute-zero away
  col     += vec3(1.00) * spec;      // primary hot spot
  col     += vec3(0.85, 0.90, 1.00) * specF; // cool secondary
  col     += vec3(0.70, 0.72, 0.78) * fres;  // fresnel rim

  // ── Deep vignette — focus on centre, black edges ─────────────────────────────
  float vd  = length(vUv - 0.5) * 1.80;
  float vig = smoothstep(1.05, 0.05, vd);
  col      *= mix(0.30, 1.0, vig);

  // ── Tone map — preserve hot specular whites, crush darks ────────────────────
  col  = col * 1.20;
  col  = pow(col / (col + vec3(0.65)) * 1.08, vec3(0.90)); // slight gamma lift

  gl_FragColor = vec4(col, 1.0);
}
