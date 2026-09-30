"use client";

import React, { useState } from 'react';
import { Phone, MapPin, Clock, Send, MessageSquare, CheckCircle2, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { toast } from 'sonner';

export default function ContactPage() {
  const { isAr, t } = useLanguage();

  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    toast.success(isAr ? 'شكراً لك! تم إرسال رسالتك إلى فريق بلاك برجر.' : 'Thank you! Your message has been sent to Black Burger team.', {
      style: { background: '#121214', color: '#FFF', border: '1px solid #DC2626' },
    });
  };

  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-24 font-sans">
      
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-black tracking-widest uppercase">
          <Phone className="w-4 h-4" /> {isAr ? 'تواصل معنا' : 'CONNECT WITH US'}
        </div>

        <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-mono">
          {isAr ? (
            <>
              زورونا أو <span className="text-red-gradient">اطلبوا مباشرة</span>
            </>
          ) : (
            <>
              VISIT US OR <span className="text-red-gradient">ORDER DIRECTLY</span>
            </>
          )}
        </h1>

        <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
          {isAr
            ? 'نحن يسعدنا خدمتكم دائماً. اتصل عبر الخط الساخن، أرسل لنا رسالة، أو زر فرعنا في فيصل.'
            : 'We’re fired up to serve you. Reach out via hotline, send us a message, or drop by our Faisal branch.'}
        </p>
      </section>

      {/* Main Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          {/* Left: Contact Info Cards */}
          <div className="space-y-6">
            
            {/* Phone Hotline Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 space-y-4 hover:border-red-600/60 transition-colors shadow-xl relative overflow-hidden">
              <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500">
                <Phone className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block font-mono">
                  {isAr ? 'الخط الساخن والطلبات' : 'HOTLINE & DELIVERY'}
                </span>
                <a
                  href="tel:01515821555"
                  className="text-3xl font-black text-white hover:text-red-500 transition-colors block mt-1 font-mono"
                >
                  01515821555
                </a>
              </div>

              <p className="text-xs text-zinc-400">
                {isAr
                  ? 'اتصل بنا مباشرة لطلب التوصيل السريع، الاستفسارات، أو للتحدث مع مدير الفرع.'
                  : 'Call us directly to place fast delivery orders, inquire about catering, or speak with our branch manager.'}
              </p>

              <div className="pt-2">
                <a
                  href="tel:01515821555"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-black px-5 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-md hover:shadow-red-600/50 transition-all font-mono"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>{isAr ? 'اضغط للاتصال: 01515821555' : 'TAP TO CALL 01515821555'}</span>
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 space-y-4 hover:border-amber-500/60 transition-colors shadow-xl">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                <MapPin className="w-6 h-6" />
              </div>

              <div>
                <span className="text-xs font-black text-amber-400 uppercase tracking-widest block font-mono">
                  {isAr ? 'عنوان فرع فيصل' : 'FAISAL BRANCH LOCATION'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1 font-mono">
                  {isAr ? 'فيصل - أمام التوحيد والنور' : 'Faisal - In front of Tawheed & Nour'}
                </h3>
              </div>

              <p className="text-xs text-zinc-400">
                {isAr
                  ? 'يقع الفرع على شارع فيصل الرئيسي مباشرة أمام التوحيد والنور. استمتع بالبرجر المشوي طازجاً فور شواؤه!'
                  : 'Located right on the main Faisal street opposite Tawheed & Nour. Come enjoy hot smashed burgers right off the grill!'}
              </p>

              <div className="flex items-center gap-2 text-xs font-bold text-zinc-300 pt-1 font-mono">
                <Clock className="w-4 h-4 text-red-500" />
                <span>{t('openingHours')}: {t('everydayHours')}</span>
              </div>
            </div>

            {/* WhatsApp Direct Order Card */}
            <div className="bg-emerald-950/40 border border-emerald-800/60 rounded-3xl p-8 space-y-4 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-black bg-emerald-500 text-black px-2.5 py-1 rounded-full uppercase font-mono">
                  {isAr ? 'رد فوري' : 'INSTANT RESPONSE'}
                </span>
              </div>

              <div>
                <h3 className="text-xl font-black text-white font-mono">{isAr ? 'الطلب عبر الواتساب' : 'Order via WhatsApp'}</h3>
                <p className="text-xs text-emerald-200/80 mt-1">
                  {isAr
                    ? 'تفضل المحادثة النصية؟ تواصل معنا مباشرة عبر الواتساب لإكمال طلبك أو طرح أي استفسار.'
                    : 'Prefer chatting? Chat with our team on WhatsApp to build your order or ask questions.'}
                </p>
              </div>

              <a
                href="https://wa.me/201515821555?text=Hello%20Black%20Burger!%20I%20would%20like%20to%20place%20an%20order."
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-black px-6 py-3 rounded-full text-xs uppercase tracking-wider transition-all shadow-lg font-mono"
              >
                <span>{isAr ? 'فتح محادثة الواتساب' : 'OPEN WHATSAPP CHAT'}</span>
                <ExternalLink className="w-4 h-4 rtl:rotate-180" />
              </a>
            </div>

          </div>

          {/* Right: Interactive Map Card + Contact Form */}
          <div className="space-y-8">
            
            {/* Map Preview Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 space-y-4 shadow-xl overflow-hidden">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2 font-mono">
                  <MapPin className="w-4 h-4 text-red-500" /> {isAr ? 'خريطة موقع فرع فيصل' : 'FAISAL BRANCH MAP'}
                </h3>
                <span className="text-xs text-amber-400 font-bold font-mono">{isAr ? 'الجيزة، مصر' : 'Giza, Egypt'}</span>
              </div>

              {/* Map embed / preview representation */}
              <div className="relative h-64 w-full rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800 flex items-center justify-center group">
                <iframe
                  title="Black Burger Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.384661073887!2d31.1712!3d30.0076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAwJzI3LjQiTiAzMcKwMTAnMTYuMyJF!5e0!3m2!1sen!2seg!4v1650000000000!5m2!1sen!2seg"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full opacity-90 group-hover:opacity-100 transition-opacity"
                />
              </div>
            </div>

            {/* Send Us a Message Form */}
            <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-8 space-y-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-black text-white uppercase tracking-tight font-mono">
                  {isAr ? (
                    <>
                      أرسل لنا <span className="text-red-gradient">رسالة</span>
                    </>
                  ) : (
                    <>
                      SEND US A <span className="text-red-gradient">MESSAGE</span>
                    </>
                  )}
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  {isAr ? 'لديك ملاحظة أو استفسار؟ شاركنا برأيك أدناه.' : 'Got feedback or catering inquiries? Drop us a line below.'}
                </p>
              </div>

              {submitted ? (
                <div className="bg-zinc-950 border border-red-600/40 p-6 rounded-2xl text-center space-y-3 font-mono">
                  <CheckCircle2 className="w-10 h-10 text-red-500 mx-auto" />
                  <h4 className="text-lg font-bold text-white">{isAr ? 'تم استلام رسالتك!' : 'Message Received!'}</h4>
                  <p className="text-xs text-zinc-400">
                    {isAr ? 'سيرد فريقنا عليك في أقرب وقت ممكن.' : 'Our team will review your note and call you back shortly.'}
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 font-sans">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1 font-mono">
                        {isAr ? 'الاسم *' : 'Your Name *'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isAr ? "مثال: محمود" : "e.g. Mahmoud"}
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1 font-mono">
                        {isAr ? 'رقم الهاتف *' : 'Phone Number *'}
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="01xxxxxxxxx"
                        value={contactForm.phone}
                        onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1 font-mono">
                      {isAr ? 'البريد الإلكتروني (اختياري)' : 'Email Address (Optional)'}
                    </label>
                    <input
                      type="email"
                      placeholder="name@example.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block mb-1 font-mono">
                      {isAr ? 'الرسالة *' : 'Your Message *'}
                    </label>
                    <textarea
                      required
                      rows={4}
                      placeholder={isAr ? "اكتب تفاصيل استفسارك هنا..." : "Write your thoughts, questions, or catering requests here..."}
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 text-white font-black py-4 rounded-xl text-xs uppercase tracking-wider shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-red-600/80 transition-all flex items-center justify-center gap-2 font-mono"
                  >
                    <Send className="w-4 h-4 text-amber-300" />
                    <span>{isAr ? 'إرسال الرسالة' : 'SEND MESSAGE'}</span>
                  </button>
                </form>
              )}
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
