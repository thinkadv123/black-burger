"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductItem, CATEGORIES_LIST } from '@/data/menu';
import { useMenu } from '@/context/MenuContext';
import { useCart } from '@/context/CartContext';
import { Search, Flame, Plus, ShieldCheck, Sparkles, Filter } from 'lucide-react';

export function TalabatMenu() {
  const { products } = useMenu();
  const { setCustomizingProduct } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('Online Only Offers');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNotes: Record<string, string> = {
    'Online Only Offers':
      'Exclusive combo boxes and special deal meals available for online delivery in Faisal & Haram.',
    'Smash Burgers':
      'Served in a 5-inch brioche bun without sesame. Every beef sandwich contains two 150g pure Angus beef smash patties. Combo includes sandwich, fries, and soft drink.',
    'Chicken Collection':
      'Made with a large crispy fried chicken piece. Combo includes sandwich, fries, and soft drink.',
    'Salads': 'Fresh, crisp salads made to order.',
    'Appetizers': 'Crispy sides and loaded chaos fries.',
    'Sauces': 'Dipper sauce cups made in-house.',
    'Additions': 'Extra toppings and sides.',
  };

  // Filter products based on search query AND active category
  const visibleCategories = CATEGORIES_LIST.filter((cat) => {
    if (searchQuery.trim().length > 0) return true; // Show matching across all if searching
    return cat === selectedCategory;
  });

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (searchQuery.trim().length > 0) {
      return matchesSearch;
    }
    return product.category === selectedCategory;
  });

  return (
    <section id="menu-section" className="bg-[#0A0A0C] text-white py-16 border-t border-neutral-800 relative min-h-[80vh]">
      <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Section Title Header */}
        <div className="text-center space-y-3 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-mono font-bold uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-yellow-400" />
            Official Black Burger Menu
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight font-mono">
            ORDER <span className="text-red-600">BLACK BURGER</span> ONLINE
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm">
            All displayed prices are VAT inclusive. Fast Cash on Delivery across Faisal & Giza.
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search offers, burgers, chicken, sauces, chaos fries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors shadow-lg font-mono"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="relative z-30 bg-[#0A0A0C] py-3 border-y border-neutral-800 shadow-xl overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 px-2 max-w-7xl mx-auto min-w-max">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCategory === cat && !searchQuery;
              let displayLabel: string = cat;
              if (cat === 'Online Only Offers') displayLabel = '🔥 Online Only Offers';
              else if (cat === 'Smash Burgers') displayLabel = '🍔 Beef Burgers';
              else if (cat === 'Chicken Collection') displayLabel = '🍗 Chicken';
              else if (cat === 'Salads') displayLabel = '🥗 Salads';
              else if (cat === 'Appetizers') displayLabel = '🍟 Appetizers';
              else if (cat === 'Sauces') displayLabel = '🌶️ Sauces';
              else if (cat === 'Additions') displayLabel = '🧀 Additions';

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(cat);
                  }}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-2 ${
                    isSelected
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/60 scale-105 border border-red-500'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <span>{displayLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Filtered Category Items */}
        <div className="space-y-12 pt-2">
          {visibleCategories.map((category) => {
            const categoryProducts = filteredProducts.filter((p) => p.category === category);
            if (categoryProducts.length === 0) return null;

            const isOfferCategory = category === 'Online Only Offers';

            return (
              <div key={category} className="space-y-6">
                {/* Category Header */}
                <div className="border-b border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight font-mono flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-red-600 rounded-sm" />
                      {category === 'Smash Burgers' ? 'Beef Smash Burgers' : category}
                    </h3>
                    {categoryNotes[category] && (
                      <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                        {categoryNotes[category]}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    Showing {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Category Items Grid */}
                <div className={`grid gap-3 sm:gap-4 ${
                  isOfferCategory
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }`}>
                  {categoryProducts.map((product) => {
                    const ingredientsText = product.ingredients
                      ? product.ingredients.join(', ')
                      : product.description || '';

                    const hasVariants = product.comboPrice || product.hasSizes;
                    const startingPriceText = hasVariants
                      ? `From ${product.soloPrice} EGP`
                      : `${product.soloPrice} EGP`;

                    return (
                      <div
                        key={product.id}
                        onClick={() => product.isAvailable && setCustomizingProduct(product)}
                        className={`bg-neutral-900/80 border rounded-2xl p-2.5 sm:p-4 flex flex-col justify-between transition-all duration-300 hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/20 group relative overflow-hidden cursor-pointer ${
                          !product.isAvailable ? 'opacity-50 grayscale border-neutral-800 cursor-not-allowed' : 'border-neutral-800'
                        }`}
                      >
                        <div>
                          {/* Image & Badges (full size object-contain for offers) */}
                          <div className={`relative w-full rounded-xl overflow-hidden bg-neutral-950 mb-3 flex items-center justify-center ${
                            isOfferCategory || product.category === 'Online Only Offers'
                              ? 'aspect-[3/4]'
                              : 'aspect-square'
                          }`}>
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className={`${
                                isOfferCategory || product.category === 'Online Only Offers'
                                  ? 'object-contain'
                                  : 'object-cover group-hover:scale-105'
                              } transition-transform duration-500`}
                            />

                            {/* Spicy badge */}
                            {product.spicy && (
                              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-md font-mono z-10">
                                <Flame className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                                Spicy
                              </div>
                            )}

                            {isOfferCategory && (
                              <div className="absolute top-2.5 right-2.5 bg-amber-500 text-black text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase shadow-md font-mono z-10">
                                EXCLUSIVE OFFER
                              </div>
                            )}

                            {!product.isAvailable && (
                              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                                <span className="bg-red-600 text-white text-xs font-mono font-bold px-3 py-1 rounded-md uppercase">
                                  Sold Out
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="space-y-1.5">
                            <div className="flex items-start justify-between gap-2">
                              <h4 className="font-mono font-extrabold text-base text-white uppercase tracking-tight group-hover:text-red-400 transition-colors">
                                {product.name}
                              </h4>
                            </div>

                            <p className="text-xs text-neutral-400 line-clamp-3 leading-relaxed font-sans">
                              {ingredientsText}
                            </p>
                          </div>
                        </div>

                        {/* Price & Customize Button Bar */}
                        <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] text-neutral-500 font-mono block uppercase">
                              {hasVariants ? 'Variants available' : 'Offer Price'}
                            </span>
                            <span className="font-mono font-extrabold text-base text-yellow-400">
                              {startingPriceText}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={!product.isAvailable}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product.isAvailable) setCustomizingProduct(product);
                            }}
                            className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all shadow-lg shadow-red-950/50 flex items-center gap-1.5 active:scale-95 disabled:opacity-50 shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>ORDER</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <p className="text-neutral-400 font-mono text-sm">No items found matching your search.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Online Only Offers');
                }}
                className="mt-3 text-xs text-red-400 hover:underline font-mono uppercase"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* VAT Inclusive & Security Notice */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-xs text-neutral-400 flex flex-col sm:flex-row items-center justify-center gap-2 mt-12">
          <ShieldCheck className="w-4 h-4 text-green-500 shrink-0" />
          <span>All displayed prices are VAT inclusive. Prepared fresh upon receiving your order.</span>
        </div>

      </div>
    </section>
  );
}
</dyad-file>

<dyad-write path="src/components/ProductModal.tsx" description="Update ProductModal to display offer flyers uncropped in full size">
"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { ProductItem, AdditionItem } from '@/data/menu';
import { useCart, CartItemOption } from '@/context/CartContext';
import { useMenu } from '@/context/MenuContext';
import { Plus, Minus, Flame, Check, AlertTriangle, X, ShoppingBag, MessageSquare } from 'lucide-react';

interface ProductModalProps {
  product: ProductItem | null;
  onClose: () => void;
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addToCart } = useCart();
  const { additions } = useMenu();

  const [variant, setVariant] = useState<'solo' | 'combo'>('combo');
  const [selectedSize, setSelectedSize] = useState<'Large' | 'X-Large'>('Large');
  const [activeIngredients, setActiveIngredients] = useState<string[]>([]);
  const [selectedAdditions, setSelectedAdditions] = useState<AdditionItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');

  // Reset modal state when product changes
  useEffect(() => {
    if (product) {
      setVariant('combo');
      setSelectedSize('Large');
      setActiveIngredients(product.ingredients || []);
      setSelectedAdditions([]);
      setQuantity(1);
      setSpecialInstructions('');
    }
  }, [product]);

  if (!product) return null;

  const isBurgerOrChicken =
    product.category === 'Smash Burgers' || product.category === 'Chicken Collection';

  const isOfferProduct = product.category === 'Online Only Offers';

  // Calculate live item unit price
  let basePrice = product.soloPrice;
  if (product.id === 'onion-rings' && product.sizePrices) {
    const sz = product.sizePrices.find((s) => s.label === selectedSize);
    if (sz) basePrice = sz.price;
  } else if (variant === 'combo' && product.comboPrice) {
    basePrice = product.comboPrice;
  }

  const additionsPrice = selectedAdditions.reduce((sum, add) => sum + add.price, 0);
  const unitPrice = basePrice + additionsPrice;
  const totalPrice = unitPrice * quantity;

  // Track removed ingredients
  const removedIngredients = (product.ingredients || []).filter(
    (ing) => !activeIngredients.includes(ing)
  );

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
      variant: isBurgerOrChicken ? variant : 'solo',
      size: product.id === 'onion-rings' ? selectedSize : undefined,
      removedIngredients,
      addedAdditions: selectedAdditions,
      specialInstructions,
    };

    addToCart(product, quantity, options);
    onClose();
  };

  return (
    <Dialog open={!!product} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-[#0F0F12] border-neutral-800 text-white p-0 gap-0 shadow-2xl rounded-2xl">
        <DialogTitle className="sr-only">{product.name}</DialogTitle>

        {/* Header Section with Image container */}
        <div className="relative p-5 sm:p-6 bg-neutral-900/80 border-b border-neutral-800 flex flex-row gap-4 sm:gap-6 items-center">
          {/* Full-size Image Container (uncropped) */}
          <div className={`relative shrink-0 rounded-xl sm:rounded-2xl overflow-hidden border border-red-600/40 shadow-xl bg-neutral-950 flex items-center justify-center ${
            isOfferProduct
              ? 'w-36 h-48 sm:w-48 sm:h-64 aspect-[3/4]'
              : 'w-28 h-28 sm:w-36 sm:h-36 aspect-square'
          }`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Product Info Next to Image */}
          <div className="flex-1 min-w-0 pr-6 sm:pr-8">
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              {product.spicy && (
                <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-bold text-[10px] sm:text-xs uppercase tracking-wider flex items-center gap-1 shadow-md font-mono">
                  <Flame className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                  Spicy
                </span>
              )}
              <span className="px-2.5 py-0.5 rounded-full bg-neutral-800 border border-neutral-700 text-neutral-300 text-[10px] sm:text-xs font-semibold font-mono">
                {product.category}
              </span>
            </div>

            <h2 className="text-lg sm:text-2xl font-black text-white tracking-tight uppercase font-mono leading-tight">
              {product.name}
            </h2>

            {product.description && (
              <p className="text-xs sm:text-sm text-neutral-400 mt-1 leading-snug">
                {product.description}
              </p>
            )}
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-neutral-800/90 hover:bg-red-600 border border-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors z-10"
            aria-label="Close modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-7 font-sans">
          {/* Spicy Warning Notice */}
          {product.spicyWarning && (
            <div className="p-3.5 rounded-xl bg-red-950/80 border border-red-600/60 text-red-200 text-xs sm:text-sm flex items-center gap-3 shadow-md">
              <AlertTriangle className="w-5 h-5 text-red-400 shrink-0" />
              <span className="font-semibold">{product.spicyWarning}</span>
            </div>
          )}

          {/* SECTION 1: CHOOSE YOUR SIZE / VARIANT */}
          {isBurgerOrChicken && product.comboPrice && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-sm" />
                  1. Choose your size
                </h3>
                <span className="text-[10px] bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded font-mono font-bold uppercase">
                  Required
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setVariant('combo')}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    variant === 'combo'
                      ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                    BEST VALUE
                  </span>
                  <div className="font-mono font-black text-sm uppercase tracking-wide">COMBO</div>
                  <div className="text-xs text-neutral-300 mt-1">Includes fries & soft drink</div>
                  <div className="text-sm font-bold font-mono text-yellow-400 mt-2">
                    {product.comboPrice} EGP
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVariant('solo')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    variant === 'solo'
                      ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-mono font-black text-sm uppercase tracking-wide">SOLO</div>
                  <div className="text-xs text-neutral-400 mt-1">Sandwich only</div>
                  <div className="text-sm font-bold font-mono text-yellow-400 mt-2">
                    {product.soloPrice} EGP
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Hawaiian Beef Variant (if applicable) */}
          {product.id === 'hawaiian-beef' && product.comboPrice && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-sm" />
                  1. Select Sandwich or Combo
                </h3>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={() => setVariant('solo')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    variant === 'solo'
                      ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <div className="font-mono font-black text-sm uppercase tracking-wide">SOLO</div>
                  <div className="text-xs text-neutral-400 mt-1">Sandwich only</div>
                  <div className="text-sm font-bold font-mono text-yellow-400 mt-2">
                    200 EGP
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setVariant('combo')}
                  className={`p-4 rounded-xl border text-left transition-all relative ${
                    variant === 'combo'
                      ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600 shadow-md'
                      : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                  }`}
                >
                  <span className="absolute -top-2.5 right-3 px-2 py-0.5 rounded-full bg-red-600 text-[10px] font-bold text-white uppercase tracking-wider font-mono">
                    BEST VALUE
                  </span>
                  <div className="font-mono font-black text-sm uppercase tracking-wide">COMBO</div>
                  <div className="text-xs text-neutral-300 mt-1">Includes fries & drink</div>
                  <div className="text-sm font-bold font-mono text-yellow-400 mt-2">
                    250 EGP
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Onion Rings Size Selection */}
          {product.id === 'onion-rings' && product.sizePrices && (
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-sm" />
                  1. Choose your size
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-1">
                {product.sizePrices.map((sp) => (
                  <button
                    key={sp.label}
                    type="button"
                    onClick={() => setSelectedSize(sp.label as 'Large' | 'X-Large')}
                    className={`p-4 rounded-xl border text-left transition-all ${
                      selectedSize === sp.label
                        ? 'border-red-600 bg-red-950/30 text-white ring-1 ring-red-600'
                        : 'border-neutral-800 bg-neutral-900/50 text-neutral-400 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-mono font-black text-sm uppercase tracking-wide">{sp.label}</div>
                    <div className="text-sm font-bold font-mono text-yellow-400 mt-2">{sp.price} EGP</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* SECTION 2: REMOVE INGREDIENTS */}
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-3">
              <div className="border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-sm" />
                  {isOfferProduct ? 'Box Items / Ingredients' : '2. Remove ingredients'}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                  {isOfferProduct ? 'Tap anything you do not want included' : 'Tap anything you don&apos;t want'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {product.ingredients.map((ing) => {
                  const isChecked = activeIngredients.includes(ing);
                  return (
                    <button
                      key={ing}
                      type="button"
                      onClick={() => toggleIngredient(ing)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left ${
                        isChecked
                          ? 'border-neutral-800 bg-neutral-900 text-neutral-200 hover:border-neutral-700'
                          : 'border-red-900/60 bg-red-950/30 text-red-400 font-semibold shadow-inner'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-left min-w-0 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            isChecked
                              ? 'bg-neutral-800 border-neutral-600 text-green-400'
                              : 'bg-red-900/50 border-red-600 text-red-400'
                          }`}
                        >
                          {isChecked ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        </div>
                        <span className={`text-left leading-tight ${!isChecked ? 'line-through text-red-400 font-bold' : ''}`}>
                          {ing}
                        </span>
                      </span>
                      {!isChecked && (
                        <span className="text-[10px] text-red-400 font-mono uppercase font-bold bg-red-950/80 px-2 py-0.5 rounded shrink-0 whitespace-nowrap">
                          Removed
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 3: ADD EXTRAS */}
          {additions && additions.length > 0 && (
            <div className="space-y-3">
              <div className="border-b border-neutral-800 pb-2">
                <h3 className="text-sm font-bold text-neutral-100 uppercase tracking-wider font-mono flex items-center gap-2">
                  <span className="w-2 h-4 bg-red-600 rounded-sm" />
                  {isOfferProduct ? 'Add Extra Sauces & Sides' : '3. Add extras'}
                </h3>
                <p className="text-xs text-neutral-400 mt-0.5 font-sans">
                  Make it yours
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {additions.map((add) => {
                  const isSelected = selectedAdditions.some((a) => a.id === add.id);
                  return (
                    <button
                      key={add.id}
                      type="button"
                      onClick={() => toggleAddition(add)}
                      className={`flex items-center justify-between p-3 rounded-xl border text-xs sm:text-sm font-medium transition-all text-left ${
                        isSelected
                          ? 'border-red-600 bg-red-950/40 text-white shadow-md'
                          : 'border-neutral-800 bg-neutral-900/50 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <span className="flex items-center gap-2.5 text-left min-w-0 pr-2">
                        <div
                          className={`w-4 h-4 rounded flex items-center justify-center border transition-colors shrink-0 ${
                            isSelected
                              ? 'bg-red-600 border-red-500 text-white'
                              : 'bg-neutral-800 border-neutral-700 text-transparent'
                          }`}
                        >
                          <Check className="w-3 h-3" />
                        </div>
                        <span className="font-semibold text-left leading-tight">{add.name}</span>
                      </span>
                      <span className="font-mono text-xs font-bold text-yellow-400 whitespace-nowrap shrink-0">
                        +{add.price} EGP
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* SECTION 4: COMMENT BOX */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-300 uppercase tracking-wider font-mono">
              <MessageSquare className="w-3.5 h-3.5 text-red-500" />
              Comment Box / Special Instructions
            </div>
            <textarea
              rows={2}
              placeholder="e.g., Choose chicken options for Chicken Box, sauce preferences..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors font-sans resize-none"
            />
          </div>

          {/* Footer Action Bar */}
          <div className="pt-4 border-t border-neutral-800 flex items-center justify-between gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center bg-neutral-900 border border-neutral-800 rounded-xl p-1">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-mono font-bold text-base text-white">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-neutral-300 hover:bg-neutral-800 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Order Button */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold py-3.5 px-6 rounded-xl transition-all shadow-lg shadow-red-950/50 flex items-center justify-between group active:scale-[0.99]"
            >
              <span className="flex items-center gap-2 font-mono uppercase tracking-wider text-sm">
                <ShoppingBag className="w-4 h-4" />
                Add to Order
              </span>
              <span className="font-mono text-base font-black text-yellow-300">
                {totalPrice} EGP
              </span>
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}