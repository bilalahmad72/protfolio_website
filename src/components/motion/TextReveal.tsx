'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { EASE_CINEMATIC } from '@/lib/motion';

type TextRevealProps = {
  text: string;
  className?: string;
  /** Extra classes applied to words listed in `highlight`. */
  highlightClassName?: string;
  /** Words rendered with `highlightClassName`, matched case-insensitively. */
  highlight?: string[];
  delay?: number;
  stagger?: number;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
};

const wordVariants = {
  // No blur: this runs per word on the h1, and `filter` cannot be composited.
  hidden: { opacity: 0, y: '0.6em', rotateX: -70 },
  visible: {
    opacity: 1,
    y: '0em',
    rotateX: 0,
    transition: { duration: 0.85, ease: EASE_CINEMATIC },
  },
};

/**
 * Splits a line into words and swings each one up on the X axis, so headlines
 * arrive as a sequence rather than a single fade. Screen readers get the whole
 * string from the wrapper's aria-label.
 */
export default function TextReveal({
  text,
  className = '',
  highlightClassName = '',
  highlight = [],
  delay = 0,
  stagger = 0.055,
  as = 'span',
}: TextRevealProps) {
  const Component = motion[as];
  const normalisedHighlights = highlight.map((word) => word.toLowerCase());
  const words = text.split(' ');

  return (
    <Component
      aria-label={text}
      className={className}
      style={{ transformStyle: 'preserve-3d' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.5 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((word, index) => {
        const isHighlighted = normalisedHighlights.includes(
          word.toLowerCase().replace(/[^a-z0-9'-]/gi, ''),
        );

        return (
          <span
            key={`${word}-${index}`}
            aria-hidden
            className="inline-block overflow-hidden align-bottom"
            style={{ perspective: 800 }}
          >
            <motion.span
              variants={wordVariants}
              className={`inline-block ${isHighlighted ? highlightClassName : ''}`}
              style={{ transformOrigin: 'bottom center' }}
            >
              {word}
            </motion.span>
            {index < words.length - 1 && <span className="inline-block">&nbsp;</span>}
          </span>
        );
      })}
    </Component>
  );
}
