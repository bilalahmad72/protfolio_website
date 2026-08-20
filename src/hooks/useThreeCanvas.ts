'use client';

import { useEffect, useRef, type RefObject } from 'react';
import * as THREE from 'three';

/** Live, per-frame inputs every scene can read without re-rendering React. */
export type SceneInputs = {
  /** Smoothed pointer position in the -1..1 range, origin at viewport centre. */
  pointer: { x: number; y: number };
  /** Raw (unsmoothed) pointer, same range. */
  pointerTarget: { x: number; y: number };
  /** Smoothed document scroll progress, 0 at the top, 1 at the bottom. */
  scroll: { value: number };
  /** Smoothed progress of the host element through the viewport, 0..1. */
  sectionProgress: { value: number };
  /** True when the user asked for reduced motion. */
  reducedMotion: boolean;
};

export type SceneHandle = {
  /** Called once per animation frame. */
  update: (elapsed: number, delta: number) => void;
  /** Called on mount and on every resize, with CSS pixel dimensions. */
  resize: (width: number, height: number) => void;
  /** Release every GPU resource the scene created. */
  dispose: () => void;
};

export type SceneFactory = (context: {
  renderer: THREE.WebGLRenderer;
  width: number;
  height: number;
  inputs: SceneInputs;
}) => SceneHandle;

export type UseThreeCanvasOptions = {
  /** Upper bound on the device pixel ratio. Lower means cheaper, softer. */
  maxPixelRatio?: number;
  antialias?: boolean;
  /** Skip creating the scene entirely (reduced motion, feature detection). */
  enabled?: boolean;
  reducedMotion?: boolean;
};

function supportsWebGL(): boolean {
  try {
    const probe = document.createElement('canvas');
    return Boolean(
      probe.getContext('webgl2') ??
        probe.getContext('webgl') ??
        probe.getContext('experimental-webgl'),
    );
  } catch {
    return false;
  }
}

/**
 * Owns the full lifecycle of a WebGL canvas: renderer creation, resize,
 * pointer/scroll smoothing, pausing when off-screen or backgrounded, and
 * teardown. The `factory` builds the scene and returns the three callbacks the
 * loop needs, so individual scenes stay pure rendering logic.
 *
 * `factory` must be a stable reference (declare it at module scope) — a new
 * identity tears the scene down and rebuilds it.
 */
export function useThreeCanvas(
  factory: SceneFactory,
  options: UseThreeCanvasOptions = {},
): RefObject<HTMLCanvasElement | null> {
  const {
    maxPixelRatio = 1.75,
    antialias = true,
    enabled = true,
    reducedMotion = false,
  } = options;

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!enabled || !canvas || !supportsWebGL()) return;

    const host = canvas.parentElement ?? canvas;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias,
        powerPreference: 'high-performance',
        // The page never reads pixels back, so let the driver discard them.
        preserveDrawingBuffer: false,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));

    const inputs: SceneInputs = {
      pointer: { x: 0, y: 0 },
      pointerTarget: { x: 0, y: 0 },
      scroll: { value: 0 },
      sectionProgress: { value: 0 },
      reducedMotion,
    };

    const initialRect = host.getBoundingClientRect();
    let width = Math.max(1, Math.round(initialRect.width));
    let height = Math.max(1, Math.round(initialRect.height));
    renderer.setSize(width, height, false);

    const scene = factory({ renderer, width, height, inputs });
    scene.resize(width, height);

    const applySize = () => {
      const rect = host.getBoundingClientRect();
      const nextWidth = Math.max(1, Math.round(rect.width));
      const nextHeight = Math.max(1, Math.round(rect.height));
      if (nextWidth === width && nextHeight === height) return;
      width = nextWidth;
      height = nextHeight;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxPixelRatio));
      renderer.setSize(width, height, false);
      scene.resize(width, height);
    };

    // Under reduced motion the scene is a still image, so it is only redrawn
    // when something structural changes.
    let needsRender = true;

    // Cached geometry so the render loop never forces a layout read.
    let hostTop = 0;
    let hostHeight = 0;
    let scrollable = 1;

    const measureDocument = () => {
      const rect = host.getBoundingClientRect();
      hostTop = rect.top + window.scrollY;
      hostHeight = rect.height;
      scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
    };

    const resizeObserver = new ResizeObserver(() => {
      applySize();
      measureDocument();
      needsRender = true;
    });
    resizeObserver.observe(host);
    // The host can move without resizing when content above it reflows.
    resizeObserver.observe(document.body);
    measureDocument();

    const onPointerMove = (event: PointerEvent) => {
      inputs.pointerTarget.x = (event.clientX / window.innerWidth) * 2 - 1;
      inputs.pointerTarget.y = -((event.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const readScroll = () => {
      const scrollY = window.scrollY;
      const pageProgress = Math.min(1, Math.max(0, scrollY / scrollable));

      // How far the host has travelled through the viewport, 0 just below the
      // fold to 1 once it has fully left the top.
      const viewportTop = hostTop - scrollY;
      const span = Math.max(1, hostHeight + window.innerHeight);
      const local = (window.innerHeight - viewportTop) / span;

      return { pageProgress, local: Math.min(1, Math.max(0, local)) };
    };

    const initialScroll = readScroll();
    inputs.scroll.value = initialScroll.pageProgress;
    inputs.sectionProgress.value = initialScroll.local;

    // `visible` gates the loop on the canvas actually being on screen.
    let visible = true;
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        visible = entries.some((entry) => entry.isIntersecting);
      },
      { rootMargin: '120px' },
    );
    intersectionObserver.observe(host);

    let contextLost = false;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
    };
    const onContextRestored = () => {
      contextLost = false;
    };
    canvas.addEventListener('webglcontextlost', onContextLost as EventListener);
    canvas.addEventListener('webglcontextrestored', onContextRestored);

    const clock = new THREE.Clock();
    let frame = 0;

    const tick = () => {
      frame = requestAnimationFrame(tick);
      const delta = Math.min(clock.getDelta(), 1 / 20);

      if (contextLost || document.hidden || !visible) return;
      if (reducedMotion && !needsRender) return;
      needsRender = false;

      const { pageProgress, local } = readScroll();
      // Exponential smoothing, frame-rate independent.
      const ease = 1 - Math.pow(0.001, delta);
      inputs.pointer.x += (inputs.pointerTarget.x - inputs.pointer.x) * ease;
      inputs.pointer.y += (inputs.pointerTarget.y - inputs.pointer.y) * ease;
      inputs.scroll.value += (pageProgress - inputs.scroll.value) * ease;
      inputs.sectionProgress.value += (local - inputs.sectionProgress.value) * ease;

      scene.update(clock.elapsedTime, delta);
    };

    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('webglcontextlost', onContextLost as EventListener);
      canvas.removeEventListener('webglcontextrestored', onContextRestored);
      scene.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, [antialias, enabled, factory, maxPixelRatio, reducedMotion]);

  return canvasRef;
}

/** Frees every geometry and material reachable from `root`. */
/**
 * Normal `over` compositing for the 3D layers.
 *
 * The canvas is created with `alpha: true`, so the browser treats its output as
 * premultiplied. Additive blending would be wrong twice over here: it saturates
 * the alpha channel until the compositor clamps a washed-out frame, and on a
 * white page adding light is invisible anyway. The scenes paint blue ink onto
 * paper instead, so they need ordinary source-over.
 *
 * Shader materials must premultiply their own output (`rgb * alpha`);
 * built-in materials get it from the `premultipliedAlpha` flag, which three
 * also reads when picking the factors for `NormalBlending`.
 */
export function applyInkBlending(material: THREE.Material) {
  material.premultipliedAlpha = true;
  material.blending = THREE.NormalBlending;
  material.needsUpdate = true;
  return material;
}

export function disposeObject(root: THREE.Object3D) {
  root.traverse((child) => {
    const mesh = child as Partial<THREE.Mesh>;
    mesh.geometry?.dispose();
    const material = mesh.material;
    if (Array.isArray(material)) {
      material.forEach((entry) => entry.dispose());
    } else {
      material?.dispose();
    }
  });
}
