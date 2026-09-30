"use client";

import React from 'react';
import { Star, MessageSquareQuote, Award, ShieldCheck, Heart, Sparkles, UserCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

export function BrandSection() {
  const { isAr } = useLanguage();

  const testimonialsEn = [
    {
      icon: Star,
      title: 'Best Smash in Faisal',
      subtitle: 'Crispy Edges & Juicy Beef',
      quote: 'I’ve tried smash burgers all over Cairo, but Black Burger’s lacy crispy edges and secret BB sauce hit completely different. The combo with chaos fries is insane!',
      author: 'Omar Hassan',
      badge: '5.0 ★ RATING',
    },
    {
      icon: Sparkles,
      title: 'Unreal Meat Quality',
      subtitle: '100% Angus Beef Chuck',
      quote: 'You can genuinely taste the quality of pure 100% Angus beef chuck—zero fillers. Delivered piping hot to my doorstep in under 25 minutes!',
      author: 'Youssef Khalil',
      badge: 'VERIFIED ORDER',
    },
    {
      icon: Heart,
      title: 'Addictive Secret Sauces',
      subtitle: 'Truffle Aioli & Brioche',
      quote: 'The Truffle smash burger and buffalo chicken are my absolute favorites. Golden pillow brioche bun that holds together rich juices without getting soggy.',
      author: 'Nouran Mahmoud',
      badge: 'TOP REVIEWER',
    },
  ];

  const testimonialsAr = [
    {
      icon: Star,
      title: 'أفضل برجر في فيصل',
      subtitle: 'أطراف مقرمشة ولحم طري',
      quote: 'جربت برجر في كل القاهرة، لكن طبقة القرمشة الخارجية لـ بلاك برجر مع صوص بي بي السري خطيرة جداً! الوجبة مع بطاطس تشاوس ممتازة.',
      author: 'عمر حسن',
      badge: 'تقييم 5.0 ★',
    },
    {
      icon: Sparkles,
      title: 'جودة لحم ممتازة',
      subtitle: '100% لحم أنجوس صافي',
      quote: 'تستشعر جودة اللحم الأنجوس الصافي 100% بدون أي إضافات أو مواد مالئة. التوصيل كان سريعاً وساخناً حتى باب المنزل!',
      author: 'يوسف خليل',
      badge: 'طلب مؤكد',
    },
    {
      icon: Heart,
      title: 'صوصات سرية مميزة',
      subtitle: 'ترافل أولي وخبز البريوش',
      quote: 'برجر الترافل وساندوتش البافالو تشيكن مفضلين جداً بالنسبة لي. خبز البريوش طري ويتحمل الصوصات الغنية بدون أن يذوب.',
      author: 'نوران محمود',
      badge: 'مقيم مميز',
    },
  ];

  const testimonials = isAr ? testimonialsAr : testimonialsEn;

  return (
    <section className="bg-black py-24 border-t border-zinc-800/80 relative overflow-hidden">
      {/* Background glow radial */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-red-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-amber-500/40 text-amber-400 text-xs font-black tracking-widest uppercase shadow-md">
            <MessageSquareQuote className="w-4 h-4 text-amber-400" /> {isAr ? 'آراء وتقييمات العملاء' : 'REAL FEEDBACK & REVIEWS'}
          </div>

          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            {isAr ? (
              <>
                ماذا يقول <span className="text-red-gradient">عملاؤنا</span>
              </>
            ) : (
              <>
                WHAT OUR <span className="text-red-gradient">CUSTOMERS SAY</span>
              </>
            )}
          </h2>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
            {isAr
              ? 'إليك ما يقوله عشاق البرجر في فيصل والقاهرة عن تجربتهم مع بلاك برجر.'
              : 'Don’t just take our word for it. Here is what smash burger lovers across Faisal & Cairo have to say about Black Burger.'}
          </p>
        </div>

        {/* 3 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.author}
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
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-2xl font-black text-white tracking-tight">
                      &ldquo;{item.title}&rdquo;
                    </h3>
                    <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mt-0.5">
                      {item.subtitle}
                    </span>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-900 flex items-center justify-between text-xs font-bold text-zinc-400 group-hover:text-white transition-colors">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-4 h-4 text-emerald-500" />
                    <span>{item.author}</span>
                  </div>
                  <div className="flex items-center gap-0.5 text-amber-400">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
