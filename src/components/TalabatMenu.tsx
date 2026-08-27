"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { ProductItem, CATEGORIES_LIST } from '@/data/menu';
import { useMenu } from '@/context/MenuContext';
import { useCart } from '@/context/CartContext';
import { Search, Flame, Plus, ShieldCheck } from 'lucide-react';

export function TalabatMenu() {
  const { products } = useMenu();
  const { setCustomizingProduct } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('Smash Burgers');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNotes: Record<string, string> = {
    'Smash Burgers':
      'Served in a 5-inch brioche bun without sesame. Every beef sandwich contains two 150g pure Angus beef smash patties. Combo includes sandwich, fries, and soft drink.',
    'Chicken Collection':
      'Made with a large crispy fried chicken piece. Combo includes sandwich, fries, and soft drink.',
    'Salads': 'Fresh, crisp salads made to order.',
    'Appetizers': 'Crispy sides and loaded chaos fries.',
    'Sauces': 'Dipper sauce cups made in-house.',
    'Additions': 'Extra toppings and sides.',
    'Online Only Offers':
      'Exclusive combo boxes and special deal meals available for online delivery in Faisal & Haram.',
  };

  // Filter products based on search query AND active category
  const visibleCategories = CATEGORIES_LIST.filter((cat) => {
    if (searchQuery.trim().length > 0) return true;
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
              if (cat === 'Smash Burgers') displayLabel = '🍔 Beef Burgers';
              else if (cat === 'Chicken Collection') displayLabel = '🍗 Chicken';
              else if (cat === 'Salads') displayLabel = '🥗 Salads';
              else if (cat === 'Appetizers') displayLabel = '🍟 Appetizers';
              else if (cat === 'Sauces') displayLabel = '🌶️ Sauces';
              else if (cat === 'Additions') displayLabel = '🧀 Additions';
              else if (cat === 'Online Only Offers') displayLabel = '🔥 Online Only Offers';

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
                          {/* Image & Badges (full size uncropped object-contain for offer flyers) */}
                          <div className={`relative w-full rounded-xl overflow-hidden bg-neutral-950 mb-3 flex items-center justify-center ${
                            isOfferCategory
                              ? 'aspect-[3/4]'
                              : 'aspect-square'
                          }`}>
                            <img
                              src={product.image}
                              alt={product.name}
                              className={`w-full h-full ${
                                isOfferCategory
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
                  setSelectedCategory('Smash Burgers');
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