
import { Instagram, Linkedin } from 'lucide-react';
import { FaInstagram, FaLinkedin, FaDribbble, FaPinterest } from 'react-icons/fa6';

export type SocialLink = {
  name: string;
  href: string;
  Icon: React.ElementType;
  isReactIcon?: boolean;
};

export const socialLinks: SocialLink[] = [
  { name: 'Instagram', href: 'https://instagram.com', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://linkedin.com', Icon: Linkedin },
  { name: 'Dribbble', href: 'https://dribbble.com', Icon: FaDribbble, isReactIcon: true },
  { name: 'Pinterest', href: 'https://pinterest.com', Icon: FaPinterest, isReactIcon: true },
];

export const contactSocials: SocialLink[] = [
    { name: 'Instagram', href: 'https://instagram.com', Icon: FaInstagram, isReactIcon: true },
    { name: 'LinkedIn', href: 'https://linkedin.com', Icon: FaLinkedin, isReactIcon: true },
    { name: 'Dribbble', href: 'https://dribbble.com', Icon: FaDribbble, isReactIcon: true },
    { name: 'Pinterest', href: 'https://pinterest.com', Icon: FaPinterest, isReactIcon: true },
];
