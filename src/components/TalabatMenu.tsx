"use client";

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { ProductItem, CATEGORIES_LIST } from '@/data/menu';
import { useMenu } from '@/context/MenuContext';
import { useCart } from '@/context/CartContext';
import { Search, Flame, Plus, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';

export function TalabatMenu() {
  const { products } = useMenu();
  const { setCustomizingProduct } = useCart();
  const [activeCategory, setActiveCategory] = useState<string>(CATEGORIES_LIST[0]);
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNotes: Record<string, string> = {
    'Smash Burgers':
      'Served in a 5-inch brioche bun without sesame. Every beef sandwich contains two 150g pure Angus beef smash patties. Combo includes sandwich, fries, and soft drink.',
    'Chicken Collection':
      'Made with a large crispy fried chicken piece. Combo includes sandwich, fries, and soft drink.',
  };

  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const scrollToCategory = (cat: string) => {
    setActiveCategory(cat);
    const element = categoryRefs.current[cat];
    if (element) {
      const yOffset = -140; // Account for sticky navbar & category bar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.ingredients.some((ing) => ing.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <section id="menu-section" className="bg-[#0A0A0C] text-white py-16 border-t border-neutral-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
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
            placeholder="Search burgers, chicken, sauces, chaos fries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl pl-11 pr-4 py-3 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-red-600 transition-colors shadow-lg"
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

        {/* Talabat-Style Sticky Horizontal Category Bar */}
        <div className="sticky top-16 z-30 bg-[#0A0A0C]/95 backdrop-blur-md py-3 border-y border-neutral-800 shadow-xl overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 px-2 max-w-7xl mx-auto min-w-max">
            {CATEGORIES_LIST.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => scrollToCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-red-600 text-white shadow-lg shadow-red-900/50'
                      : 'bg-neutral-900 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <span>{cat}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Menu Items Grouped by Category */}
        <div className="space-y-16 pt-4">
          {CATEGORIES_LIST.map((category) => {
            const categoryProducts = filteredProducts.filter((p) => p.category === category);
            if (categoryProducts.length === 0 && searchQuery) return null;

            return (
              <div
                key={category}
                ref={(el) => {
                  categoryRefs.current[category] = el;
                }}
                className="space-y-6 scroll-mt-36"
              >
                {/* Category Header */}
                <div className="border-b border-neutral-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div>
                    <h3 className="text-2xl font-black text-white uppercase tracking-tight font-mono flex items-center gap-2">
                      <span className="w-2.5 h-6 bg-red-600 rounded-sm" />
                      {category}
                    </h3>
                    {categoryNotes[category] && (
                      <p className="text-xs text-neutral-400 mt-1 max-w-2xl leading-relaxed">
                        {categoryNotes[category]}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-neutral-500 font-mono">
                    {categoryProducts.length} {categoryProducts.length === 1 ? 'item' : 'items'}
                  </span>
                </div>

                {/* Category Items Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryProducts.map((product) => {
                    const ingredientsText = product.ingredients
                      ? product.ingredients.join(', ')
                      : product.description || '';

                    // Display Starting Price formatted e.g., "From 180 EGP" or "180 EGP"
                    const hasVariants = product.comboPrice || product.hasSizes;
                    const startingPriceText = hasVariants
                      ? `From ${product.soloPrice} EGP`
                      : `${product.soloPrice} EGP`;

                    return (
                      <div
                        key={product.id}
                        className={`bg-neutral-900/80 border rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 hover:border-red-600/60 hover:shadow-xl hover:shadow-red-950/20 group relative overflow-hidden ${
                          !product.isAvailable ? 'opacity-50 grayscale' : 'border-neutral-800'
                        }`}
                      >
                        <div>
                          {/* Image & Badges */}
                          <div className="relative h-48 w-full rounded-xl overflow-hidden bg-neutral-950 mb-3">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-black/20" />

                            {/* Spicy badge */}
                            {product.spicy && (
                              <div className="absolute top-2.5 left-2.5 bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-md">
                                <Flame className="w-3 h-3 text-yellow-300 fill-yellow-300" />
                                Spicy
                              </div>
                            )}

                            {!product.isAvailable && (
                              <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
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

                            <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed">
                              {ingredientsText}
                            </p>
                          </div>
                        </div>

                        {/* Price & Add Button Bar */}
                        <div className="pt-4 mt-3 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] text-neutral-500 font-mono block uppercase">
                              {hasVariants ? 'Variants available' : 'Price'}
                            </span>
                            <span className="font-mono font-extrabold text-sm text-yellow-400">
                              {startingPriceText}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={!product.isAvailable}
                            onClick={() => setCustomizingProduct(product)}
                            className="bg-neutral-800 hover:bg-red-600 text-white font-mono font-bold text-xs uppercase px-3.5 py-2 rounded-xl transition-all border border-neutral-700 hover:border-red-500 flex items-center gap-1.5 shadow-md active:scale-95 disabled:opacity-50"
                          >
                            <Plus className="w-3.5 h-3.5" />
                            <span>Customize & Order</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
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
