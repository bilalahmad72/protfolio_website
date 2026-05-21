'use client';

import React from 'react';
import { Mail, MapPin } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon, FiverrIcon, UpworkIcon } from '@/components/icons/SocialIcons';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.querySelector(id);
    if (el) {
      window.scrollTo({
        top: (el as HTMLElement).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="border-t border-white/5 bg-[#070a13] py-16 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Intro */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-neon-cyan via-neon-indigo to-neon-purple bg-clip-text text-transparent glow-text-cyan tracking-wider">
              Bilal Ahmad
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Senior Flutter Developer specializing in Clean Architecture and responsive cross-platform architectures.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="#home" 
                  onClick={(e) => handleScrollTo(e, '#home')} 
                  className="text-sm text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a 
                  href="#skills" 
                  onClick={(e) => handleScrollTo(e, '#skills')} 
                  className="text-sm text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  Skills
                </a>
              </li>
              <li>
                <a 
                  href="#projects" 
                  onClick={(e) => handleScrollTo(e, '#projects')} 
                  className="text-sm text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a 
                  href="#contact" 
                  onClick={(e) => handleScrollTo(e, '#contact')} 
                  className="text-sm text-slate-400 hover:text-neon-cyan transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>Flutter App Development</li>
              <li>Clean Architecture & State Management</li>
              <li>REST & GraphQL API Integration</li>
              <li>PostgreSQL Database Design</li>
              <li>Responsive Flutter Web Layouts</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider">Contact Info</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <WhatsappIcon size={14} className="text-emerald-400" />
                <a 
                  href="https://wa.me/923084539672" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-emerald-400 transition-colors"
                >
                  Contact me
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-neon-cyan" />
                <a href="mailto:bilalahmad72.official@gmail.com" className="hover:text-neon-cyan transition-colors break-all">
                  bilalahmad72.official@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-neon-cyan" />
                <span>Sheikhupura, Pakistan</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Area */}
        <div className="border-t border-white/5 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            &copy; {currentYear} Bilal Ahmad. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/bilalahmad72"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-cyan transition-colors"
              title="GitHub"
            >
              <GithubIcon size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/freelancer-bilalahmad72/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-cyan transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon size={18} />
            </a>
            <a
              href="https://www.instagram.com/bilalahmad72.official/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-cyan transition-colors"
              title="Instagram"
            >
              <InstagramIcon size={18} />
            </a>
            <a
              href="https://www.upwork.com/freelancers/bilalahmad72"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-cyan transition-colors"
              title="Upwork"
            >
              <UpworkIcon size={18} />
            </a>
            <a
              href="https://www.fiverr.com/bilalahmad72"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-neon-cyan transition-colors"
              title="Fiverr"
            >
              <FiverrIcon size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
