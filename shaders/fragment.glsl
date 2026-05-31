uniform float uTime;
uniform vec2  uMousePos;
uniform float uMousePower;

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;
varying float vGradient;   // fold edge steepness
varying float vCurvature;  // surface laplacian

// ── PBR helpers ──────────────────────────────────────────────────────────────

float GGX(vec3 N, vec3 H, float roughness) {
  float a    = roughness * roughness;
  float NdH  = max(dot(N, H), 0.0);
  float denom = NdH * NdH * (a * a - 1.0) + 1.0;
  return (a * a) / (3.14159265 * denom * denom + 1e-5);
}

float schlick(float cosA, float F0) {
  return F0 + (1.0 - F0) * pow(1.0 - cosA, 5.0);
}

void main() {
  vec3  V   = normalize(vec3(0.0, 0.0, 1.0));
  vec3  N   = normalize(vNormal);
  float NdV = max(dot(N, V), 0.0);
  float e   = vElevation;

  // ── Base surface: erimiş siyah metal / obsidyen ──────────────────────────────
  vec3 cAbyss  = vec3(0.005, 0.004, 0.007); // derin vadi — saf siyah
  vec3 cBody   = vec3(0.020, 0.018, 0.028); // yüzey gövdesi — koyu lacivert-siyah
  vec3 cSwell  = vec3(0.045, 0.040, 0.065); // kabarık bölge — görünür ama koyu

  float tBody  = smoothstep(-0.20, 0.06, e);
  float tSwell = smoothstep( 0.04, 0.38, e);

  vec3 albedo  = mix(cAbyss, cBody,  tBody);
  albedo       = mix(albedo, cSwell, tSwell);

  // ── Işık yönleri ─────────────────────────────────────────────────────────────
  vec2  mOff    = (uMousePos - 0.5) * 0.55;
  vec3  keyDir  = normalize(vec3(-0.55 + mOff.x,  0.85 + mOff.y, 1.0));
  vec3  fillDir = normalize(vec3( 0.65,           -0.40,          0.75));
  vec3  rimDir  = normalize(vec3(-0.30,            0.20,          0.60));

  float NdK = max(dot(N, keyDir),  0.0);
  float NdF = max(dot(N, fillDir), 0.0);

  // ── Specular katmanları — üç farklı roughness → zengin yansıma ───────────────
  // 1) Ultra-tight mirror highlight (çok parlak küçük nokta — cıva damlası gibi)
  float spec1 = GGX(N, normalize(keyDir  + V), 0.032) * NdK * 1.40;
  // 2) Medium spread (fold tepeleri boyunca uzanan parlaklık)
  float spec2 = GGX(N, normalize(keyDir  + V), 0.090) * NdK * 0.55;
  // 3) Fill soft highlight (ikincil kaynaktan gelen yansıma)
  float spec3 = GGX(N, normalize(fillDir + V), 0.120) * NdF * 0.28;

  // ── Caustic simülasyonu ───────────────────────────────────────────────────────
  // Işık konkav yüzeylerden geçerken odaklanır → parlak çizgiler
  // Pozitif laplacian = konkav = ışık toplama noktası
  float causticRaw  = max(vCurvature * 0.018, 0.0);
  float caustic     = pow(causticRaw, 1.6) * NdK * 2.50;
  // Caustic rengi: soğuk mavi-beyaz (erimiş metal ışık oyunu)
  vec3  causticCol  = mix(vec3(0.75, 0.82, 1.00), vec3(1.0), causticRaw * 2.0);

  // ── Fold edge highlight (kostik çizgiler) ─────────────────────────────────────
  // Yüksek gradyan = fold kenarı = ince parlak çizgi
  float edgeFactor  = smoothstep(12.0, 28.0, vGradient * 180.0);
  float edgeSpec    = GGX(N, normalize(keyDir + V), 0.018) * NdK;
  float edgeLine    = edgeFactor * edgeSpec * 0.90;

  // ── Fresnel — sıvı yüzey kenarlarında rim glow ───────────────────────────────
  float fres = schlick(NdV, 0.04) * 0.32;

  // ── Kompozisyon ─────────────────────────────────────────────────────────────
  vec3 col  = albedo * (0.22 + NdK * 0.28 + NdF * 0.08); // diffuse — fold okunur
  col      += vec3(1.00, 0.98, 0.95) * spec1;              // mirror highlight
  col      += vec3(0.90, 0.92, 1.00) * spec2;              // spread glow
  col      += vec3(0.80, 0.86, 1.00) * spec3;              // fill reflection
  col      += causticCol             * caustic;             // caustic focus lines
  col      += vec3(1.00, 0.96, 0.90) * edgeLine;           // fold edge bright line
  col      += vec3(0.55, 0.62, 0.80) * fres;               // rim / edge glow

  // ── Vignette ─────────────────────────────────────────────────────────────────
  float vd  = length(vUv - 0.5) * 1.78;
  float vig = smoothstep(1.06, 0.06, vd);
  col      *= mix(0.35, 1.0, vig);

  // ── Filmic tone map — kontrastı artır, beyazları koru ────────────────────────
  col  = col * 1.18;
  col  = col / (col + vec3(0.62)) * 1.10;
  col  = pow(col, vec3(0.88)); // hafif gamma lift — siyahları koru

  gl_FragColor = vec4(col, 1.0);
}
