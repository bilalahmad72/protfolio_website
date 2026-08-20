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
    <section id="projects" className="section-y relative overflow-hidden bg-slate-50">
      <div className="pointer-events-none absolute right-[-10%] bottom-[10%] h-[40vw] w-[40vw] rounded-full bg-accent-deep/5 blur-[150px]" />

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
        >
          {projects.map((project) => (
            <motion.div key={project.id} variants={tiltIn} className="h-full">
              <TiltCard max={7} lift={20} className="h-full rounded-2xl">
                <div className="glassmorphism group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 transition-colors duration-300 hover:border-accent/25">
                  {/*
                    These are shipped apps, so the artwork is a square store
                    icon. Cropping one into a 16:9 frame mangles it, so the tile
                    presents it at its own aspect on a tinted ground instead.
                  */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-slate-200 bg-gradient-to-br from-accent-100 via-white to-accent-200/60">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Image
                        src={project.image}
                        alt={`${project.title} app icon`}
                        width={512}
                        height={512}
                        sizes="140px"
                        className="h-[54%] w-auto rounded-[22%] shadow-[0_18px_40px_-18px_rgba(16,38,122,0.45)] transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      />
                    </div>

                  </div>

                  <div className="flex flex-grow flex-col space-y-4 p-6">
                    <h3 className="text-xl font-bold tracking-tight text-slate-900 transition-colors group-hover:text-accent">
                      {project.title}
                    </h3>
                    <p className="flex-grow text-pretty text-sm leading-relaxed text-slate-600">
                      {project.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[10px] font-semibold text-slate-600 transition-all hover:border-accent/20 hover:text-accent sm:text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/*
                      Always visible rather than revealed on hover: a touch
                      device has no hover state, so a hover-only row of links is
                      unreachable there.
                    */}
                    <div className="flex flex-wrap gap-2 border-t border-slate-200 pt-4">
                      {project.androidUrl && (
                        <a
                          href={project.androidUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg bg-accent-fill px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-accent-fill-strong"
                        >
                          <Play size={13} fill="currentColor" />
                          Google Play
                        </a>
                      )}
                      {project.iosUrl && (
                        <a
                          href={project.iosUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          <Apple size={13} fill="currentColor" />
                          App Store
                        </a>
                      )}
                      {project.webUrl && (
                        <a
                          href={project.webUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          <Globe size={13} />
                          Live Site
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-[40px] items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-700 transition-colors hover:border-accent/40 hover:text-accent"
                        >
                          <GithubIcon size={13} />
                          Source
                        </a>
                      )}
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
