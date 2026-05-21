'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ExternalLink, Play, Apple, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { projects } from '@/data/projects';

export default function Projects() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring' as const, stiffness: 70, damping: 15 }
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden bg-[#0B0F19]/20">
      {/* Background Glow */}
      <div className="absolute bottom-[10%] right-[-10%] h-[40vw] w-[40vw] rounded-full bg-neon-purple/5 blur-[150px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Featured <span className="bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple bg-clip-text text-transparent glow-text-cyan">Projects</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Selected work from real production environments. Check out my source codes and live demos.
          </motion.p>
        </div>

        {/* Projects Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => (
            <motion.div
              key={project.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full group"
            >
              {/* Project Image Wrapper */}
              <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                
                {/* Tech Overlay for Links */}
                <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  {project.androidUrl && (
                    <a
                      href={project.androidUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-emerald-500 text-[#0B0F19] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)] cursor-pointer"
                      title="Google Play Store"
                    >
                      <Play size={18} fill="currentColor" />
                    </a>
                  )}
                  {project.iosUrl && (
                    <a
                      href={project.iosUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-slate-200 text-[#0B0F19] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-[0_0_15px_rgba(255,255,255,0.2)] cursor-pointer"
                      title="Apple App Store"
                    >
                      <Apple size={18} fill="currentColor" />
                    </a>
                  )}
                  {project.webUrl && (
                    <a
                      href={project.webUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-neon-cyan text-[#0B0F19] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform shadow-[0_0_15px_rgba(0,242,254,0.3)] cursor-pointer"
                      title="Web Live Demo"
                    >
                      <Globe size={18} />
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-full bg-white/10 text-white border border-white/20 flex items-center justify-center hover:bg-white/20 hover:scale-110 active:scale-95 transition-all cursor-pointer"
                      title="View Source Code"
                    >
                      <GithubIcon size={18} />
                    </a>
                  )}
                </div>
              </div>

              {/* Project Info */}
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors">
                  {project.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed flex-grow">
                  {project.description}
                </p>
                
                {/* Tech tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {project.tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded-md border border-white/5 bg-white/5 text-slate-400 hover:border-neon-cyan/20 hover:text-neon-cyan transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
