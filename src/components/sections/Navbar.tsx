'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
import { EASE_CINEMATIC } from '@/lib/motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');
  const frameRef = useRef<number | null>(null);

  const measure = useCallback(() => {
    setIsScrolled(window.scrollY > 20);

    const scrollPosition = window.scrollY + 120;
    for (const link of navLinks) {
      if (!link.href.startsWith('#')) continue;
      const el = document.querySelector(link.href) as HTMLElement | null;
      if (!el) continue;
      if (scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
        setActiveSection(link.href);
      }
    }
  }, []);

  useEffect(() => {
    // Coalesce scroll work into one animation frame so the WebGL loop keeps
    // the rest of the budget.
    const handleScroll = () => {
      if (frameRef.current !== null) return;
      frameRef.current = requestAnimationFrame(() => {
        frameRef.current = null;
        measure();
      });
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (frameRef.current !== null) cancelAnimationFrame(frameRef.current);
    };
  }, [measure]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setActiveSection(href);
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (el) {
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: EASE_CINEMATIC, delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'border-b border-slate-200 bg-surface/85 py-3 shadow-[0_8px_28px_-18px_rgba(16,38,122,0.28)] backdrop-blur-xl'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <a
            href="#home"
            onClick={(e) => handleClick(e, '#home')}
            className="group flex cursor-pointer items-center gap-2"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-accent/25 bg-accent/5 text-sm font-bold tracking-wider text-accent transition-all duration-300 group-hover:border-accent/60 group-hover:shadow-[0_10px_30px_-12px_rgba(44,92,255,0.25)]">
              BA
            </span>
            <span className="hidden text-sm font-semibold tracking-tight text-slate-700 transition-colors group-hover:text-slate-900 sm:block">
              Bilal Ahmad
            </span>
          </a>

          {/* Desktop nav, grouped into a single glass pill. */}
          <div className="hidden items-center rounded-full border border-slate-200 bg-slate-50 p-1 backdrop-blur-md md:flex">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={`relative rounded-full px-3.5 py-1.5 text-[13px] font-medium transition-colors duration-200 lg:px-4 ${
                  activeSection === link.href
                    ? 'text-white'
                    : 'text-slate-600 hover:text-accent'
                }`}
              >
                {activeSection === link.href && (
                  <motion.span
                    layoutId="activeNavPill"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-accent-fill to-accent-fill-strong shadow-[0_10px_30px_-12px_rgba(44,92,255,0.25)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{link.name}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
              className="rounded-lg border border-slate-200 p-2 transition-colors hover:border-accent/50 hover:text-accent md:hidden"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: EASE_CINEMATIC }}
            className="overflow-hidden border-b border-slate-200 bg-surface/95 backdrop-blur-lg md:hidden"
          >
            <div className="space-y-1 px-4 pt-2 pb-6">
              {navLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + index * 0.04, ease: EASE_CINEMATIC }}
                  className={`block rounded-lg px-3 py-3 text-base font-medium transition-colors ${
                    activeSection === link.href
                      ? 'border-l-2 border-accent bg-slate-50 text-accent shadow-[inset_4px_0_12px_rgba(44,92,255,0.02)]'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-800'
                  }`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
