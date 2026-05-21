'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Code } from 'lucide-react';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 100, damping: 20 }
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section 
      id="home" 
      className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center"
        >
          {/* Left Side: Avatar with Tech Aura */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-5 flex justify-center order-first lg:order-none"
          >
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
              {/* Outer Pulsing Rotating Glow Ring */}
              <div className="absolute inset-[-15px] rounded-full border-2 border-dashed border-neon-cyan/30 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-[-8px] rounded-full border-2 border-neon-purple/40 animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-neon-cyan via-neon-indigo to-neon-purple opacity-20 blur-2xl animate-pulse" />

              {/* Inner Frame */}
              <div className="absolute inset-0 rounded-full overflow-hidden border-2 border-neon-cyan/50 p-2 bg-[#0B0F19]">
                <div className="relative w-full h-full rounded-full overflow-hidden">
                  <Image
                    src="/images/profile.jpg"
                    alt="Bilal Ahmad"
                    fill
                    priority
                    sizes="(max-width: 768px) 256px, 384px"
                    className="object-cover scale-105 hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Dynamic Tech Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute bottom-4 -left-4 glassmorphism px-4 py-2 rounded-xl flex items-center gap-2 border border-neon-cyan/30"
              >
                <div className="w-2.5 h-2.5 rounded-full bg-neon-cyan animate-ping" />
                <span className="text-xs font-semibold text-neon-cyan">Senior Developer</span>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute top-8 -right-4 glassmorphism px-4 py-2 rounded-xl flex items-center gap-2 border border-neon-purple/30"
              >
                <Code size={14} className="text-neon-purple" />
                <span className="text-xs font-semibold text-neon-purple">Flutter Expert</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side: Text & Actions */}
          <motion.div 
            variants={itemVariants}
            className="lg:col-span-7 text-center lg:text-left space-y-6"
          >
            <div className="inline-block px-3 py-1 rounded-full border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan text-sm font-semibold tracking-wide">
              Welcome to my portfolio
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
              Hi, I'm <span className="bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple bg-clip-text text-transparent glow-text-cyan">Bilal Ahmad</span>
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Senior Flutter Developer specializing in <span className="text-neon-cyan">Clean Architecture</span>, <span className="text-neon-purple">Riverpod / BLoC</span> state management, <span className="text-neon-cyan">REST & GraphQL API</span> integration, and <span className="text-neon-indigo">PostgreSQL</span> database design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => handleScrollTo('#contact')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple text-[#0B0F19] shadow-lg shadow-neon-cyan/20 hover:shadow-neon-cyan/40 transition-shadow duration-300 group cursor-pointer"
              >
                Get in Touch
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={() => handleScrollTo('#projects')}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold border border-white/10 hover:border-neon-cyan/50 hover:bg-neon-cyan/5 text-slate-200 hover:text-white transition-all cursor-pointer"
              >
                View Work
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
