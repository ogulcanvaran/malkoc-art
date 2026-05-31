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

  // Derin siyah — obsidyen / erimiş metal
  vec3 col  = mix(vec3(0.006, 0.005, 0.008),
                  vec3(0.038, 0.034, 0.052),
                  smoothstep(-0.20, 0.35, e));

  // Key light — mouse'la kayar
  vec2  mOff   = (uMousePos - 0.5) * 0.55;
  vec3  keyDir = normalize(vec3(-0.55 + mOff.x, 0.85 + mOff.y, 1.0));
  float NdK    = max(dot(N, keyDir), 0.0);
  vec3  H_key  = normalize(keyDir + V);

  // Diffuse — fold geometrisi okunur
  col += col * NdK * 0.55;

  // Specular 1 — mirror flash (cıva / krom)
  col += vec3(1.00, 0.97, 0.93) * GGX(N, H_key, 0.038) * NdK * 1.30;

  // Specular 2 — geniş fold glow
  col += vec3(0.85, 0.90, 1.00) * GGX(N, H_key, 0.110) * NdK * 0.50;

  // Fill light
  vec3  fillDir = normalize(vec3(0.60, -0.35, 0.80));
  float NdF     = max(dot(N, fillDir), 0.0);
  col += vec3(0.75, 0.82, 1.00) * GGX(N, normalize(fillDir+V), 0.130) * NdF * 0.22;

  // Fold edge lines — vGradient yüksek olduğu yerlerde ince parlak çizgi
  float edgeLine = smoothstep(0.55, 1.20, vGradient) * GGX(N, H_key, 0.022) * NdK;
  col += vec3(1.00, 0.95, 0.88) * edgeLine * 0.75;

  // Fresnel rim
  col += vec3(0.50, 0.58, 0.78) * schlick(NdV, 0.04) * 0.25;

  // Vignette
  float vd  = length(vUv - 0.5) * 1.78;
  col      *= mix(0.35, 1.0, smoothstep(1.06, 0.06, vd));

  // Filmic tone map
  col = col * 1.15 / (col + vec3(0.65)) * 1.08;
  col = pow(col, vec3(0.90));

  gl_FragColor = vec4(col, 1.0);
}
