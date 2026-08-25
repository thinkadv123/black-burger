"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Plus, Minus, Flame, Check, Sparkles, Utensils } from 'lucide-react';
import { useCart, CartItemOption } from '@/context/CartContext';
import { MENU_ADDITIONS, MENU_SAUCES, Addition } from '@/data/menu';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductModal() {
  const { customizingProduct, setCustomizingProduct, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [mealType, setMealType] = useState<'solo' | 'combo'>('solo');
  const [size, setSize] = useState<'regular' | 'large'>('regular');
  const [removedIngredients, setRemovedIngredients] = useState<string[]>([]);
  const [addedAdditions, setAddedAdditions] = useState<Addition[]>([]);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset modal state when product changes
  useEffect(() => {
    if (customizingProduct) {
      setQuantity(1);
      setMealType('solo');
      setSize('regular');
      setRemovedIngredients([]);
      setAddedAdditions([]);
      setSpecialInstructions('');
    }
  }, [customizingProduct]);

  if (!customizingProduct) return null;

  const isBurgerOrChicken =
    customizingProduct.category === 'SMASH BURGERS' ||
    customizingProduct.category === 'CHICKEN COLLECTION';

  const isOnionRings = customizingProduct.id === 'onion-rings';

  const toggleRemovedIngredient = (ing: string) => {
    setRemovedIngredients((prev) =>
      prev.includes(ing) ? prev.filter((i) => i !== ing) : [...prev, ing]
    );
  };

  const toggleAddition = (addition: Addition) => {
    setAddedAdditions((prev) =>
      prev.some((a) => a.id === addition.id)
        ? prev.filter((a) => a.id !== addition.id)
        : [...prev, addition]
    );
  };

  // Calculate live unit price
  let basePrice = customizingProduct.price;
  if (isOnionRings && size === 'large') {
    basePrice = customizingProduct.priceLarge || 80;
  }
  if (mealType === 'combo') {
    basePrice += 45;
  }
  const additionsTotal = addedAdditions.reduce((sum, a) => sum + a.price, 0);
  const unitPrice = basePrice + additionsTotal;
  const totalPrice = unitPrice * quantity;

  const handleAdd = () => {
    const options: CartItemOption = {
      type: mealType,
      size: isOnionRings ? size : undefined,
      removedIngredients,
      addedAdditions,
      specialInstructions: specialInstructions.trim(),
    };
    addToCart(customizingProduct, quantity, options);
    setCustomizingProduct(null);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setCustomizingProduct(null)}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl shadow-[0_0_50px_rgba(220,38,38,0.3)] overflow-hidden z-10 max-h-[90vh] flex flex-col"
        >
          {/* Header Image banner */}
          <div className="relative h-60 sm:h-72 w-full overflow-hidden bg-zinc-900 shrink-0">
            <Image
              src={customizingProduct.image}
              alt={customizingProduct.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            
            {/* Close button */}
            <button
              onClick={() => setCustomizingProduct(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 border border-zinc-700 text-white hover:bg-red-600 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Title & Badges */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="px-3 py-0.5 rounded-full text-xs font-black bg-red-600 text-white uppercase tracking-wider">
                  {customizingProduct.category}
                </span>
                {customizingProduct.spicy && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center gap-1">
                    <Flame className="w-3 h-3 text-red-500" /> Spicy
                  </span>
                )}
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {customizingProduct.name}
              </h2>
            </div>
          </div>

          {/* Scrollable Content Body */}
          <div className="p-6 overflow-y-auto space-y-6 custom-scrollbar flex-1 text-zinc-300">
            {/* Product description */}
            <p className="text-sm sm:text-base leading-relaxed text-zinc-400">
              {customizingProduct.description}
            </p>

            {/* Onion Rings Size Selection */}
            {isOnionRings && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
                  Select Size
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSize('regular')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      size === 'regular'
                        ? 'border-red-600 bg-red-950/30 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-white">Regular</span>
                      <span className="text-xs text-zinc-400">Crispy appetizer</span>
                    </div>
                    <span className="font-black text-amber-400">60 EGP</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSize('large')}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      size === 'large'
                        ? 'border-red-600 bg-red-950/30 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div>
                      <span className="font-bold text-sm block text-white">Large Share</span>
                      <span className="text-xs text-zinc-400">Extra portion</span>
                    </div>
                    <span className="font-black text-amber-400">80 EGP</span>
                  </button>
                </div>
              </div>
            )}

            {/* Combo Upgrade Option */}
            {isBurgerOrChicken && (
              <div className="space-y-3">
                <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
                  Choose Meal Type
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setMealType('solo')}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      mealType === 'solo'
                        ? 'border-red-600 bg-red-950/30 text-white shadow-[0_0_15px_rgba(220,38,38,0.3)]'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-bold text-base text-white">Solo Burger</span>
                      <span className="text-xs text-zinc-400">Sandwich only</span>
                    </div>
                    <span className="font-black text-amber-400 text-sm">{customizingProduct.price} EGP</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setMealType('combo')}
                    className={`p-4 rounded-2xl border text-left flex flex-col justify-between transition-all relative overflow-hidden ${
                      mealType === 'combo'
                        ? 'border-amber-500 bg-amber-950/30 text-white shadow-[0_0_20px_rgba(234,179,8,0.3)]'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700'
                    }`}
                  >
                    <span className="absolute top-0 right-0 bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded-bl-lg">
                      BEST VALUE
                    </span>
                    <div className="flex flex-col mb-1">
                      <span className="font-bold text-base text-white flex items-center gap-1">
                        <Utensils className="w-4 h-4 text-amber-400" /> Make it a Combo
                      </span>
                      <span className="text-[11px] text-zinc-300 font-medium">
                        + Crispy Fries & Ice Cold Drink
                      </span>
                    </div>
                    <span className="font-black text-amber-400 text-sm">+{45} EGP</span>
                  </button>
                </div>
              </div>
            )}

            {/* Ingredients Customization (Remove option) */}
            {customizingProduct.defaultIngredients && customizingProduct.defaultIngredients.length > 0 && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-red-600 pl-2">
                    Remove Ingredients (Optional)
                  </h3>
                  <span className="text-xs text-zinc-500">Tap to exclude</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {customizingProduct.defaultIngredients.map((ing) => {
                    const isRemoved = removedIngredients.includes(ing);
                    return (
                      <button
                        key={ing}
                        type="button"
                        onClick={() => toggleRemovedIngredient(ing)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 border ${
                          isRemoved
                            ? 'line-through bg-red-950/80 border-red-700 text-red-300'
                            : 'bg-zinc-900 border-zinc-800 text-zinc-200 hover:border-zinc-700'
                        }`}
                      >
                        {isRemoved ? <X className="w-3.5 h-3.5 text-red-400" /> : <Check className="w-3.5 h-3.5 text-emerald-400" />}
                        {ing}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Extra Additions & Toppings */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Extra Toppings & Additions
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {MENU_ADDITIONS.map((add) => {
                  const isAdded = addedAdditions.some((a) => a.id === add.id);
                  return (
                    <button
                      key={add.id}
                      type="button"
                      onClick={() => toggleAddition(add)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isAdded
                          ? 'border-amber-500 bg-amber-950/40 text-white shadow-sm'
                          : 'border-zinc-800/80 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border flex items-center justify-center ${
                            isAdded ? 'bg-amber-500 border-amber-500 text-black' : 'border-zinc-600'
                          }`}
                        >
                          {isAdded && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                        <span className="text-xs font-bold">{add.name}</span>
                      </div>
                      <span className="text-xs font-extrabold text-amber-400">+{add.price} EGP</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Extra Sauces */}
            <div className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white border-l-2 border-amber-500 pl-2">
                Dipping Sauces
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {MENU_SAUCES.map((sauce) => {
                  const isAdded = addedAdditions.some((a) => a.id === sauce.id);
                  return (
                    <button
                      key={sauce.id}
                      type="button"
                      onClick={() => toggleAddition(sauce)}
                      className={`p-2.5 rounded-xl border text-left flex items-center justify-between transition-all ${
                        isAdded
                          ? 'border-red-600 bg-red-950/40 text-white'
                          : 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-zinc-700'
                      }`}
                    >
                      <span className="text-xs font-bold truncate">{sauce.name}</span>
                      <span className="text-[11px] font-black text-amber-400 shrink-0 pl-1">+{sauce.price}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Special Instructions Note */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-zinc-400 uppercase tracking-wider block">
                Special Kitchen Instructions (Optional)
              </label>
              <input
                type="text"
                placeholder="e.g., Extra crispy bun, sauce on the side..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-600"
              />
            </div>
          </div>

          {/* Footer Bar: Quantity + Total + Add Button */}
          <div className="p-4 sm:p-6 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
            {/* Quantity Controls */}
            <div className="flex items-center gap-3 bg-zinc-950 border border-zinc-800 rounded-full px-3 py-1.5">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-8 h-8 rounded-full bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center text-white font-bold transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-black text-lg text-white">{quantity}</span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-500 flex items-center justify-center text-white font-bold transition-colors shadow-md"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Total & Add CTA */}
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="text-right hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">Total Amount</span>
                <span className="text-xl font-black text-amber-400">{totalPrice} EGP</span>
              </div>

              <button
                type="button"
                onClick={handleAdd}
                className="w-full sm:w-auto flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-black px-8 py-3.5 rounded-2xl text-sm sm:text-base tracking-wider uppercase shadow-[0_0_25px_rgba(220,38,38,0.6)] border border-red-500/40 transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>ADD TO ORDER • {totalPrice} EGP</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
