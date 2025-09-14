'use client';

import React from 'react';
import './staggered-menu.css';
import { AmpireLogo } from './logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

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

  return (
    <div className={cn('staggered-menu-wrapper', className)}>
      <header className="staggered-menu-header" aria-label="Main navigation header">
        <Link href="/" className="sm-logo" aria-label="Logo">
          <AmpireLogo className='h-8 w-auto text-primary' />
        </Link>
        
        <nav className="sm-nav">
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

        <div className="sm-cta">
          {cta}
        </div>
      </header>
    </div>
  );
};
