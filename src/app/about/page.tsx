"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, ShieldCheck, Award, Heart, Sparkles, ChefHat, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-24">
      
      {/* Hero Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-400 text-xs font-black tracking-widest uppercase">
          <Award className="w-4 h-4 text-amber-400" /> THE BLACK BURGER STORY
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight max-w-4xl mx-auto">
          BURGERS SHOULD BE BOLD, <span className="text-red-gradient">HANDCRAFTED & UNFORGETTABLE.</span>
        </h1>

        <p className="text-zinc-400 text-base sm:text-xl leading-relaxed max-w-3xl mx-auto">
          Black Burger was created for people who believe true burgers are not mass-produced, but forged over searing heat with passion and pure ingredients.
        </p>
      </section>

      {/* Main Story & Image Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        
        {/* Story Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-black tracking-widest text-red-500 uppercase border-l-4 border-red-600 pl-3">
              THE SMASH PHILOSOPHY
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              THE ART OF THE <span className="text-red-600">HIGH-HEAT SEAR</span>
            </h2>
            <p className="text-zinc-300 text-base leading-relaxed">
              We smash our 100% Angus beef balls onto 450°F heavy cast-iron griddles. By pressing firmly for only a few critical seconds, we trigger the Maillard reaction—forming a deeply caramelized crisp crust that seals in juicy goodness.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-zinc-300 font-bold">
                <CheckCircle2 className="w-5 h-5 text-red-500" />
                <span>100% Pure Grass-Fed Angus Beef Chuck</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300 font-bold">
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
                <span>Zero Fillers, Soy, or Artificial Additives</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-zinc-300 font-bold">
                <CheckCircle2 className="w-5 h-5 text-red-500" />
                <span>Toasted Artisanal Butter Brioche Buns</span>
              </div>
            </div>
          </div>

          <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_40px_rgba(220,38,38,0.3)]">
            <Image
              src="https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop"
              alt="Smash Cooking Technique"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
            <div className="absolute bottom-6 left-6 right-6 bg-zinc-950/90 border border-zinc-800 p-4 rounded-2xl backdrop-blur-md">
              <span className="text-xs font-black text-amber-400 uppercase tracking-widest block">
                SEARING HEAT PRECISION
              </span>
              <span className="text-sm font-bold text-white">
                Crispy lacy edges with tender juicy center.
              </span>
            </div>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl font-black text-white uppercase tracking-tight">
              FOUR PILLARS OF <span className="text-red-gradient">BLACK BURGER</span>
            </h2>
            <p className="text-xs text-zinc-400 mt-2">The uncompromising standards behind every single order.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-red-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500 font-bold">
                <Flame className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">100% Angus Beef</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Hand-selected prime chuck cuts ground fresh daily with balanced marbling for optimal flavor release.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Fresh Brioche</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Golden pillow brioche buns baked fresh every morning, toasted with pure butter for soft richness.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-red-600/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500 font-bold">
                <ChefHat className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Secret Sauces</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Proprietary BB smash sauce, truffle aioli, smoked chipotle, and habanero crafted in small batches.
              </p>
            </div>

            <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-6 space-y-3 hover:border-amber-500/50 transition-colors">
              <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-800/60 flex items-center justify-center text-amber-400 font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-black text-white uppercase">Street Luxury</h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Merging raw urban energy with gourmet restaurant standard ingredients and presentation.
              </p>
            </div>

          </div>
        </div>

        {/* CTA Banner */}
        <div className="text-center py-8 space-y-6">
          <h2 className="text-3xl font-black text-white uppercase">READY TO TASTE THE SMASH?</h2>
          <Link
            href="/menu"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black px-8 py-4 rounded-full text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(220,38,38,0.6)] hover:shadow-red-600/80 transition-all"
          >
            <Flame className="w-4 h-4 text-amber-300" />
            <span>ORDER NOW FOR DELIVERY</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </section>

    </div>
  );
}
