'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, Calendar } from 'lucide-react';
import { experiences } from '@/data/experience';

export default function Experience() {
  return (
    <section id="experience" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[30%] left-[-15%] h-[40vw] w-[40vw] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Work <span className="bg-gradient-to-r from-neon-cyan to-neon-indigo bg-clip-text text-transparent glow-text-cyan">Experience</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            My professional journey as a Flutter Developer and Frontend Engineer.
          </motion.p>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-12 space-y-16 py-4">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-150px' }}
              transition={{ type: 'spring', stiffness: 50, delay: index * 0.1 }}
              className="relative"
            >
              {/* Timeline Indicator Node */}
              <div className="absolute -left-[41px] md:-left-[57px] top-1.5 w-6 h-6 rounded-full border-2 border-neon-cyan bg-[#0B0F19] flex items-center justify-center shadow-[0_0_12px_#00F2FE] z-10">
                <div className="w-2 h-2 rounded-full bg-neon-cyan animate-ping" />
              </div>

              {/* Side Date (Desktop Only) */}
              <div className="hidden md:block absolute -left-44 top-1.5 w-32 text-right">
                <span className="text-sm font-semibold text-slate-400 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full whitespace-nowrap inline-flex items-center gap-1.5">
                  <Calendar size={12} className="text-neon-cyan" />
                  {exp.duration.split(' - ')[0]}
                </span>
              </div>

              {/* Experience Card */}
              <div className="glassmorphism p-8 rounded-2xl border border-white/5 hover:border-neon-cyan/20 transition-all duration-300 relative group">
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-cyan to-neon-indigo opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Timeline Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors">
                      {exp.role}
                    </h3>
                    <p className="text-neon-purple font-semibold text-sm tracking-wide mt-1">
                      {exp.company}
                    </p>
                  </div>
                  {/* Date (Mobile Only) */}
                  <div className="md:hidden inline-flex items-center gap-1.5 self-start bg-white/5 border border-white/5 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-400">
                    <Calendar size={12} className="text-neon-cyan" />
                    {exp.duration}
                  </div>
                  {/* Date (Desktop fallback right aligned) */}
                  <div className="hidden md:block text-xs font-medium text-slate-500">
                    {exp.duration}
                  </div>
                </div>

                {/* Job Bullet Points */}
                <ul className="space-y-3.5">
                  {exp.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-slate-300 text-sm leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-neon-cyan shadow-[0_0_6px_#00F2FE] mt-2 flex-shrink-0" />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
