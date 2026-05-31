uniform float uTime;
uniform vec2 uMousePos;
uniform float uMouse;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vPosition;
varying float vElevation;

// Schlick fresnel approximation
float fresnel(vec3 viewDir, vec3 normal, float power) {
  return pow(1.0 - clamp(dot(viewDir, normal), 0.0, 1.0), power);
}

// Soft specular highlight
float specular(vec3 lightDir, vec3 normal, vec3 viewDir, float shininess) {
  vec3 halfVec = normalize(lightDir + viewDir);
  return pow(max(dot(normal, halfVec), 0.0), shininess);
}

void main() {
  // Reconstruct approximate view direction
  vec3 viewDir = normalize(vec3(0.0, 0.0, 1.0));
  vec3 normal = normalize(vNormal);

  // --- Base color: dark obsidian with elevation tinting ---
  float e = vElevation;

  // Dark surface base
  vec3 darkBase   = vec3(0.020, 0.020, 0.024);
  vec3 midTone    = vec3(0.048, 0.050, 0.058);
  vec3 highlight  = vec3(0.840, 0.840, 0.860);

  // Blend by elevation
  float tBase = smoothstep(-0.35, 0.10, e);
  float tHigh = smoothstep(0.05, 0.38, e);

  vec3 surfaceColor = mix(darkBase, midTone, tBase);
  surfaceColor = mix(surfaceColor, highlight, tHigh * 0.55);

  // --- Subtle iridescence tint on peaks ---
  float iridFactor = smoothstep(0.1, 0.35, e);
  vec3 iridColor = vec3(0.10, 0.13, 0.22); // cool blue-steel tint
  surfaceColor = mix(surfaceColor, surfaceColor + iridColor * 0.18, iridFactor);

  // --- Cinematic key light ---
  vec2 mouseInfluence = uMousePos * 0.3 * uMouse;
  vec3 keyLightDir = normalize(vec3(-0.6 + mouseInfluence.x, 0.8 + mouseInfluence.y, 1.0));
  float keyDiff    = max(dot(normal, keyLightDir), 0.0);
  float keySpec    = specular(keyLightDir, normal, viewDir, 180.0);

  // Subtle fill light from below
  vec3 fillLightDir = normalize(vec3(0.4, -0.5, 0.8));
  float fillDiff = max(dot(normal, fillLightDir), 0.0) * 0.18;

  // Rim / backlight
  vec3 rimLightDir = normalize(vec3(0.9, 0.3, 0.2));
  float rimSpec    = specular(rimLightDir, normal, viewDir, 60.0) * 0.12;

  // --- Fresnel gloss ---
  float fresnelVal = fresnel(viewDir, normal, 3.5);

  // --- Compose ---
  vec3 color = surfaceColor;

  // Diffuse
  color += midTone * keyDiff * 0.22;
  color += darkBase * fillDiff;

  // Specular highlights — crisp on peaks
  color += vec3(1.0) * keySpec * 0.65 * (0.4 + tHigh * 0.6);
  color += vec3(0.9, 0.95, 1.0) * rimSpec;

  // Fresnel edge glow
  color += vec3(0.55, 0.58, 0.65) * fresnelVal * 0.12;

  // Subtle vignette
  float dist = length(vUv - 0.5) * 1.6;
  float vignette = smoothstep(1.0, 0.2, dist);
  color *= mix(0.72, 1.0, vignette);

  // Tone map — subtle exposure lift for premium feel
  color = color / (color + vec3(0.8)) * 1.08;

  gl_FragColor = vec4(color, 1.0);
}
