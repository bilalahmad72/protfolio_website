'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Mail, MapPin, Send, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from '@/components/icons/SocialIcons';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    setStatus('submitting');

    setTimeout(() => {
      // Verify phone number (international format e.g. +923084539672 or similar)
      const digits = formData.phone.replace(/\D/g, '');
      const isValidFormat = /^\+?[1-9]\d{6,14}$/.test(formData.phone.trim());

      // If the number is a mock invalid number or doesn't meet standard WhatsApp formats
      if (!isValidFormat || digits.length < 8) {
        setPhoneError('your number have not registered to the whatsapp');
        setStatus('idle');
        return;
      }

      // Pre-fill text message
      const text = `*New Portfolio Inquiry*\n\n` +
                   `*Name:* ${formData.name}\n` +
                   `*Phone:* ${formData.phone}\n` +
                   `*Subject:* ${formData.subject}\n` +
                   `*Message:* ${formData.message}`;

      const whatsappUrl = `https://wa.me/923084539672?text=${encodeURIComponent(text)}`;
      
      // Open link in a new tab
      window.open(whatsappUrl, '_blank');

      setStatus('success');
      setFormData({ name: '', phone: '', subject: '', message: '' });
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-[20%] right-[-15%] h-[40vw] w-[40vw] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-3xl sm:text-4xl font-extrabold"
          >
            Let's <span className="bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent glow-text-cyan">Connect</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Get in touch for opportunities, collaboration, or just to say hi.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
          {/* Left Side: Contact Information & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="glassmorphism p-8 rounded-2xl border border-white/5 space-y-8">
              <h3 className="text-xl font-bold text-slate-100 border-b border-white/5 pb-4">
                Contact Details
              </h3>

              {/* Email */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-neon-cyan/5 border border-neon-cyan/15 group-hover:bg-neon-cyan/10 text-neon-cyan transition-all duration-300">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400">Email</h4>
                  <a 
                    href="mailto:bilalahmad72.official@gmail.com" 
                    className="text-slate-200 hover:text-neon-cyan text-sm sm:text-base transition-colors break-all mt-0.5 inline-block"
                  >
                    bilalahmad72.official@gmail.com
                  </a>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 text-emerald-400 transition-all duration-300">
                  <WhatsappIcon size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400">WhatsApp</h4>
                  <a 
                    href="https://wa.me/923084539672" 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-200 hover:text-emerald-400 text-sm sm:text-base transition-colors mt-0.5 inline-block"
                  >
                    Contacts me
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-neon-cyan/5 border border-neon-cyan/15 group-hover:bg-neon-cyan/10 text-neon-cyan transition-all duration-300">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-400">Location</h4>
                  <p className="text-slate-200 text-sm sm:text-base mt-0.5">
                    Sheikhupura, Pakistan
                  </p>
                </div>
              </div>
            </div>

            {/* Social profiles */}
            <div className="glassmorphism p-8 rounded-2xl border border-white/5 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Find me on</h3>
              <div className="flex flex-wrap items-center gap-4">
                <a
                  href="https://github.com/bilalahmad72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/freelancer-bilalahmad72/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="https://www.instagram.com/bilalahmad72.official/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 text-slate-400 hover:text-neon-cyan hover:border-neon-cyan/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title="Instagram"
                >
                  <InstagramIcon size={20} />
                </a>
                <a
                  href="https://www.upwork.com/freelancers/bilalahmad72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-neon-cyan/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group/upwork"
                  title="Upwork"
                >
                  <Image 
                    src="/images/upwork.png" 
                    alt="Upwork" 
                    width={22} 
                    height={22} 
                    className="object-contain filter grayscale opacity-60 group-hover/upwork:grayscale-0 group-hover/upwork:opacity-100 transition-all duration-300"
                  />
                </a>
                <a
                  href="https://www.fiverr.com/bilalahmad72"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:border-neon-cyan/30 hover:scale-105 active:scale-95 transition-all cursor-pointer group/fiverr"
                  title="Fiverr"
                >
                  <Image 
                    src="/images/fiverr.png" 
                    alt="Fiverr" 
                    width={22} 
                    height={22} 
                    className="object-contain filter grayscale opacity-60 group-hover/fiverr:grayscale-0 group-hover/fiverr:opacity-100 transition-all duration-300"
                  />
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: Contact Form */}
          <div className="lg:col-span-7">
            <div className="glassmorphism p-8 sm:p-10 rounded-2xl border border-white/5 relative overflow-hidden">
              {/* Submission visual success state overlay */}
              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center space-y-4 py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan flex items-center justify-center shadow-[0_0_20px_rgba(0,242,254,0.15)] animate-bounce">
                    <CheckCircle size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-100">Transmission Successful</h3>
                  <p className="text-slate-400 max-w-sm text-sm">
                    Thank you! Your message template has been generated. Please complete the transmission in the opened WhatsApp tab.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="mt-4 px-6 py-2 rounded-lg text-sm font-semibold border border-neon-cyan/30 hover:bg-neon-cyan/5 text-neon-cyan transition-colors cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-xl font-bold text-slate-100 border-b border-white/5 pb-4 mb-2">
                    Send a Message
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-xs font-semibold text-slate-400">Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                        className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#0B0F19]/60 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 text-slate-200 transition-colors text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-xs font-semibold text-slate-400">Phone Number (with Country Code)</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+923001122333"
                        required
                        className={`w-full px-4 py-3 rounded-xl border bg-[#0B0F19]/60 focus:outline-none focus:ring-1 text-slate-200 transition-colors text-sm ${
                          phoneError 
                            ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/30' 
                            : 'border-white/5 focus:border-neon-cyan focus:ring-neon-cyan/30'
                        }`}
                      />
                      {phoneError && (
                        <p className="text-xs text-red-500 font-medium mt-1">
                          {phoneError}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-semibold text-slate-400">Subject</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Message subject"
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#0B0F19]/60 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 text-slate-200 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-semibold text-slate-400">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Write your message here..."
                      required
                      className="w-full px-4 py-3 rounded-xl border border-white/5 bg-[#0B0F19]/60 focus:border-neon-cyan focus:outline-none focus:ring-1 focus:ring-neon-cyan/30 text-slate-200 transition-colors text-sm resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold bg-gradient-to-r from-neon-cyan to-neon-indigo text-[#0B0F19] hover:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {status === 'submitting' ? (
                      <div className="w-5 h-5 rounded-full border-2 border-[#0B0F19] border-t-transparent animate-spin" />
                    ) : (
                      <>
                        Send Message
                        <Send size={16} className="group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
