uniform float uTime;
uniform vec2  uMousePos;
uniform vec2  uMouseLag;
uniform float uMousePower;
uniform float uSphereRadius; // UV-space radius of the central sphere

varying vec2  vUv;
varying vec3  vNormal;
varying float vElevation;

// ── Smooth value noise ───────────────────────────────────────────────────────

float hash(vec3 p) {
  p  = fract(p * vec3(443.897, 441.423, 437.195));
  p += dot(p, p.yzx + 19.19);
  return fract((p.x + p.y) * p.z);
}

float vnoise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(mix(hash(i+vec3(0,0,0)),hash(i+vec3(1,0,0)),u.x),
        mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),u.x),u.y),
    mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),u.x),
        mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),u.x),u.y),
    u.z) * 2.0 - 1.0;
}

float fbm(vec3 p) {
  float v = 0.0, a = 0.55;
  mat3 rot = mat3(
     0.8660,  0.5000, 0.0,
    -0.5000,  0.8660, 0.0,
     0.0,     0.0,    1.0
  );
  for (int i = 0; i < 5; i++) {
    v += a * vnoise(p);
    p  = rot * p * 1.85;
    a *= 0.50;
  }
  return v;
}

float warpedFbm(vec3 p) {
  vec2 warp = vec2(
    fbm(p + vec3(1.7, 9.2, 3.5)),
    fbm(p + vec3(8.3, 2.8, 5.1))
  );
  return fbm(p + vec3(warp * 2.20, 0.0));
}

void main() {
  vUv = uv;

  float t = uTime * 0.050;

  // ── Polar coordinate transform ───────────────────────────────────────────────
  vec2  centered = vUv - 0.5;
  float r        = length(centered);
  float theta    = atan(centered.y, centered.x);

  // ── Spiral: angle offset increases with time (slow CW rotation) and
  //    decreases with radius — creates the "arms sweeping outward" look ─────────
  // uTime * 0.06 = ~1 full spiral revolution per ~105s → very slow
  float spiralOffset = uTime * 0.06 - r * 6.5;
  float twistedTheta = theta + spiralOffset;

  // Convert back to cartesian for noise sampling
  vec2 spiralUV = vec2(
    r * cos(twistedTheta),
    r * sin(twistedTheta)
  );

  // ── Mouse drag offset ────────────────────────────────────────────────────────
  vec2 drag = (uMousePos - uMouseLag) * 3.5;

  vec3 p = vec3(
    spiralUV.x * 2.6 + drag.x * uMousePower,
    spiralUV.y * 2.6 + drag.y * uMousePower,
    t
  );

  // ── Radial amplitude mask ────────────────────────────────────────────────────
  // Zero inside sphere, rises sharply at sphere edge (surface tension),
  // reaches max ~0.3 out, fades at screen edges
  float innerFade  = smoothstep(uSphereRadius, uSphereRadius + 0.06, r);
  float outerFade  = 1.0 - smoothstep(0.60, 0.72, r);
  // Surface tension: extra surge just outside sphere
  float tension    = smoothstep(uSphereRadius, uSphereRadius + 0.03, r)
                   * smoothstep(uSphereRadius + 0.18, uSphereRadius + 0.05, r)
                   * 0.35;

  float radialMask = innerFade * outerFade;

  float elev = warpedFbm(p) * 0.62 * radialMask + tension;

  vElevation = elev;

  // ── Normal via finite differences ────────────────────────────────────────────
  float eps = 0.012;

  // Recompute spiral UV for neighbour samples
  vec2 cL = (vUv + vec2(-eps, 0.0)) - 0.5;
  vec2 cR = (vUv + vec2( eps, 0.0)) - 0.5;
  vec2 cD = (vUv + vec2( 0.0, -eps)) - 0.5;
  vec2 cU = (vUv + vec2( 0.0,  eps)) - 0.5;

  float rL = length(cL); float tL = atan(cL.y,cL.x) + uTime*0.06 - rL*6.5;
  float rR = length(cR); float tR = atan(cR.y,cR.x) + uTime*0.06 - rR*6.5;
  float rD = length(cD); float tD = atan(cD.y,cD.x) + uTime*0.06 - rD*6.5;
  float rU = length(cU); float tU = atan(cU.y,cU.x) + uTime*0.06 - rU*6.5;

  float edgeL = smoothstep(uSphereRadius,uSphereRadius+0.06,rL)*(1.0-smoothstep(0.60,0.72,rL));
  float edgeR = smoothstep(uSphereRadius,uSphereRadius+0.06,rR)*(1.0-smoothstep(0.60,0.72,rR));
  float edgeD = smoothstep(uSphereRadius,uSphereRadius+0.06,rD)*(1.0-smoothstep(0.60,0.72,rD));
  float edgeU = smoothstep(uSphereRadius,uSphereRadius+0.06,rU)*(1.0-smoothstep(0.60,0.72,rU));

  float hL = warpedFbm(vec3(rL*cos(tL)*2.6+drag.x*uMousePower, rL*sin(tL)*2.6+drag.y*uMousePower, t)) * 0.62 * edgeL;
  float hR = warpedFbm(vec3(rR*cos(tR)*2.6+drag.x*uMousePower, rR*sin(tR)*2.6+drag.y*uMousePower, t)) * 0.62 * edgeR;
  float hD = warpedFbm(vec3(rD*cos(tD)*2.6+drag.x*uMousePower, rD*sin(tD)*2.6+drag.y*uMousePower, t)) * 0.62 * edgeD;
  float hU = warpedFbm(vec3(rU*cos(tU)*2.6+drag.x*uMousePower, rU*sin(tU)*2.6+drag.y*uMousePower, t)) * 0.62 * edgeU;

  vNormal = normalize(vec3(hL - hR, hD - hU, eps * 1.4));

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xy, elev, 1.0);
}
