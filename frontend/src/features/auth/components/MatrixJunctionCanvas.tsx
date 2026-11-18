import React, { useEffect, useRef } from 'react';

export const MatrixJunctionCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl', { alpha: true });
    } catch {
      return;
    }
    if (!gl) return;

    let animationFrameId: number;
    let mouseX = -1000;
    let mouseY = -1000;
    let lastMouseMove = 0;
    let currentMouseActive = 0.0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouseY = (rect.bottom - e.clientY) * (canvas.height / rect.height);
      lastMouseMove = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);

    const vsSource = `
      attribute vec4 aVertexPosition;
      void main() {
        gl_Position = aVertexPosition;
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_mouseActive;

      float hash(float n) { return fract(sin(n) * 753.5453123); }
      float noise(float x) {
        float i = floor(x);
        float f = fract(x);
        f = f * f * (3.0 - 2.0 * f);
        return mix(hash(i), hash(i + 1.0), f);
      }

      vec2 sdLine(vec2 p, vec2 a, vec2 b) {
        vec2 pa = p - a, ba = b - a;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        return vec2(length(pa - ba * h), h);
      }

      float lightning(vec2 uv, vec2 a, vec2 b, float t) {
        vec2 ab = b - a;
        float len = length(ab);
        if (len < 0.01) return 0.0;
        vec2 dir = ab / len;
        
        vec2 pa = uv - a;
        float h = clamp(dot(pa, dir) / len, 0.0, 1.0);
        float dist = length(pa - dir * (h * len));
        
        float env = sin(h * 3.14159265);
        
        float offset = (noise(h * 25.0 - t * 35.0) - 0.5) * 0.08 * env;
        offset += (noise(h * 70.0 + t * 50.0) - 0.5) * 0.02 * env;
        
        float d = abs(dist + offset);
        return (0.00035 / (d + 0.0002) + 0.000018 / (d * d + 0.00001)) * env;
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= u_resolution.x / u_resolution.y;

        vec2 mouseUV = u_mouse / u_resolution.xy;
        mouseUV = mouseUV * 2.0 - 1.0;
        mouseUV.x *= u_resolution.x / u_resolution.y;

        // Junction center point placed in the left half, projecting beams across the entire screen
        vec2 center = vec2(-0.75, -0.2);
        center.x += sin(u_time * 0.4) * 0.03;
        center.y += cos(u_time * 0.3) * 0.03;

        vec2 dirUp = normalize(vec2(0.18, 1.0));
        vec2 dirRight = normalize(vec2(1.0, -0.22));
        vec2 dirDownLeft = normalize(vec2(-0.8, -0.6));

        vec2 l1 = sdLine(uv, center, center + dirUp * 6.0);
        vec2 l2 = sdLine(uv, center, center + dirRight * 6.0);
        vec2 l3 = sdLine(uv, center, center + dirDownLeft * 6.0);

        float intensity = 0.012;
        float glow = intensity / (l1.x + 0.001) +
                     intensity / (l2.x + 0.001) +
                     (intensity * 0.6) / (l3.x + 0.001);

        float pulse1 = smoothstep(0.12, 0.0, abs(l1.y - fract(u_time * 0.4))) * 0.06 / (l1.x + 0.001);
        float pulse2 = smoothstep(0.12, 0.0, abs(l2.y - fract(u_time * 0.5 + 0.3))) * 0.06 / (l2.x + 0.001);
        float pulse3 = smoothstep(0.12, 0.0, abs(l3.y - fract(u_time * 0.3 + 0.7))) * 0.03 / (l3.x + 0.001);
        glow += pulse1 + pulse2 + pulse3;

        vec2 p1 = center + dirUp * clamp(dot(mouseUV - center, dirUp), 0.0, 6.0);
        vec2 p2 = center + dirRight * clamp(dot(mouseUV - center, dirRight), 0.0, 6.0);
        vec2 p3 = center + dirDownLeft * clamp(dot(mouseUV - center, dirDownLeft), 0.0, 6.0);
        
        float lgt1 = lightning(uv, p1, mouseUV, u_time);
        float lgt2 = lightning(uv, p2, mouseUV, u_time + 10.0);
        float lgt3 = lightning(uv, p3, mouseUV, u_time + 20.0);
        
        float flicker = step(0.1, noise(u_time * 60.0)) * (noise(u_time * 150.0) * 0.8 + 0.2);
        
        float d1 = length(mouseUV - p1);
        float d2 = length(mouseUV - p2);
        float d3 = length(mouseUV - p3);
        
        glow += lgt1 * smoothstep(2.5, 0.0, d1) * u_mouseActive * flicker;
        glow += lgt2 * smoothstep(2.5, 0.0, d2) * u_mouseActive * flicker;
        glow += lgt3 * smoothstep(2.5, 0.0, d3) * u_mouseActive * flicker;

        float distToCenter = length(uv - center);
        glow += 0.08 / (distToCenter + 0.015);

        vec3 baseColor = vec3(0.55, 0.8, 1.0);
        vec3 finalColor = baseColor * glow;

        finalColor *= 0.85 + 0.15 * sin(u_time * 2.0 - distToCenter * 8.0);

        float vignette = 1.0 - smoothstep(1.0, 2.5, length(uv));
        finalColor *= vignette;

        float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
        finalColor += n * 0.02;

        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    function createShader(glCtx: WebGLRenderingContext, type: number, source: string) {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, source);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const shaderProgram = gl.createProgram();
    if (!shaderProgram) return;

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    const programInfo = {
      program: shaderProgram,
      attribLocations: { vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition') },
      uniformLocations: {
        resolution: gl.getUniformLocation(shaderProgram, 'u_resolution'),
        time: gl.getUniformLocation(shaderProgram, 'u_time'),
        mouse: gl.getUniformLocation(shaderProgram, 'u_mouse'),
        mouseActive: gl.getUniformLocation(shaderProgram, 'u_mouseActive'),
      },
    };

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, -1.0]),
      gl.STATIC_DRAW
    );

    const startTime = Date.now();

    function resize() {
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targetW = Math.round(w * dpr);
      const targetH = Math.round(h * dpr);
      if (canvas.width !== targetW || canvas.height !== targetH) {
        canvas.width = targetW;
        canvas.height = targetH;
        gl?.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    window.addEventListener('resize', resize);
    resize();

    function render() {
      if (!gl || !canvas) return;
      resize();
      gl.useProgram(programInfo.program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
      gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

      let activeX = mouseX;
      let activeY = mouseY;
      const nowSec = (Date.now() - startTime) * 0.001;

      if (lastMouseMove === 0) {
        activeX = canvas.width * 0.35 + Math.cos(nowSec * 0.75) * (canvas.width * 0.15);
        activeY = canvas.height * 0.48 + Math.sin(nowSec * 0.95) * (canvas.height * 0.2);
        currentMouseActive = 0.85 + 0.15 * Math.sin(nowSec * 2.2);
      } else {
        const timeSinceMove = Date.now() - lastMouseMove;
        const targetActive =
          timeSinceMove < 250 ? 1.0 : Math.max(0.35, 1.0 - (timeSinceMove - 250) / 450.0);
        currentMouseActive += (targetActive - currentMouseActive) * 0.12;
      }

      gl.uniform2f(programInfo.uniformLocations.resolution, canvas.width, canvas.height);
      gl.uniform1f(programInfo.uniformLocations.time, nowSec);
      gl.uniform2f(programInfo.uniformLocations.mouse, activeX, activeY);
      gl.uniform1f(programInfo.uniformLocations.mouseActive, currentMouseActive);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    }

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block pointer-events-auto z-10"
      aria-hidden="true"
    />
  );
};
