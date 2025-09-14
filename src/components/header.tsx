'use client'
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Menu, X } from 'lucide-react'
import { useScroll } from 'framer-motion'
import { AmpireLogo } from './logo'
import { ThemeSwitcher } from './theme-switcher'

const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'About', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'Work', ariaLabel: 'View our work', link: '/work' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '/contact' }
  ];

export const Header = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const [visible, setVisible] = React.useState(true);
    const [lastScrollY, setLastScrollY] = React.useState(0);
    const { scrollY } = useScroll();

    React.useEffect(() => {
        return scrollY.on("change", (latest) => {
            setScrolled(latest > 50);
            if (latest > lastScrollY && latest > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }
            setLastScrollY(latest);
        })
    }, [scrollY, lastScrollY]);

    return (
        <header>
            <nav
                data-state={menuState ? 'active' : 'inactive'}
                className={cn('group fixed z-50 w-full pt-2 transition-transform duration-300', visible ? 'translate-y-0' : '-translate-y-full')}>
                <div className={cn('mx-auto max-w-7xl rounded-3xl px-6 transition-all duration-300 lg:px-12', scrolled && 'bg-background/50 backdrop-blur-2xl')}>
                    <div
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-3 duration-200 lg:gap-0 lg:py-6', scrolled && 'lg:py-4')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <AmpireLogo />
                                <span className='font-headline text-xl font-bold'>AMpire</span>
                            </Link>

                            <div className="flex items-center gap-2">
                                <div className='lg:hidden'>
                                    <ThemeSwitcher />
                                </div>
                                <button
                                    onClick={() => setMenuState(!menuState)}
                                    aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                    className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                    <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                    <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                                </button>
                            </div>
                        </div>
                        
                        <div className={cn("lg:flex lg:items-center lg:w-auto", menuState ? "block w-full" : "hidden")}>
                            <div className={cn("bg-background lg:bg-transparent rounded-3xl lg:rounded-none border lg:border-none p-6 lg:p-0 shadow-2xl lg:shadow-none shadow-zinc-300/20 dark:shadow-none mt-4 lg:mt-0",
                                "w-full flex-wrap items-center justify-end space-y-8 md:flex-nowrap lg:flex lg:gap-6 lg:space-y-0"
                            )}>
                                <div className="hidden lg:block">
                                    <ul className="flex gap-8 text-sm">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.link}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="lg:hidden">
                                    <ul className="space-y-6 text-base">
                                        {menuItems.map((item, index) => (
                                            <li key={index}>
                                                <Link
                                                    href={item.link}
                                                    onClick={() => setMenuState(false)}
                                                    className="text-muted-foreground hover:text-accent-foreground block duration-150">
                                                    <span>{item.label}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="flex w-full flex-col items-center space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit border-t lg:border-none pt-6 lg:pt-0">
                                    <div className='hidden lg:block'>
                                        <ThemeSwitcher />
                                    </div>
                                    <Button
                                        asChild
                                        size="sm">
                                        <Link href="/contact">
                                            <span>Get Started</span>
                                        </Link>
                                    </Button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </header>
    )
}
