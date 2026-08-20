'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Smartphone,
  GitBranch,
  Cloud,
  Flame,
  Layout,
  Database,
  Layers,
  Waves,
  Blocks,
  Share2,
  Zap,
  Webhook,
  MousePointer2,
  Rocket,
  Terminal,
  LucideIcon
} from 'lucide-react';
import { skills } from '@/data/skills';
import { techStack } from '@/data/techStack';
import { BrandIcon } from '@/components/icons/TechIcons';
import SectionHeading from '@/components/motion/SectionHeading';
import TiltCard from '@/components/motion/TiltCard';
import { staggerParent, tiltIn, viewportOnce } from '@/lib/motion';

const iconMap: Record<string, LucideIcon> = {
  phone: Smartphone,
  'git-branch': GitBranch,
  cloud: Cloud,
  flame: Flame,
  layout: Layout,
  database: Database
};

// Fallbacks for tools that have no published brand mark.
const genericIconMap: Record<string, LucideIcon> = {
  layers: Layers,
  waves: Waves,
  blocks: Blocks,
  share: Share2,
  zap: Zap,
  webhook: Webhook,
  pointer: MousePointer2,
  rocket: Rocket,
  terminal: Terminal
};

export default function Skills() {
  return (
    <section id="skills" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute top-[20%] left-[-10%] h-[30vw] w-[30vw] rounded-full bg-accent-strong/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="01 — Capabilities"
          title="The stack behind"
          accent="every ship"
          subtitle="The tools I use to deliver production-grade, high-performance cross-platform applications — chosen for the problem, not for the hype cycle."
          className="mb-16"
        />

        {/* The stack, grouped the way it gets used on a project. */}
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-16 space-y-8"
        >
          {techStack.map((category) => (
            <motion.div key={category.id} variants={tiltIn}>
              <h3 className="mb-4 font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-slate-500">
                {category.title}
              </h3>

              <ul className="flex flex-wrap gap-2.5">
                {category.items.map((item) => {
                  const Generic = item.lucide ? genericIconMap[item.lucide] : null;
                  return (
                    <li
                      key={item.name}
                      className="group/chip flex items-center gap-2 rounded-full border border-slate-200 bg-surface py-2 pr-4 pl-2.5 text-sm font-medium text-slate-700 transition-colors duration-200 hover:border-accent/40 hover:text-accent"
                    >
                      <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 transition-colors duration-200 group-hover/chip:bg-accent-100">
                        {item.brand ? (
                          <BrandIcon slug={item.brand} size={14} />
                        ) : Generic ? (
                          <Generic size={13} className="text-accent" />
                        ) : null}
                      </span>
                      {item.name}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
        >
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.iconName] || Smartphone;
            return (
              <motion.div key={skill.id} variants={tiltIn} className="h-full">
                <TiltCard max={8} lift={18} className="h-full rounded-2xl">
                  <div className="glassmorphism group relative flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 p-8 transition-colors duration-300 hover:border-accent/30">
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-accent via-accent-strong to-accent-deep opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Editorial index in the corner. */}
                    <span className="absolute top-6 right-7 font-mono text-xs text-slate-600 transition-colors duration-300 group-hover:text-accent/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-accent/15 bg-accent/5 text-accent shadow-[0_10px_30px_-12px_rgba(44,92,255,0.25)] transition-all duration-300 group-hover:scale-110 group-hover:border-accent/30 group-hover:bg-accent/10">
                      <Icon size={24} />
                    </div>

                    <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-accent">
                      {skill.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-slate-600">
                      {skill.description}
                    </p>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
