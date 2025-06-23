'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/logo';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { href: '/farms', label: '농장' },
  { href: '/dashboard', label: '대시보드' },
  { href: '/farms/register', label: '농장 등록' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-card/80 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="hidden md:flex items-center gap-2">
            <Button variant="ghost" asChild>
              <Link href="/sign-in">로그인</Link>
            </Button>
            <Button asChild>
              <Link href="/sign-up">회원가입</Link>
            </Button>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              <span className="sr-only">메뉴 토글</span>
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden pb-4">
          <nav className="flex flex-col items-center gap-4 px-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex w-full flex-col gap-2 pt-4 border-t">
              <Button variant="ghost" asChild className="w-full">
                <Link href="/sign-in" onClick={() => setIsOpen(false)}>로그인</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/sign-up" onClick={() => setIsOpen(false)}>회원가입</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
