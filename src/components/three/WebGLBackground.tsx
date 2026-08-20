'use client';

import React from 'react';
import * as THREE from 'three';
import { applyInkBlending, disposeObject, useThreeCanvas, type SceneFactory } from '@/hooks/useThreeCanvas';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const DUST_DEPTH = 70;
const DUST_SPREAD_X = 34;
const DUST_SPREAD_Y = 22;

const PALETTE = [
  new THREE.Color('#2C5CFF'),
  new THREE.Color('#6B90FF'),
  new THREE.Color('#A9C0FF'),
  new THREE.Color('#94A0B4'),
];

const dustVertexShader = /* glsl */ `
attribute float aScale;
attribute float aSpeed;
attribute float aPhase;
attribute vec3 aColor;

uniform float uTime;
uniform float uPixelRatio;
uniform float uSize;
uniform float uDepth;

varying vec3 vColor;
varying float vFade;

void main() {
  vec3 transformed = position;

  // Drift the field toward the camera and wrap it, so the dust never runs out.
  transformed.z = mod(transformed.z + uTime * aSpeed + uDepth, uDepth) - uDepth;
  transformed.x += sin(uTime * 0.12 * aSpeed + aPhase) * 0.9;
  transformed.y += cos(uTime * 0.10 * aSpeed + aPhase * 1.7) * 0.9;

  vec4 mvPosition = modelViewMatrix * vec4(transformed, 1.0);
  float distance = -mvPosition.z;

  // Fade in from the far plane, fade out just before crossing the lens.
  vFade = smoothstep(0.0, 10.0, distance) * (1.0 - smoothstep(uDepth * 0.55, uDepth * 0.95, distance));
  vFade *= 0.45 + 0.55 * (0.5 + 0.5 * sin(uTime * 0.9 * aSpeed + aPhase * 6.2831));

  gl_PointSize = uSize * aScale * uPixelRatio * (26.0 / max(distance, 0.6));
  gl_Position = projectionMatrix * mvPosition;
  vColor = aColor;
}
`;

const dustFragmentShader = /* glsl */ `
varying vec3 vColor;
varying float vFade;

void main() {
  vec2 offset = gl_PointCoord - 0.5;
  float radius = length(offset);
  if (radius > 0.5) discard;

  // Soft core with a wide falloff reads as bokeh rather than a hard dot.
  float core = pow(smoothstep(0.5, 0.0, radius), 2.4);

  float alpha = core * vFade;
  gl_FragColor = vec4(vColor, alpha);

  #include <colorspace_fragment>

  // Premultiply last, mirroring three's chunk order for built-in
  // materials: the transfer function applies to straight colour.
  gl_FragColor.rgb *= gl_FragColor.a;
}
`;

const gridVertexShader = /* glsl */ `
varying vec2 vGridUv;
varying float vDepth;

void main() {
  vGridUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
  vDepth = -mvPosition.z;
  gl_Position = projectionMatrix * mvPosition;
}
`;

const gridFragmentShader = /* glsl */ `
uniform float uTime;
uniform float uScroll;
uniform vec3 uNearColor;
uniform vec3 uFarColor;
uniform float uDivisions;

varying vec2 vGridUv;
varying float vDepth;

// Screen-space anti-aliased grid: derivative width keeps lines one pixel wide
// no matter how steeply the plane is foreshortened.
float gridMask(vec2 uv, float divisions) {
  vec2 coord = uv * divisions;
  vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  return 1.0 - min(min(grid.x, grid.y), 1.0);
}

void main() {
  // Scroll the grid along its depth axis so the horizon feels like travel.
  vec2 uv = vec2(vGridUv.x, vGridUv.y + uTime * 0.012 + uScroll * 0.5);

  float lines = gridMask(uv, uDivisions);
  float fine = gridMask(uv, uDivisions * 4.0) * 0.25;

  // Fade toward the horizon and toward the outer edges of the plane.
  float horizon = 1.0 - smoothstep(0.05, 0.75, vGridUv.y);
  float edges = smoothstep(0.0, 0.28, vGridUv.x) * (1.0 - smoothstep(0.72, 1.0, vGridUv.x));
  float distanceFade = 1.0 - smoothstep(18.0, 90.0, vDepth);

  // A slow pulse of light travelling away from the viewer.
  float sweep = smoothstep(0.35, 0.0, abs(fract(vGridUv.y * 1.2 - uTime * 0.05) - 0.5));

  float strength = (lines + fine) * horizon * edges * distanceFade;
  vec3 color = mix(uFarColor, uNearColor, horizon);

  float alpha = strength * (0.28 + sweep * 0.45);
  gl_FragColor = vec4(color, alpha);

  #include <colorspace_fragment>

  // Premultiply last, mirroring three's chunk order for built-in
  // materials: the transfer function applies to straight colour.
  gl_FragColor.rgb *= gl_FragColor.a;
}
`;

const createScene: SceneFactory = ({ renderer, width, height, inputs }) => {
  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0f19, 0.014);

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
  camera.position.set(0, 0, 10);

  /* ---------------------------------------------------------------- dust */
  const count = width < 768 ? 1200 : 2600;
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);
  const phases = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    positions[i * 3] = (Math.random() * 2 - 1) * DUST_SPREAD_X;
    positions[i * 3 + 1] = (Math.random() * 2 - 1) * DUST_SPREAD_Y;
    positions[i * 3 + 2] = -Math.random() * DUST_DEPTH;

    const color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
    colors[i * 3] = color.r;
    colors[i * 3 + 1] = color.g;
    colors[i * 3 + 2] = color.b;

    // A few large motes carry the parallax; the rest stay as fine grain.
    scales[i] = Math.random() < 0.08 ? 1.6 + Math.random() * 1.4 : 0.35 + Math.random() * 0.6;
    speeds[i] = 0.35 + Math.random() * 1.1;
    phases[i] = Math.random();
  }

  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  dustGeometry.setAttribute('aColor', new THREE.BufferAttribute(colors, 3));
  dustGeometry.setAttribute('aScale', new THREE.BufferAttribute(scales, 1));
  dustGeometry.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1));
  dustGeometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1));

  const dustMaterial = new THREE.ShaderMaterial({
    vertexShader: dustVertexShader,
    fragmentShader: dustFragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 5.5 },
      uDepth: { value: DUST_DEPTH },
      uPixelRatio: { value: renderer.getPixelRatio() },
    },
  });
  applyInkBlending(dustMaterial);

  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.frustumCulled = false;
  scene.add(dust);

  /* ---------------------------------------------------------- grid floor */
  const gridGeometry = new THREE.PlaneGeometry(180, 180, 1, 1);
  const gridMaterial = new THREE.ShaderMaterial({
    vertexShader: gridVertexShader,
    fragmentShader: gridFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uDivisions: { value: 44 },
      uNearColor: { value: new THREE.Color('#2C5CFF') },
      uFarColor: { value: new THREE.Color('#A9C0FF') },
    },
  });
  applyInkBlending(gridMaterial);

  const grid = new THREE.Mesh(gridGeometry, gridMaterial);
  grid.rotation.x = -Math.PI / 2;
  grid.position.set(0, -13, -60);
  scene.add(grid);

  const target = new THREE.Vector3(0, 0, -24);

  return {
    update(elapsed) {
      const { pointer, scroll, reducedMotion } = inputs;

      dustMaterial.uniforms.uTime.value = reducedMotion ? 0 : elapsed;
      gridMaterial.uniforms.uTime.value = reducedMotion ? 0 : elapsed;
      gridMaterial.uniforms.uScroll.value = scroll.value;

      // Scrolling dollies the camera through the dust; the pointer only ever
      // nudges it, so the parallax never fights the page.
      camera.position.x = pointer.x * 1.6;
      camera.position.y = pointer.y * 1.0 + scroll.value * 1.5;
      camera.position.z = 10 - scroll.value * 16;
      camera.lookAt(target);

      renderer.render(scene, camera);
    },
    resize(nextWidth, nextHeight) {
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      dustMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
    },
    dispose() {
      disposeObject(scene);
      scene.clear();
    },
  };
};

/**
 * Fixed, full-viewport WebGL layer that sits behind the whole page: a drifting
 * volumetric dust field plus a perspective grid horizon, both reacting to
 * scroll and pointer.
 */
export default function WebGLBackground() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useThreeCanvas(createScene, {
    maxPixelRatio: 1.5,
    antialias: false,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-40 opacity-70 [mask-image:radial-gradient(120%_100%_at_50%_35%,#000_45%,transparent_100%)]"
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
