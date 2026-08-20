import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Calendar, MapPin, Rocket } from 'lucide-react';
import { journeyChapters, journeyIntro } from '@/data/journey';
import { experiences } from '@/data/experience';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

export const metadata: Metadata = {
  title: 'My Journey as a Flutter Developer — Bilal Ahmad',
  description:
    'How I went from freelance bug fixes to shipping production fintech apps: every role, what I built, and the full tech breakdown across eight teams.',
};

export default function JourneyPage() {
  return (
    <>
      <Navbar />

      <main className="flex-grow">
        <article className="relative z-10 mx-auto max-w-4xl px-4 pt-32 pb-24 sm:px-6 lg:px-8">
          <Link
            href="/#journey"
            className="group mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition-colors hover:text-accent"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            Back to portfolio
          </Link>

          <header className="mb-14">
            <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">
              Background
            </p>
            <h1 className="mt-3 text-balance text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
              My journey as a <span className="text-accent">Flutter developer</span>
            </h1>
            <p className="mt-6 text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              {journeyIntro}
            </p>
          </header>

          {/* The narrative, chapter by chapter. */}
          <div className="space-y-14">
            {journeyChapters.map((chapter) => (
              <section key={chapter.id} id={chapter.id} className="scroll-mt-28">
                <p className="font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  {chapter.period}
                </p>
                <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {chapter.title}
                </h2>
                <div className="mt-5 space-y-4">
                  {chapter.body.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-pretty text-base leading-relaxed text-slate-700"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

          <div aria-hidden className="section-rule my-16" />

          {/* The same history as a reference table: role by role, with tags. */}
          <section id="roles" className="scroll-mt-28">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Every role, in detail
            </h2>
            <p className="mt-3 text-pretty text-base leading-relaxed text-slate-600">
              The same history as a reference — what each engagement involved and
              what it was built with.
            </p>

            <ol className="mt-10 space-y-6">
              {experiences.map((exp) => (
                <li
                  key={exp.id}
                  className="glassmorphism rounded-2xl border border-slate-200 p-7 sm:p-8"
                >
                  <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight text-slate-900">
                        {exp.role}
                      </h3>
                      <p className="mt-1 text-sm font-semibold text-accent-deep">
                        {exp.company}
                        {exp.type && (
                          <span className="font-medium text-slate-500"> · {exp.type}</span>
                        )}
                      </p>
                    </div>

                    <div className="flex flex-col gap-1.5 text-xs text-slate-500 sm:items-end">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar size={12} className="text-accent" />
                        {exp.duration}
                      </span>
                      {exp.location && (
                        <span className="inline-flex items-center gap-1.5">
                          <MapPin size={12} className="text-accent" />
                          {exp.location}
                        </span>
                      )}
                    </div>
                  </div>

                  <ul className="mt-5 space-y-3">
                    {exp.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 text-sm leading-relaxed text-slate-700"
                      >
                        <span
                          aria-hidden
                          className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent"
                        />
                        {detail}
                      </li>
                    ))}
                  </ul>

                  {exp.shipped && (
                    <div className="mt-5 rounded-xl border border-accent-200 bg-accent-100 p-4">
                      <p className="flex items-center gap-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] text-accent-deep">
                        <Rocket size={12} />
                        Shipped
                      </p>
                      <ul className="mt-2 space-y-1">
                        {exp.shipped.map((product) => (
                          <li key={product} className="text-sm font-medium text-slate-800">
                            {product}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {exp.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </section>

          <div className="mt-16 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-accent-fill px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-accent-fill-strong"
            >
              See the apps
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent/40 hover:text-accent"
            >
              Get in touch
            </Link>
          </div>
        </article>
      </main>

      <Footer />
    </>
  );
}
