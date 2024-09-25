'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
      const handleScroll = () => {setIsScrolled(window.scrollY > 10)};
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll)
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
      isScrolled && "bg-background/75"
    )}>
      <div className="container flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-bold">API Docs</span>
        </Link>
        <nav className="flex items-center space-x-6 text-sm font-medium">
          <Link href="/apis">APIs</Link>
          <Link href="/docs">Docs</Link>
          <Link href="/contact">Contact Us</Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <Button>Sign In</Button>
          <Button>Sign Up</Button>
        </div>
      </div>
    </header>
  );
}