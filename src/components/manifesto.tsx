'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const text = "WE DO NOT BUILD WEBSITES. WE ENGINEER DIGITAL ECOSYSTEMS. OUR CODE IS CLEAN, OUR DESIGN IS BRUTAL, AND OUR STRATEGY IS ABSOLUTE.";

const highlightWords = ["DIGITAL", "ECOSYSTEMS.", "ABSOLUTE."];

export function Manifesto() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const sentence = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const letter = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const metaVariants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1, transition: { delay: text.split(' ').length * 0.05 + 0.5, duration: 1 } }
  }

  return (
    <section ref={ref} className="manifesto-section flex items-center min-h-[80vh] py-36 px-10 border-b border-border-active bg-bg-color">
      <div className="manifesto-container max-w-6xl mx-auto">
        <motion.p
          className="manifesto-text font-display text-4xl md:text-5xl leading-tight uppercase font-normal"
          variants={sentence}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {text.split(" ").map((word, index) => (
            <motion.span
              key={word + "-" + index}
              variants={letter}
              className={`word-span inline-block mr-4 ${highlightWords.includes(word) ? 'text-primary' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </motion.p>
        <motion.div
            className="manifesto-meta flex flex-col md:flex-row gap-5 md:gap-10 mt-16 font-tech text-neutral-400 text-sm"
            variants={metaVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
        >
            <span>// SCROLL TO EXPLORE</span>
            <span>// BASED IN KUALA LUMPUR</span>
            <span>// GLOBAL REACH</span>
        </motion.div>
      </div>
    </section>
  );
}
