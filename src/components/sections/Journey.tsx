'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { journeyChapters, journeyIntro } from '@/data/journey';
import SectionHeading from '@/components/motion/SectionHeading';
import RevealGroup from '@/components/motion/RevealGroup';
import { staggerParent, tiltIn, viewportOnce } from '@/lib/motion';

/**
 * The short version of the story. Each chapter is one line here; the full
 * write-up lives on /journey, which is also where the tags and the detailed
 * role breakdown are.
 */
export default function Journey() {
  return (
    <section id="journey" className="section-y relative overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          kicker="03 — Background"
          title="My journey as a"
          accent="Flutter developer"
          subtitle="Eight roles across six countries, and a stack of apps live on both stores. The short version is below."
          className="mb-14"
        />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewportOnce}
            transition={{ duration: 0.7 }}
            className="text-pretty text-base leading-relaxed text-slate-600 sm:text-lg"
          >
            {journeyIntro}
          </motion.p>

          <RevealGroup
            variants={staggerParent(0.09)}
            as="ol"
            className={"relative space-y-7 border-l border-slate-200 pl-7"}
          >
            {journeyChapters.map((chapter) => (
              <motion.li key={chapter.id} variants={tiltIn} className="relative">
                <span
                  aria-hidden
                  className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border-2 border-accent bg-surface"
                />
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {chapter.period}
                </p>
                <h3 className="mt-1.5 text-lg font-bold tracking-tight text-slate-900">
                  {chapter.title}
                </h3>
                <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600">
                  {chapter.summary}
                </p>
              </motion.li>
            ))}
          </RevealGroup>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportOnce}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-12"
        >
          <Link
            href="/journey"
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent-fill px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-fill-strong"
          >
            Read the full story
            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
          <p className="mt-3 text-sm text-slate-500">
            Every role, what I actually built, and the full tech breakdown.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
