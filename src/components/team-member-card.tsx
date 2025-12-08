
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

type Shape = 'circle' | 'squircle' | 'flower' | 'octagon';

interface TeamMemberCardProps {
  imageUrl: string;
  shape: Shape;
  className?: string;
}

// Clip paths for the different shapes
const clipPaths: Record<Shape, string> = {
  circle: 'circle(50% at 50% 50%)',
  squircle: 'path("M 50,0 C 85,0 100,15 100,50 C 100,85 85,100 50,100 C 15,100 0,85 0,50 C 0,15 15,0 50,0 Z")',
  flower: 'path("M 50,0 C 65,0 75,10 85,25 C 95,40 100,50 100,50 C 100,50 95,60 85,75 C 75,90 65,100 50,100 C 35,100 25,90 15,75 C 5,60 0,50 0,50 C 0,50 5,40 15,25 C 25,10 35,0 50,0 Z")',
  octagon: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)',
};

export function TeamMemberCard({ imageUrl, shape, className }: TeamMemberCardProps) {
  return (
    <div
      className={cn('relative w-32 h-32', className)}
      style={{ clipPath: clipPaths[shape] }}
    >
      <Image
        src={imageUrl}
        alt="Team member portrait"
        fill
        className="object-cover"
      />
    </div>
  );
}
