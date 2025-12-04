'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Badge } from './ui/badge';
import useMeasure from 'react-use-measure';

export function DraggableServices({ services }: { services: string[] }) {
  const [ref, { width, height }] = useMeasure();

  return (
    <div ref={ref} className="relative w-full h-full">
      {services.map((service, index) => (
        <motion.div
          key={service}
          drag
          dragConstraints={{
            left: 0,
            right: width - 100, // Assuming pill width is around 100px
            top: 0,
            bottom: height - 40, // Assuming pill height is around 40px
          }}
          dragElastic={0.2}
          className="absolute cursor-grab"
          style={{
            x: Math.random() * (width - 100),
            y: Math.random() * (height - 40),
          }}
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 2 + index * 0.2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Badge
            variant="outline"
            className="bg-white/80 backdrop-blur-sm border-0 text-black text-sm"
          >
            {service}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
