'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Apple, Globe } from 'lucide-react';
import { GithubIcon } from '@/components/icons/SocialIcons';
import { projects } from '@/data/projects';
import SectionHeading from '@/components/motion/SectionHeading';
import TiltCard from '@/components/motion/TiltCard';
import { staggerParent, tiltIn, viewportOnce } from '@/lib/motion';

export default function Projects() {
  return (
    <section id="projects" className="section-y relative overflow-hidden bg-[#0B0F19]/20">
      <div className="pointer-events-none absolute right-[-10%] bottom-[10%] h-[40vw] w-[40vw] rounded-full bg-neon-purple/5 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="02 — Selected work"
          title="Shipped, live and"
          accent="in production"
          subtitle="Apps running on real stores with real users. Source code and live demos are linked on every card."
          className="mb-16"
        />

        <motion.div
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 gap-7 md:grid-cols-2 lg:grid-cols-3"
          style={{ perspective: 1600 }}
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={tiltIn} className="h-full">
              <TiltCard max={7} lift={20} className="h-full rounded-2xl">
                <div className="glassmorphism group flex h-full flex-col overflow-hidden rounded-2xl border border-white/5 transition-colors duration-300 hover:border-neon-cyan/25">
                  <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover opacity-85 transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.08] group-hover:opacity-100"
                    />

                    {/* Keeps the title legible over any screenshot. */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0B0F19] via-[#0B0F19]/10 to-transparent" />

                    <div className="absolute inset-0 flex items-center justify-center gap-3 bg-slate-950/80 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      {project.androidUrl && (
                        <a
                          href={project.androidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-emerald-500 text-[#0B0F19] shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-transform hover:scale-110 active:scale-95"
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
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-slate-200 text-[#0B0F19] shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-transform hover:scale-110 active:scale-95"
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
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-neon-cyan text-[#0B0F19] shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-transform hover:scale-110 active:scale-95"
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
                          className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-all hover:scale-110 hover:bg-white/20 active:scale-95"
                          title="View Source Code"
                        >
                          <GithubIcon size={18} />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-grow flex-col space-y-4 p-6">
                    <h3 className="text-xl font-bold tracking-tight text-slate-100 transition-colors group-hover:text-neon-cyan">
                      {project.title}
                    </h3>
                    <p className="flex-grow text-pretty text-sm leading-relaxed text-slate-400">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-[10px] font-semibold text-slate-400 transition-all hover:border-neon-cyan/20 hover:text-neon-cyan sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
