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
  LucideIcon
} from 'lucide-react';
import { skills, marqueeSkills } from '@/data/skills';
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

export default function Skills() {
  return (
    <section id="skills" className="section-y relative overflow-hidden">
      <div className="pointer-events-none absolute top-[20%] left-[-10%] h-[30vw] w-[30vw] rounded-full bg-neon-indigo/5 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="01 — Capabilities"
          title="The stack behind"
          accent="every ship"
          subtitle="The tools I use to deliver production-grade, high-performance cross-platform applications — chosen for the problem, not for the hype cycle."
          className="mb-16"
        />

        {/* Continuous ticker of the wider toolchain. */}
        <div className="relative mb-16 w-full overflow-hidden border-y border-white/5 bg-[#0B0F19]/45 py-6 backdrop-blur-sm">
          <div className="pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B0F19] to-transparent" />
          <div className="pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-24 bg-gradient-to-l from-[#0B0F19] to-transparent" />

          <div className="animate-marquee flex items-center gap-8 py-2">
            {marqueeSkills.concat(marqueeSkills).map((skill, index) => (
              <div
                key={`${skill}-${index}`}
                className="flex items-center gap-2 whitespace-nowrap rounded-full border border-white/5 bg-white/5 px-6 py-2 text-sm font-semibold text-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
              >
                <div className="h-2 w-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00F2FE]" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1600 }}
        >
          {skills.map((skill, index) => {
            const Icon = iconMap[skill.iconName] || Smartphone;
            return (
              <motion.div key={skill.id} variants={tiltIn} className="h-full">
                <TiltCard max={8} lift={18} className="h-full rounded-2xl">
                  <div className="glassmorphism group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 p-8 transition-colors duration-300 hover:border-neon-cyan/30">
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Editorial index in the corner. */}
                    <span className="absolute top-6 right-7 font-mono text-xs text-slate-600 transition-colors duration-300 group-hover:text-neon-cyan/50">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 text-neon-cyan shadow-[0_0_15px_rgba(0,242,254,0.05)] transition-all duration-300 group-hover:scale-110 group-hover:border-neon-cyan/30 group-hover:bg-neon-cyan/10">
                      <Icon size={24} />
                    </div>

                    <h3 className="mb-3 text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-neon-cyan">
                      {skill.title}
                    </h3>
                    <p className="text-pretty text-sm leading-relaxed text-slate-400">
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
