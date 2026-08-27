"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Flame, ShieldCheck, CheckCircle2, ChevronRight, Zap, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function ScrollStorytelling() {
  const [transformationStage, setTransformationStage] = useState<'raw' | 'sear' | 'finished'>('finished');

  const transformationStages = {
    raw: {
      title: '1. Hand-Rolled 100% Angus Beef',
      desc: 'Fresh 100% grass-fed Angus beef chuck patty, perfectly seasoned with coarse sea salt and cracked black pepper before touching the griddle.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=1000&auto=format&fit=crop',
      badge: 'STRIATED MARBLING',
    },
    sear: {
      title: '2. High-Heat Smash Sear',
      desc: 'Smashed ultra-thin on 450°F cast iron to lock in natural juices and create our iconic lacy caramelized crispy crust.',
      image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=1000&auto=format&fit=crop',
      badge: '450°F CAST IRON',
    },
    finished: {
      title: '3. The Masterpiece Assembled',
      desc: 'Double melted American cheddar, grilled balsamic onions, pickles, and proprietary BB sauce tucked inside butter-toasted brioche.',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
      badge: 'BLACK BURGER CLASSIC',
    },
  };

  const ingredientsList = [
    {
      step: '01',
      tag: '100% PURE ANGUS',
      title: '100% ANGUS BEEF',
      subtitle: 'Zero Fillers • Daily Ground Chuck',
      desc: 'Zero fillers, zero soy. Pure coarse ground grass-fed Angus beef chuck with optimal marbling for maximum rich flavor and juice retention.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 shadow-[0_15px_35px_rgba(220,38,38,0.25)]',
      badgeBg: 'bg-red-600 text-white',
    },
    {
      step: '02',
      tag: 'BAKED FRESH DAILY',
      title: 'FRESH BRIOCHE BUNS',
      subtitle: 'Artisanal Golden Pillow',
      desc: 'Artisanal golden brioche baked fresh every morning, lightly slathered in butter and seared warm on the griddle to hold every drop of juice.',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-amber-500/70 shadow-[0_15px_35px_rgba(234,179,8,0.25)]',
      badgeBg: 'bg-amber-500 text-black',
    },
    {
      step: '03',
      tag: 'SECRET HOUSE RECIPES',
      title: 'SIGNATURE SAUCES',
      subtitle: 'House Made In Small Batches',
      desc: 'Handcrafted in-house daily—from our secret BB smash drizzle to rich truffle aioli, smoky chipotle, and fiery cayenne buffalo glaze.',
      image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 shadow-[0_15px_35px_rgba(220,38,38,0.25)]',
      badgeBg: 'bg-red-600 text-white',
    },
  ];

  return (
    <div className="bg-black text-white space-y-24 py-20 overflow-hidden">
      
      {/* 1. BUILT WITH QUALITY Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Visual with scroll reveal */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="relative h-[400px] sm:h-[500px] rounded-3xl overflow-hidden border border-zinc-800 shadow-[0_0_40px_rgba(220,38,38,0.3)] group"
          >
            <Image
              src="https://images.unsplash.com/photo-1586190848861-99aa4a171e90?q=80&w=1000&auto=format&fit=crop"
              alt="Built with quality smash burger"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Floating Gold Quality Seal */}
            <div className="absolute top-6 left-6 bg-zinc-950/90 border border-amber-500/50 p-3 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-amber-400 uppercase block">100% GUARANTEED</span>
                <span className="text-[11px] text-zinc-300">Always Fresh, Never Frozen</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-xs font-black tracking-widest text-red-500 uppercase block mb-1">
                HANDCRAFTED PERFECTION
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                BUILT WITH QUALITY
              </h3>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-black tracking-widest uppercase">
              <Flame className="w-3.5 h-3.5" /> THE BLACK BURGER STANDARD
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              WE DON&apos;T CUT CORNERS. <br />
              WE <span className="text-red-gradient">SMASH THEM.</span>
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              Every burger at Black Burger is crafted with precision. We start with custom-blended 100% Angus beef chuck, press it onto scorching cast iron, and sear it to caramelized perfection with paper-thin crispy lacy edges.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500" /> Searing Heat Tech
                </h4>
                <p className="text-xs text-zinc-400">Creates the Maillard reaction for maximum flavor crust.</p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> Butter Brioche
                </h4>
                <p className="text-xs text-zinc-400">Lightly toasted daily for soft, pillowy texture.</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-black px-6 py-3.5 rounded-full text-xs tracking-widest uppercase shadow-lg hover:shadow-red-600/50 transition-all"
              >
                <span>TASTE THE DIFFERENCE</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. STICKY SLIDE-OVER CARDS SECTION ("WHAT MAKES IT UNFORGETTABLE?") */}
      <section className="bg-zinc-950 border-y border-zinc-800/80 py-24 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              PURE UNCOMPROMISED INGREDIENTS
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              WHAT MAKES IT <span className="text-red-gradient">UNFORGETTABLE?</span>
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              Scroll down to explore how each ingredient layers together.
            </p>
          </div>

          {/* Sticky Card Stacking Container */}
          <div className="relative space-y-12 pb-16">
            {ingredientsList.map((item, idx) => {
              // Calculate sticky top offset so cards stack nicely over each other on scroll
              const topStickyOffset = `${6.5 + idx * 1.5}rem`;

              return (
                <div
                  key={item.title}
                  className={`sticky rounded-3xl bg-zinc-900/95 border ${item.accentColor} p-6 sm:p-8 backdrop-blur-2xl transition-all relative overflow-hidden`}
                  style={{
                    top: topStickyOffset,
                    zIndex: idx + 10,
                  }}
                >
                  {/* Subtle Red/Gold glow background */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    
                    {/* Left Thumbnail Image */}
                    <div className="md:col-span-5 relative aspect-video sm:aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase ${item.badgeBg}`}>
                          {item.step}
                        </span>
                        <span className="bg-black/80 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-1 rounded-lg uppercase">
                          {item.tag}
                        </span>
                      </div>
                    </div>

                    {/* Right Details */}
                    <div className="md:col-span-7 space-y-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block">
                          {item.subtitle}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase mt-0.5">
                          {item.title}
                        </h3>
                      </div>

                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                        {item.desc}
                      </p>

                      <div className="pt-2 flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        <span>Black Burger Master Standard</span>
                      </div>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 3. BURGER TRANSFORMATION SECTION (Raw ingredients -> Sear -> Finished Smash) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-[0_0_50px_rgba(220,38,38,0.2)]">
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            {/* Interactive Stage Selector Controls */}
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 text-xs font-black uppercase">
                <Zap className="w-3.5 h-3.5" /> INTERACTIVE SMASH PROCESS
              </div>

              <h2 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
                RAW INGREDIENTS TO <span className="text-red-gradient">ICONIC SMASH</span>
              </h2>

              <p className="text-zinc-400 text-sm sm:text-base">
                Click through the stages below to witness how we transform pure raw Angus beef into Cairo&apos;s crispiest smash burger.
              </p>

              {/* Controls */}
              <div className="space-y-3">
                {(['raw', 'sear', 'finished'] as const).map((stageKey) => {
                  const isActive = transformationStage === stageKey;
                  const currentInfo = transformationStages[stageKey];
                  return (
                    <button
                      key={stageKey}
                      onClick={() => setTransformationStage(stageKey)}
                      className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        isActive
                          ? 'border-red-600 bg-red-950/40 text-white shadow-[0_0_20px_rgba(220,38,38,0.4)]'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <div>
                        <span className="font-extrabold text-sm sm:text-base block text-white">
                          {currentInfo.title}
                        </span>
                        <span className="text-xs text-zinc-400 font-medium">{currentInfo.badge}</span>
                      </div>
                      <div className={`w-4 h-4 rounded-full border ${isActive ? 'bg-red-600 border-red-500' : 'border-zinc-600'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stage Preview Visual */}
            <div className="relative h-[380px] sm:h-[450px] w-full rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl">
              <motion.div
                key={transformationStage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <Image
                  src={transformationStages[transformationStage].image}
                  alt={transformationStages[transformationStage].title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/40" />
                
                <div className="absolute bottom-6 left-6 right-6 bg-black/80 backdrop-blur-md p-4 rounded-xl border border-zinc-800">
                  <span className="text-[10px] font-black tracking-widest text-amber-400 uppercase block">
                    STAGE PREVIEW
                  </span>
                  <p className="text-xs sm:text-sm text-zinc-200 mt-1">
                    {transformationStages[transformationStage].desc}
                  </p>
                </div>
              </motion.div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}