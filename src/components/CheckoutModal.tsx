"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, Send, Truck, ShieldCheck, MessageSquare } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getProductName, getAdditionName, getOptionSizeName } from '@/data/menu';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { db } from '@/lib/firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { OrderTrackerModal, ActiveOrderData } from '@/components/OrderTrackerModal';

export function CheckoutModal() {
  const {
    cart,
    isCheckoutOpen,
    setIsCheckoutOpen,
    subtotalPrice,
    deliveryFee,
    totalPrice,
    clearCart,
  } = useCart();
  const { isAr, t } = useLanguage();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
  });

  const [selectedBranch, setSelectedBranch] = useState<'faisal' | 'district9'>('faisal');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [showTrackerModal, setShowTrackerModal] = useState(false);
  const [placedActiveOrder, setPlacedActiveOrder] = useState<ActiveOrderData | null>(null);

  if (!isCheckoutOpen) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#DC2626', '#EAB308', '#FFFFFF', '#991B1B'],
      });
    } catch (e) {
      console.log('Confetti effect unavailable', e);
    }
  };

  const formatWhatsAppMessage = (generatedId: string) => {
    const itemsList = cart
      .map((item, idx) => {
        const pName = getProductName(item.product, isAr);
        let details = `*${idx + 1}. ${pName}*  (x${item.quantity})\n   💵 *${isAr ? 'السعر' : 'Price'}:* ${item.unitPrice * item.quantity} ${isAr ? 'ج.م' : 'EGP'}`;
        
        const optionTags: string[] = [];
        if (item.options.variant === 'combo') {
          optionTags.push(isAr ? '🍟🥤 وجبة (تشمل بطاطس ومشروب غازي)' : '🍟🥤 Combo Meal (Includes Fries & Soft Drink)');
        } else if (item.product.comboPrice) {
          optionTags.push(isAr ? '🍔 ساندوتش فقط' : '🍔 Solo Sandwich');
        }

        if (item.options.size) {
          const szName = getOptionSizeName(item.options.size, isAr);
          optionTags.push(`${isAr ? '📏 الحجم' : '📏 Size'}: ${szName}`);
        }

        if (item.options.flavor) {
          const flavorLabel = isAr ? (item.options.flavor === 'Spicy' ? 'حار 🔥' : 'عادي') : item.options.flavor;
          optionTags.push(`🌶️ *${isAr ? 'الطعم' : 'Flavor'}:* ${flavorLabel}`);
        }

        if (item.options.selectedSandwiches) {
          const choices = Object.values(item.options.selectedSandwiches).join(' + ');
          optionTags.push(`🥪 *${isAr ? 'الساندوتشات المختارة' : 'Chosen Sandwiches'}:* ${choices}`);
        }

        if (item.options.addedAdditions.length > 0) {
          const adds = item.options.addedAdditions
            .map((a) => `+ ${getAdditionName(a, isAr)} (+${a.price} ${isAr ? 'ج.م' : 'EGP'})`)
            .join('\n      ');
          optionTags.push(`🧀 *${isAr ? 'الإضافات' : 'Extras'}:*\n      ${adds}`);
        }

        if (item.options.removedIngredients.length > 0) {
          const removed = item.options.removedIngredients.map((ing) => `❌ ${isAr ? 'بدون' : 'No'} ${ing}`).join(', ');
          optionTags.push(`🚫 *${isAr ? 'الاستبعادات' : 'Customizations'}:* ${removed}`);
        }

        if (item.options.specialInstructions) {
          optionTags.push(`💬 *${isAr ? 'ملاحظة' : 'Note'}:* "${item.options.specialInstructions}"`);
        }

        if (optionTags.length > 0) {
          details += `\n   ${optionTags.join('\n   ')}`;
        }

        return details;
      })
      .join('\n\n');

    const origin = typeof window !== 'undefined' ? window.location.origin : 'https://blackburger.eg';
    const trackingUrl = `${origin}/track?id=${generatedId}`;
    const branchText = selectedBranch === 'district9'
      ? (isAr ? 'مول District 9' : 'District 9 Branch')
      : (isAr ? 'فرع فيصل' : 'Faisal Branch');

    const message = `🍔🔥 *BLACK BURGER | ${isAr ? 'طلب جديد' : 'NEW ORDER'}* 🔥🍔
🆔 *${isAr ? 'رقم الطلب' : 'Order Ref'}:* #${generatedId}
🏪 *${isAr ? 'الفرع المستهدف' : 'Target Branch'}:* ${branchText}

👤 *${isAr ? 'بيانات العميل' : 'CUSTOMER DETAILS'}*
━━━━━━━━━━━━━━━━━━━━━
▫️ *${isAr ? 'الاسم' : 'Name'}:* ${formData.name}
▫️ *${isAr ? 'الهاتف' : 'Phone'}:* ${formData.phone}
▫️ *${isAr ? 'عنوان التوصيل' : 'Delivery Address'}:* ${formData.address}
${formData.notes ? `▫️ *${isAr ? 'تعليمات خاصة' : 'Special Instructions'}:* ${formData.notes}\n` : ''}
🛒 *${isAr ? 'تفاصيل الطلب' : 'ORDER BREAKDOWN'}*
━━━━━━━━━━━━━━━━━━━━━
${itemsList}

💰 *${isAr ? 'ملخص الفاتورة' : 'BILL SUMMARY'}*
━━━━━━━━━━━━━━━━━━━━━
▫️ *${isAr ? 'المجموع الفرعي' : 'Subtotal'}:* ${subtotalPrice} ${isAr ? 'ج.م' : 'EGP'}
▫️ *${isAr ? 'رسوم التوصيل' : 'Delivery Fee'}:* ${deliveryFee} ${isAr ? 'ج.م' : 'EGP'}
🔥 *${isAr ? 'الإجمالي الكلي' : 'TOTAL DUE'}:* *${totalPrice} ${isAr ? 'ج.م' : 'EGP'}*
💳 *${isAr ? 'طريقة الدفع' : 'Payment Method'}:* ${isAr ? 'الدفع نقداً عند الاستلام' : 'Cash on Delivery'}

🚴‍♂️ *${isAr ? 'رابط تتبع حالة الطلب مباشرة' : 'LIVE ORDER TRACKING LINK'}:*
${trackingUrl}

⚡ _${isAr ? 'تم الإرسال عبر موقع بلاك برجر' : 'Sent via Black Burger Web App'}_`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = async (e: React.FormEvent, targetNumber = '201515821555') => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      return;
    }

    setIsSubmitting(true);
    const newOrderId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);

    // Prepare clean Order object for Firestore & local storage
    const orderItems = cart.map((item) => ({
      id: item.product.id,
      name: item.product.name_en || item.product.name,
      name_ar: item.product.name_ar || '',
      quantity: item.quantity,
      unitPrice: item.unitPrice,
      totalPrice: item.unitPrice * item.quantity,
      variant: item.options.variant || 'solo',
      size: item.options.size || null,
      flavor: item.options.flavor || null,
      selectedSandwiches: item.options.selectedSandwiches || null,
      addedAdditions: item.options.addedAdditions?.map((a) => ({
        name: getAdditionName(a, isAr),
        price: a.price,
      })) || [],
      removedIngredients: item.options.removedIngredients || [],
      specialInstructions: item.options.specialInstructions || '',
    }));

    const orderData = {
      id: newOrderId,
      customerName: formData.name,
      customerPhone: formData.phone,
      customerAddress: formData.address,
      customerNotes: formData.notes || '',
      items: orderItems,
      subtotalPrice,
      deliveryFee,
      totalPrice,
      status: 'New',
      createdAt: new Date().toISOString(),
      timestamp: serverTimestamp(),
    };

    try {
      // Save order document in Firestore 'orders' collection
      await setDoc(doc(db, 'orders', newOrderId), orderData);
    } catch (err) {
      console.error('Error saving order to Firestore:', err);
    }

    // Save fallback in localStorage
    try {
      const existingBackup = JSON.parse(localStorage.getItem('bb_orders_backup') || '[]');
      localStorage.setItem('bb_orders_backup', JSON.stringify([orderData, ...existingBackup]));
    } catch (err) {
      console.error('Error saving backup order to localStorage:', err);
    }

    // Save active order for 10-minute stage progress tracking
    const activeOrderObj: ActiveOrderData = {
      orderId: newOrderId,
      customerName: formData.name,
      phone: formData.phone,
      address: formData.address,
      items: orderItems.map((item) => ({
        name: isAr ? (item.name_ar || item.name) : item.name,
        quantity: item.quantity,
        price: item.unitPrice,
        optionsSummary: item.variant === 'combo' ? (isAr ? 'وجبة' : 'Combo') : (isAr ? 'ساندوتش' : 'Solo'),
      })),
      totalPrice,
      createdAt: Date.now(),
    };

    setPlacedActiveOrder(activeOrderObj);

    try {
      localStorage.setItem('bb_active_order', JSON.stringify(activeOrderObj));
      window.dispatchEvent(new Event('bb_order_updated'));
    } catch (e) {
      console.error('Error storing active order:', e);
    }

    setIsSubmitting(false);
    setOrderCompleted(true);
    triggerConfetti();

    // Open WhatsApp with formatted order text
    const text = formatWhatsAppMessage(newOrderId);
    window.open(`https://wa.me/${targetNumber}?text=${text}`, '_blank');

    clearCart();
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderCompleted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(220,38,38,0.4)] overflow-hidden z-10 max-h-[90dvh] flex flex-col font-mono"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-black uppercase tracking-wider text-white">
                {orderCompleted ? t('orderSentTitle') : t('checkoutTitle')}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Modal Content */}
          <div className="p-6 overflow-y-auto space-y-6 text-zinc-300 custom-scrollbar flex-1 font-sans">
            {orderCompleted ? (
              /* Success / Receipt Screen */
              <div className="text-center space-y-6 py-4 font-mono">
                <div className="w-20 h-20 bg-gradient-to-tr from-emerald-600 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.6)] animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <div>
                  <span className="text-xs font-black tracking-widest text-emerald-400 uppercase block">
                    {t('whatsappOpened')}
                  </span>
                  <h3 className="text-3xl font-black text-white mt-1">
                    {isAr ? `طلب رقم #${orderId}` : `Order #${orderId}`}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto font-sans">
                    {t('thankYou')}, <strong className="text-white">{formData.name}</strong>! {t('whatsappRedirectNote')}
                  </p>
                </div>

                {/* Delivery details breakdown card */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-left rtl:text-right space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono">
                    <span className="text-xs text-zinc-500 font-bold uppercase">{t('estimatedDelivery')}</span>
                    <span className="text-sm font-extrabold text-amber-400">{t('minsRange')}</span>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <MapPin className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{formData.address}</span>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-300">
                      <Phone className="w-4 h-4 text-red-500 shrink-0" />
                      <span>{formData.phone}</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-black text-white font-mono">
                    <span>{t('paymentMethod')}</span>
                    <span className="text-emerald-400">{t('cashOnDelivery')} ({totalPrice} {isAr ? 'ج.م' : 'EGP'})</span>
                  </div>
                </div>

                {/* Live Order Progress Banner */}
                <button
                  type="button"
                  onClick={() => setShowTrackerModal(true)}
                  className="w-full bg-gradient-to-r from-red-600 via-red-700 to-amber-600 hover:scale-[1.02] text-white font-mono font-black py-4 px-4 rounded-2xl text-xs sm:text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(234,31,39,0.5)] border border-red-500/50 transition-all flex items-center justify-center gap-2 animate-pulse"
                >
                  <Truck className="w-5 h-5 text-amber-300" />
                  <span>{isAr ? "متابعة مراحل تحضير وتوصيل الطلب مباشرة 🚴‍♂️" : "TRACK ORDER PROGRESS LIVE 🚴‍♂️"}</span>
                </button>

                <div className="flex flex-col gap-2.5 pt-1">
                  <a
                    href={`https://wa.me/201515821555?text=${formatWhatsAppMessage(orderId)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('sendToFaisalWhatsapp')}</span>
                  </a>
                  <a
                    href={`https://wa.me/201034926555?text=${formatWhatsAppMessage(orderId)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full bg-teal-600 hover:bg-teal-500 text-white font-bold py-3.5 px-4 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>{t('sendToDistrict9Whatsapp')}</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-black py-3 px-4 rounded-2xl text-xs uppercase tracking-wider transition-all mt-1"
                  >
                    {t('backToMenu')}
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={(e) => handleSubmitOrder(e, selectedBranch === 'district9' ? '201034926555' : '201515821555')} className="space-y-5">
                {/* Order Summary banner */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-xs text-zinc-400 font-bold block">{t('totalToPay')}</span>
                    <span className="text-xs text-zinc-500">
                      {selectedBranch === 'district9' ? t('includesDeliveryNoticeDistrict9') : t('includesDeliveryNoticeFaisal')}
                    </span>
                  </div>
                  <span className="text-2xl font-black text-amber-400">{totalPrice} {isAr ? 'ج.م' : 'EGP'}</span>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  {/* Branch / Area Selector Dropdown */}
                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      {t('selectBranch')}
                    </label>
                    <select
                      value={selectedBranch}
                      onChange={(e) => setSelectedBranch(e.target.value as 'faisal' | 'district9')}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-600 font-mono cursor-pointer"
                    >
                      <option value="faisal">📍 {isAr ? 'فرع فيصل' : 'Faisal Branch'}</option>
                      <option value="district9">📍 {isAr ? 'مول District 9' : 'District 9 Branch'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      {t('fullName')}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder={isAr ? "مثال: أحمد حسن" : "e.g. Ahmed Hassan"}
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      {t('phoneNumber')}
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      {t('address')}
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      placeholder={isAr ? "اسم الشارع، رقم العمارة، الطابق، علامة مميزة..." : "Street name, building number, floor, landmark..."}
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none font-sans"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      {t('orderNotes')}
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder={isAr ? "أي تعليمات خاصة بالوصول أو الصوصات..." : "Any specific delivery or sauce preference..."}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 font-sans"
                    />
                  </div>
                </div>

                {/* Security Guarantee */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{t('whatsappGuarantee')}</span>
                </div>

                {/* Dynamic Submit CTA based on Selected Branch */}
                <div className="pt-1">
                  {selectedBranch === 'faisal' ? (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-mono font-black py-4 px-4 rounded-2xl text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('generatingWhatsapp')}
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-emerald-300 shrink-0" />
                          <span>{t('sendToFaisalWhatsapp')} ({totalPrice} {isAr ? 'ج.م' : 'EGP'})</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-teal-600 via-teal-700 to-teal-800 hover:from-teal-500 hover:to-teal-700 text-white font-mono font-black py-4 px-4 rounded-2xl text-sm uppercase tracking-wider shadow-[0_0_30px_rgba(20,184,166,0.5)] border border-teal-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          {t('generatingWhatsapp')}
                        </span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 text-teal-300 shrink-0" />
                          <span>{t('sendToDistrict9Whatsapp')} ({totalPrice} {isAr ? 'ج.م' : 'EGP'})</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            )}
          </div>
        </motion.div>
      </div>

      <OrderTrackerModal
        isOpen={showTrackerModal}
        onClose={() => setShowTrackerModal(false)}
        orderData={placedActiveOrder}
      />
    </AnimatePresence>
  );
}