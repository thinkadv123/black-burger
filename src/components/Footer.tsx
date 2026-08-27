"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, MapPin, Clock, Flame, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  const [year, setYear] = useState<number>(2025);

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
            <Link href="/" className="flex items-center gap-3">
              <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-500/80 bg-black">
                <Image
                  src="/images/logo.png"
                  alt="BLACK BURGER"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-black text-2xl tracking-tight text-white block">
                  BLACK <span className="text-red-600">BURGER</span>
                </span>
                <span className="text-xs tracking-widest text-amber-400 font-semibold uppercase">
                  Smash & Angus
                </span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Black Burger was created for people who believe burgers should be bold, handcrafted, and unforgettable. 100% Angus Beef smashed to crispy perfection.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-950/80 text-red-400 border border-red-800/50 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5" /> 100% Angus Beef
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-950/80 text-amber-400 border border-amber-800/50">
                Cash on Delivery
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 border-red-600 pl-3">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm font-semibold">
              <li>
                <Link href="/" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Smash Burgers & Menu
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Our Story & Smash Craft
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-zinc-400 hover:text-red-500 transition-colors">
                  Contact & Location
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 border-red-600 pl-3">
              Order Hotline & Location
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3 text-zinc-300">
                <Phone className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">Order Hotline:</span>
                  <a href="tel:01515821555" className="text-base font-bold text-amber-400 hover:underline">
                    01515821555
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">Branch Location:</span>
                  <span className="font-semibold text-zinc-200">
                    Faisal - In front of Tawheed & Nour
                  </span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block text-xs text-zinc-500 font-medium">Opening Hours:</span>
                  <span className="font-semibold text-zinc-200">
                    Everyday: 12:00 PM – 3:00 AM
                  </span>
                </div>
              </li>
            </ul>
          </div>

          {/* Order Guarantee & Payment */}
          <div>
            <h3 className="text-lg font-black tracking-wider uppercase text-white mb-4 border-l-4 border-amber-500 pl-3">
              Delivery & Guarantee
            </h3>
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white uppercase">Piping Hot Guarantee</h4>
                  <p className="text-[11px] text-zinc-400">Freshly smashed upon receiving your order.</p>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800/80">
                <span className="text-xs text-zinc-400 block mb-2 font-medium">Payment Methods:</span>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-zinc-800 text-[11px] text-zinc-200 font-bold border border-zinc-700">
                    💵 Cash on Delivery
                  </span>
                  <span className="px-2.5 py-1 rounded bg-emerald-950/80 text-[11px] text-emerald-400 font-bold border border-emerald-800/60">
                    💬 WhatsApp Order
                  </span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {year} BLACK BURGER. All rights reserved. Smash Burgers Made Different.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart className="w-3.5 h-3.5 text-red-600 fill-red-600" /> for smash burger lovers.
          </p>
        </div>
      </div>
    </footer>
  );
}