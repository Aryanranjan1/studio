
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const title = "Forging Digital Empires.";
const subtitle =
  "Discover the story, mission, and people behind AMpire Studio.";

const sentence = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const letter = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export function AboutHero() {
  return (
    <section className="relative flex h-[70vh] min-h-[500px] items-center justify-center text-white">
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/about-page.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 text-center">
        <motion.h1
          className="font-headline text-5xl font-bold tracking-tight text-white sm:text-7xl"
          variants={sentence}
          initial="hidden"
          animate="visible"
        >
          {title.split("").map((char, index) => (
            <motion.span key={char + "-" + index} variants={letter}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <motion.p
          className="mt-6 text-lg text-white/80 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
