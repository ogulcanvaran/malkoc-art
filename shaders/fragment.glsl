uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying vec3  vWorldPos;

// ── Specular / Fresnel helpers ───────────────────────────────────────────────

float specular(vec3 lightDir, vec3 normal, vec3 viewDir, float shininess) {
  vec3 h = normalize(lightDir + viewDir);
  return pow(max(dot(normal, h), 0.0), shininess);
}

float fresnel(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - clamp(dot(viewDir, normal), 0.0, 1.0), power);
}

void main() {
  vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
  vec3 N       = normalize(vNormal);
  float e      = vElevation;

  // ── Surface palette ────────────────────────────────────────────────────────
  // Deep obsidian black at the base
  vec3 cBase     = vec3(0.018, 0.018, 0.022);
  // Mid gunmetal on gentle slopes
  vec3 cMid      = vec3(0.038, 0.040, 0.050);
  // Chrome white on raised peaks
  vec3 cPeak     = vec3(0.82,  0.83,  0.86);
  // Very subtle cool blue-steel tint for iridescence
  vec3 cIrid     = vec3(0.06,  0.09,  0.18);

  // Blend base → mid → peak by elevation
  float tMid  = smoothstep(-0.18, 0.05, e);
  float tPeak = smoothstep( 0.04, 0.22, e);

  vec3 col = mix(cBase, cMid,  tMid);
  col      = mix(col,   cPeak, tPeak * 0.50);

  // Iridescent sheen where surface crests
  col = mix(col, col + cIrid * 0.14, tPeak);

  // ── Key light — moves gently with mouse ────────────────────────────────────
  vec2 mShift  = (uMousePos - 0.5) * 0.35 * uMousePower;
  vec3 keyDir  = normalize(vec3(-0.5 + mShift.x, 0.75 + mShift.y, 1.0));
  float keyD   = max(dot(N, keyDir), 0.0);
  float keyS   = specular(keyDir, N, viewDir, 220.0);

  // ── Soft fill light (opposite side) ────────────────────────────────────────
  vec3 fillDir = normalize(vec3( 0.5, -0.4, 0.8));
  float fillD  = max(dot(N, fillDir), 0.0) * 0.12;

  // ── Fresnel edge catch ──────────────────────────────────────────────────────
  float fres   = fresnel(viewDir, N, 4.0) * 0.10;

  // ── Compose ────────────────────────────────────────────────────────────────
  col += cMid  * keyD  * 0.18;
  col += fillDir * fillD;                    // tiny fill bounce
  col += vec3(1.0) * keyS * 0.60 * (0.3 + tPeak * 0.7);
  col += vec3(0.50, 0.55, 0.65) * fres;

  // ── Cinematic vignette ──────────────────────────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.55;
  float vig = smoothstep(0.95, 0.15, vd);
  col *= mix(0.60, 1.0, vig);

  // ── Subtle tone-map for a creamy premium finish ─────────────────────────────
  col = col / (col + vec3(0.85)) * 1.10;

  gl_FragColor = vec4(col, 1.0);
}
