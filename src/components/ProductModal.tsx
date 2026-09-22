"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  ProductItem,
  AdditionItem,
  INITIAL_PRODUCTS,
  getProductName,
  getProductDescription,
  getProductIngredients,
  getAdditionName,
} from '@/data/menu';
import { useCart, CartItemOption } from '@/context/CartContext';
import { useMenu } from '@/context/MenuContext';
import { useLanguage } from '@/context/LanguageContext';
import { Plus, Minus, Flame, Check, AlertTriangle, X, ShoppingBag, MessageSquare } from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const { additions } = useMenu();
  const { isAr, t } = useLanguage();

  const [variant, setVariant] = useState<'solo' | 'combo'>('combo');
  const [smashSize, setSmashSize] = useState<'Double' | 'Triple' | 'Quad'>('Double');
  const [selectedSize, setSelectedSize] = useState<'Large' | 'X-Large'>('Large');
  const [flavor, setFlavor] = useState<'Normal' | 'Spicy'>('Normal');
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [selectedAdditions, setSelectedAdditions] = useState<AdditionItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  const [selectedSandwiches, setSelectedSandwiches] = useState<Record<string, string>>({});

  // Reset modal state when product changes
  useEffect(() => {
    if (product) {
      setVariant('combo');
      setSmashSize('Double');
      setSelectedSize('Large');
      setFlavor('Normal');
      setActiveIngredients(getProductIngredients(product, isAr) || []);
      setSelectedAdditions([]);
      setQuantity(1);
      setSpecialInstructions('');

      // Initialize default sandwich selections if product has bundleChoices
      const bundleChoices = product.bundleChoices || INITIAL_PRODUCTS.find((p) => p.id === product.id)?.bundleChoices;
      if (bundleChoices && bundleChoices.length > 0) {
        const initialSelections: Record<string, string> = {};
        bundleChoices.forEach((group) => {
          initialSelections[group.id] = group.options[0] || '';
        });
        setSelectedSandwiches(initialSelections);
      } else {
        setSelectedSandwiches({});
      }
    }
  }, [product, isAr]);

  if (!product) return null;

  const productName = getProductName(product, isAr);
  const productDesc = getProductDescription(product, isAr);
  const rawIngredients = getProductIngredients(product, isAr);

  const effectiveBundleChoices = product.bundleChoices || INITIAL_PRODUCTS.find((p) => p.id === product.id)?.bundleChoices;

  const isSmashBurger = product.category === 'Smash Burgers' || product.category === 'Exclusive';
  const isBurgerOrChicken =
    isSmashBurger || product.category === 'Chicken Collection';

  const isOfferProduct = product.category === 'Offers' || (product.category as string) === 'Online Only Offers';

  // Calculate live item unit price
  let basePrice = product.soloPrice;
  if (isSmashBurger) {
    if (smashSize === 'Triple') {
      basePrice += 40;
    } else if (smashSize === 'Quad') {
      basePrice += 80;
    }

    if (variant === 'combo') {
      basePrice += 50;
    }
  } else if (product.sizePrices && product.sizePrices.length > 0) {
    const sz = product.sizePrices.find((s) => s.label === selectedSize);
    if (sz) basePrice = sz.price;
    if (variant === 'combo') {
      basePrice += 50;
    }
  } else if (variant === 'combo') {
    basePrice = (product.soloPrice || 0) + 50;
  }

  const additionsPrice = selectedAdditions.reduce((sum, add) => sum + add.price, 0);
  const unitPrice = basePrice + additionsPrice;
  const totalPrice = unitPrice * quantity;

  // Track removed ingredients (only for non-offers)
  const removedIngredients = isOfferProduct
    ? []
    : rawIngredients.filter((ing) => !activeIngredients.includes(ing));

  const toggleIngredient = (ing: string) => {
    if (activeIngredients.includes(ing)) {
      setActiveIngredients((prev) => prev.filter((i) => i !== ing));
    } else {
      setActiveIngredients((prev) => [...prev, ing]);
    }
  };

  const toggleAddition = (add: AdditionItem) => {
    if (selectedAdditions.some((a) => a.id === add.id)) {
      setSelectedAdditions((prev) => prev.filter((a) => a.id !== add.id));
    } else {
      setSelectedAdditions((prev) => [...prev, add]);
    }
  };

  const handleAddToCart = () => {
    const options: CartItemOption = {
      variant: isBurgerOrChicken || product.comboPrice ? variant : 'solo',
      size: isSmashBurger ? smashSize : product.sizePrices && product.sizePrices.length > 0 ? selectedSize : undefined,
      flavor: (product.category === 'Exclusive' || product.id === 'hawaiian-chicken' || product.id === 'hawaiian-beef') ? flavor : undefined,
      removedIngredients,
      addedAdditions: selectedAdditions,
      selectedSandwiches: Object.keys(selectedSandwiches).length > 0 ? selectedSandwiches : undefined,
      specialInstructions,
    };

    addToCart(product, quantity, options);
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[92vh] sm:max-h-[90vh] overflow-y-auto bg-[#0F0F12] border-neutral-800 text-white p-0 gap-0 shadow-2xl rounded-2xl flex flex-col justify-between">
        <DialogTitle className="sr-only">{productName}</DialogTitle>

        <div>
          {/* Header Section with Image container */}
          <div className="relative p-4 sm:p-6 bg-neutral-900/80 border-b border-neutral-800 flex flex-row gap-3 sm:gap-6 items-center">
            {/* Image Container */}
            <div className={`relative shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-red-600/40 shadow-xl bg-neutral-950 flex items-center justify-center ${
              isOfferProduct
                ? 'w-24 h-32 sm:w-44 sm:h-60 aspect-[3/4]'
                : 'w-20 h-20 sm:w-36 sm:h-36 aspect-square'
            }`}>
              <Image
                src={product.image}
                alt={productName}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Product Info Next to Image */}
            <div className="flex-1 min-w-0 pr-8 sm:pr-8 rtl:pr-0 rtl:pl-8 sm:rtl:pl-8">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                {product.spicy && (
                  <span className="px-2 py-0.5 rounded-full bg-[#EA1F27] text-white font-bold text-[9px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shadow-md font-mono">
                    <Flame className="w-2.5 h-2.5 sm:w-3 sm:h-3 fill-[#CDB32D] text-[#CDB32D]" />
                    {t('spicy')}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-full bg-zinc-800 border border-[#03A0E5]/40 text-[#03A0E5] text-[9px] sm:text-xs font-semibold font-mono">
                  {product.category}
                </span>
              </div>

              <h2 className="text-lg sm:text-[22px] font-black text-white tracking-tight uppercase font-mono leading-tight">
                {productName}
              </h2>

              {productDesc && (
                <p className="text-[11px] sm:text-sm text-neutral-400 mt-1 leading-snug line-clamp-2 sm:line-clamp-none">
                  {productDesc}
                </p>
              )}
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-800/90 hover:bg-red-600 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors z-20"
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="p-4 sm:p-6 space-y-5 sm:space-y-7">
            {/* Spicy Warning Notice */}
            {product.spicyWarning && (
              <div className="p-3 rounded-xl bg-red-950/80 border border-red-600/60 text-red-200 text-xs sm:text-sm flex items-center gap-2.5 shadow-md">
                <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5 text-red-400 shrink-0" />
                <span className="font-semibold">{isAr && product.spicyWarning_ar ? product.spicyWarning_ar : product.spicyWarning}</span>
              </div>
            )}

            {/* BUNDLE SANDWICH SELECTION (FOR OFFERS LIKE PREMIUM BOX & CHICKEN BOX) */}
            {effectiveBundleChoices && effectiveBundleChoices.length > 0 && (
              <div className="space-y-3 bg-red-950/20 border border-red-800/50 p-3 sm:p-5 rounded-2xl">
                <div className="border-b border-red-900/40 pb-2 flex items-center justify-between">
                  <h3 className="text-xs sm:text-base font-black text-white uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-2 h-3.5 sm:w-2.5 sm:h-4 bg-red-600 rounded-sm" />
                    {t('chooseSandwiches')}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] bg-red-600 text-white font-mono font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                    {t('included')}
                  </span>
                </div>

                <div className="space-y-3">
                  {effectiveBundleChoices.map((group, idx) => {
                    const title = isAr && group.title_ar ? group.title_ar : group.title;
                    return (
                      <div key={group.id} className="space-y-1.5">
                        <label className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                          <span className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-red-600/30 border border-red-500/50 text-red-300 font-mono text-[10px] sm:text-[11px] flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          {title}:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 sm:gap-2">
                          {group.options.map((opt, optIdx) => {
                            const displayOpt = isAr && group.options_ar && group.options_ar[optIdx] ? group.options_ar[optIdx] : opt;
                            const isSelected = selectedSandwiches[group.id] === opt;
                            return (
                              <button
                                key={opt}
                                type="button"
                                onClick={() =>
                                  setSelectedSandwiches((prev) => ({ ...prev, [group.id]: opt }))
                                }
                                className={`p-2.5 sm:p-3 rounded-xl border text-xs font-mono font-bold transition-all text-left rtl:text-right flex items-center justify-between gap-1 ${
                                  isSelected
                                    ? 'border-red-500 bg-red-900/60 text-white shadow-lg shadow-red-950/50 ring-1 ring-red-500 scale-[1.02]'
                                    : 'border-neutral-800 bg-neutral-900/80 text-neutral-300 hover:border-neutral-700 hover:text-white'
                                }`}
                              >
                                <span className="truncate">{displayOpt}</span>
                                {isSelected && (
                                  <div className="w-3.5 h-3.5 rounded-full bg-red-500 text-white flex items-center justify-center shrink-0">
                                    <Check className="w-2.5 h-2.5" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 1: CHOOSE YOUR SIZE / VARIANT */}
            {isSmashBurger ? (
              <div className="space-y-5">
                {/* Step 1: Patty Size Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                      {t('choosePattySize')}
                    </h3>
                    <span className="text-[9px] sm:text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                      {t('required')}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 sm:gap-3 pt-0.5">
                    {/* Double */}
                    <button
                      type="button"
                      onClick={() => setSmashSize('Double')}
                      className={`p-2.5 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                        smashSize === 'Double'
                          ? 'border-red-600 bg-red-950/40 text-white ring-1 ring-red-600 shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">
                        {t('sizeDouble')}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 leading-tight font-sans">
                        {t('pattyDoubleDesc')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">
                        {product.soloPrice} {isAr ? 'ج.م' : 'EGP'}
                      </div>
                    </button>

                    {/* Triple */}
                    <button
                      type="button"
                      onClick={() => setSmashSize('Triple')}
                      className={`p-2.5 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                        smashSize === 'Triple'
                          ? 'border-red-600 bg-red-950/40 text-white ring-1 ring-red-600 shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">
                        {t('sizeTriple')}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 leading-tight font-sans">
                        {t('pattyTripleDesc')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">
                        {product.soloPrice + 40} {isAr ? 'ج.م' : 'EGP'}
                      </div>
                    </button>

                    {/* Quad */}
                    <button
                      type="button"
                      onClick={() => setSmashSize('Quad')}
                      className={`p-2.5 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                        smashSize === 'Quad'
                          ? 'border-red-600 bg-red-950/40 text-white ring-1 ring-red-600 shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">
                        {t('sizeQuad')}
                      </div>
                      <div className="text-[10px] sm:text-[11px] text-neutral-400 mt-0.5 leading-tight font-sans">
                        {t('pattyQuadDesc')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">
                        {product.soloPrice + 80} {isAr ? 'ج.م' : 'EGP'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 2: Meal Option Selection */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                    <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                      <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                      {t('chooseMealOption')}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                    <button
                      type="button"
                      onClick={() => setVariant('combo')}
                      className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all relative ${
                        variant === 'combo'
                          ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <span className="absolute -top-2 right-2 rtl:right-auto rtl:left-2 px-1.5 py-0.5 rounded bg-red-600 text-[9px] font-bold text-white uppercase tracking-wider font-mono">
                        {t('bestValue')}
                      </span>
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">{t('combo')}</div>
                      <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">{t('comboDesc')}</div>
                      <div className="text-[11px] sm:text-xs font-bold font-mono text-amber-400 mt-1.5">
                        +50 {isAr ? 'ج.م للوجبة' : 'EGP COMBO'}
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => setVariant('solo')}
                      className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                        variant === 'solo'
                          ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">{t('solo')}</div>
                      <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">{t('soloDesc')}</div>
                      <div className="text-[11px] sm:text-xs font-bold font-mono text-neutral-400 mt-1.5">
                        {isAr ? 'بدون إضافات' : 'No combo upgrade'}
                      </div>
                    </button>
                  </div>
                </div>

                {/* Step 3: Flavor Selector (Spicy, Normal) for Exclusive / Hawaiian items */}
                {(product.category === 'Exclusive' || product.id === 'hawaiian-chicken' || product.id === 'hawaiian-beef') && (
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                      <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                        <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                        {t('chooseFlavor')}
                      </h3>
                      <span className="text-[9px] sm:text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                        {t('required')}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                      <button
                        type="button"
                        onClick={() => setFlavor('Normal')}
                        className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                          flavor === 'Normal'
                            ? 'border-red-600 bg-red-950/40 text-white ring-1 ring-red-600 shadow-md'
                            : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">
                          {t('flavorNormal')}
                        </div>
                        <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">{t('flavorDescNormal')}</div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setFlavor('Spicy')}
                        className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                          flavor === 'Spicy'
                            ? 'border-red-600 bg-red-950/40 text-white ring-1 ring-red-600 shadow-md'
                            : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                        }`}
                      >
                        <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide flex items-center gap-1 text-red-400">
                          <Flame className="w-3.5 h-3.5 text-red-500 fill-red-500" />
                          {t('flavorSpicy')}
                        </div>
                        <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">{t('flavorDescSpicy')}</div>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : isBurgerOrChicken && product.comboPrice ? (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                    {t('chooseSize')}
                  </h3>
                  <span className="text-[9px] sm:text-[10px] bg-red-950 text-red-400 border border-red-800 px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                    {t('required')}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                  <button
                    type="button"
                    onClick={() => setVariant('combo')}
                    className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all relative ${
                      variant === 'combo'
                        ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <span className="absolute -top-2 right-2 rtl:right-auto rtl:left-2 px-1.5 py-0.5 rounded bg-red-600 text-[9px] font-bold text-white uppercase tracking-wider font-mono">
                      {t('bestValue')}
                    </span>
                    <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">{t('combo')}</div>
                    <div className="text-[10px] sm:text-xs text-neutral-300 mt-0.5">{t('comboDesc')}</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">
                      +50 {isAr ? 'ج.م للوجبة' : 'EGP COMBO'}
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVariant('solo')}
                    className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                      variant === 'solo'
                        ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">{t('solo')}</div>
                    <div className="text-[10px] sm:text-xs text-neutral-400 mt-0.5">{t('soloDesc')}</div>
                    <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">
                      {product.soloPrice} {isAr ? 'ج.م' : 'EGP'}
                    </div>
                  </button>
                </div>
              </div>
            ) : null}

            {/* Size Selection for items with sizePrices */}
            {product.sizePrices && product.sizePrices.length > 0 && (
              <div className="space-y-2.5">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                    {t('chooseSize')}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 pt-0.5">
                  {product.sizePrices.map((sp) => (
                    <button
                      key={sp.label}
                      type="button"
                      onClick={() => setSelectedSize(sp.label as 'Large' | 'X-Large')}
                      className={`p-3 sm:p-4 rounded-xl border text-left rtl:text-right transition-all ${
                        selectedSize === sp.label
                          ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-mono font-black text-xs sm:text-sm uppercase tracking-wide">
                        {sp.label === 'Large' ? (isAr ? 'كبير' : 'Large') : (isAr ? 'عائلي' : 'X-Large')}
                      </div>
                      <div className="text-xs sm:text-sm font-bold font-mono text-yellow-400 mt-1.5">{sp.price} {isAr ? 'ج.م' : 'EGP'}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* SECTION 2: REMOVE INGREDIENTS (Hidden for Offers) */}
            {!isOfferProduct && rawIngredients && rawIngredients.length > 0 && (
              <div className="space-y-2.5">
                <div className="border-b border-neutral-800 pb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                    {t('removeIngredients')}
                  </h3>
                  <p className="text-[11px] text-neutral-400 mt-0.5 font-sans">
                    {t('tapToRemove')}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
                  {rawIngredients.map((ing) => {
                    const isChecked = activeIngredients.includes(ing);
                    return (
                      <button
                        key={ing}
                        type="button"
                        onClick={() => toggleIngredient(ing)}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all text-left rtl:text-right ${
                          isChecked
                            ? 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700'
                            : 'border-red-900/60 bg-red-950/30 text-red-400 font-semibold shadow-inner'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-left rtl:text-right min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                          <div
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                              isChecked
                                ? 'bg-neutral-800 border-neutral-600 text-green-400'
                                : 'bg-red-900/50 border-red-600 text-red-400'
                            }`}
                          >
                            {isChecked ? <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" /> : <X className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
                          </div>
                          <span className={`leading-tight ${!isChecked ? 'line-through text-red-400 font-bold' : ''}`}>
                            {ing}
                          </span>
                        </span>
                        {!isChecked && (
                          <span className="text-[9px] text-red-400 font-mono uppercase font-bold bg-red-950/80 px-1.5 py-0.5 rounded shrink-0">
                            {t('removed')}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Offer Package Includes Summary */}
            {isOfferProduct && rawIngredients && rawIngredients.length > 0 && (
              <div className="bg-neutral-900/90 border border-neutral-800 p-3 sm:p-4 rounded-xl space-y-2">
                <span className="text-[11px] sm:text-xs font-mono font-bold text-amber-400 uppercase tracking-wider block">
                  {t('packageIncludes')}
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-neutral-300">
                  {rawIngredients.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* SECTION 3: ADD EXTRAS */}
            {additions && additions.length > 0 && (
              <div className="space-y-2.5">
                <div className="border-b border-neutral-800 pb-1.5">
                  <h3 className="text-xs sm:text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-1.5">
                    <span className="w-2 h-3.5 bg-red-600 rounded-sm" />
                    {isOfferProduct ? (isAr ? 'إضافة صوصات وإضافات' : 'Add Extra Sauces & Sides') : t('addExtras')}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pt-0.5">
                  {additions.map((add) => {
                    const isSelected = selectedAdditions.some((a) => a.id === add.id);
                    const addName = getAdditionName(add, isAr);
                    return (
                      <button
                        key={add.id}
                        type="button"
                        onClick={() => toggleAddition(add)}
                        className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-xs font-medium transition-all text-left rtl:text-right ${
                          isSelected
                            ? 'border-red-600 bg-red-950/40 text-white shadow-md'
                            : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <span className="flex items-center gap-2 text-left rtl:text-right min-w-0 pr-2 rtl:pr-0 rtl:pl-2">
                          <div
                            className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                              isSelected
                                ? 'bg-red-600 border-red-500 text-white'
                                : 'bg-neutral-800 border-neutral-700 text-transparent'
                            }`}
                          >
                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                          </div>
                          <span className="font-semibold leading-tight">{addName}</span>
                        </span>
                        <span className="font-mono text-xs font-bold text-yellow-400 shrink-0 flex items-center gap-1" dir="ltr">
                          <span>+{add.price}</span>
                          <span>{isAr ? 'ج.م' : 'EGP'}</span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* SECTION 4: COMMENT BOX */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
                <MessageSquare className="w-3.5 h-3.5 text-red-500" />
                {t('specialInstructions')}
              </div>
              <textarea
                rows={2}
                placeholder={t('specialInstructionsPlaceholder')}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors resize-none font-sans"
              />
            </div>
          </div>
        </div>

        {/* Footer Action Bar (Sticky at bottom for effortless ordering on mobile) */}
        <div className="sticky bottom-0 bg-[#0F0F12]/98 backdrop-blur-md p-3 sm:p-5 border-t border-neutral-800 flex items-center justify-between gap-2.5 sm:gap-4 z-30 shadow-2xl">
          {/* Quantity Selector */}
          <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-0.5 sm:p-1 shrink-0">
            <button
              type="button"
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition-colors active:scale-95"
              aria-label="Decrease quantity"
            >
              <Minus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="w-8 sm:w-10 text-center font-mono font-bold text-sm sm:text-base text-white">
              {quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity((q) => q + 1)}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition-colors active:scale-95"
              aria-label="Increase quantity"
            >
              <Plus className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
          </div>

          {/* Add to Order Button */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex-1 bg-gradient-to-r from-[#EA1F27] via-[#D11820] to-[#B00E15] hover:from-[#D11820] hover:to-[#960B11] text-white font-bold py-3 sm:py-3.5 px-3 sm:px-6 rounded-xl transition-all shadow-lg shadow-[#EA1F27]/30 flex items-center justify-between group active:scale-[0.99]"
          >
            <span className="flex items-center gap-1.5 sm:gap-2 font-mono uppercase tracking-wider text-xs sm:text-sm">
              <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{t('addToOrder')}</span>
            </span>
            <span className="font-mono text-xs sm:text-base font-black text-[#CDB32D] shrink-0">
              {totalPrice} {isAr ? 'ج.م' : 'EGP'}
            </span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}