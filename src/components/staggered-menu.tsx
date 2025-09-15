'use client';

import React, { useState, useEffect } from 'react';
import './staggered-menu.css';
import { AmpireLogo } from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';
import { ThemeSwitcher } from './theme-switcher';

interface MenuItem {
  label: string;
  ariaLabel: string;
  link: string;
}

interface StaggeredMenuProps {
  items?: MenuItem[];
  cta?: React.ReactNode;
  className?: string;
}

export const StaggeredMenu = ({
  items = [],
  cta,
  className,
}: StaggeredMenuProps) => {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { // if scroll down hide the navbar
          setVisible(false);
        } else { // if scroll up show the navbar
          setVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', controlNavbar);

      return () => {
        window.removeEventListener('scroll', controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <div className={cn('staggered-menu-wrapper', !visible && 'hidden', className)}>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <Link href="/" className="sm-logo" aria-label="Logo">
          <AmpireLogo className='h-8 w-auto text-primary' />
          <span className='font-headline text-xl font-bold ml-2'>AMpire</span>
        </Link>
        
        <nav className="sm-nav hidden md:flex">
          <ul className="sm-panel-list" role="list">
            {items && items.length > 0 && (
              items.map((it, idx) => (
                <li key={it.label + idx}>
                  <Link 
                    className={cn("sm-panel-item", pathname === it.link ? "active" : "")} 
                    href={it.link} 
                    aria-label={it.ariaLabel}
                  >
                    {it.label}
                  </Link>
                </li>
              ))
            )}
          </ul>
        </nav>

        <div className="sm-cta flex items-center gap-2">
            
            {cta}
        </div>
      </header>
    </div>
  );
};
