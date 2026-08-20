'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  CheckCircle,
  Award,
  Clock,
  Briefcase,
  RefreshCw,
  Handshake,
  LucideIcon
} from 'lucide-react';
import { achievements } from '@/data/achievements';
import TiltCard from '@/components/motion/TiltCard';
import CountUp from '@/components/motion/CountUp';
import { staggerParent, tiltIn, viewportOnce } from '@/lib/motion';

const iconMap: Record<string, LucideIcon> = {
  'check-circle': CheckCircle,
  award: Award,
  clock: Clock,
  briefcase: Briefcase,
  'refresh-cw': RefreshCw,
  handshake: Handshake
};

export default function Achievements() {
  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-[#0B0F19]/40 py-20">
      <div className="pointer-events-none absolute top-[-50%] left-[20%] h-[30vw] w-[30vw] rounded-full bg-neon-cyan/5 blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-7"
          style={{ perspective: 1400 }}
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.iconName] || CheckCircle;
            return (
              <motion.div key={item.id} variants={tiltIn}>
                <TiltCard max={6} lift={14} className="h-full rounded-2xl">
                  <div className="glassmorphism group relative flex h-full flex-col items-center overflow-hidden rounded-2xl border border-white/5 p-6 text-center transition-colors duration-300 hover:border-neon-cyan/25">
                    <div className="absolute top-0 left-0 h-[2px] w-full bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-neon-cyan/15 bg-neon-cyan/5 text-neon-cyan transition-all duration-300 group-hover:rotate-6 group-hover:bg-neon-cyan/10">
                      <Icon size={20} />
                    </div>

                    <CountUp
                      value={item.value}
                      className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-2xl font-extrabold text-transparent tabular-nums transition-all duration-300 group-hover:from-neon-cyan group-hover:to-neon-indigo sm:text-3xl"
                    />

                    <div className="mt-2 text-xs font-medium leading-relaxed text-slate-400 sm:text-sm">
                      {item.label}
                    </div>
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
