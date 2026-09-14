"use client";

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Flame, ArrowRight, ChevronLeft, ChevronRight, Award, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';

const SLIDES = [
  {
    id: 1,
    badge: '100% SMASHED ANGUS BEEF',
    badge_ar: '100% لحم أنجوس مشوي سمواش',
    title: 'SMASH BURGERS',
    title_ar: 'برجر أنجوس',
    highlightTitle: 'MADE DIFFERENT',
    highlightTitle_ar: 'مشوي على الأصول',
    subtitle: '100% ANGUS BEEF • SIGNATURE SAUCES • UNFORGETTABLE FLAVOR',
    subtitle_ar: '100% لحم أنجوس صافي • صوصات خاصة • طعم لا يُنسى',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1920&auto=format&fit=crop',
    video: '/videos/hero-smash.mp4',
    ctaText: 'ORDER NOW',
    ctaText_ar: 'اطلب الآن',
    ctaLink: '/menu',
  },
  {
    id: 2,
    badge: 'GOLDEN CRISPY CRAFT',
    badge_ar: 'دجاج كريسبي مقرمش',
    title: 'REAL CHICKEN.',
    title_ar: 'دجاج كريسبي.',
    highlightTitle: 'REAL FLAVOR.',
    highlightTitle_ar: 'طعم حقيقي.',
    subtitle: 'HAND-BREADED CRISPY FILLET • CAYENNE BUFFALO • HOUSE RANCH',
    subtitle_ar: 'صدور دجاج كريسبي مقرمشة • صوص بافالو • صوص رانش',
    image: 'https://images.unsplash.com/photo-1625813506062-0aeb1d7a094b?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'EXPLORE CHICKEN',
    ctaText_ar: 'استكشف الدجاج',
    ctaLink: '/menu',
  },
  {
    id: 3,
    badge: 'ULTIMATE LOADED APPS',
    badge_ar: 'مقبلات وتشاوس غنية',
    title: 'BIG FLAVOR.',
    title_ar: 'نكهات قوية.',
    highlightTitle: 'NO COMPROMISE.',
    highlightTitle_ar: 'بدون تفريط.',
    subtitle: 'BB BEEF CHAOS FRIES • TRUFFLE AIOLI • LOADED APPETIZERS',
    subtitle_ar: 'بطاطس تشاوس باللحم • صوص ترافل • مقبلات مميزة',
    image: 'https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=1920&auto=format&fit=crop',
    ctaText: 'TRY CHAOS FRIES',
    ctaText_ar: 'جرب تشاوس فرايز',
    ctaLink: '/menu',
  },
];

export function HeroSlider() {
  const { isAr, getText } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Auto-advance slide: for non-video slides wait 7 seconds; for video slides wait until video ends
  useEffect(() => {
    const slide = SLIDES[currentSlide];
    if (slide.video) {
      // The onEnded handler on the video element will trigger nextSlide
      return;
    }

    const timer = setTimeout(() => {
      nextSlide();
    }, 7000);

    return () => clearTimeout(timer);
  }, [currentSlide, nextSlide]);

  // Pause video on scroll past hero
  useEffect(() => {
    const handleScroll = () => {
      if (videoRef.current) {
        if (window.scrollY < 800) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Reset & play video when slide becomes active
  useEffect(() => {
    if (videoRef.current) {
      if (SLIDES[currentSlide].video) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
      }
    }
  }, [currentSlide]);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full h-[92vh] min-h-[650px] bg-black overflow-hidden flex items-center justify-center">
      {/* Slide Background Image or Video */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {slide.video ? (
            <video
              ref={videoRef}
              src={slide.video}
              autoPlay
              muted
              playsInline
              onEnded={nextSlide}
              className="w-full h-full object-cover object-center brightness-90"
            />
          ) : (
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className="object-cover object-center brightness-75"
              priority
            />
          )}

          {/* Gradients Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t ${slide.video ? 'from-black via-black/30 to-black/50' : 'from-black via-black/50 to-black/80'}`} />
          <div className={`absolute inset-0 bg-gradient-to-r ${slide.video ? 'from-black/80 via-black/40 to-transparent' : 'from-black/95 via-black/60 to-transparent'}`} />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(220,38,38,0.15)_0%,transparent_70%)] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* Floating particles aesthetic effect */}
      <div className="absolute inset-0 pointer-events-none z-10 opacity-30 bg-[radial-gradient(#DC2626_1px,transparent_1px)] [background-size:24px_24px]" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="max-w-3xl space-y-6">
          
          {/* Badge */}
          <motion.div
            key={`badge-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900/90 border border-[#03A0E5]/50 backdrop-blur-md shadow-[0_0_15px_rgba(3,160,229,0.25)]"
          >
            <Flame className="w-4 h-4 text-[#EA1F27] animate-pulse" />
            <span className="text-xs font-black tracking-widest text-[#03A0E5] uppercase">
              {getText(slide.badge, slide.badge_ar)}
            </span>
            <div className="flex items-center gap-0.5 ml-1 text-[#CDB32D]">
              <Star className="w-3 h-3 fill-[#CDB32D]" />
              <Star className="w-3 h-3 fill-[#CDB32D]" />
              <Star className="w-3 h-3 fill-[#CDB32D]" />
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.h1
            key={`title-${slide.id}`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-1.5"
          >
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white block leading-tight drop-shadow-lg whitespace-nowrap">
              {getText(slide.title, slide.title_ar)}
            </span>
            <span className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-red-gradient block leading-tight drop-shadow-[0_0_25px_rgba(220,38,38,0.6)] whitespace-nowrap">
              {getText(slide.highlightTitle, slide.highlightTitle_ar)}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            key={`sub-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm sm:text-base md:text-lg text-zinc-300 font-bold tracking-wider uppercase max-w-xl border-l-4 rtl:border-l-0 rtl:border-r-4 border-[#EA1F27] pl-4 rtl:pl-0 rtl:pr-4 py-1"
          >
            {getText(slide.subtitle, slide.subtitle_ar)}
          </motion.p>

          {/* CTAs */}
          <motion.div
            key={`cta-${slide.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Link
              href={slide.ctaLink}
              className="group relative overflow-hidden bg-gradient-to-r from-[#EA1F27] via-[#D11820] to-[#B00E15] text-white font-black px-8 py-4 rounded-full text-sm sm:text-base tracking-widest uppercase shadow-[0_0_30px_rgba(234,31,39,0.7)] border border-[#EA1F27]/50 hover:shadow-[0_0_45px_rgba(234,31,39,0.9)] transition-all flex items-center gap-2"
            >
              <Flame className="w-5 h-5 text-[#CDB32D] group-hover:scale-125 transition-transform" />
              <span>{getText(slide.ctaText, slide.ctaText_ar)}</span>
              <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
            </Link>

            <Link
              href="/about"
              className="px-6 py-4 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase bg-zinc-900/80 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-[#03A0E5]/40 hover:border-[#03A0E5] transition-all flex items-center gap-2 backdrop-blur-sm"
            >
              <Award className="w-4 h-4 text-[#03A0E5]" />
              <span>{isAr ? 'قصة الشواء' : 'THE SMASH CRAFT'}</span>
            </Link>
          </motion.div>

        </div>
      </div>

      {/* Slider Nav Buttons */}
      <div className="absolute bottom-10 right-6 sm:right-12 z-30 flex items-center gap-3">
        <button
          onClick={prevSlide}
          className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-white hover:border-red-600 hover:text-red-500 transition-all backdrop-blur-md"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Indicators */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 backdrop-blur-md">
          {SLIDES.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide
                  ? 'w-8 bg-gradient-to-r from-red-600 to-amber-500 shadow-[0_0_10px_rgba(220,38,38,0.8)]'
                  : 'w-2 bg-zinc-700 hover:bg-zinc-500'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button
          onClick={nextSlide}
          className="p-3 rounded-full bg-zinc-900/80 border border-zinc-800 text-white hover:border-red-600 hover:text-red-500 transition-all backdrop-blur-md"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom ticker bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-red-950/80 border-t border-red-900/40 py-2.5 overflow-hidden z-20 backdrop-blur-sm hidden sm:block">
        <div className="flex whitespace-nowrap gap-12 text-xs font-black tracking-widest text-white uppercase animate-marquee">
          {isAr ? (
            <>
              <span className="flex items-center gap-2">🔥 100% لحم أنجوس طازج يومياً</span>
              <span className="flex items-center gap-2">⭐ فرع فيصل مفتوح الآن</span>
              <span className="flex items-center gap-2">📞 الخط الساخن: 01515821555</span>
              <span className="flex items-center gap-2">🚀 توصيل سريع والدفع عند الاستلام</span>
              <span className="flex items-center gap-2">🔥 100% لحم أنجوس طازج يومياً</span>
              <span className="flex items-center gap-2">⭐ فرع فيصل مفتوح الآن</span>
            </>
          ) : (
            <>
              <span className="flex items-center gap-2">🔥 100% ANGUS BEEF SMASHED DAILY</span>
              <span className="flex items-center gap-2">⭐ FAISAL BRANCH NOW OPEN</span>
              <span className="flex items-center gap-2">📞 HOTLINE: 01515821555</span>
              <span className="flex items-center gap-2">🚀 FAST CASH ON DELIVERY</span>
              <span className="flex items-center gap-2">🔥 100% ANGUS BEEF SMASHED DAILY</span>
              <span className="flex items-center gap-2">⭐ FAISAL BRANCH NOW OPEN</span>
            </>
          )}
        </div>
      </div>
    </section>
  );
}