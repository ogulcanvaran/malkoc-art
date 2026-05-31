// Fullscreen quad — vertex shader sadece UV geçirir, transform yok
varying vec2 vUv;

void main() {
  vUv = uv;
  // Clip space'e direkt yaz, kamera matrislerini bypass et
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
