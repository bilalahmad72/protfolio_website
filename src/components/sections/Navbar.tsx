'use client';

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Books', href: 'https://codexabooks.gumroad.com/l/idea-to-product', external: true },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('#home');

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Determine active section
      const scrollPosition = window.scrollY + 100;
      for (const link of navLinks) {
        if (link.href.startsWith('#')) {
          const el = document.querySelector(link.href);
          if (el) {
            const top = (el as HTMLElement).offsetTop;
            const height = (el as HTMLElement).offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(link.href);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, isExternal?: boolean) => {
    if (isExternal) {
      setIsMobileMenuOpen(false);
      return;
    }
    e.preventDefault();
    setActiveSection(href);
    setIsMobileMenuOpen(false);
    const el = document.querySelector(href);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#0B0F19]/80 backdrop-blur-md border-b border-white/5 py-4 shadow-lg' 
          : 'bg-transparent py-6'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a 
            href="#home" 
            onClick={(e) => handleClick(e, '#home')}
            className="text-2xl font-bold bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple bg-clip-text text-transparent glow-text-cyan cursor-pointer tracking-wider"
          >
            BA
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href, link.external)}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                className={`relative px-4 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:text-neon-cyan ${
                  activeSection === link.href ? 'text-neon-cyan' : 'text-slate-400'
                }`}
              >
                {link.name}
                {!link.external && activeSection === link.href && (
                  <motion.span 
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-4 right-4 h-0.5 bg-gradient-to-r from-neon-cyan to-neon-indigo shadow-[0_0_8px_#00F2FE]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          {/* Mobile Nav Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg border border-white/10 hover:border-neon-cyan/50 hover:text-neon-cyan transition-colors"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-[#0F172A]/95 backdrop-blur-lg border-b border-white/5"
          >
            <div className="space-y-1 px-4 pt-2 pb-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href, link.external)}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className={`block px-3 py-3 rounded-lg text-base font-medium transition-colors ${
                    activeSection === link.href 
                      ? 'bg-white/5 text-neon-cyan border-l-2 border-neon-cyan shadow-[inset_4px_0_12px_rgba(0,242,254,0.05)]' 
                      : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
