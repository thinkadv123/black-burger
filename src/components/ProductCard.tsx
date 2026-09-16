"use client";

import React from 'react';
import Image from 'next/image';
import { ProductItem } from '@/data/menu';
import { useCart } from '@/context/CartContext';
import { Flame, Plus, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProductCard({ product }: { product: ProductItem }) {
  const { setCustomizingProduct } = useCart();

  const ingredientsText = product.ingredients
    ? product.ingredients.join(', ')
    : product.description || '';

  const hasVariants = product.comboPrice || product.hasSizes;
  const priceDisplay = hasVariants
    ? `From ${product.soloPrice} EGP`
    : `${product.soloPrice} EGP`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-zinc-900/80 border border-zinc-800 hover:border-red-600/60 rounded-3xl overflow-hidden flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1.5 shadow-xl hover:shadow-[0_0_30px_rgba(220,38,38,0.3)] font-mono"
    >
      {/* Product Image */}
      <div
        onClick={() => setCustomizingProduct(product)}
        className="relative aspect-square w-full overflow-hidden bg-zinc-950 cursor-pointer"
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
          {product.spicy && (
            <span className="bg-[#EA1F27] text-white font-black text-[10px] px-2.5 py-1 rounded-full uppercase flex items-center gap-1 shadow-md">
              <Flame className="w-3 h-3 text-[#CDB32D] fill-[#CDB32D]" /> SPICY
            </span>
          )}
          {product.sizePrices && product.sizePrices.length > 0 ? (
            <span className="bg-zinc-950/90 text-[#03A0E5] border border-[#03A0E5]/50 font-black text-[10px] px-2.5 py-1 rounded-full uppercase shadow-md">
              2 Sizes (Large / X-Large)
            </span>
          ) : product.comboPrice ? (
            <span className="bg-zinc-950/90 text-[#03A0E5] border border-[#03A0E5]/50 font-black text-[10px] px-2.5 py-1 rounded-full uppercase shadow-md">
              2 Sizes (Solo / Combo)
            </span>
          ) : null}
        </div>

        {/* Price tag badge floating */}
        <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-[#CDB32D]/50 text-[#CDB32D] font-black px-3 py-1 rounded-xl text-xs sm:text-sm shadow-lg backdrop-blur-md">
          {product.sizePrices && product.sizePrices.length > 0
            ? `${product.sizePrices[0]?.price} / ${product.sizePrices[1]?.price} EGP`
            : product.comboPrice
            ? `Solo ${product.soloPrice} / Combo ${product.comboPrice} EGP`
            : priceDisplay}
        </div>
      </div>

      {/* Details */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4 font-sans">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h3
              onClick={() => setCustomizingProduct(product)}
              className="text-[22px] font-black text-white tracking-tight cursor-pointer hover:text-red-500 transition-colors uppercase font-mono"
            >
              {product.name}
            </h3>
          </div>

          <p className="text-xs text-zinc-400 leading-relaxed line-clamp-2">
            {ingredientsText}
          </p>
        </div>

        {/* CTA Button */}
        <div className="pt-2">
          <button
            onClick={() => setCustomizingProduct(product)}
            className="w-full bg-zinc-950 hover:bg-gradient-to-r hover:from-[#EA1F27] hover:to-[#B00E15] text-white font-black py-3 rounded-2xl text-xs uppercase tracking-wider border border-zinc-800 hover:border-[#EA1F27]/50 transition-all flex items-center justify-center gap-2 group/btn shadow-md font-mono"
          >
            <Plus className="w-4 h-4 text-[#EA1F27] group-hover/btn:text-white transition-colors" />
            <span>ORDER</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
