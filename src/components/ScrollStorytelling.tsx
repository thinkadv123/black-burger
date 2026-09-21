"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ShieldCheck, CheckCircle2, ChevronRight, Sparkles, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/context/LanguageContext';

export function ScrollStorytelling() {
  const [activeMobileTab, setActiveMobileTab] = useState(0);
  const { isAr } = useLanguage();

  const ingredientsListEn = [
    {
      step: '01',
      tag: '100% PURE ANGUS',
      title: '100% ANGUS BEEF',
      subtitle: 'Zero Fillers • Daily Ground Chuck',
      desc: 'Zero fillers, zero soy. Pure coarse ground grass-fed Angus beef chuck with optimal marbling for maximum rich flavor and juice retention.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 hover:border-red-500 shadow-xl',
      badgeBg: 'bg-red-600 text-white',
      bgGradient: 'from-red-950/80 via-zinc-900 to-zinc-950',
    },
    {
      step: '02',
      tag: 'BAKED FRESH DAILY',
      title: 'FRESH BRIOCHE BUNS',
      subtitle: 'Artisanal Golden Pillow',
      desc: 'Artisanal golden brioche baked fresh every morning, lightly slathered in butter and seared warm on the griddle to hold every drop of juice.',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-amber-500/70 hover:border-amber-400 shadow-xl',
      badgeBg: 'bg-amber-500 text-black',
      bgGradient: 'from-amber-950/80 via-zinc-900 to-zinc-950',
    },
    {
      step: '03',
      tag: 'SECRET HOUSE RECIPES',
      title: 'SIGNATURE SAUCES',
      subtitle: 'House Made In Small Batches',
      desc: 'Handcrafted in-house daily—from our secret BB smash drizzle to rich truffle aioli, smoky chipotle, and fiery cayenne buffalo glaze.',
      image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 hover:border-red-500 shadow-xl',
      badgeBg: 'bg-red-600 text-white',
      bgGradient: 'from-red-950/80 via-zinc-900 to-zinc-950',
    },
  ];

  const ingredientsListAr = [
    {
      step: '01',
      tag: '100% أنجوس صافي',
      title: '100% لحم أنجوس',
      subtitle: 'بدون إضافات • مفروم طازج يومياً',
      desc: 'بدون فول صويا أو إضافات. لحم أنجوس فاخر مفروم بعناية لضمان أقصى درجات النكهة الغنية والطرواة.',
      image: 'https://images.unsplash.com/photo-1588168333986-5078d3ae3976?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 hover:border-red-500 shadow-xl',
      badgeBg: 'bg-red-600 text-white',
      bgGradient: 'from-red-950/80 via-zinc-900 to-zinc-950',
    },
    {
      step: '02',
      tag: 'مخبوز طازج يومياً',
      title: 'خبز بريوش طازج',
      subtitle: 'خبز بريوش ذهبي هش',
      desc: 'خبز بريوش فاخر مخبوز طازجاً كل صباح، مدهون بلمسة زبدة خفيفة ومحمص على الصاج ليحتفظ بكل قطرة صوص.',
      image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-amber-500/70 hover:border-amber-400 shadow-xl',
      badgeBg: 'bg-amber-500 text-black',
      bgGradient: 'from-amber-950/80 via-zinc-900 to-zinc-950',
    },
    {
      step: '03',
      tag: 'وصفات بلاك برجر السرية',
      title: 'الصوصات الخاصة',
      subtitle: 'مجهزة طازجة يومياً',
      desc: 'صوصات خاصة مجهزة يدوياً يومياً—من صوص بي بي السري الخاص بنا إلى صوص الترافل الفاخر والتشيبوتلي والبافالو الحار.',
      image: 'https://images.unsplash.com/photo-1472476443507-c7a5948772fc?q=80&w=800&auto=format&fit=crop',
      accentColor: 'border-red-600/70 hover:border-red-500 shadow-xl',
      badgeBg: 'bg-red-600 text-white',
      bgGradient: 'from-red-950/80 via-zinc-900 to-zinc-950',
    },
  ];

  const ingredientsList = isAr ? ingredientsListAr : ingredientsListEn;
  const currentMobileCard = ingredientsList[activeMobileTab];

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
              src="/images/built-with-quality.jpg"
              alt="Built with quality smash burger"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
            
            {/* Floating Gold Quality Seal */}
            <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 bg-zinc-950/90 border border-amber-500/50 p-3 rounded-2xl flex items-center gap-3 shadow-xl backdrop-blur-md">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-black tracking-widest text-amber-400 uppercase block">{isAr ? '100% مضمون' : '100% GUARANTEED'}</span>
                <span className="text-[11px] text-zinc-300">{isAr ? 'طازج دائماً، غير مجمد' : 'Always Fresh, Never Frozen'}</span>
              </div>
            </div>

            <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 right-6 rtl:right-auto">
              <span className="text-xs font-black tracking-widest text-red-500 uppercase block mb-1">
                {isAr ? 'صنعت بشغف وإتقان' : 'HANDCRAFTED PERFECTION'}
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                {isAr ? 'الجودة أولاً وأخيراً' : 'BUILT WITH QUALITY'}
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
              <Flame className="w-3.5 h-3.5" /> {isAr ? 'معايير بلاك برجر' : 'THE BLACK BURGER STANDARD'}
            </div>

            <h2 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight">
              {isAr ? (
                <>
                  نحن لا نختصر الطرق. <br />
                  بل <span className="text-red-gradient">نشويها على الأصول!</span>
                </>
              ) : (
                <>
                  WE DON&apos;T CUT CORNERS. <br />
                  WE <span className="text-red-gradient">SMASH THEM.</span>
                </>
              )}
            </h2>

            <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
              {isAr
                ? 'كل برجر في بلاك برجر مصنوع بدقة عالية. نبدأ بلحم أنجوس صافي 100% مفروم طازجاً، يُكبس على الصاج المشتعل ليعطي الطبقة المقرمشة الخارجية الشهيرة.'
                : 'Every burger at Black Burger is crafted with precision. We start with custom-blended 100% Angus beef chuck, press it onto scorching cast iron, and sear it to caramelized perfection with paper-thin crispy lacy edges.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-red-500" /> {isAr ? 'شواء على الصاج الساخن' : 'Searing Heat Tech'}
                </h4>
                <p className="text-xs text-zinc-400">{isAr ? 'تفاعل الحرارة العالية للشواء بقرمشة خارجية ممتازة.' : 'Creates the Maillard reaction for maximum flavor crust.'}</p>
              </div>

              <div className="bg-zinc-900/80 border border-zinc-800 p-4 rounded-2xl space-y-1">
                <h4 className="font-bold text-white text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" /> {isAr ? 'خبز بريوش بالزبدة' : 'Butter Brioche'}
                </h4>
                <p className="text-xs text-zinc-400">{isAr ? 'محمص طازجاً يومياً بقوام هش وطري.' : 'Lightly toasted daily for soft, pillowy texture.'}</p>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-black px-6 py-3.5 rounded-full text-xs tracking-widest uppercase shadow-lg hover:shadow-red-600/50 transition-all"
              >
                <span>{isAr ? 'جرب الفرق بنفسك' : 'TASTE THE DIFFERENCE'}</span>
                <ChevronRight className="w-4 h-4 rtl:rotate-180" />
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. INGREDIENTS CARDS SECTION */}
      <section className="bg-zinc-950 border-y border-zinc-800/80 py-20 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-black tracking-widest text-amber-400 uppercase flex items-center justify-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              {isAr ? 'مكونات فاخرة بدون مساومة' : 'PURE UNCOMPROMISED INGREDIENTS'}
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight uppercase">
              {isAr ? (
                <>
                  سر <span className="text-red-gradient">الطعم الفريد؟</span>
                </>
              ) : (
                <>
                  WHAT MAKES IT <span className="text-red-gradient">UNFORGETTABLE?</span>
                </>
              )}
            </h2>
            <p className="text-zinc-400 text-xs sm:text-sm">
              {isAr ? 'استكشف الركائز الأساسية لنكهتنا.' : 'Explore our core pillars of flavor.'}
            </p>
          </div>

          {/* DESKTOP VIEW: 3-Column Row */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {ingredientsList.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className={`rounded-3xl bg-gradient-to-br ${item.bgGradient} border ${item.accentColor} p-8 flex flex-col justify-between space-y-6 transition-all group hover:-translate-y-2`}
              >
                {/* Image */}
                <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase ${item.badgeBg}`}>
                      {item.step}
                    </span>
                    <span className="bg-black/80 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-1 rounded-lg uppercase">
                      {item.tag}
                    </span>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block">
                      {item.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase mt-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-300 leading-relaxed font-sans mt-2">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center gap-2 text-xs font-mono font-bold text-amber-400">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    <span>{isAr ? 'معايير جودة بلاك برجر' : 'Black Burger Master Standard'}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* MOBILE VIEW ONLY: Interactive Tabbed Card Switcher */}
          <div className="md:hidden space-y-5">
            {/* Tab Pill Buttons */}
            <div className="flex items-center justify-between gap-1.5 p-1.5 bg-zinc-900 border border-zinc-800 rounded-2xl">
              {ingredientsList.map((item, index) => {
                const isActive = activeMobileTab === index;
                return (
                  <button
                    key={item.step}
                    onClick={() => setActiveMobileTab(index)}
                    className={`flex-1 py-2.5 rounded-xl font-mono text-[11px] font-bold uppercase transition-all flex items-center justify-center gap-1.5 ${
                      isActive
                        ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                        : 'text-zinc-400 hover:text-white'
                    }`}
                  >
                    <span>{item.step}.</span>
                    <span className="truncate">{item.title.split(' ')[0]}</span>
                  </button>
                );
              })}
            </div>

            {/* Display Active Mobile Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMobileTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className={`rounded-3xl bg-gradient-to-br ${currentMobileCard.bgGradient} border ${currentMobileCard.accentColor} p-6 space-y-5 shadow-2xl relative overflow-hidden`}
              >
                {/* Image */}
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 shadow-xl">
                  <Image
                    src={currentMobileCard.image}
                    alt={currentMobileCard.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-2">
                    <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-black uppercase ${currentMobileCard.badgeBg}`}>
                      {currentMobileCard.step}
                    </span>
                    <span className="bg-black/80 text-amber-400 border border-amber-500/40 text-[10px] font-mono font-black px-2.5 py-1 rounded-lg uppercase">
                      {currentMobileCard.tag}
                    </span>
                  </div>
                </div>

                {/* Card Info */}
                <div className="space-y-3 font-sans">
                  <div>
                    <span className="text-xs font-mono font-bold text-red-500 uppercase tracking-widest block">
                      {currentMobileCard.subtitle}
                    </span>
                    <h3 className="text-2xl font-black text-white tracking-tight uppercase font-mono mt-1">
                      {currentMobileCard.title}
                    </h3>
                  </div>

                  <p className="text-xs text-zinc-300 leading-relaxed">
                    {currentMobileCard.desc}
                  </p>

                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono font-bold text-amber-400">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                      <span>{isAr ? 'معايير جودة بلاك برجر' : 'Black Burger Master Standard'}</span>
                    </span>
                  </div>
                </div>

                {/* Prev / Next mobile arrows */}
                <div className="flex items-center justify-between pt-2">
                  <button
                    onClick={() => setActiveMobileTab((prev) => (prev > 0 ? prev - 1 : ingredientsList.length - 1))}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1 text-xs font-mono font-bold"
                  >
                    <ChevronLeft className="w-4 h-4 text-red-500" /> {isAr ? 'السابق' : 'Prev'}
                  </button>
                  <span className="text-xs font-mono text-zinc-500 font-bold">
                    {activeMobileTab + 1} / {ingredientsList.length}
                  </span>
                  <button
                    onClick={() => setActiveMobileTab((prev) => (prev < ingredientsList.length - 1 ? prev + 1 : 0))}
                    className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white flex items-center gap-1 text-xs font-mono font-bold"
                  >
                    {isAr ? 'التالي' : 'Next'} <ChevronRight className="w-4 h-4 text-red-500" />
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </section>

    </div>
  );
}
