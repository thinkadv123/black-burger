"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Flame, ChevronRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const pathname = usePathname();
  const { totalItemsCount, setIsCartOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Black Burger Home', href: '/' },
    { name: 'Order Online Now', href: '/menu' },
    { name: 'About BB', href: '/about' },
    { name: 'Contact us', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-red-900/40 shadow-2xl py-2'
          : 'bg-gradient-to-b from-black via-black/80 to-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Left Side: Logo + Menu items right after */}
        <div className="flex items-center gap-4">
          {/* Left Brand Logo */}
          <Link href="/" className="relative flex items-center group shrink-0">
            <div className="relative w-20 h-20 sm:w-28 sm:h-28 hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="BLACK BURGER"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation Links directly after logo */}
          <nav className="hidden lg:flex items-center space-x-1 bg-zinc-900/80 border border-zinc-800 px-3 py-1.5 rounded-full backdrop-blur-sm">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative px-4 py-1.5 text-xs font-mono font-bold tracking-wider uppercase transition-colors rounded-full whitespace-nowrap ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="navbar-active"
                      className="absolute inset-0 bg-red-600 rounded-full -z-10 shadow-[0_0_12px_rgba(220,38,38,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-red-500" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>


        {/* Right Actions: Phone + Cart + Order CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          {/* Hotline Button (Desktop) */}
          <a
            href="tel:01515821555"
            className="hidden xl:flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-amber-400 transition-colors bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl"
          >
            <Phone className="w-3.5 h-3.5 text-red-500" />
            <span>01515821555</span>
          </a>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:border-red-600/60 hover:text-red-500 transition-all group"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
            {totalItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-red-600 to-amber-500 text-white font-mono font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md"
              >
                {totalItemsCount}
              </motion.span>
            )}
          </button>

          {/* Primary Order Now Button */}
          <Link
            href="/menu"
            className="relative group overflow-hidden bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-mono font-bold px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500/30 hover:shadow-[0_0_30px_rgba(220,38,38,0.8)] transition-all flex items-center gap-1.5"
          >
            <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>ORDER NOW</span>
          </Link>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/95 border-b border-red-900/40 backdrop-blur-xl overflow-hidden font-mono"
          >
            <div className="px-4 py-6 space-y-3 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-sm font-bold tracking-wider uppercase transition-all ${
                    pathname === link.href
                      ? 'bg-red-600/20 text-red-500 border border-red-600/40'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500" />
                </Link>
              ))}

              <div className="pt-4 border-t border-zinc-800 flex flex-col gap-3">
                <a
                  href="tel:01515821555"
                  className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 bg-zinc-900 border border-zinc-800 py-3 rounded-xl"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Call Hotline: 01515821555</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}