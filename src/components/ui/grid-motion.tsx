
'use client';

import { cn } from '@/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';

const generateGridItems = (count: number) => {
  return Array.from({ length: count }, (_, i) => `Item ${i + 1}`);
};

export const GridMotion = ({
  items,
  gradientColor = 'hsl(var(--primary))',
  className,
}: {
  items?: React.ReactNode[];
  gradientColor?: string;
  className?: string;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const gridItems = useMemo(() => {
    if (items && items.length > 0) {
      return items;
    }
    return generateGridItems(50);
  }, [items]);

  const grid_items_1 = useMemo(() => gridItems.slice(0, Math.ceil(gridItems.length / 3)), [gridItems]);
  const grid_items_2 = useMemo(() => gridItems.slice(Math.ceil(gridItems.length / 3), Math.ceil(gridItems.length / 3) * 2), [gridItems]);
  const grid_items_3 = useMemo(() => gridItems.slice(Math.ceil(gridItems.length / 3) * 2), [gridItems]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div
      className={cn(
        'grid-motion-wrapper group h-full w-full overflow-hidden',
        className
      )}
    >
      <div
        className="grid-motion-overlay"
        style={{ ['--gradient-color' as any]: gradientColor }}
      />
      <div className="grid-motion-container h-full w-full">
        <div className="grid-motion-col">
          {grid_items_1.map((item, i) => (
            <div className="grid-motion-item" key={i}>
              {item}
            </div>
          ))}
        </div>
        <div className="grid-motion-col">
          {grid_items_2.map((item, i) => (
            <div className="grid-motion-item" key={i}>
              {item}
            </div>
          ))}
        </div>
        <div className="grid-motion-col">
          {grid_items_3.map((item, i) => (
            <div className="grid-motion-item" key={i}>
              {item}
            </div>
          ))}
        </div>
      </div>
      <style>{`
        .grid-motion-wrapper {
            position: relative;
        }
        .grid-motion-overlay {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to bottom, transparent 20%, var(--gradient-color) 120%);
            z-index: 5;
            pointer-events: none;
        }
        .grid-motion-container {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        .grid-motion-col {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            min-height: 100%;
            min-width: 0;
            animation: scroll linear infinite;
        }
        .grid-motion-col:nth-child(1) {
            --duration: 40s;
            animation-duration: var(--duration);
        }
        .grid-motion-col:nth-child(2) {
            --duration: 60s;
            animation-duration: var(--duration);
            animation-direction: reverse;
        }
        .grid-motion-col:nth-child(3) {
            --duration: 45s;
            animation-duration: var(--duration);
        }
        .grid-motion-wrapper:hover .grid-motion-col {
            animation-play-state: paused;
        }
        .grid-motion-item {
            width: 100%;
            aspect-ratio: 1 / 1;
            border-radius: 0.75rem;
            overflow: hidden;
            background: hsl(var(--muted));
            transition: transform 0.3s ease;
        }
        .grid-motion-item:hover {
            transform: scale(1.05);
            z-index: 10;
        }

        @keyframes scroll {
            from { transform: translateY(-33.33%); }
            to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};
