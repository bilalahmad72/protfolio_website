'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, MouseIcon } from 'lucide-react';
import HeroSceneLayer from '@/components/three/HeroSceneLayer';
import TextReveal from '@/components/motion/TextReveal';
import Reveal from '@/components/motion/Reveal';
import MagneticButton from '@/components/motion/MagneticButton';
import { EASE_CINEMATIC, riseIn, staggerParent } from '@/lib/motion';

const HERO_STACK = ['Flutter', 'Dart', 'Riverpod', 'BLoC', 'GraphQL', 'PostgreSQL'];

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);

  // Everything in the hero drifts at a slightly different rate as it leaves,
  // which is what sells the depth between the 3D layer and the content.
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const portraitScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden pb-24 pt-28"
    >
      {/* The WebGL core sits between the page background and the content. */}
      <HeroSceneLayer className="z-0 opacity-70 [mask-image:radial-gradient(65%_65%_at_50%_45%,#000_35%,transparent_100%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          style={{ y: contentY, opacity: contentOpacity }}
          variants={staggerParent(0.1, 0.15)}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-10"
        >
          {/* -------------------------------------------------------- portrait */}
          <motion.div
            variants={riseIn}
            style={{ y: portraitY, scale: portraitScale }}
            className="order-first flex justify-center lg:order-none lg:col-span-5"
          >
            <div className="relative h-64 w-64 sm:h-80 sm:w-80 md:h-[22rem] md:w-[22rem]">
              {/* Concentric rings, each on its own axis and period. */}
              <div className="absolute inset-[-26px] rounded-full border border-dashed border-accent/20 animate-[spin_50s_linear_infinite]" />
              <div className="absolute inset-[-14px] rounded-full border border-accent-deep/25 animate-[spin_32s_linear_infinite_reverse]" />
              <div className="absolute inset-[-14px] rounded-full border-t-2 border-accent/70 animate-[spin_9s_linear_infinite]" />
              <div className="absolute inset-[-8%] rounded-full bg-[radial-gradient(circle,var(--color-accent-200)_0%,transparent_70%)] opacity-70" />

              <div className="absolute inset-0 overflow-hidden rounded-full border border-slate-200 bg-surface/85 p-2 shadow-[0_30px_80px_-30px_rgba(44,92,255,0.20)]">
                <div className="relative h-full w-full overflow-hidden rounded-full">
                  {/*
                    This is the LCP element, and `output: 'export'` forces
                    images.unoptimized — next/image would ship the source file
                    at whatever size it happens to be. A plain <picture> lets the
                    browser take the 29 KB WebP and fall back to JPEG, instead of
                    the 690 KB original this replaced.
                  */}
                  <picture>
                    <source srcSet="/images/profile.webp" type="image/webp" />
                    <img
                      src="/images/profile.jpg"
                      alt="Bilal Ahmad, Flutter Developer"
                      width={800}
                      height={800}
                      fetchPriority="high"
                      decoding="async"
                      className="absolute inset-0 h-full w-full scale-105 object-cover saturate-[0.88] contrast-[1.04] transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-110"
                    />
                  </picture>
                  {/* Cool grade over the portrait so it belongs to the scene. */}
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-deep/25 via-transparent to-accent/10" />
                  <div className="pointer-events-none absolute inset-0 rounded-full shadow-[inset_0_0_50px_16px_rgba(255,255,255,0.35)]" />
                </div>
              </div>

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                className="glassmorphism absolute bottom-8 -left-5 flex items-center gap-2 rounded-xl border border-accent/25 px-3 py-1.5 sm:-left-8 sm:px-4 sm:py-2"
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
                </span>
                <span className="text-xs font-semibold text-accent">Flutter Developer</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="glassmorphism absolute -top-3 -right-5 flex items-center gap-2 rounded-xl border border-accent-deep/25 px-3 py-1.5 sm:-top-2 sm:-right-10 sm:px-4 sm:py-2"
              >
                <Code2 size={14} className="text-accent-deep" />
                <span className="text-xs font-semibold text-accent-deep">Flutter Expert</span>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
                className="glassmorphism absolute -bottom-5 right-2 flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-1.5 sm:-bottom-6 sm:right-6 sm:px-4 sm:py-2"
              >
                <Sparkles size={14} className="text-accent" />
                <span className="text-xs font-semibold text-slate-800">4+ Years</span>
              </motion.div>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------ copy */}
          <div className="space-y-7 text-center lg:col-span-7 lg:text-left">
            <motion.div variants={riseIn} className="flex justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 font-mono text-[11px] uppercase tracking-[0.24em] text-accent">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Available for new projects
              </span>
            </motion.div>

            <div className="space-y-2">
              <TextReveal
                as="h1"
                text="Hi, I am Bilal Ahmad — Flutter Developer"
                delay={0.3}
                className="text-4xl font-extrabold leading-[1.08] tracking-[-0.03em] sm:text-5xl md:text-6xl lg:text-[4.25rem]"
                highlight={['Bilal', 'Ahmad']}
                highlightClassName="gradient-text"
              />
              <TextReveal
                as="p"
                text="I build production-grade Flutter apps."
                delay={0.65}
                stagger={0.04}
                className="text-xl font-semibold text-slate-700 sm:text-2xl"
              />
            </div>

            <Reveal delay={0.95} blur={0} distance={20}>
              <p className="mx-auto max-w-2xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg lg:mx-0">
                Flutter Developer with{' '}
                <span className="text-accent">4+ years</span> building production mobile apps. I
                specialize in <span className="text-accent">Clean Architecture</span>,{' '}
                <span className="text-accent">REST &amp; GraphQL API</span> integration, and custom
                Flutter animations that make UIs feel alive. Comfortable across{' '}
                <span className="text-accent-deep">Riverpod, BLoC, and Provider</span> — and
                increasingly exploring{' '}
                <span className="text-accent">vibe coding</span>{' '}
                with Claude Code, Codex, Antigravity &amp; Cursor to ship faster without losing
                code quality.
              </p>
            </Reveal>

            <Reveal delay={1.05} blur={0} distance={16}>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {HERO_STACK.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 font-mono text-[11px] tracking-wide text-slate-600 transition-colors duration-300 hover:border-accent/30 hover:text-accent"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </Reveal>

            <Reveal delay={1.15} blur={0} distance={18}>
              <div className="flex flex-col items-center gap-4 pt-2 sm:flex-row lg:justify-start">
                <MagneticButton
                  onClick={() => handleScrollTo('#contact')}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-accent-fill via-accent-fill-strong to-[#10267A] px-8 py-4 font-semibold text-white shadow-[0_18px_40px_-18px_rgba(44,92,255,0.41)] transition-shadow duration-300 hover:shadow-[0_22px_60px_-16px_rgba(44,92,255,0.38)] sm:w-auto"
                >
                  <span className="pointer-events-none absolute inset-0 shimmer-sweep opacity-60" />
                  <span className="relative flex items-center justify-center gap-2">
                    Get in Touch
                    <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </MagneticButton>

                <MagneticButton
                  onClick={() => handleScrollTo('#projects')}
                  strength={10}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-8 py-4 font-semibold text-slate-800 transition-all duration-300 hover:border-accent/50 hover:bg-accent/5 hover:text-accent sm:w-auto"
                >
                  View Work
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </motion.div>
      </div>

      {/* --------------------------------------------------------- scroll cue */}
      <motion.button
        type="button"
        onClick={() => handleScrollTo('#skills')}
        aria-label="Scroll to content"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1, ease: EASE_CINEMATIC }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-slate-500 transition-colors hover:text-accent md:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <MouseIcon size={18} className="animate-scroll-hint" />
      </motion.button>
    </section>
  );
}
