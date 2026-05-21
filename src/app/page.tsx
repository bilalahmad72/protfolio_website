'use client';

import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import BlogSection from '@/components/sections/BlogSection';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Achievements />
      <Skills />
      <Projects />
      <Experience />
      <Testimonials />
      <BlogSection />
      <Contact />
      <Footer />
    </>
  );
}
