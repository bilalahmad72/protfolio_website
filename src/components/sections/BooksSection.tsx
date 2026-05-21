'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { BookOpen, Check, Award, ChevronRight, FileText, Sparkles, ShoppingBag } from 'lucide-react';

export default function BooksSection() {
  const gumroadUrl = 'https://codexabooks.gumroad.com/l/idea-to-product';

  const highlights = [
    { text: "20 complete chapters covering every phase from discovery to maintenance", icon: BookOpen },
    { text: "5 custom visual diagrams that make complex workflows simple to understand", icon: Sparkles },
    { text: "A complete case study of a real food delivery app — from idea to launch", icon: FileText },
    { text: "Department-by-department breakdown — who does what, and how", icon: Award },
  ];

  const subHighlights = [
    "The PRD blueprint that prevents the most expensive project mistakes",
    "The Agile sprint system explained in plain English",
    "The 5 pillars of every great digital product"
  ];

  const targetAudience = [
    "Founders & Entrepreneurs",
    "Project Managers & Team Leads",
    "Designers & Developers",
    "Students & Career Switchers"
  ];

  return (
    <section id="books" className="py-24 relative overflow-hidden bg-[#0B0F19]/20 border-t border-white/5">
      {/* Background glow effects */}
      <div className="absolute top-[30%] left-[-10%] h-[35vw] w-[35vw] rounded-full bg-neon-cyan/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] h-[35vw] w-[35vw] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border border-neon-cyan/20 bg-neon-cyan/5 text-neon-cyan"
          >
            <BookOpen size={12} className="animate-pulse" />
            <span>MY PUBLISHED PLAYBOOK</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold tracking-tight"
          >
            Featured <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Book</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base"
          >
            Turn any idea into a real digital product — using the same playbook modern software companies use every day.
          </motion.p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Book Mockup Image with 3D Float Hover Effect */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative group perspective-[1000px]">
              {/* Outer Glow container */}
              <div className="absolute inset-[-6px] rounded-2xl bg-gradient-to-tr from-neon-cyan via-neon-indigo to-neon-purple opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500" />
              
              {/* Image Frame */}
              <motion.div 
                whileHover={{ rotateY: -8, rotateX: 6, scale: 1.03 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
                className="relative z-10 w-[280px] sm:w-[340px] aspect-[1/1.414] rounded-2xl overflow-hidden border border-white/10 bg-[#0F172A] shadow-2xl cursor-pointer"
                onClick={() => window.open(gumroadUrl, '_blank', 'noopener,noreferrer')}
              >
                <Image 
                  src="/images/book_cover.png"
                  alt="From Idea to Product Book Cover"
                  fill
                  sizes="(max-width: 640px) 280px, 340px"
                  priority
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />
                
                {/* Cyber overlay/sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column: Ebook Details */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-slate-100 leading-tight">
                From Idea to Product
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                Most digital products fail not because the team couldn't build them, but because there was never a clear process to begin with. Discovery skipped. Requirements unclear. No PRD. Designers and developers working in different directions.
              </p>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-semibold bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent">
                This book changes that.
              </p>
              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                Published by <span className="text-white font-medium">Codexa</span>, this is the complete 52-page playbook that walks you through every single phase of building a modern digital product — from the very first client meeting all the way to long-term scaling and maintenance.
              </p>
            </div>

            {/* Highlights Grid */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                What You'll Get Inside
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {highlights.map((item, idx) => (
                  <div key={idx} className="flex gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors">
                    <item.icon className="w-5 h-5 text-neon-cyan flex-shrink-0 mt-0.5" />
                    <span className="text-slate-300 text-xs sm:text-sm leading-snug">{item.text}</span>
                  </div>
                ))}
              </div>
              <ul className="space-y-2 mt-2 pl-2">
                {subHighlights.map((text, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-slate-400 text-xs sm:text-sm">
                    <Check className="w-4 h-4 text-neon-purple flex-shrink-0" />
                    <span>{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Target Audience */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">
                Who This Book Is For
              </h4>
              <div className="flex flex-wrap gap-2">
                {targetAudience.map((role, idx) => (
                  <span 
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium border border-white/10 bg-white/[0.02] text-slate-300 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors"
                  >
                    {role}
                  </span>
                ))}
              </div>
            </div>

            {/* Special Offer Box & Action */}
            <div className="p-6 rounded-2xl glassmorphism border border-neon-cyan/20 bg-neon-cyan/[0.01] relative overflow-hidden space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-10">
                <div className="space-y-1">
                  <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-400/10 text-amber-400 border border-amber-400/20">
                    SPECIAL OFFER: 70% OFF
                  </div>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-3xl font-extrabold text-white">$3</span>
                    <span className="text-sm text-slate-500 line-through">$10</span>
                    <span className="text-xs text-slate-400 font-medium ml-1">— this week only!</span>
                  </div>
                </div>
                
                <div className="text-slate-400 text-xs space-y-1">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>52-page professional PDF (A4 size)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Instant download & lifetime access</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 relative z-10">
                <a 
                  href={gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-neon-cyan to-neon-indigo text-white shadow-[0_0_15px_rgba(0,242,254,0.3)] hover:shadow-[0_0_25px_rgba(0,242,254,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-center cursor-pointer group"
                >
                  <ShoppingBag size={18} className="transition-transform group-hover:scale-110" />
                  <span>Buy on Gumroad</span>
                  <ChevronRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
                <p className="text-[10px] text-slate-500 mt-2 pl-1">
                  Secure checkout hosted on Gumroad. Published by Codexa.
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
