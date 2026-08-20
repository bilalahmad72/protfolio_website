import type { Transition, Variants } from 'framer-motion';

/** Expo-out. The house curve: fast commit, long graceful settle. */
export const EASE_CINEMATIC = [0.16, 1, 0.3, 1] as const;
/** Gentler counterpart for hovers and small state changes. */
export const EASE_SOFT = [0.22, 0.61, 0.36, 1] as const;
/** Symmetric in-out for elements that both enter and leave. */
export const EASE_DRAMATIC = [0.83, 0, 0.17, 1] as const;

export const transitions = {
  entrance: { duration: 0.9, ease: EASE_CINEMATIC } satisfies Transition,
  quick: { duration: 0.45, ease: EASE_SOFT } satisfies Transition,
  spring: { type: 'spring', stiffness: 120, damping: 20, mass: 0.9 } satisfies Transition,
};

/** Parent that releases its children in sequence. */
export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  visible: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

/** Standard child: rises, sharpens and fades in together. */
export const riseIn: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: transitions.entrance,
  },
};

/** Child that also swings in on the X axis for a shallow 3D entrance. */
export const tiltIn: Variants = {
  hidden: { opacity: 0, y: 36, rotateX: -12, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    filter: 'blur(0px)',
    transition: transitions.entrance,
  },
};

/** Shared viewport config so every section triggers at the same point. */
export const viewportOnce = { once: true, amount: 0.25 } as const;
