"use client";

import React from 'react';
import Image from 'next/image';
import { Product } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { Flame, Plus, Sparkles, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product }: { product: Product }) {
  const { setCustomizingProduct } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900/80 border border-zinc-800 hover:border-red-600/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.3)]"
    >
      {/* Product Image */}
      <div
        onClick={() => setCustomizingProduct(product)}
        className="relative h-52 sm:h-60 w-full overflow-hidden bg-zinc-950 cursor-pointer"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-black/30 opacity-80" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.popular && (
            <span className="bg-gradient-to-r from-red-600 to-amber-500 text-white font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider shadow-md flex items-center gap-1">
              <Star className="w-3 h-3 fill-white" /> POPULAR
            </span>
          )}
          {product.spicy && (
            <span className="bg-amber-950/90 border border-amber-500/50 text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1">
              <Flame className="w-3 h-3 text-red-500" /> SPICY
            </span>
          )}
        </div>

        {/* Price tag badge floating */}
        <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-amber-500/50 text-amber-400 font-black px-3 py-1 rounded-xl text-sm shadow-lg backdrop-blur-md">
          {product.id === 'onion-rings'
            ? `${product.price} / ${product.priceLarge} EGP`
            : `${product.price} EGP`}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3
              onClick={() => setCustomizingProduct(product)}
              className="text-xl font-black text-white tracking-tight cursor-pointer hover:text-red-500 transition-colors"
            >
              {product.name}
            </h3>
          </div>

          <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => setCustomizingProduct(product)}
            className="w-full bg-zinc-950 hover:bg-gradient-to-r hover:from-red-600 hover:to-red-800 text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider border border-zinc-800 hover:border-red-500/50 transition-all flex items-center justify-center gap-2 group/btn shadow-md"
          >
            <Plus className="w-4 h-4 text-red-500 group-hover/btn:text-white transition-colors" />
            <span>CUSTOMIZE & ORDER</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
