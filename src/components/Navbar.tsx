"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingBag, Menu as MenuIcon, X, Phone, Flame, ChevronRight, Globe, Bike } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderTrackerModal, ActiveOrderData } from '@/components/OrderTrackerModal';

export function Navbar() {
  const pathname = usePathname();

  if (pathname === '/hub') {
    return null;
  }

  const { totalItemsCount, setIsCartOpen } = useCart();
  const { toggleLang, isAr, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState<ActiveOrderData | null>(null);
  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  useEffect(() => {
    const checkActiveOrder = () => {
      try {
        const stored = localStorage.getItem('bb_active_order');
        if (stored) {
          setActiveOrder(JSON.parse(stored));
        } else {
          setActiveOrder(null);
        }
      } catch (e) {
        setActiveOrder(null);
      }
    };

    checkActiveOrder();

    window.addEventListener('bb_order_updated', checkActiveOrder);
    window.addEventListener('storage', checkActiveOrder);

    return () => {
      window.removeEventListener('bb_order_updated', checkActiveOrder);
      window.removeEventListener('storage', checkActiveOrder);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: isAr ? 'الرئيسية' : 'Home', href: '/' },
    { name: isAr ? 'المنيو والطلب' : 'Order Online', href: '/menu' },
    { name: isAr ? 'عن بلاك برجر' : 'About BB', href: '/about' },
    { name: isAr ? 'تواصل معنا' : 'Contact Us', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/95 backdrop-blur-md border-b border-red-900/40 shadow-2xl py-1.5 sm:py-2'
          : 'bg-gradient-to-b from-black via-black/80 to-transparent py-2.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        
        {/* Left Side: Brand Logo + Nav Links */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <Link href="/" className="relative flex items-center group shrink-0">
            <div className="relative w-32 h-10 sm:w-44 sm:h-14 md:w-52 md:h-16 hover:scale-105 transition-transform">
              <Image
                src="/images/logo.png"
                alt="BLACK BURGER"
                fill
                className="object-contain object-left"
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
                      className="absolute inset-0 bg-[#EA1F27] rounded-full -z-10 shadow-[0_0_12px_rgba(234,31,39,0.8)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                    />
                  )}
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions: Language + Cart + Mobile Toggle + Order CTA */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          
          {/* Active Order Live Progress Tracker Pill */}
          {activeOrder && (
            <button
              onClick={() => setIsTrackerOpen(true)}
              className="flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-red-600 via-amber-600 to-red-600 hover:scale-105 text-white font-mono font-bold text-[11px] sm:text-xs border border-red-400/50 shadow-[0_0_15px_rgba(234,31,39,0.6)] animate-pulse shrink-0"
              title={isAr ? "متابعة الطلب المباشرة" : "Track Active Order"}
            >
              <Bike className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="hidden sm:inline">{isAr ? `متابعة الطلب #${activeOrder.orderId}` : `Track #${activeOrder.orderId}`}</span>
              <span className="sm:hidden">{isAr ? "متابعة الطلب" : "Track"}</span>
            </button>
          )}

          {/* Hotline Button (Desktop) */}
          <a
            href="tel:01515821555"
            className="hidden xl:flex items-center gap-2 text-xs font-mono font-bold text-zinc-300 hover:text-[#03A0E5] transition-colors bg-zinc-900 border border-zinc-800 px-3 py-2 rounded-xl"
          >
            <Phone className="w-3.5 h-3.5 text-[#03A0E5]" />
            <span>01515821555</span>
          </a>

          {/* Language Switcher Button (Desktop & Tablet) */}
          <button
            onClick={toggleLang}
            className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-[#CDB32D]/60 text-xs font-mono font-bold text-zinc-200 hover:text-white transition-all shadow-sm"
            aria-label="Switch Language"
            title={isAr ? "Switch to English" : "التحويل إلى العربية"}
          >
            <Globe className="w-4 h-4 text-[#CDB32D]" />
            <span className="tracking-wide">{isAr ? 'EN' : 'العربية'}</span>
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 sm:p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-white hover:border-[#EA1F27]/60 hover:text-[#EA1F27] transition-all group shrink-0"
            aria-label="View Cart"
          >
            <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform" />
            {totalItemsCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-[#EA1F27] to-[#CDB32D] text-white font-mono font-black text-[10px] w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center shadow-md"
              >
                {totalItemsCount}
              </motion.span>
            )}
          </button>

          {/* Primary Order Now Button */}
          <Link
            href="/menu"
            className="relative group overflow-hidden bg-gradient-to-r from-[#EA1F27] via-[#D11820] to-[#B00E15] text-white font-mono font-bold px-3 sm:px-5 py-2 sm:py-2.5 rounded-xl text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(234,31,39,0.5)] border border-[#EA1F27]/30 hover:shadow-[0_0_30px_rgba(234,31,39,0.8)] transition-all flex items-center gap-1 sm:gap-1.5 shrink-0"
          >
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#CDB32D] animate-pulse shrink-0" />
            <span className="whitespace-nowrap">{t('orderNow')}</span>
          </Link>

          {/* Mobile menu trigger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-300 hover:text-white rounded-xl bg-zinc-900 border border-zinc-800 shrink-0"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" /> : <MenuIcon className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/98 border-b border-red-900/40 backdrop-blur-xl overflow-hidden font-mono shadow-2xl"
          >
            <div className="px-4 py-5 space-y-2.5 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between py-3 px-4 rounded-xl text-xs sm:text-sm font-bold tracking-wider uppercase transition-all ${
                    pathname === link.href
                      ? 'bg-red-600/20 text-red-500 border border-red-600/40'
                      : 'text-zinc-300 hover:bg-zinc-900'
                  }`}
                >
                  <span>{link.name}</span>
                  <ChevronRight className="w-4 h-4 text-zinc-500 rtl:rotate-180" />
                </Link>
              ))}

              <div className="pt-3 border-t border-zinc-800 flex flex-col gap-2.5">
                {activeOrder && (
                  <button
                    onClick={() => {
                      setIsTrackerOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center justify-center gap-2 text-xs font-bold text-white bg-gradient-to-r from-red-600 to-amber-600 py-3 rounded-xl shadow-lg border border-red-500/50"
                  >
                    <Bike className="w-4 h-4 text-amber-300" />
                    <span>{isAr ? `متابعة الطلب الحالي #${activeOrder.orderId}` : `Track Active Order #${activeOrder.orderId}`}</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    toggleLang();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 text-xs font-bold text-zinc-200 bg-zinc-900 border border-zinc-800 py-3 rounded-xl hover:text-amber-400 active:scale-[0.98] transition-all"
                >
                  <Globe className="w-4 h-4 text-[#CDB32D]" />
                  <span>{isAr ? 'تغيير إلى الإنجليزية (English)' : 'التحويل إلى اللغة العربية'}</span>
                </button>

                <a
                  href="tel:01515821555"
                  className="flex items-center justify-center gap-2 text-xs font-bold text-amber-400 bg-zinc-900 border border-zinc-800 py-3 rounded-xl active:scale-[0.98] transition-all"
                >
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>{isAr ? 'الخط الساخن: 01515821555' : 'Call Hotline: 01515821555'}</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <OrderTrackerModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        orderData={activeOrder}
      />
    </header>
  );
}