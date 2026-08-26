"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { HeroSlider } from '@/components/HeroSlider';
import { ScrollStorytelling } from '@/components/ScrollStorytelling';
import { BrandSection } from '@/components/BrandSection';
import { ProductCard } from '@/components/ProductCard';
import { MENU_ITEMS } from '@/data/menu';
import { Flame, Phone, MapPin, ArrowRight, Star, Clock, Sparkles, Utensils } from 'lucide-react';

export default function HomePage() {
  const topSellers = MENU_ITEMS.filter((item) => item.popular).slice(0, 3);

  return (
    <div className="bg-black text-white min-h-screen">
      
      {/* Hero Slider Section */}
      <HeroSlider />

      {/* Scroll Storytelling Section (WE DON'T CUT CORNERS. WE SMASH THEM.) */}
      <ScrollStorytelling />

      {/* Featured Top Sellers Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-800 pb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-black tracking-widest uppercase">
              <Flame className="w-4 h-4 text-amber-400" /> CRAVED TOP SELLERS
            </div>
            <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
              SIGNATURE <span className="text-red-gradient">SMASH CROWD FAVORITES</span>
            </h2>
            <p className="text-zinc-400 text-sm max-w-xl">
              Hand-smashing double Angus beef patties with crispy lace edges, rich melted cheddar, and secret BB sauce.
            </p>
          </div>

          <Link
            href="/menu"
            className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-amber-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 px-6 py-3.5 rounded-full transition-all shrink-0"
          >
            <span>VIEW FULL MENU</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Top Sellers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Brand Pillars Section */}
      <BrandSection />

      {/* Faisal Location & Direct Order CTA Banner */}
      <section className="py-20 bg-zinc-950 border-t border-zinc-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950 border border-zinc-800 hover:border-red-600/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center shadow-2xl">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase">
                <MapPin className="w-4 h-4 text-red-500" /> FAISAL BRANCH HOTLINE
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                HOT SMASH BURGERS DELIVERED TO <span className="text-red-600">YOUR DOOR</span>
              </h2>

              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                Located right in front of Tawheed & Nour in Faisal. Order online for instant Cash on Delivery or call our hotline directly.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3 text-sm text-zinc-300">
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
                <Link
                  href="/menu"
                  className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black px-8 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:shadow-red-600/80 transition-all flex items-center gap-2"
                >
                  <Flame className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>ORDER ONLINE NOW</span>
                </Link>
                <a
                  href="tel:01515821555"
                  className="bg-zinc-900 border border-zinc-700 hover:border-amber-400 text-amber-400 font-bold px-6 py-4 rounded-full text-xs sm:text-sm tracking-wider uppercase transition-colors flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-red-500" />
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
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                  CASH ON DELIVERY ACCEPTED
                </span>
                <span className="text-xl font-black text-white">
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
