'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Smartphone, Layers, Laptop, ArrowRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';

const categoryColors: Record<string, string> = {
  'Flutter': 'text-sky-400 bg-sky-400/10 border-sky-400/20',
  'Web Development': 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
};

const gradientThemes: Record<string, string> = {
  flutter: 'from-sky-500 via-blue-600 to-indigo-700 shadow-sky-500/10',
  state: 'from-purple-500 via-indigo-600 to-blue-700 shadow-purple-500/10',
  frontend: 'from-cyan-500 via-blue-600 to-purple-700 shadow-cyan-500/10',
};

export default function BlogIndexPage() {
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
      transition: { type: 'spring' as const, stiffness: 100, damping: 15 }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen pt-28 pb-20 relative">
        {/* Glow decoration */}
        <div className="absolute top-[10%] left-[20%] h-[30vw] w-[30vw] rounded-full bg-neon-indigo/5 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-neon-cyan hover:text-neon-purple transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="space-y-4 mb-16">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-100 tracking-tight">
              All <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Articles</span>
            </h1>
            <p className="text-slate-400 max-w-xl text-sm sm:text-base">
              Deep-dives, guides, and tech documentation regarding mobile and web design.
            </p>
          </div>

          {/* Grid of posts */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {blogs.map((post) => (
              <motion.div
                key={post.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="glassmorphism rounded-2xl overflow-hidden border border-white/5 hover:border-white/10 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Thumbnail */}
                <div className={`relative h-48 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-400 bg-white/5 border-white/10'}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="text-white/20 scale-125 mb-4 group-hover:scale-135 transition-transform duration-300">
                    {post.iconType === 'flutter' && <Smartphone size={48} />}
                    {post.iconType === 'sitemap' && <Layers size={48} />}
                    {post.iconType === 'laptop-code' && <Laptop size={48} />}
                  </div>

                  <h3 className="text-lg font-bold text-white leading-snug drop-shadow-md z-10 px-4">
                    {post.title}
                  </h3>
                  
                  <div className="absolute inset-0 bg-transparent opacity-[0.08]"
                    style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '15px 15px',
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow space-y-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <Calendar size={12} />
                    <span>{post.date}</span>
                  </div>
                  
                  <h4 className="text-xl font-bold text-slate-100 group-hover:text-neon-cyan transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h4>
                  
                  <p className="text-slate-400 text-sm leading-relaxed flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
