"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, Send, Truck, ShieldCheck, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

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

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    notes: '',
    paymentMethod: 'cod', // 'cod' or 'whatsapp'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderCompleted, setOrderCompleted] = useState(false);
  const [orderId, setOrderId] = useState('');

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
        let details = `${idx + 1}. *${item.product.name}* (x${item.quantity}) - ${item.unitPrice * item.quantity} EGP`;
        if (item.options.type === 'combo') details += `\n   ↳ [COMBO MEAL]`;
        if (item.options.size === 'large') details += `\n   ↳ [LARGE PORTION]`;
        if (item.options.addedAdditions.length > 0) {
          details += `\n   ↳ Additions: ${item.options.addedAdditions.map((a) => a.name).join(', ')}`;
        }
        if (item.options.removedIngredients.length > 0) {
          details += `\n   ↳ No: ${item.options.removedIngredients.join(', ')}`;
        }
        return details;
      })
      .join('\n\n');

    const message = `🔥 *NEW BLACK BURGER ORDER* (${generatedId})
--------------------------------
*Customer Details:*
• *Name:* ${formData.name}
• *Phone:* ${formData.phone}
• *Address:* ${formData.address}
${formData.notes ? `• *Notes:* ${formData.notes}\n` : ''}
--------------------------------
*Order Items:*
${itemsList}

--------------------------------
*Subtotal:* ${subtotalPrice} EGP
*Delivery (Faisal):* ${deliveryFee} EGP
*TOTAL AMOUNT:* ${totalPrice} EGP
--------------------------------
*Payment Method:* Cash on Delivery

Please confirm my smash burger order! 🍔💥`;

    return encodeURIComponent(message);
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      return;
    }

    setIsSubmitting(true);
    const newOrderId = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderId(newOrderId);

    setTimeout(() => {
      setIsSubmitting(false);
      setOrderCompleted(true);
      triggerConfetti();

      // If WhatsApp payment selected, redirect after brief delay
      if (formData.paymentMethod === 'whatsapp') {
        const text = formatWhatsAppMessage(newOrderId);
        window.open(`https://wa.me/201515821555?text=${text}`, '_blank');
      }

      clearCart();
    }, 1200);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setOrderCompleted(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
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
          className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(220,38,38,0.4)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-black uppercase tracking-wider text-white">
                {orderCompleted ? 'Order Confirmed' : 'Checkout & Delivery'}
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
          <div className="p-6 overflow-y-auto space-y-6 text-zinc-300 custom-scrollbar flex-1">
            {orderCompleted ? (
              /* Success / Receipt Screen */
              <div className="text-center space-y-6 py-4">
                <div className="w-20 h-20 bg-gradient-to-tr from-red-600 to-amber-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(220,38,38,0.6)] animate-bounce">
                  <CheckCircle2 className="w-10 h-10 text-white" />
                </div>

                <div>
                  <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
                    SMASH ORDER PLACED
                  </span>
                  <h3 className="text-3xl font-black text-white mt-1">
                    Order #{orderId}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
                    Thank you, <strong className="text-white">{formData.name}</strong>! Your smash burgers are being sizzling-smashed on the grill right now.
                  </p>
                </div>

                {/* Delivery details breakdown card */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                    <span className="text-xs text-zinc-500 font-bold uppercase">Estimated Delivery</span>
                    <span className="text-sm font-extrabold text-amber-400">25 – 35 Mins</span>
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

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-black text-white">
                    <span>Payment Method</span>
                    <span className="text-emerald-400">Cash on Delivery ({totalPrice} EGP)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href="tel:01515821555"
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-4 h-4 text-red-500" />
                    <span>Hotline: 01515821555</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider shadow-lg transition-all"
                  >
                    Done & Back to Home
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                {/* Order Summary banner */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-zinc-400 font-bold block">Total Amount to Pay</span>
                    <span className="text-xs text-zinc-500">Includes delivery fee in Faisal</span>
                  </div>
                  <span className="text-2xl font-black text-amber-400">{totalPrice} EGP</span>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Ahmed Hassan"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="01xxxxxxxxx"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                      Delivery Address (Faisal Area) *
                    </label>
                    <textarea
                      name="address"
                      required
                      rows={2}
                      placeholder="Street name, building number, floor, landmark (e.g., Near Tawheed & Nour)..."
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600 resize-none"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1">
                      Order Notes (Optional)
                    </label>
                    <input
                      type="text"
                      name="notes"
                      placeholder="Any specific delivery or sauce preference..."
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
                    />
                  </div>
                </div>

                {/* Payment Option Toggle */}
                <div className="space-y-3 pt-2">
                  <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block">
                    Choose Order Confirmation Method
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-red-600 bg-red-950/40 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-bold text-sm text-white flex items-center gap-1.5">
                        💵 Cash on Delivery
                      </span>
                      <span className="text-[11px] text-zinc-400 mt-1">Pay when burger arrives</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'whatsapp' })}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        formData.paymentMethod === 'whatsapp'
                          ? 'border-emerald-500 bg-emerald-950/40 text-white shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                      }`}
                    >
                      <span className="font-bold text-sm text-white flex items-center gap-1.5">
                        💬 Direct WhatsApp
                      </span>
                      <span className="text-[11px] text-emerald-400 mt-1">Send cart to WhatsApp</span>
                    </button>
                  </div>
                </div>

                {/* Security Guarantee */}
                <div className="flex items-center gap-2 text-xs text-zinc-500 bg-zinc-900/50 p-3 rounded-xl border border-zinc-800">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>100% fresh smash guaranteed. Payment collected upon delivery.</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black py-4 rounded-2xl text-sm sm:text-base uppercase tracking-wider shadow-[0_0_30px_rgba(220,38,38,0.6)] border border-red-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      PLUMMETING SMASH PATTY...
                    </span>
                  ) : formData.paymentMethod === 'whatsapp' ? (
                    <>
                      <Send className="w-4 h-4 text-emerald-400" />
                      <span>SEND ORDER VIA WHATSAPP ({totalPrice} EGP)</span>
                    </>
                  ) : (
                    <>
                      <Flame className="w-4 h-4 text-amber-300" />
                      <span>CONFIRM CASH ON DELIVERY ({totalPrice} EGP)</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
