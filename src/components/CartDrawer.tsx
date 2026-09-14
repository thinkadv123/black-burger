"use client";

import React from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Flame, Utensils } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { getProductName, getAdditionName } from '@/data/menu';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    setIsCheckoutOpen,
    subtotalPrice,
    deliveryFee,
    totalPrice,
    totalItemsCount,
  } = useCart();
  const { isAr, t } = useLanguage();

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-hidden font-mono">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        />

        <div className="fixed inset-y-0 right-0 rtl:right-auto rtl:left-0 pl-10 rtl:pl-0 rtl:pr-10 max-w-full flex">
          <motion.div
            initial={{ x: isAr ? '-100%' : '100%' }}
            animate={{ x: 0 }}
            exit={{ x: isAr ? '-100%' : '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-screen max-w-md bg-zinc-950 border-l rtl:border-l-0 rtl:border-r border-zinc-800 text-white shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5 text-red-500" />
                <h2 className="text-xl font-black uppercase tracking-wider text-white">
                  {t('yourOrder')}
                </h2>
                <span className="bg-red-600/30 text-red-400 border border-red-600/40 text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {totalItemsCount} {totalItemsCount === 1 ? t('item') : t('items')}
                </span>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                  <div className="w-20 h-20 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-600">
                    <ShoppingBag className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white">{t('cartEmptyTitle')}</h3>
                    <p className="text-xs text-zinc-400 mt-1 max-w-xs font-sans">
                      {t('cartEmptySub')}
                    </p>
                  </div>
                  <a
                    href="#menu-section"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-2 bg-gradient-to-r from-red-600 to-red-800 text-white font-bold px-6 py-2.5 rounded-full text-xs uppercase tracking-wider shadow-lg hover:shadow-red-600/40 transition-all flex items-center gap-1.5"
                  >
                    <Flame className="w-4 h-4 text-amber-400" />
                    <span>{t('exploreMenu')}</span>
                  </a>
                </div>
              ) : (
                cart.map((item) => {
                  const itemTotal = item.unitPrice * item.quantity;
                  const name = getProductName(item.product, isAr);

                  return (
                    <motion.div
                      key={item.cartItemId}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 flex gap-3 relative group"
                    >
                      {/* Thumbnail */}
                      <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-zinc-800 shrink-0">
                        <Image
                          src={item.product.image}
                          alt={name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Content details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <h4 className="font-bold text-sm text-white truncate pr-2 rtl:pr-0 rtl:pl-2 uppercase">
                            {name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartItemId)}
                            className="text-zinc-500 hover:text-red-500 p-1 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Badges for Meal option & additions */}
                        <div className="flex flex-wrap gap-1 mt-1 font-sans">
                          {item.options.variant === 'combo' && (
                            <span className="text-[10px] font-extrabold bg-amber-950/80 text-amber-400 border border-amber-800/60 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                              <Utensils className="w-2.5 h-2.5" /> {t('combo')}
                            </span>
                          )}
                          {item.options.size && (
                            <span className="text-[10px] font-extrabold bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded-full">
                              {isAr ? 'الحجم:' : 'Size:'} {item.options.size}
                            </span>
                          )}
                          {item.options.addedAdditions?.map((add) => {
                            const addName = getAdditionName(add, isAr);
                            return (
                              <span
                                key={add.id}
                                className="text-[10px] font-semibold bg-red-950/60 text-red-300 border border-red-900/50 px-2 py-0.5 rounded-full"
                              >
                                +{addName} (+{add.price} {isAr ? 'ج.م' : 'EGP'})
                              </span>
                            );
                          })}
                          {item.options.removedIngredients?.map((ing) => (
                            <span
                              key={ing}
                              className="text-[10px] line-through text-red-400 bg-zinc-800/80 px-1.5 py-0.5 rounded"
                            >
                              {isAr ? 'بدون' : 'No'} {ing}
                            </span>
                          ))}
                        </div>

                        {/* Selected Sandwiches for Offer Bundles */}
                        {item.options.selectedSandwiches && (
                          <div className="w-full mt-1.5 flex flex-wrap gap-1">
                            {Object.entries(item.options.selectedSandwiches).map(([key, val], idx) => (
                              <span
                                key={key}
                                className="text-[10px] font-mono font-bold bg-red-950/80 text-amber-300 border border-red-800/60 px-2 py-0.5 rounded-md flex items-center gap-1"
                              >
                                <span className="text-red-400">{isAr ? `الساندوتش ${idx + 1}:` : `Sandwich ${idx + 1}:`}</span> {val}
                              </span>
                            ))}
                          </div>
                        )}

                        {item.options.specialInstructions && (
                          <p className="text-[10px] text-zinc-400 italic mt-1 font-sans truncate">
                            &quot;{item.options.specialInstructions}&quot;
                          </p>
                        )}

                        {/* Quantity and price */}
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center gap-2 bg-zinc-950 border border-zinc-800 rounded-lg px-2 py-1">
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                              className="text-zinc-400 hover:text-white p-0.5"
                            >
                              <Minus className="w-3.5 h-3.5" />
                            </button>
                            <span className="text-xs font-black text-white w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                              className="text-red-500 hover:text-red-400 p-0.5"
                            >
                              <Plus className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <span className="font-black text-sm text-amber-400">
                            {itemTotal} {isAr ? 'ج.م' : 'EGP'}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>

            {/* Order Summary Footer */}
            {cart.length > 0 && (
              <div className="p-6 bg-zinc-900 border-t border-zinc-800 space-y-4">
                <div className="space-y-2 text-xs text-zinc-400">
                  <div className="flex justify-between">
                    <span>{t('subtotal')}</span>
                    <span className="font-bold text-zinc-200">{subtotalPrice} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('deliveryFee')}</span>
                    <span className="font-bold text-zinc-200">{deliveryFee} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                  <div className="pt-2 border-t border-zinc-800 flex justify-between text-base font-black text-white">
                    <span>{t('totalOrder')}</span>
                    <span className="text-amber-400 text-lg">{totalPrice} {isAr ? 'ج.م' : 'EGP'}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setIsCheckoutOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-red-600 via-red-700 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-4 rounded-2xl text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(220,38,38,0.5)] border border-red-500/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>{t('proceedToCheckout')}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}
