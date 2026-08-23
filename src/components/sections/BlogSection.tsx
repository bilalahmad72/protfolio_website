'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Smartphone, Layers, Laptop, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import { useIsClient, useMediaQuery } from '@/hooks/useMediaQuery';
import SectionHeading from '@/components/motion/SectionHeading';

const categoryColors: Record<string, string> = {
  'Flutter': 'text-accent-deep bg-accent-100 border-accent-200',
  'Web Development': 'text-slate-700 bg-slate-100 border-slate-200',
};

const gradientThemes: Record<string, string> = {
  flutter: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
  state: 'from-accent-fill-strong via-accent-fill to-[#10267A]',
  frontend: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
};

/*
 * Search Console reported `Referring page: None detected` for /blog/ — the home
 * page linked to individual posts but never to the index, so it was reachable
 * only through the sitemap. This has to render in the pre-hydration branch too,
 * or the crawler's first pass will not see it.
 */
function AllArticlesLink() {
  return (
    <div className="mt-12 flex justify-center">
      <Link
        href="/blog"
        className="group inline-flex min-h-[44px] items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-6 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-accent/40 hover:text-accent"
      >
        View all articles
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

export default function BlogSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  // Breakpoints drive the carousel directly, so there is no resize listener and
  // no render pass where the count is momentarily wrong.
  const isMounted = useIsClient();
  const isLarge = useMediaQuery('(min-width: 1024px)');
  const isMedium = useMediaQuery('(min-width: 768px)');
  const visibleCount = isLarge ? 3 : isMedium ? 2 : 1;

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % blogs.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + blogs.length) % blogs.length);
  };

  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 120 : -120, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { duration: 0.4, ease: 'easeInOut' as const } },
    exit: (dir: number) => ({ x: dir < 0 ? 120 : -120, opacity: 0, transition: { duration: 0.4, ease: 'easeInOut' as const } }),
  };

  const totalItems = blogs.length;
  const showIndicators = totalItems > visibleCount;

  // Get the list of posts to show
  const visiblePosts = [];
  if (!showIndicators) {
    visiblePosts.push(...blogs);
  } else {
    for (let i = 0; i < visibleCount; i++) {
      visiblePosts.push(blogs[(index + i) % totalItems]);
    }
  }

  // Pre-hydration placeholder layout to match server-side rendering exactly
  if (!isMounted) {
    return (
      <section id="blog" className="section-y relative overflow-hidden bg-surface">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <SectionHeading
            kicker="06 — Writing"
            title="Notes from the"
            accent="build log"
            subtitle="Deep-dives, tutorials, and insights on mobile architecture and web architectures."
            className="mb-16"
          />

          <div className="flex flex-wrap justify-center gap-6 w-full">
            {blogs.slice(0, 3).map((post, idx) => (
              <div
                key={post.id}
                className={`glassmorphism rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-200 transition-all duration-300 flex flex-col group w-full max-w-sm md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                  idx >= 1 ? 'hidden md:flex' : 'flex'
                } ${idx >= 2 ? 'hidden lg:flex' : 'flex'}`}
              >
                {/* Blog Header Gradient Thumbnail */}
                <div className={`relative h-52 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-700 bg-slate-100 border-slate-200'}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="text-white/20 scale-125 mb-4">
                    {post.iconType === 'flutter' && <Smartphone size={52} />}
                    {post.iconType === 'sitemap' && <Layers size={52} />}
                    {post.iconType === 'laptop-code' && <Laptop size={52} />}
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md z-10 px-4 line-clamp-2">
                    {post.title}
                  </h3>
                </div>

                {/* Blog Content */}
                <div className="p-8 flex flex-col flex-grow justify-between space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                      <Calendar size={12} />
                      <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-900">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h4>
                    
                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group/link cursor-pointer"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <AllArticlesLink />
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="section-y relative overflow-hidden bg-surface">

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          kicker="06 — Writing"
          title="Notes from the"
          accent="build log"
          subtitle="Deep-dives, tutorials, and insights on mobile architecture and web architectures."
          className="mb-16"
        />

        {/* Carousel Container */}
        <div className="relative min-h-[460px] flex items-center justify-center">
          {showIndicators && (
            <button
              onClick={prev}
              className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 hover:border-accent/50 bg-surface text-slate-600 hover:text-accent flex items-center justify-center transition-all shadow-md shadow-slate-900/10 hover:scale-110 active:scale-95 cursor-pointer z-20"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          <div className="w-full relative overflow-hidden px-4 md:px-0">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index + '-' + visibleCount}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="flex flex-wrap justify-center gap-6 w-full"
              >
                {visiblePosts.map((post) => (
                  <div
                    key={post.id}
                    className="glassmorphism rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-200 transition-all duration-300 flex flex-col group w-full max-w-sm md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    {/* Blog Header Gradient Thumbnail */}
                    <div className={`relative h-52 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-700 bg-slate-100 border-slate-200'}`}>
                          {post.category}
                        </span>
                      </div>
                      
                      <div className="text-white/20 scale-125 mb-4 group-hover:scale-135 transition-transform duration-300">
                        {post.iconType === 'flutter' && <Smartphone size={52} />}
                        {post.iconType === 'sitemap' && <Layers size={52} />}
                        {post.iconType === 'laptop-code' && <Laptop size={52} />}
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md z-10 px-4 line-clamp-2">
                        {post.title}
                      </h3>
                      
                      <div className="absolute inset-0 bg-transparent opacity-[0.08]"
                        style={{
                          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                          backgroundSize: '15px 15px',
                        }}
                      />
                    </div>

                    {/* Blog Content */}
                    <div className="p-8 flex flex-col flex-grow justify-between space-y-4">
                      <div className="space-y-4">
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                          <Calendar size={12} />
                          <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                        </div>
                        
                        <h4 className="text-xl font-bold text-slate-900 group-hover:text-accent transition-colors line-clamp-2">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        
                        <p className="text-slate-600 text-sm leading-relaxed line-clamp-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-deep transition-colors group/link cursor-pointer"
                        >
                          Read More
                          <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {showIndicators && (
            <button
              onClick={next}
              className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-slate-200 hover:border-accent/50 bg-surface text-slate-600 hover:text-accent flex items-center justify-center transition-all shadow-md shadow-slate-900/10 hover:scale-110 active:scale-95 cursor-pointer z-20"
            >
              <ChevronRight size={20} />
            </button>
          )}
        </div>

        {/* Dot Indicators */}
        {showIndicators && (
          <div className="flex justify-center items-center gap-2.5 mt-8">
            {blogs.map((_, idx) => (
              <button
                key={idx}
                onClick={() => { setDirection(idx > index ? 1 : -1); setIndex(idx); }}
                className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                  index === idx
                    ? 'w-6 bg-accent'
                    : 'w-2.5 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        )}

        <AllArticlesLink />
      </div>
    </section>
  );
}
