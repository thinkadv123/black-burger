"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Flame, ShieldCheck, Heart } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const [year, setYear] = useState<number>(2025);
  const { isAr, t } = useLanguage();

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="bg-black text-white border-t border-zinc-800/80 relative overflow-hidden">
      {/* Red ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-600/10 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-zinc-800/80">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link href="/" className="inline-block hover:scale-105 transition-transform">
              <div className="relative w-56 sm:w-64 h-20 sm:h-24">
                <Image
                  src="/images/logo.png"
                  alt="BLACK BURGER"
                  fill
                  className="object-contain object-left rtl:object-right"
                  priority
                />
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              {t('footerTagline')}
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#EA1F27]/10 text-[#EA1F27] border border-[#EA1F27]/30 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> {isAr ? '100% لحم أنجوس' : '100% Angus Beef'}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#03A0E5]/10 text-[#03A0E5] border border-[#03A0E5]/30">
                {isAr ? 'توصيل سريع' : 'Fast Delivery'}
              </span>
            </div>

            {/* Social Media Links */}
            <div className="pt-3">
              <span className="text-xs text-zinc-400 font-bold block mb-2">
                {isAr ? 'تابعنا على مواقع التواصل:' : 'Follow Black Burger:'}
              </span>
              <div className="flex items-center gap-2.5">
                <a
                  href="https://www.instagram.com/blackburger.eg?stkn=MW1udGh6cWVscHdwcg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#E1306C] hover:bg-[#E1306C]/20 hover:scale-110 transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-current group-hover:text-[#E1306C]" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href="https://www.facebook.com/share/19TrNwkt2J/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-[#1877F2] hover:bg-[#1877F2]/20 hover:scale-110 transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-current group-hover:text-[#1877F2]" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
                <a
                  href="https://www.tiktok.com/@blackburger.eg?_r=1&_t=ZS-99wRy2EC0Q6"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="TikTok"
                  className="w-9 h-9 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white hover:border-cyan-400 hover:bg-cyan-950/30 hover:scale-110 transition-all shadow-md group"
                >
                  <svg className="w-4 h-4 fill-current group-hover:text-cyan-400" viewBox="0 0 24 24">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.82.56-1.31 1.56-1.27 2.55.01 1.01.52 1.98 1.35 2.55.82.57 1.9.68 2.84.42.92-.25 1.73-.93 2.1-1.8.21-.49.28-1.02.27-1.55.03-4.51.02-9.03.02-13.54z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#EA1F27] pl-3 rtl:pl-0 rtl:pr-3">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-[#EA1F27] transition-colors">
                  {isAr ? 'الرئيسية' : 'Black Burger Home'}
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-zinc-400 hover:text-[#EA1F27] transition-colors">
                  {isAr ? 'طلب أونلاين' : 'Order Online Now'}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-[#EA1F27] transition-colors">
                  {isAr ? 'عن بلاك برجر' : 'About BB'}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-[#EA1F27] transition-colors">
                  {isAr ? 'تواصل معنا' : 'Contact Us'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#03A0E5] pl-3 rtl:pl-0 rtl:pr-3">
              {t('contactUs')}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-[#03A0E5] shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">{isAr ? 'الخط الساخن للطلبات:' : 'Order Hotline:'}</span>
                  <a href="tel:01515821555" className="text-base font-bold text-[#CDB32D] hover:underline">
                    01515821555
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">{isAr ? 'موقع الفرع:' : 'Branch Location:'}</span>
                  <span className="font-semibold text-zinc-200">
                    {isAr ? 'فيصل - أمام التوحيد والنور' : 'Faisal - In front of Tawheed & Nour'}
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">{t('openingHours')}:</span>
                  <span className="font-semibold text-zinc-200">
                    {t('everydayHours')}
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Order Guarantee & Payment */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 rtl:border-l-0 rtl:border-r-4 border-amber-500 pl-3 rtl:pl-0 rtl:pr-3">
              {isAr ? 'التوصيل والضمان' : 'Delivery & Guarantee'}
            </h3>
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">{isAr ? 'ضمان السخونة والجودة' : 'Piping Hot Guarantee'}</h4>
                  <p className="text-[11px] text-zinc-400">{isAr ? 'يتم تحضيرها فور استلام الطلب مباشرة.' : 'Freshly smashed upon receiving your order.'}</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-400 block mb-2 font-medium">{isAr ? 'طريقة الدفع:' : 'Payment Methods:'}</span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-[11px] text-zinc-200 font-bold border border-zinc-700">
                    💵 {isAr ? 'الدفع عند الاستلام' : 'Cash on Delivery'}
                  </span>
                  <a
                    href="https://wa.me/201144484008?text=Hello%20Black%20Burger!%20I%20want%20to%20place%20an%20order."
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1 rounded bg-emerald-950/80 hover:bg-emerald-900 text-[11px] text-emerald-400 font-bold border border-emerald-800/60 transition-colors"
                  >
                    💬 {isAr ? 'طلب عبر الواتساب' : 'WhatsApp Order'}
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {year} BLACK BURGER. {t('allRightsReserved')}</p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <p className="flex items-center gap-1">
              {isAr ? 'تم التطوير بـ' : 'Crafted with'} <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" /> {isAr ? 'لعشاق البرجر المشوي.' : 'for smash burger lovers.'}
            </p>
            <span className="hidden sm:inline text-zinc-700">•</span>
            <p>
              Designed by{' '}
              <a
                href="https://thinkadv.com"
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-zinc-300 hover:text-[#03A0E5] transition-colors underline underline-offset-2"
              >
                Thinkadv
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
