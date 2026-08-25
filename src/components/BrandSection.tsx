"use client";

import React from 'react';
import { Flame, Sparkles, Award, ShieldCheck, Heart, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

export function BrandSection() {
  const brandPillars = [
    {
      icon: Flame,
      title: 'Premium Angus Beef',
      subtitle: '100% Grass-Fed Quality',
      description: 'We exclusively grind 100% Angus beef chuck every morning. Smashed high and hard on red-hot cast iron to lock in natural moisture with crisp lacy edges.',
      badge: 'ALWAYS FRESH',
      color: 'red',
    },
    {
      icon: Sparkles,
      title: 'Fresh Ingredients',
      subtitle: 'Zero Compromise Quality',
      description: 'Artisanal brioche buns, farm-picked crisp veggies, aged sharp American cheddar, and hand-selected dill pickles sliced fresh daily for maximum bite.',
      badge: 'FARM DIRECT',
      color: 'gold',
    },
    {
      icon: ChefHat,
      title: 'Signature Recipes',
      subtitle: 'Urban Flavor Fusion',
      description: 'House-made secret smash sauces, rich truffle aioli, smoky chipotle glazes, and loaded chaos trays engineered for burger lovers.',
      badge: 'PROPRIETARY',
      color: 'red',
    },
  ];

  return (
    <section className="bg-black py-24 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-400 text-xs font-black tracking-widest uppercase shadow-md">
            <Award className="w-4 h-4 text-amber-400" /> UNMATCHED STREET LUXURY
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            WHY <span className="text-red-gradient">BLACK BURGER?</span>
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            We didn&apos;t set out to create just another burger joint. We built Black Burger to revolutionize street food into an elevated luxury experience.
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brandPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="bg-gradient-to-b from-zinc-900/90 via-zinc-950 to-zinc-950 border border-zinc-800 hover:border-red-600/60 rounded-3xl p-8 flex flex-col justify-between space-y-6 shadow-xl transition-all group hover:-translate-y-1"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-red-600 to-amber-500 p-0.5 shadow-[0_0_20px_rgba(220,38,38,0.5)]">
                      <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center text-red-500 group-hover:text-amber-400 transition-colors">
                        <Icon className="w-7 h-7" />
                      </div>
                    </div>

                    <span className="text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-amber-400 uppercase">
                      {pillar.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mt-0.5">
                      {pillar.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center gap-2 text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Black Burger Signature Guarantee</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
