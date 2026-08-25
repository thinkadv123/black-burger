"use client";

import React, { useState, useEffect } from 'react';
import { MENU_ITEMS, MENU_ADDITIONS, Product } from '@/data/menu';
import { ProductCard } from '@/components/ProductCard';
import { Search, Flame, Utensils, Sparkles, Plus, Check } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { motion } from 'framer-motion';

const CATEGORIES = [
  'ALL MENU',
  'SMASH BURGERS',
  'CHICKEN COLLECTION',
  'SALADS',
  'APPETIZERS',
  'SAUCES',
  'ADDITIONS',
] as const;

export function MenuSection({ initialCategory = 'ALL MENU' }: { initialCategory?: string }) {
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = MENU_ITEMS.filter((product) => {
    const matchesCategory =
      selectedCategory === 'ALL MENU' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleQuickAddSauce = (sauce: Product) => {
    addToCart(sauce, 1, {
      type: 'solo',
      removedIngredients: [],
      addedAdditions: [],
    });
  };

  return (
    <section className="bg-black text-white min-h-screen pt-28 pb-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-950/80 border border-red-800/60 text-red-400 text-xs font-black tracking-widest uppercase">
            <Flame className="w-4 h-4" /> FAISAL BRANCH MENU
          </div>

          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white uppercase">
            THE SMASH <span className="text-red-gradient">COLLECTION</span>
          </h1>

          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Select your smash burger, customize your ingredients, add crispy loaded chaos fries, and place your Cash on Delivery order in seconds.
          </p>
        </div>

        {/* Search & Category Navigation */}
        <div className="space-y-6">
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto relative">
            <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search burgers, chicken, sauces, chaos fries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900/90 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 shadow-xl"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-zinc-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center justify-center flex-wrap gap-2 pt-2">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all border ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 to-red-800 text-white border-red-500 shadow-[0_0_20px_rgba(220,38,38,0.5)] scale-105'
                      : 'bg-zinc-900/80 border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

        </div>

        {/* Category Sections Rendering */}
        {selectedCategory === 'ADDITIONS' ? (
          /* Additions Showcase View */
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 space-y-6">
            <h3 className="text-2xl font-black text-white uppercase tracking-tight border-l-4 border-amber-500 pl-3">
              Extra Burger Toppings & Additions
            </h3>
            <p className="text-zinc-400 text-sm">
              Upgrade your smash burger or chicken sandwich with premium toppings:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {MENU_ADDITIONS.map((add) => (
                <div
                  key={add.id}
                  className="bg-zinc-950 border border-zinc-800 rounded-2xl p-4 flex items-center justify-between shadow-md"
                >
                  <div>
                    <h4 className="font-bold text-white text-sm">{add.name}</h4>
                    <span className="text-xs text-zinc-500">Extra Portion</span>
                  </div>
                  <span className="font-black text-amber-400">{add.price} EGP</span>
                </div>
              ))}
            </div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-zinc-900/40 rounded-3xl border border-zinc-800">
            <h3 className="text-xl font-bold text-white">No items found matching &quot;{searchQuery}&quot;</h3>
            <p className="text-xs text-zinc-400">Try searching for classic smash, truffle, buffalo, or chaos fries.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('ALL MENU');
              }}
              className="mt-2 bg-red-600 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          /* Main Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
