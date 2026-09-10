"use client";

import React, { useState } from 'react';
import { X, CheckCircle2, Phone, MapPin, Send, Truck, ShieldCheck, Flame, MessageSquare } from 'lucide-react';
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
    paymentMethod: 'whatsapp', // default to WhatsApp for direct ordering
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
        let details = `*${idx + 1}. ${item.product.name}*  (x${item.quantity})\n   💵 *Price:* ${item.unitPrice * item.quantity} EGP`;
        
        const optionTags: string[] = [];
        if (item.options.variant === 'combo') {
          optionTags.push('🍟🥤 Combo Meal (Includes Fries & Soft Drink)');
        } else if (item.product.comboPrice) {
          optionTags.push('🍔 Solo Sandwich');
        }

        if (item.options.size) {
          optionTags.push(`📏 Size: ${item.options.size}`);
        }

        if (item.options.addedAdditions.length > 0) {
          const adds = item.options.addedAdditions.map((a) => `+ ${a.name} (+${a.price} EGP)`).join('\n      ');
          optionTags.push(`🧀 *Extras:*\n      ${adds}`);
        }

        if (item.options.removedIngredients.length > 0) {
          const removed = item.options.removedIngredients.map((ing) => `❌ No ${ing}`).join(', ');
          optionTags.push(`🚫 *Customizations:* ${removed}`);
        }

        if (item.options.specialInstructions) {
          optionTags.push(`💬 *Note:* "${item.options.specialInstructions}"`);
        }

        if (optionTags.length > 0) {
          details += `\n   ${optionTags.join('\n   ')}`;
        }

        return details;
      })
      .join('\n\n');

    const message = `🍔🔥 *BLACK BURGER | NEW ORDER* 🔥🍔
🆔 *Order Ref:* #${generatedId}

👤 *CUSTOMER DETAILS*
━━━━━━━━━━━━━━━━━━━━━
▫️ *Name:* ${formData.name}
▫️ *Phone:* ${formData.phone}
▫️ *Delivery Address:* ${formData.address}
${formData.notes ? `▫️ *Special Instructions:* ${formData.notes}\n` : ''}
🛒 *ORDER BREAKDOWN*
━━━━━━━━━━━━━━━━━━━━━
${itemsList}

💰 *BILL SUMMARY*
━━━━━━━━━━━━━━━━━━━━━
▫️ *Subtotal:* ${subtotalPrice} EGP
▫️ *Delivery Fee (Faisal):* ${deliveryFee} EGP
🔥 *TOTAL DUE:* *${totalPrice} EGP*
💳 *Payment Method:* Cash on Delivery

⚡ _Sent via Black Burger Web App_`;

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

      // Open WhatsApp with formatted order text
      const text = formatWhatsAppMessage(newOrderId);
      window.open(`https://wa.me/201144484008?text=${text}`, '_blank');

      clearCart();
    }, 1000);
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
          className="relative w-full max-w-xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_60px_rgba(220,38,38,0.4)] overflow-hidden z-10 max-h-[90vh] flex flex-col font-mono"
        >
          {/* Header */}
          <div className="p-6 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-red-500" />
              <h2 className="text-xl font-black uppercase tracking-wider text-white">
                {orderCompleted ? 'Order Sent to WhatsApp' : 'Checkout & Delivery'}
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
                    WHATSAPP ORDER OPENED
                  </span>
                  <h3 className="text-3xl font-black text-white mt-1">
                    Order #{orderId}
                  </h3>
                  <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto font-sans">
                    Thank you, <strong className="text-white">{formData.name}</strong>! Your order details have been formatted and passed directly to WhatsApp.
                  </p>
                </div>

                {/* Delivery details breakdown card */}
                <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 text-left space-y-3 font-sans">
                  <div className="flex items-center justify-between border-b border-zinc-800 pb-3 font-mono">
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

                  <div className="pt-2 border-t border-zinc-800 flex justify-between items-center text-sm font-black text-white font-mono">
                    <span>Payment Method</span>
                    <span className="text-emerald-400">Cash on Delivery ({totalPrice} EGP)</span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <a
                    href={`https://wa.me/201144484008?text=${formatWhatsAppMessage(orderId)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Re-open WhatsApp Chat</span>
                  </a>
                  <button
                    onClick={handleClose}
                    className="flex-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-black py-3.5 rounded-2xl text-xs uppercase tracking-wider transition-all"
                  >
                    Back to Menu
                  </button>
                </div>
              </div>
            ) : (
              /* Checkout Form */
              <form onSubmit={handleSubmitOrder} className="space-y-5">
                {/* Order Summary banner */}
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between font-mono">
                  <div>
                    <span className="text-xs text-zinc-400 font-bold block">Total Amount to Pay</span>
                    <span className="text-xs text-zinc-500">Includes delivery fee in Faisal</span>
                  </div>
                  <span className="text-2xl font-black text-amber-400">{totalPrice} EGP</span>
                </div>

                {/* Form Inputs */}
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
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
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
                      Phone Number *
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
                    <label className="text-xs font-bold text-zinc-300 uppercase tracking-wider block mb-1 font-mono">
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

                {/* Security Guarantee */}
                <div className="flex items-center gap-2 text-xs text-zinc-400 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/40">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your full cart details & delivery address will be sent formatted directly to WhatsApp.</span>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-700 to-emerald-800 hover:from-emerald-500 hover:to-emerald-700 text-white font-mono font-black py-4 rounded-2xl text-[19px] sm:text-[21px] uppercase tracking-wider shadow-[0_0_30px_rgba(16,185,129,0.5)] border border-emerald-500/40 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      GENERATING WHATSAPP ORDER...
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-emerald-300" />
                      <span>SEND ORDER TO WHATSAPP ({totalPrice} EGP)</span>
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