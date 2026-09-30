"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { 
  Bike, 
  Flame, 
  ChefHat, 
  PackageCheck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  Search, 
  ArrowLeft,
  ShoppingBag
} from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { motion } from 'framer-motion';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ActiveOrderData } from '@/components/OrderTrackerModal';

const STAGES = [
  {
    id: 1,
    en: "Preparing Order",
    ar: "جاري تجهيز الطلب",
    descEn: "Order received & items being checked.",
    descAr: "تم استلام الطلب ومراجعة المكونات بالكامل.",
    icon: Flame,
  },
  {
    id: 2,
    en: "Being Cooked",
    ar: "طهي وسماش طازج",
    descEn: "Fresh Angus beef smashed on the hot flat-top grill.",
    descAr: "البرجر الأنجوس يتشوح فوراً على الجريل الساخن.",
    icon: ChefHat,
  },
  {
    id: 3,
    en: "Handled To Delivery",
    ar: "تسليم الطلب للطيار",
    descEn: "Order packed in thermal bags & handed to driver.",
    descAr: "تغليف الطعام ساخناً وتسليمه لكابتن الدليفري.",
    icon: PackageCheck,
  },
  {
    id: 4,
    en: "On Way To Your Place",
    ar: "في الطريق لعنوانك",
    descEn: "Driver is on the way to your location.",
    descAr: "الطيار في الطريق إليك الآن، استعد للوجبة!",
    icon: Bike,
  },
];

function TrackOrderContent() {
  const searchParams = useSearchParams();
  const queryId = searchParams.get('id') || searchParams.get('orderId') || '';
  const { isAr } = useLanguage();

  const [inputOrderId, setInputOrderId] = useState(queryId);
  const [activeOrder, setActiveOrder] = useState<ActiveOrderData | null>(null);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState<number>(Date.now());

  // Timer interval for real-time second ticks
  useEffect(() => {
    const timer = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch order data
  useEffect(() => {
    const targetId = queryId || inputOrderId;
    if (!targetId) {
      // Check if localStorage has active order
      try {
        const stored = localStorage.getItem('bb_active_order');
        if (stored) {
          setActiveOrder(JSON.parse(stored));
        }
      } catch (e) {}
      setLoading(false);
      return;
    }

    async function loadOrder() {
      setLoading(true);
      // 1. Try local storage
      try {
        const stored = localStorage.getItem('bb_active_order');
        if (stored) {
          const parsed: ActiveOrderData = JSON.parse(stored);
          if (parsed.orderId.toUpperCase() === targetId.toUpperCase()) {
            setActiveOrder(parsed);
            setLoading(false);
            return;
          }
        }

        const backupsRaw = localStorage.getItem('bb_orders_backup');
        if (backupsRaw) {
          const backups = JSON.parse(backupsRaw);
          const match = backups.find((b: any) => b.id.toUpperCase() === targetId.toUpperCase());
          if (match) {
            setActiveOrder({
              orderId: match.id,
              customerName: match.customerName,
              phone: match.customerPhone,
              address: match.customerAddress,
              items: match.items.map((it: any) => ({
                name: it.name,
                quantity: it.quantity,
                price: it.unitPrice,
                optionsSummary: it.variant === 'combo' ? (isAr ? 'وجبة' : 'Combo') : (isAr ? 'ساندوتش' : 'Solo'),
              })),
              totalPrice: match.totalPrice,
              createdAt: new Date(match.createdAt).getTime() || Date.now(),
            });
            setLoading(false);
            return;
          }
        }
      } catch (e) {}

      // 2. Try Firestore
      try {
        const docRef = doc(db, 'orders', targetId.toUpperCase());
        const snap = await getDoc(docRef);
        if (snap.exists()) {
          const data = snap.data();
          setActiveOrder({
            orderId: snap.id,
            customerName: data.customerName || '',
            phone: data.customerPhone || '',
            address: data.customerAddress || '',
            items: (data.items || []).map((it: any) => ({
              name: it.name,
              quantity: it.quantity,
              price: it.unitPrice,
              optionsSummary: it.variant === 'combo' ? (isAr ? 'وجبة' : 'Combo') : (isAr ? 'ساندوتش' : 'Solo'),
            })),
            totalPrice: data.totalPrice || 0,
            createdAt: data.createdAt ? new Date(data.createdAt).getTime() : Date.now(),
          });
        } else {
          setActiveOrder(null);
        }
      } catch (err) {
        console.error("Firestore order load error:", err);
      } finally {
        setLoading(false);
      }
    }

    loadOrder();
  }, [queryId]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputOrderId.trim()) return;
    window.location.href = `/track?id=${encodeURIComponent(inputOrderId.trim())}`;
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center font-mono space-y-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-zinc-400 font-bold uppercase tracking-wider">
          {isAr ? "جاري تحميل تفاصيل الطلب..." : "FETCHING ORDER TRACKING DETAILS..."}
        </p>
      </div>
    );
  }

  if (!activeOrder) {
    return (
      <div className="max-w-md mx-auto p-6 bg-zinc-900/90 border border-zinc-800 rounded-3xl text-center font-mono space-y-6 shadow-2xl">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-red-950/80 border border-red-800/60 flex items-center justify-center text-red-500">
          <Search className="w-8 h-8" />
        </div>

        <div>
          <h2 className="text-xl font-black uppercase text-white">
            {isAr ? "متابعة حالة الطلب" : "Track Order Status"}
          </h2>
          <p className="text-xs text-zinc-400 mt-1">
            {isAr ? "أدخل رقم الطلب الخاص بك لمتابعة مراحل التحضير فوراً (مثال: BB-8371)" : "Enter your order reference code (e.g., BB-8371)"}
          </p>
        </div>

        <form onSubmit={handleSearchSubmit} className="space-y-3">
          <input
            type="text"
            required
            placeholder="e.g. BB-8371"
            value={inputOrderId}
            onChange={(e) => setInputOrderId(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-center text-sm font-bold text-white uppercase placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all"
          >
            {isAr ? "البحث عن الطلب" : "Search Order"}
          </button>
        </form>

        <Link
          href="/menu"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ShoppingBag className="w-4 h-4 text-red-500" />
          <span>{isAr ? "تصفح المنيو واطلب الآن" : "Go to Menu & Order Now"}</span>
        </Link>
      </div>
    );
  }

  // Calculate 10-minute step progress
  const createdAt = activeOrder.createdAt || Date.now();
  const elapsedSecs = Math.max(0, Math.floor((now - createdAt) / 1000));
  const elapsedMins = elapsedSecs / 60;

  let currentStepIndex = 0;
  if (elapsedMins >= 30) {
    currentStepIndex = 3;
  } else if (elapsedMins >= 20) {
    currentStepIndex = 2;
  } else if (elapsedMins >= 10) {
    currentStepIndex = 1;
  } else {
    currentStepIndex = 0;
  }

  const totalEstimatedMins = 40;
  const remainingMins = Math.max(0, Math.ceil(totalEstimatedMins - elapsedMins));
  const currentStepElapsedSecs = elapsedSecs % 600;
  const stepPercent = currentStepIndex === 3 ? 100 : Math.min(100, Math.floor((currentStepElapsedSecs / 600) * 100));

  return (
    <div className="max-w-2xl mx-auto space-y-6 font-mono">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950/60 via-zinc-900 to-zinc-950 border border-red-900/50 rounded-3xl p-6 shadow-[0_0_50px_rgba(234,31,39,0.25)] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 animate-pulse shrink-0">
            <Bike className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              {isAr ? "متابعة الطلب المباشرة" : "LIVE ORDER TRACKER"}
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white">
              {isAr ? `الطلب #${activeOrder.orderId}` : `Order #${activeOrder.orderId}`}
            </h1>
          </div>
        </div>

        <div className="text-center sm:text-end bg-black/50 border border-zinc-800 px-4 py-2.5 rounded-2xl shrink-0">
          <span className="text-[10px] text-zinc-400 uppercase font-bold block">{isAr ? "الوقت التقديري للتوصيل:" : "ESTIMATED ARRIVAL:"}</span>
          <span className="text-lg font-black text-amber-400 font-mono">
            {remainingMins > 0 ? `~ ${remainingMins} ${isAr ? 'دقيقة' : 'Mins'}` : (isAr ? 'وصل تقريباً!' : 'Arriving now!')}
          </span>
        </div>
      </div>

      {/* Progress Bar & Steps */}
      <div className="bg-zinc-900/90 border border-zinc-800 rounded-3xl p-5 sm:p-6 space-y-6">
        <div className="flex justify-between items-center border-b border-zinc-800 pb-3 text-xs text-zinc-400">
          <span className="flex items-center gap-1.5 font-bold text-white">
            <Clock className="w-4 h-4 text-red-500 animate-spin" />
            {isAr ? "تحديث تلقائي كل 10 دقائق" : "Auto-advancing every 10 mins"}
          </span>
          <span className="text-amber-400 font-bold">
            {isAr ? `المرحلة ${currentStepIndex + 1} من 4` : `Stage ${currentStepIndex + 1} of 4`}
          </span>
        </div>

        {/* Vertical steps timeline */}
        <div className="space-y-3">
          {STAGES.map((step, idx) => {
            const isDone = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const StepIcon = step.icon;

            return (
              <div
                key={step.id}
                className={`p-4 rounded-2xl border transition-all flex items-start gap-4 ${
                  isCurrent
                    ? "bg-red-950/30 border-red-600 text-white shadow-[0_0_25px_rgba(234,31,39,0.2)]"
                    : isDone
                    ? "bg-zinc-900/60 border-emerald-800/50 text-zinc-200"
                    : "bg-zinc-950 border-zinc-800/60 opacity-50 text-zinc-500"
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border transition-all ${
                    isDone
                      ? "bg-emerald-600 text-white border-emerald-500"
                      : isCurrent
                      ? "bg-red-600 text-white border-red-500 animate-bounce"
                      : "bg-zinc-800 text-zinc-500 border-zinc-700"
                  }`}
                >
                  {isDone ? <CheckCircle2 className="w-5 h-5" /> : <StepIcon className="w-5 h-5" />}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h2 className={`text-sm sm:text-base font-black uppercase font-mono ${isCurrent ? "text-white" : isDone ? "text-emerald-400" : "text-zinc-400"}`}>
                      {step.id}. {isAr ? step.ar : step.en}
                    </h2>
                    {isCurrent && (
                      <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold font-mono uppercase tracking-wider animate-pulse">
                        {isAr ? "نشط الآن" : "ACTIVE"}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                    {isAr ? step.descAr : step.descEn}
                  </p>

                  {isCurrent && (
                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                        <span>{isAr ? "تقدم المرحلة الحالية" : "Stage Progress"}</span>
                        <span className="text-amber-400 font-bold">{stepPercent}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-red-600 via-amber-500 to-emerald-500 rounded-full"
                          initial={{ width: "0%" }}
                          animate={{ width: `${stepPercent}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Customer & Address details */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-5 space-y-3 font-sans">
        <h2 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
          {isAr ? "تفاصيل الشحن والعميل" : "DELIVERY & CLIENT DETAILS"}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div className="flex items-start gap-2 text-zinc-300">
            <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-mono">{isAr ? "عنوان التسليم:" : "Address:"}</span>
              <strong className="text-white">{activeOrder.address}</strong>
            </div>
          </div>

          <div className="flex items-start gap-2 text-zinc-300">
            <Phone className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
            <div>
              <span className="text-zinc-500 block text-[10px] uppercase font-mono">{isAr ? "رقم الهاتف:" : "Phone:"}</span>
              <strong className="text-white">{activeOrder.phone} ({activeOrder.customerName})</strong>
            </div>
          </div>
        </div>

        {activeOrder.items && activeOrder.items.length > 0 && (
          <div className="pt-2 border-t border-zinc-800/80">
            <span className="text-[10px] font-mono text-zinc-500 uppercase block mb-1.5">{isAr ? "محتويات الطلب:" : "Order Items:"}</span>
            <div className="space-y-1.5 max-h-32 overflow-y-auto custom-scrollbar pr-1">
              {activeOrder.items.map((item, i) => (
                <div key={i} className="flex justify-between items-center text-xs text-zinc-300 font-mono">
                  <span className="truncate max-w-[70%]">
                    <strong className="text-red-400">{item.quantity}x</strong> {item.name} {item.optionsSummary && `(${item.optionsSummary})`}
                  </span>
                  <span className="font-bold text-zinc-200">{item.price * item.quantity} {isAr ? "ج.م" : "EGP"}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-black text-white font-mono">
          <span>{isAr ? "إجمالي المبلغ المطلوب:" : "TOTAL AMOUNT DUE:"}</span>
          <span className="text-emerald-400">{activeOrder.totalPrice} {isAr ? "ج.م" : "EGP"}</span>
        </div>
      </div>

      {/* Support Actions for Both Branches */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <a
          href={`https://wa.me/201515821555?text=Hello%20Black%20Burger!%20I%20am%20following%20up%20on%20my%20order%20%23${activeOrder.orderId}`}
          target="_blank"
          rel="noreferrer"
          className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-400 font-bold py-3.5 px-3 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{isAr ? "واتساب فرع فيصل (01515821555)" : "Faisal WhatsApp"}</span>
        </a>

        <a
          href={`https://wa.me/201034926555?text=Hello%20Black%20Burger!%20I%20am%20following%20up%20on%20my%20order%20%23${activeOrder.orderId}`}
          target="_blank"
          rel="noreferrer"
          className="bg-teal-950/80 hover:bg-teal-900 border border-teal-800/80 text-teal-400 font-bold py-3.5 px-3 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
        >
          <MessageSquare className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{isAr ? "واتساب مول District 9 (01034926555)" : "District 9 WhatsApp"}</span>
        </a>
      </div>

      <div className="text-center pt-2">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs text-zinc-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4 text-red-500 rtl:rotate-180" />
          <span>{isAr ? "العودة للرئيسية" : "Return to Home Page"}</span>
        </Link>
      </div>

    </div>
  );
}

export default function TrackPage() {
  return (
    <div className="bg-black text-white min-h-screen pt-28 pb-20 px-4 font-sans">
      <Suspense fallback={
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
