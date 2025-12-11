
import { Instagram, Linkedin, Twitter, Youtube, Gitlab } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaDribbble, FaBehance } from 'react-icons/fa6';

export type SocialLink = {
  name: string;
  href: string;
  Icon: React.ElementType;
  isReactIcon?: boolean;
};

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: '#', Icon: Instagram },
  { name: 'LinkedIn', href: '#', Icon: Linkedin },
  { name: 'Dribbble', href: '#', Icon: FaDribbble, isReactIcon: true },
  { name: 'Behance', href: '#', Icon: FaBehance, isReactIcon: true },
  { name: 'Twitter/X', href: '#', Icon: Twitter },
  { name: 'YouTube', href: '#', Icon: Youtube },
  { name: 'Gitlab', href: '#', Icon: Gitlab },
];

export const contactSocials: SocialLink[] = [
  { name: 'Instagram', href: '#', Icon: FaInstagram, isReactIcon: true },
  { name: 'LinkedIn', href: '#', Icon: FaLinkedin, isReactIcon: true },
  { name: 'Dribbble', href: '#', Icon: FaDribbble, isReactIcon: true },
  { name: 'Behance', href: '#', Icon: FaBehance, isReactIcon: true },
];
