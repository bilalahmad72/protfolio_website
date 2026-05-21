'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar, Smartphone, Layers, Laptop, ChevronLeft, ChevronRight } from 'lucide-react';
import { blogs } from '@/data/blogs';

const categoryColors: Record<string, string> = {
  'Flutter': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Web Development': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

const gradientThemes: Record<string, string> = {
  flutter: 'from-sky-500 via-blue-600 to-indigo-700 shadow-sky-500/10',
  state: 'from-purple-500 via-indigo-600 to-blue-700 shadow-purple-500/10',
  frontend: 'from-cyan-500 via-blue-600 to-purple-700 shadow-cyan-500/10',
};

export default function BlogSection() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (windowWidth === null) return;
    if (windowWidth >= 1024) {
      setVisibleCount(3);
    } else if (windowWidth >= 768) {
      setVisibleCount(2);
    } else {
      setVisibleCount(1);
    }
  }, [windowWidth]);

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
      <section id="blog" className="py-24 relative overflow-hidden bg-[#0B0F19]/25">
        <div className="absolute top-[20%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-neon-indigo/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Section Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold">
              Latest <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Articles</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Deep-dives, tutorials, and insights on mobile architecture and web architectures.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 w-full">
            {blogs.slice(0, 3).map((post, idx) => (
              <div
                key={post.id}
                className={`glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col group w-full max-w-sm md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] ${
                  idx >= 1 ? 'hidden md:flex' : 'flex'
                } ${idx >= 2 ? 'hidden lg:flex' : 'flex'}`}
              >
                {/* Blog Header Gradient Thumbnail */}
                <div className={`relative h-52 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-400 bg-white/5 border-white/10'}`}>
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
                      <span>{post.date}</span>
                    </div>
                    
                    <h4 className="text-xl font-bold text-slate-100">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h4>
                    
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-2">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan group/link cursor-pointer"
                    >
                      Read More
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="blog" className="py-24 relative overflow-hidden bg-[#0B0F19]/25">
      {/* Background decoration */}
      <div className="absolute top-[20%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-neon-indigo/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Latest <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Articles</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Deep-dives, tutorials, and insights on mobile architecture and web architectures.
          </motion.p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[460px] flex items-center justify-center">
          {showIndicators && (
            <button
              onClick={prev}
              className="absolute left-[-20px] md:left-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 hover:border-neon-cyan/50 bg-[#0B0F19]/60 backdrop-blur-md text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-110 active:scale-95 cursor-pointer z-20"
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
                    className="glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col group w-full max-w-sm md:max-w-none md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]"
                  >
                    {/* Blog Header Gradient Thumbnail */}
                    <div className={`relative h-52 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                      <div className="absolute top-4 left-4 z-10">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-400 bg-white/5 border-white/10'}`}>
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
                          <span>{post.date}</span>
                        </div>
                        
                        <h4 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors line-clamp-2">
                          <Link href={`/blog/${post.id}`}>{post.title}</Link>
                        </h4>
                        
                        <p className="text-slate-400 text-sm leading-relaxed line-clamp-4">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="pt-2">
                        <Link 
                          href={`/blog/${post.id}`} 
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-neon-cyan hover:text-neon-purple transition-colors group/link cursor-pointer"
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
              className="absolute right-[-20px] md:right-[-60px] top-1/2 -translate-y-1/2 w-10 h-10 rounded-full border border-white/10 hover:border-neon-cyan/50 bg-[#0B0F19]/60 backdrop-blur-md text-slate-400 hover:text-neon-cyan flex items-center justify-center transition-all shadow-md shadow-black/20 hover:scale-110 active:scale-95 cursor-pointer z-20"
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
                    ? 'w-6 bg-neon-cyan shadow-[0_0_8px_#00F2FE]'
                    : 'w-2.5 bg-slate-700 hover:bg-slate-600'
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
