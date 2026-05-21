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

const iconMap: Record<string, LucideIcon> = {
  'check-circle': CheckCircle,
  award: Award,
  clock: Clock,
  briefcase: Briefcase,
  'refresh-cw': RefreshCw,
  handshake: Handshake
};

export default function Achievements() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <section className="py-16 relative overflow-hidden bg-[#0B0F19]/40 border-y border-white/5">
      {/* Decorative glows */}
      <div className="absolute top-[-50%] left-[20%] h-[30vw] w-[30vw] rounded-full bg-neon-cyan/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {achievements.map((item) => {
            const Icon = iconMap[item.iconName] || CheckCircle;
            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ y: -5, scale: 1.02 }}
                className="glassmorphism p-6 rounded-2xl border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 text-center flex flex-col items-center group relative overflow-hidden"
              >
                {/* Micro accent */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Icon Wrap */}
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-neon-cyan/5 border border-neon-cyan/15 group-hover:bg-neon-cyan/10 text-neon-cyan mb-4 group-hover:rotate-6 transition-all duration-300">
                  <Icon size={20} />
                </div>

                <div className="text-2xl sm:text-3xl font-extrabold text-slate-100 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent group-hover:from-neon-cyan group-hover:to-neon-indigo transition-all duration-300">
                  {item.value}
                </div>

                <div className="text-xs sm:text-sm text-slate-400 font-medium mt-2 leading-relaxed">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}