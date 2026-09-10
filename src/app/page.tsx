"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlider } from '@/components/HeroSlider';
import { ScrollStorytelling } from '@/components/ScrollStorytelling';
import { TalabatMenu } from '@/components/TalabatMenu';
import { BrandSection } from '@/components/BrandSection';
import { Flame, Phone, MapPin, Clock, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* 1. Hero Slider Section */}
      <HeroSlider />

      {/* 2. WE DON'T CUT CORNERS. WE SMASH THEM. Section (ScrollStorytelling) */}
      <ScrollStorytelling />

      {/* 3. Talabat-Style Order Section */}
      <TalabatMenu />

      {/* 4. Brand Pillars Section */}
      <BrandSection />

      {/* 5. Faisal Location & Direct Order CTA Banner */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950 border border-zinc-800 hover:border-red-600/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-mono font-bold uppercase">
                <MapPin className="w-4 h-4 text-red-500" /> FAISAL BRANCH HOTLINE
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-mono">
                HOT SMASH BURGERS DELIVERED TO <span className="text-red-600">YOUR DOOR</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Located right in front of Tawheed & Nour in Faisal. Order online for instant Cash on Delivery or call our hotline directly.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-zinc-300 font-mono">
                  <Phone className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Call Us: <strong className="text-amber-400 font-extrabold text-lg">01515821555</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <MapPin className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Address: <strong>Faisal - In front of Tawheed & Nour</strong></span>
                </div>
                <div className="flex items-center gap-3 text-sm text-zinc-300">
                  <Clock className="w-5 h-5 text-red-500 shrink-0" />
                  <span>Open Everyday: <strong>12:00 PM – 3:00 AM</strong></span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <a
                  href="#menu-section"
                  className="bg-gradient-to-r from-[#EA1F27] via-[#D11820] to-[#B00E15] text-white font-mono font-bold px-8 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(234,31,39,0.6)] hover:shadow-[#EA1F27]/80 transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-[#CDB32D] animate-pulse" />
                  <span>ORDER ONLINE NOW</span>
                </a>
                <a
                  href="tel:01515821555"
                  className="bg-zinc-900 border border-zinc-700 hover:border-[#CDB32D] text-[#CDB32D] font-mono font-bold px-6 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-[#EA1F27]" />
                  <span>CALL HOTLINE</span>
                </a>
              </div>
            </div>

            {/* Visual Banner */}
            <div className="relative h-72 sm:h-96 w-full rounded-2xl overflow-hidden border border-zinc-800 shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop"
                alt="Black Burger Faisal"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-widest block">
                  CASH ON DELIVERY ACCEPTED
                </span>
                <span className="text-xl font-mono font-black text-white">
                  Fast, Hot & Handcrafted Smash
                </span>
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
}
