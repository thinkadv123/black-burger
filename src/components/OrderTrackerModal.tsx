"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Clock,
  ChefHat,
  Flame,
  Bike,
  MapPin,
  Phone,
  MessageSquare,
  CheckCircle2,
  PackageCheck,
  RefreshCw,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export interface ActiveOrderData {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    optionsSummary?: string;
  }>;
  totalPrice: number;
  createdAt: number; // timestamp in ms
}

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderData?: ActiveOrderData | null;
}

const STEPS = [
  {
    id: 1,
    key: "preparing",
    en: "Preparing",
    ar: "جاري تجهيز الطلب",
    descEn: "Selecting fresh 100% Angus patties and ingredients",
    descAr: "اختيار مكونات البرجر الطازجة والأنجوس الصافي",
    icon: ChefHat,
    durationMins: 10,
  },
  {
    id: 2,
    key: "cooking",
    en: "Being Cooked",
    ar: "طهي وسماش طازج",
    descEn: "Smashing on searing hot griddle for lacy edges",
    descAr: "شواء البرجر على الصاج الساخن وقلي الإضافات",
    icon: Flame,
    durationMins: 10,
  },
  {
    id: 3,
    key: "handled",
    en: "Handled To Delivery",
    ar: "تسليم للطيار",
    descEn: "Packed piping hot into insulated thermal bags",
    descAr: "تغليف الطلب في حقيبة حافظة للحرارة وتسليمه للسائق",
    icon: PackageCheck,
    durationMins: 10,
  },
  {
    id: 4,
    key: "onTheWay",
    en: "On Way To Your Place",
    ar: "في الطريق لعنوانك",
    descEn: "Driver is speeding safely to your address",
    descAr: "مندوب التوصيل في الطريق المباشر إلى عنوانك",
    icon: Bike,
    durationMins: 10,
  },
];

export function OrderTrackerModal({ isOpen, onClose, orderData }: OrderTrackerModalProps) {
  const { isAr } = useLanguage();
  const [activeOrder, setActiveOrder] = useState<ActiveOrderData | null>(null);
  const [now, setNow] = useState<number>(Date.now());

  useEffect(() => {
    if (orderData) {
      setActiveOrder(orderData);
    } else {
      const loadLocalOrder = () => {
        try {
          const stored = localStorage.getItem("bb_active_order");
          if (stored) {
            setActiveOrder(JSON.parse(stored));
          }
        } catch (e) {
          console.error("Failed to load active order:", e);
        }
      };
      loadLocalOrder();
    }
  }, [orderData, isOpen]);

  // Update live clock every second
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  if (!isOpen || !activeOrder) return null;

  // Calculate elapsed time in seconds
  const elapsedSecs = Math.max(0, Math.floor((now - activeOrder.createdAt) / 1000));
  const elapsedMins = elapsedSecs / 60;

  // Determine current step (Step 1: 0-10m, Step 2: 10-20m, Step 3: 20-30m, Step 4: 30m+)
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

  // Calculate remaining estimated time (out of 40 mins overall)
  const totalEstimatedMins = 40;
  const remainingMins = Math.max(0, Math.ceil(totalEstimatedMins - elapsedMins));

  // Current step progress percentage (0-100% within current 10-min block)
  const currentStepElapsedSecs = elapsedSecs % 600;
  const stepPercent = currentStepIndex === 3 ? 100 : Math.min(100, Math.floor((currentStepElapsedSecs / 600) * 100));

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_80px_rgba(234,31,39,0.35)] overflow-hidden z-10 flex flex-col font-mono max-h-[90vh]"
        >
          {/* Top Header */}
          <div className="p-5 sm:p-6 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-500 animate-pulse">
                <Bike className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-extrabold text-amber-400 uppercase tracking-widest block">
                  {isAr ? "متابعة الطلب المباشرة" : "LIVE ORDER TRACKER"}
                </span>
                <h2 className="text-lg sm:text-xl font-black text-white uppercase tracking-tight">
                  {isAr ? `طلب #${activeOrder.orderId}` : `Order #${activeOrder.orderId}`}
                </h2>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2.5 rounded-2xl text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content Body */}
          <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-zinc-300 custom-scrollbar flex-1 font-sans">
            
            {/* Top Estimated Time Card */}
            <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-red-950/60 border border-zinc-800 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
              <div className="space-y-1 text-center sm:text-left rtl:sm:text-right">
                <span className="text-xs font-mono font-extrabold text-zinc-400 uppercase tracking-wider block">
                  {isAr ? "الحالة الحالية للطلب:" : "CURRENT ORDER STATUS:"}
                </span>
                <div className="text-lg sm:text-xl font-black text-white flex items-center justify-center sm:justify-start gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-red-500">
                    {isAr ? STEPS[currentStepIndex].ar : STEPS[currentStepIndex].en}
                  </span>
                </div>
              </div>

              <div className="bg-zinc-950/80 border border-zinc-800 px-4 py-2.5 rounded-xl text-center font-mono shrink-0">
                <span className="text-[10px] text-zinc-400 font-bold uppercase block">
                  {isAr ? "الوقت المتبقي المتوقع" : "ESTIMATED ARRIVAL"}
                </span>
                <span className="text-xl font-black text-amber-400 flex items-center justify-center gap-1.5 mt-0.5">
                  <Clock className="w-4 h-4 text-amber-400" />
                  {remainingMins > 0 ? `${remainingMins} ${isAr ? "دقيقة" : "Mins"}` : (isAr ? "يصل الآن!" : "Arriving Now!")}
                </span>
              </div>
            </div>

            {/* Steps Timeline (Automatic Every 10 Minutes) */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center justify-between text-xs font-mono font-bold text-zinc-400 uppercase border-b border-zinc-800/80 pb-2">
                <span>{isAr ? "خطوات التجهيز والتوصيل" : "ORDER PROGRESS STAGES"}</span>
                <span className="text-amber-400 text-[11px] flex items-center gap-1">
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-400" />
                  {isAr ? "تحديث تلقائي كل 10 دقائق" : "Auto Updates Every 10 Mins"}
                </span>
              </div>

              <div className="space-y-3 relative">
                {STEPS.map((step, idx) => {
                  const StepIcon = step.icon;
                  const isDone = idx < currentStepIndex;
                  const isCurrent = idx === currentStepIndex;
                  const isFuture = idx > currentStepIndex;

                  return (
                    <div
                      key={step.id}
                      className={`relative p-4 rounded-2xl border transition-all duration-500 flex items-start gap-4 ${
                        isCurrent
                          ? "bg-red-950/20 border-red-600/80 text-white shadow-[0_0_30px_rgba(234,31,39,0.2)]"
                          : isDone
                          ? "bg-zinc-900/60 border-emerald-800/50 text-zinc-200"
                          : "bg-zinc-950 border-zinc-800/60 opacity-50 text-zinc-500"
                      }`}
                    >
                      {/* Step Indicator Icon */}
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

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className={`text-sm sm:text-base font-black uppercase font-mono ${isCurrent ? "text-white" : isDone ? "text-emerald-400" : "text-zinc-400"}`}>
                            {step.id}. {isAr ? step.ar : step.en}
                          </h4>
                          {isCurrent && (
                            <span className="px-2 py-0.5 rounded-full bg-red-600 text-white text-[9px] font-bold font-mono uppercase tracking-wider animate-pulse">
                              {isAr ? "نشط الآن" : "ACTIVE"}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-zinc-400 mt-1 leading-relaxed">
                          {isAr ? step.descAr : step.descEn}
                        </p>

                        {/* Progress Bar inside Current Step */}
                        {isCurrent && (
                          <div className="mt-3 space-y-1">
                            <div className="flex justify-between text-[10px] font-mono text-zinc-400">
                              <span>{isAr ? "مرحلة الـ 10 دقائق الحالية" : "Current 10-Min Stage"}</span>
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

            {/* Customer Details & Items Card */}
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-5 space-y-3 font-sans">
              <h4 className="text-xs font-mono font-bold text-zinc-400 uppercase tracking-wider border-b border-zinc-800 pb-2">
                {isAr ? "تفاصيل الشحن والعميل" : "DELIVERY & CLIENT DETAILS"}
              </h4>

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

            {/* Direct Hotline / Support Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 font-mono">
              <a
                href={`https://wa.me/201515821555?text=Hello%20Black%20Burger!%20I%20am%20following%20up%20on%20my%20order%20%23${activeOrder.orderId}`}
                target="_blank"
                rel="noreferrer"
                className="bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800/80 text-emerald-400 font-bold py-3 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{isAr ? "واتساب فرع فيصل (01515821555)" : "Faisal WhatsApp"}</span>
              </a>

              <a
                href={`https://wa.me/201034926555?text=Hello%20Black%20Burger!%20I%20am%20following%20up%20on%20my%20order%20%23${activeOrder.orderId}`}
                target="_blank"
                rel="noreferrer"
                className="bg-teal-950/80 hover:bg-teal-900 border border-teal-800/80 text-teal-400 font-bold py-3 px-3 rounded-xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{isAr ? "واتساب فرع الحي التاسع (01034926555)" : "District 9 WhatsApp"}</span>
              </a>
            </div>

          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
