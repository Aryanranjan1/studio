
import { Palette, Code, Bot, Smartphone, Search, Gem, Sparkles, Server, Gauge, Rocket, LucideProps } from 'lucide-react';
import React from 'react';

const icons = {
  Palette,
  Code,
  Bot,
  Smartphone,
  Search,
  Gem,
  Sparkles,
  Server,
  Gauge,
  Rocket,
};

export const IconComponent = ({ iconName, ...props }: { iconName: string } & LucideProps) => {
  const Icon = icons[iconName as keyof typeof icons];
  if (!Icon) return null;
  return <Icon {...props} />;
};
