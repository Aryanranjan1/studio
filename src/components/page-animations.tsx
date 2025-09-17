"use client";

import { motion } from "framer-motion";

const PageAnimations = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-screen bg-background z-[100] origin-bottom"
      initial={{ scaleY: 1 }}
      animate={{ scaleY: 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
    />
  );
};

export default PageAnimations;