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

const iconMap: Record<string, LucideIcon> = {
  phone: Smartphone,
  'git-branch': GitBranch,
  cloud: Cloud,
  flame: Flame,
  layout: Layout,
  database: Database
};

export default function Skills() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 80, damping: 15 }
    }
  };

  return (
    <section id="skills" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[20%] left-[-10%] h-[30vw] w-[30vw] rounded-full bg-neon-indigo/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            My <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Skills</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            The stack I use to ship production-grade, high-performance cross-platform applications.
          </motion.p>
        </div>

        {/* Marquee Skills Ticker */}
        <div className="w-full overflow-hidden py-6 mb-16 border-y border-white/5 bg-[#0B0F19]/45 backdrop-blur-sm relative">
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#0B0F19] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#0B0F19] to-transparent z-10 pointer-events-none" />
          
          <div className="animate-marquee gap-8 items-center py-2 flex">
            {/* First sequence */}
            {marqueeSkills.concat(marqueeSkills).map((skill, index) => (
              <div 
                key={`${skill}-${index}`} 
                className="flex items-center gap-2 px-6 py-2 rounded-full border border-white/5 bg-white/5 text-sm font-semibold text-slate-300 shadow-[0_4px_12px_rgba(0,0,0,0.1)] whitespace-nowrap"
              >
                <div className="w-2 h-2 rounded-full bg-neon-cyan shadow-[0_0_8px_#00F2FE]" />
                {skill}
              </div>
            ))}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {skills.map((skill) => {
            const Icon = iconMap[skill.iconName] || Smartphone;
            return (
              <motion.div
                key={skill.id}
                variants={cardVariants}
                whileHover={{ 
                  y: -8, 
                  borderColor: 'rgba(0, 242, 254, 0.4)',
                  boxShadow: '0 10px 30px -15px rgba(0, 242, 254, 0.2)'
                }}
                className="glassmorphism p-8 rounded-2xl border border-white/5 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Glow Border Accent */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Card Icon wrapper */}
                <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-neon-cyan/5 border border-neon-cyan/15 group-hover:bg-neon-cyan/10 group-hover:border-neon-cyan/30 text-neon-cyan group-hover:scale-110 transition-all duration-300 mb-6 shadow-[0_0_15px_rgba(0,242,254,0.05)]">
                  <Icon size={24} />
                </div>

                <h3 className="text-xl font-bold text-slate-100 mb-3 group-hover:text-neon-cyan transition-colors">
                  {skill.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {skill.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
