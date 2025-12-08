
'use client';

import { cn } from '@/lib/utils';
import * as icons from 'lucide-react';

interface TeamMemberCardProps {
  icon: string;
  className?: string;
}

export function TeamMemberCard({ icon, className }: TeamMemberCardProps) {
  // @ts-ignore
  const IconComponent = icons[icon] as React.ElementType;

  return (
    <div
      className={cn(
        'relative w-24 h-24 flex items-center justify-center rounded-2xl bg-muted/50',
        className
      )}
    >
      {IconComponent && (
        <IconComponent className="h-10 w-10 text-primary" />
      )}
    </div>
  );
}
