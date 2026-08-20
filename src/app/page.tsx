'use client';

import React from 'react';
import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import Skills from '@/components/sections/Skills';
import Projects from '@/components/sections/Projects';
import Experience from '@/components/sections/Experience';
import Testimonials from '@/components/sections/Testimonials';
import BooksSection from '@/components/sections/BooksSection';
import BlogSection from '@/components/sections/BlogSection';
import Achievements from '@/components/sections/Achievements';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/sections/Footer';

/** Hairline gradient rule that separates two adjacent sections. */
function SectionRule() {
  return (
    <div aria-hidden className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="section-rule" />
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Achievements />
      <Skills />
      <SectionRule />
      <Projects />
      <SectionRule />
      <Experience />
      <Testimonials />
      <BooksSection />
      <BlogSection />
      <SectionRule />
      <Contact />
      <Footer />
    </>
  );
}
