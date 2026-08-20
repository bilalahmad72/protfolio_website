'use client';

import React from 'react';
import * as THREE from 'three';
import { simplexNoise3D } from '@/lib/glsl';
import { applyInkBlending, disposeObject, useThreeCanvas, type SceneFactory } from '@/hooks/useThreeCanvas';
import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

const coreVertexShader = /* glsl */ `
uniform float uTime;
uniform float uAmplitude;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisplacement;

${simplexNoise3D}

void main() {
  // Two octaves of noise: a slow swell plus a faster ripple over the surface.
  float swell = snoise(position * 0.55 + vec3(0.0, 0.0, uTime * 0.16));
  float ripple = snoise(position * 1.9 + vec3(uTime * 0.28, 0.0, 0.0)) * 0.35;
  float displacement = (swell + ripple) * uAmplitude;

  vec3 displaced = position + normal * displacement;
  vec4 mvPosition = modelViewMatrix * vec4(displaced, 1.0);

  vNormal = normalize(normalMatrix * normal);
  vViewDir = normalize(-mvPosition.xyz);
  vDisplacement = swell;

  gl_Position = projectionMatrix * mvPosition;
}
`;

const coreFragmentShader = /* glsl */ `
uniform vec3 uColorA;
uniform vec3 uColorB;
uniform vec3 uRimColor;
uniform float uOpacity;

varying vec3 vNormal;
varying vec3 vViewDir;
varying float vDisplacement;

void main() {
  // Rim light: bright where the surface turns away from the camera.
  float rim = pow(1.0 - clamp(dot(vViewDir, normalize(vNormal)), 0.0, 1.0), 3.4);

  vec3 body = mix(uColorA, uColorB, clamp(vDisplacement * 0.5 + 0.5, 0.0, 1.0));
  vec3 color = body * 0.14 + uRimColor * rim * 0.55;

  // Only the rim is meaningfully opaque, which keeps the core reading as glass.
  float alpha = clamp(rim * 0.45 + 0.015, 0.0, 1.0) * uOpacity;

  gl_FragColor = vec4(color, alpha);

  #include <colorspace_fragment>

  // Premultiply last, mirroring three's chunk order for built-in
  // materials: the transfer function applies to straight colour.
  gl_FragColor.rgb *= gl_FragColor.a;
}
`;

const haloVertexShader = /* glsl */ `
attribute float aScale;
attribute float aOrbit;
attribute float aPhase;

uniform float uTime;
uniform float uPixelRatio;

varying float vFade;
varying vec3 vColor;

uniform vec3 uColorA;
uniform vec3 uColorB;

void main() {
  // Each mote keeps its own orbital speed, so the halo never looks rigid.
  float angle = aPhase * 6.2831853 + uTime * aOrbit;
  float radius = length(position.xz);

  vec3 orbited = vec3(cos(angle) * radius, position.y, sin(angle) * radius);
  orbited.y += sin(uTime * 0.6 + aPhase * 9.0) * 0.18;

  vec4 mvPosition = modelViewMatrix * vec4(orbited, 1.0);
  float distance = -mvPosition.z;

  vFade = (0.18 + 0.42 * (0.5 + 0.5 * sin(uTime * 1.4 + aPhase * 12.0)));
  vColor = mix(uColorA, uColorB, aPhase);

  gl_PointSize = aScale * uPixelRatio * (30.0 / max(distance, 0.6));
  gl_Position = projectionMatrix * mvPosition;
}
`;

const haloFragmentShader = /* glsl */ `
varying float vFade;
varying vec3 vColor;

void main() {
  vec2 offset = gl_PointCoord - 0.5;
  float radius = length(offset);
  if (radius > 0.5) discard;

  float core = pow(smoothstep(0.5, 0.0, radius), 2.0);

  float alpha = core * vFade;
  gl_FragColor = vec4(vColor, alpha);

  #include <colorspace_fragment>

  // Premultiply last, mirroring three's chunk order for built-in
  // materials: the transfer function applies to straight colour.
  gl_FragColor.rgb *= gl_FragColor.a;
}
`;

const CAMERA_Z = 9;

const createScene: SceneFactory = ({ renderer, width, height, inputs }) => {
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, CAMERA_Z);

  const rig = new THREE.Group();
  scene.add(rig);

  const colorA = new THREE.Color('#2C5CFF');
  const colorB = new THREE.Color('#6B90FF');
  const rimColor = new THREE.Color('#A9C0FF');

  /* ------------------------------------------------------------ the core */
  const coreGeometry = new THREE.IcosahedronGeometry(1.35, 20);
  const coreMaterial = new THREE.ShaderMaterial({
    vertexShader: coreVertexShader,
    fragmentShader: coreFragmentShader,
    transparent: true,
    depthWrite: false,
    side: THREE.FrontSide,
    uniforms: {
      uTime: { value: 0 },
      uAmplitude: { value: 0.22 },
      uOpacity: { value: 1 },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
      uRimColor: { value: rimColor },
    },
  });
  applyInkBlending(coreMaterial);

  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  rig.add(core);

  /* -------------------------------------------------- counter-rotating shell */
  const shellGeometry = new THREE.IcosahedronGeometry(1.95, 1);
  const shellMaterial = new THREE.MeshBasicMaterial({
    color: colorA,
    wireframe: true,
    transparent: true,
    opacity: 0.09,
    depthWrite: false,
  });
  applyInkBlending(shellMaterial);

  const shell = new THREE.Mesh(shellGeometry, shellMaterial);
  rig.add(shell);

  /* ----------------------------------------------------------- orbit rings */
  const rings = new THREE.Group();
  const ringSpecs: Array<{ radius: number; tilt: [number, number]; color: THREE.Color }> = [
    { radius: 2.15, tilt: [Math.PI / 2.1, 0.2], color: colorA },
    { radius: 2.6, tilt: [Math.PI / 2.6, -0.5], color: colorB },
  ];

  for (const spec of ringSpecs) {
    const geometry = new THREE.TorusGeometry(spec.radius, 0.006, 8, 220);
    const material = new THREE.MeshBasicMaterial({
      color: spec.color,
      transparent: true,
      opacity: 0.26,
      depthWrite: false,
      });
    applyInkBlending(material);
    const ring = new THREE.Mesh(geometry, material);
    ring.rotation.set(spec.tilt[0], spec.tilt[1], 0);
    rings.add(ring);
  }
  rig.add(rings);

  /* ------------------------------------------------------------ halo motes */
  const haloCount = width < 768 ? 260 : 620;
  const haloPositions = new Float32Array(haloCount * 3);
  const haloScales = new Float32Array(haloCount);
  const haloOrbits = new Float32Array(haloCount);
  const haloPhases = new Float32Array(haloCount);

  for (let i = 0; i < haloCount; i += 1) {
    const radius = 1.7 + Math.random() * 1.5;
    const angle = Math.random() * Math.PI * 2;
    haloPositions[i * 3] = Math.cos(angle) * radius;
    haloPositions[i * 3 + 1] = (Math.random() * 2 - 1) * 1.6;
    haloPositions[i * 3 + 2] = Math.sin(angle) * radius;

    haloScales[i] = 0.6 + Math.random() * 1.6;
    // Mixed signs so the two shells of motes counter-rotate.
    haloOrbits[i] = (Math.random() < 0.5 ? -1 : 1) * (0.08 + Math.random() * 0.22);
    haloPhases[i] = Math.random();
  }

  const haloGeometry = new THREE.BufferGeometry();
  haloGeometry.setAttribute('position', new THREE.BufferAttribute(haloPositions, 3));
  haloGeometry.setAttribute('aScale', new THREE.BufferAttribute(haloScales, 1));
  haloGeometry.setAttribute('aOrbit', new THREE.BufferAttribute(haloOrbits, 1));
  haloGeometry.setAttribute('aPhase', new THREE.BufferAttribute(haloPhases, 1));

  const haloMaterial = new THREE.ShaderMaterial({
    vertexShader: haloVertexShader,
    fragmentShader: haloFragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uPixelRatio: { value: renderer.getPixelRatio() },
      uColorA: { value: colorA },
      uColorB: { value: colorB },
    },
  });
  applyInkBlending(haloMaterial);


  const halo = new THREE.Points(haloGeometry, haloMaterial);
  halo.frustumCulled = false;
  rig.add(halo);

  const basePosition = new THREE.Vector3();

  /**
   * Anchors the rig behind the portrait — the left column on desktop, above the
   * copy once the layout stacks — and keeps it in frame on short viewports.
   */
  const fitRig = (nextWidth: number, nextHeight: number) => {
    const shortest = Math.min(nextWidth, nextHeight);
    rig.scale.setScalar(THREE.MathUtils.clamp(shortest / 780, 0.5, 1.05));

    const visibleHeight = 2 * Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2) * CAMERA_Z;
    const visibleWidth = visibleHeight * (nextWidth / nextHeight);
    const isDesktop = nextWidth >= 1024;

    basePosition.set(
      isDesktop ? -0.44 * (visibleWidth / 2) : 0,
      isDesktop ? 0 : 0.36 * (visibleHeight / 2),
      0,
    );
    rig.position.copy(basePosition);
  };

  fitRig(width, height);

  return {
    update(elapsed, delta) {
      const { pointer, sectionProgress, reducedMotion } = inputs;
      const time = reducedMotion ? 0 : elapsed;

      coreMaterial.uniforms.uTime.value = time;
      haloMaterial.uniforms.uTime.value = time;

      if (!reducedMotion) {
        core.rotation.y += delta * 0.12;
        core.rotation.x += delta * 0.045;
        shell.rotation.y -= delta * 0.08;
        shell.rotation.z += delta * 0.03;
        rings.rotation.y += delta * 0.05;
        rings.rotation.x = Math.sin(elapsed * 0.18) * 0.12;
      }

      // The rig leans toward the pointer instead of tracking it exactly, which
      // keeps the motion cinematic rather than twitchy.
      const targetX = pointer.y * 0.22;
      const targetY = pointer.x * 0.35;
      rig.rotation.x += (targetX - rig.rotation.x) * Math.min(1, delta * 2.4);
      rig.rotation.y += (targetY - rig.rotation.y) * Math.min(1, delta * 2.4);

      // Drift the rig away as the hero scrolls out of frame.
      const exit = THREE.MathUtils.clamp((sectionProgress.value - 0.5) * 2.4, 0, 1);
      rig.position.set(basePosition.x, basePosition.y + exit * 1.6, basePosition.z);
      coreMaterial.uniforms.uOpacity.value = 1 - exit * 0.85;
      camera.position.z = CAMERA_Z + exit * 2.5;

      renderer.render(scene, camera);
    },
    resize(nextWidth, nextHeight) {
      camera.aspect = nextWidth / nextHeight;
      camera.updateProjectionMatrix();
      haloMaterial.uniforms.uPixelRatio.value = renderer.getPixelRatio();
      fitRig(nextWidth, nextHeight);
    },
    dispose() {
      disposeObject(scene);
      scene.clear();
    },
  };
};

/**
 * The hero's focal 3D element: a noise-displaced glass core wrapped in a
 * counter-rotating wireframe shell, orbit rings and a halo of drifting motes.
 */
export default function HeroScene({ className = '' }: { className?: string }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const canvasRef = useThreeCanvas(createScene, {
    maxPixelRatio: 1.75,
    antialias: true,
    reducedMotion: prefersReducedMotion,
  });

  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
