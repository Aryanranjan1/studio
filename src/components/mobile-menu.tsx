
'use client';

import { FlowingMenu } from './flowing-menu';
import { cn } from '@/lib/utils';

const menuItems = [
    { text: 'Home', link: '/', image: 'https://picsum.photos/seed/menu-home/400/200' },
    { text: 'About', link: '/about', image: 'https://picsum.photos/seed/menu-about/400/200' },
    { text: 'Services', link: '/services', image: 'https://picsum.photos/seed/menu-services/400/200' },
    { text: 'Work', link: '/work', image: 'https://picsum.photos/seed/menu-work/400/200' },
    { text: 'Contact', link: '/contact', image: 'https://picsum.photos/seed/menu-contact/400/200' },
];

interface MobileMenuProps {
    isOpen: boolean;
}

export function MobileMenu({ isOpen }: MobileMenuProps) {
    return (
        <div className={cn(
            'fixed inset-0 z-10 h-screen w-screen transform transition-transform duration-500 ease-in-out lg:hidden',
            isOpen ? 'translate-x-0' : 'translate-x-full'
        )}>
            <FlowingMenu items={menuItems} />
        </div>
    );
}
