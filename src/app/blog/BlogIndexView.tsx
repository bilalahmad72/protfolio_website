'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Smartphone, Layers, Laptop, ArrowRight } from 'lucide-react';
import { blogs } from '@/data/blogs';
import Navbar from '@/components/sections/Navbar';
import Footer from '@/components/sections/Footer';


const categoryColors: Record<string, string> = {
  'Flutter': 'text-accent-deep bg-accent-100 border-accent-200',
  'Web Development': 'text-slate-700 bg-slate-100 border-slate-200',
};

const gradientThemes: Record<string, string> = {
  flutter: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
  state: 'from-accent-fill-strong via-accent-fill to-[#10267A]',
  frontend: 'from-accent-fill via-accent-fill-strong to-[#10267A]',
};

export default function BlogIndexView() {
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

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Back button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-deep transition-colors mb-8 group cursor-pointer"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Page Header */}
          <div className="space-y-4 mb-16">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              All <span className="text-accent">Articles</span>
            </h1>
            <p className="text-slate-600 max-w-xl text-sm sm:text-base">
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
                className="glassmorphism rounded-2xl overflow-hidden border border-slate-200 hover:border-slate-200 transition-all duration-300 flex flex-col h-full group"
              >
                {/* Thumbnail */}
                <div className={`relative h-48 bg-gradient-to-tr ${gradientThemes[post.imageClass] || gradientThemes.flutter} flex flex-col items-center justify-center p-6 shadow-md text-center`}>
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${categoryColors[post.category] || 'text-slate-700 bg-slate-100 border-slate-200'}`}>
                      {post.category}
                    </span>
                  </div>
                  
                  <div className="text-white/20 scale-125 mb-4 group-hover:scale-135 transition-transform duration-300">
                    {post.iconType === 'flutter' && <Smartphone size={48} />}
                    {post.iconType === 'sitemap' && <Layers size={48} />}
                    {post.iconType === 'laptop-code' && <Laptop size={48} />}
                  </div>

                  <h2 className="text-lg font-bold text-white leading-snug drop-shadow-md z-10 px-4">
                    {post.title}
                  </h2>
                  
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
                    <time dateTime={new Date(post.date).toISOString()}>{post.date}</time>
                  </div>
                  
                  <h2 className="text-xl font-bold text-slate-900 group-hover:text-accent transition-colors line-clamp-2">
                    <Link href={`/blog/${post.id}`}>{post.title}</Link>
                  </h2>
                  
                  <p className="text-slate-600 text-sm leading-relaxed flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

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
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
}
