"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  Utensils, 
  MapPin, 
  Star, 
  Phone, 
  MessageSquare, 
  ExternalLink, 
  Send, 
  CheckCircle2, 
  Share2,
  Instagram,
  Facebook,
  Heart,
  Store,
  Sparkles
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function HiddenHubPage() {
  const { isAr, toggleLang } = useLanguage();
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewName, setReviewName] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) {
      toast.error(isAr ? 'برجاء كتابة الاسم والتعليق' : 'Please enter your name and review comment');
      return;
    }
    setReviewSubmitted(true);
    toast.success(
      isAr 
        ? 'شكراً لتقييمك الرائع! تم استلام ملحوظاتك بنجاح.' 
        : 'Thank you for your review! Your feedback has been received.',
      { style: { background: '#121214', color: '#FFF', border: '1px solid #10B981' } }
    );
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Black Burger - Quick Hub',
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success(isAr ? 'تم نسخ الرابط للأنشطة' : 'Link copied to clipboard!');
    }
  };

  return (
    <div className="bg-zinc-950 text-white min-h-screen py-8 sm:py-12 px-4 font-sans selection:bg-red-600 selection:text-white">
      <div className="max-w-xl mx-auto space-y-8">

        {/* TOP BAR / LANGUAGE SWITCH */}
        <div className="flex justify-between items-center">
          <button
            onClick={toggleLang}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold px-3 py-2 rounded-xl text-zinc-300 hover:text-white transition-all"
          >
            <Globe className="w-4 h-4 text-amber-400" />
            <span>{isAr ? 'English' : 'عربي'}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono font-bold px-3 py-2 rounded-xl text-zinc-300 hover:text-white transition-all"
          >
            <Share2 className="w-4 h-4 text-red-500" />
            <span>{isAr ? 'مشاركة الصفحة' : 'Share Hub'}</span>
          </button>
        </div>

        {/* HEADER / BRAND CARD */}
        <div className="text-center bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800/80 rounded-3xl p-6 sm:p-8 shadow-[0_0_50px_rgba(234,31,39,0.2)] relative overflow-hidden">
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-48 h-48 bg-red-600/15 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 space-y-4">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto relative rounded-2xl overflow-hidden border-2 border-red-600/50 shadow-2xl bg-black p-2">
              <Image
                src="/images/logo.png"
                alt="Black Burger Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-[#EA1F27] text-[10px] font-mono font-bold tracking-widest uppercase mb-2">
                <Sparkles className="w-3 h-3 animate-pulse" />
                <span>{isAr ? 'دليل الروابط الرسمية والمعلومات' : 'OFFICIAL DIRECTORY & LINKS HUB'}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-mono tracking-tight text-white uppercase">
                BLACK BURGER <span className="text-red-500">EG</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
                {isAr ? 'أفضل برجر أنجوس مشوي على الفحم والدجاج الكريسبي في مصر' : 'The #1 Angus Smash Burger & Crispy Chicken destination'}
              </p>
            </div>
          </div>
        </div>

        {/* SECTION 1: WEBSITE LINK */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-2">
            <Globe className="w-4 h-4 text-red-500" />
            <span>1. {isAr ? 'الموقع الرسمي' : 'Official Website'}</span>
          </h2>

          <Link
            href="/"
            className="group flex items-center justify-between p-4 bg-gradient-to-r from-red-950/40 via-zinc-900 to-zinc-900 hover:from-red-900/60 hover:to-zinc-800 border border-red-900/40 hover:border-red-500 rounded-2xl transition-all duration-300 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 group-hover:scale-110 transition-transform">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono font-black text-sm text-white group-hover:text-red-400 transition-colors block">
                  {isAr ? 'زيارة الموقع الرسمي الرئيسي' : 'Visit Official Website'}
                </span>
                <span className="text-[11px] text-zinc-400 block">blackburger.eg</span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* SECTION 2: ONLINE MENU ACCESS */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-500" />
            <span>2. {isAr ? 'قائمة الطعام والطلب' : 'Menu & Ordering'}</span>
          </h2>

          <Link
            href="/menu"
            className="group flex items-center justify-between p-4 bg-gradient-to-r from-amber-950/30 via-zinc-900 to-zinc-900 hover:from-amber-900/50 hover:to-zinc-800 border border-amber-900/40 hover:border-amber-500 rounded-2xl transition-all duration-300 shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
                <Utensils className="w-5 h-5" />
              </div>
              <div>
                <span className="font-mono font-black text-sm text-white group-hover:text-amber-400 transition-colors block">
                  {isAr ? 'تصفح المنيو أونلاين واطلب مباشرة' : 'Explore Menu & Order Online'}
                </span>
                <span className="text-[11px] text-zinc-400 block">
                  {isAr ? 'عروض حصرية، برجر، دجاج، تشاوس ومشروبات' : 'Exclusive offers, burgers, chicken & chaos'}
                </span>
              </div>
            </div>
            <ExternalLink className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors" />
          </Link>
        </div>

        {/* SECTION 3: SOCIAL MEDIA LINKS */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span>3. {isAr ? 'حسابات التواصل الاجتماعي' : 'Social Media Channels'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/blackburger.eg/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 p-3.5 bg-zinc-900 hover:bg-pink-950/40 border border-zinc-800 hover:border-pink-500/50 rounded-2xl transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/30 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform shrink-0">
                <Instagram className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block group-hover:text-pink-400 transition-colors">Instagram</span>
                <span className="text-[10px] text-zinc-500 truncate block">@blackburger.eg</span>
              </div>
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/BlackBurgerEgy/"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 p-3.5 bg-zinc-900 hover:bg-blue-950/40 border border-zinc-800 hover:border-blue-500/50 rounded-2xl transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform shrink-0">
                <Facebook className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block group-hover:text-blue-400 transition-colors">Facebook</span>
                <span className="text-[10px] text-zinc-500 truncate block">@BlackBurgerEgy</span>
              </div>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@blackburger.eg"
              target="_blank"
              rel="noreferrer"
              className="group flex items-center gap-3 p-3.5 bg-zinc-900 hover:bg-purple-950/40 border border-zinc-800 hover:border-purple-500/50 rounded-2xl transition-all duration-200"
            >
              <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform shrink-0">
                <span className="font-black text-sm">TT</span>
              </div>
              <div className="min-w-0">
                <span className="text-xs font-bold text-white block group-hover:text-purple-400 transition-colors">TikTok</span>
                <span className="text-[10px] text-zinc-500 truncate block">@blackburger.eg</span>
              </div>
            </a>
          </div>
        </div>

        {/* SECTION 4: 2 LOCATIONS */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-2">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>4. {isAr ? 'عناوين الفروع والفون' : 'Branch Locations & Phone'}</span>
          </h2>

          <div className="space-y-3 font-mono">
            {/* Branch 1: Faisal */}
            <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-3 hover:border-red-600/40 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/30 flex items-center justify-center text-red-500">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase">
                      {isAr ? 'فرع فيصل' : 'Faisal Branch'}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {isAr ? 'فيصل - أمام التوحيد والنور' : 'Faisal - In front of Tawheed & Nour'}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-red-950 border border-red-800/80 text-red-400 text-[10px] font-bold">
                  {isAr ? 'مفتوح الآن' : 'OPEN'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href="tel:01515821555"
                  className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-red-500" />
                  <span>01515821555</span>
                </a>
                <a
                  href="https://wa.me/201515821555"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-400 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Branch 2: District 9 */}
            <div className="p-4 bg-zinc-900/90 border border-zinc-800 rounded-2xl space-y-3 hover:border-teal-600/40 transition-colors">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-teal-600/20 border border-teal-500/30 flex items-center justify-center text-teal-400">
                    <Store className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-black text-white uppercase">
                      {isAr ? 'مول District 9 حدائق الأهرام - البوابة الثالثة' : 'District 9 Mall - Hadayek Pyramids Gate 3'}
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      {isAr ? 'مول District 9 - حدائق الأهرام البوابة الثالثة' : 'District 9 Mall - Hadayek Pyramids Gate 3'}
                    </p>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-teal-950 border border-teal-800/80 text-teal-400 text-[10px] font-bold">
                  {isAr ? 'مفتوح الآن' : 'OPEN'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <a
                  href="tel:01034926555"
                  className="bg-zinc-950 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold"
                >
                  <Phone className="w-3.5 h-3.5 text-teal-400" />
                  <span>01034926555</span>
                </a>
                <a
                  href="https://wa.me/201034926555"
                  target="_blank"
                  rel="noreferrer"
                  className="bg-teal-950/80 hover:bg-teal-900 border border-teal-800/80 text-teal-300 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors font-bold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 5: CUSTOMER REVIEWS & FEEDBACK FORM */}
        <div className="space-y-3">
          <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 px-1 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>5. {isAr ? 'تقييم التجربة والرأي' : 'Leave a Review'}</span>
          </h2>

          <div className="p-5 bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-2xl space-y-4">
            {reviewSubmitted ? (
              <div className="text-center py-6 space-y-3 font-mono">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-base font-black text-white">
                  {isAr ? 'شكراً جزيلاً لتقييمك!' : 'Thank you for your review!'}
                </h3>
                <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                  {isAr ? 'رأيك يسعدنا ويدفعنا لتقديم أفضل تجربة برجر دائماً.' : 'Your feedback helps us continuously deliver the best smash burgers.'}
                </p>
                <button
                  type="button"
                  onClick={() => setReviewSubmitted(false)}
                  className="text-xs text-red-400 underline hover:text-red-300 font-bold"
                >
                  {isAr ? 'كتابة تقييم آخر' : 'Write another review'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono font-bold text-zinc-300 block mb-2">
                    {isAr ? 'كيف كانت تجربتك معنا؟' : 'How was your experience?'}
                  </label>
                  <div className="flex items-center gap-2 justify-center py-2 bg-zinc-950 border border-zinc-800/80 rounded-xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 transition-transform hover:scale-125 focus:outline-none"
                      >
                        <Star
                          className={`w-7 h-7 transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-zinc-700'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 font-mono">
                  <input
                    type="text"
                    required
                    placeholder={isAr ? 'اسمك الكريم...' : 'Your Name...'}
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-sans"
                  />

                  <textarea
                    required
                    rows={3}
                    placeholder={isAr ? 'شاركونا رأيكم بالوجبة والخدمة...' : 'Share your feedback on our food and service...'}
                    value={reviewComment}
                    onChange={(e) => setReviewComment(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-500 text-white font-mono font-black py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-900/30"
                >
                  <Send className="w-4 h-4" />
                  <span>{isAr ? 'إرسال التقييم' : 'Submit Review'}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center pt-4 border-t border-zinc-900 font-mono text-[11px] text-zinc-600">
          <p>© {new Date().getFullYear()} BLACK BURGER EG. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </div>
  );
}
