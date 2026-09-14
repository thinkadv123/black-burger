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
          <p className="flex items-center gap-1">
            {isAr ? 'تم التطوير بـ' : 'Crafted with'} <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" /> {isAr ? 'لعشاق البرجر المشوي.' : 'for smash burger lovers.'}
          </p>
        </div>
      </div>
    </footer>
  );
}
