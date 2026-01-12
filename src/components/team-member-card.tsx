
'use client';

import { cn } from '@/lib/utils';
import { IconComponent } from '@/components/icons';

interface TeamMemberCardProps {
  icon: string;
  className?: string;
}

export function TeamMemberCard({ icon, className }: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        'relative w-24 h-24 flex items-center justify-center rounded-2xl bg-muted/50',
        className
      )}
    >
      <IconComponent iconName={icon} className="h-10 w-10 text-primary" />
    </div>
  );
}
