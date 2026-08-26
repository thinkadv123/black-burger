"use client";

import React from 'react';
import { useCart } from '@/context/CartContext';
import { ProductModal } from '@/components/ProductModal';

export function GlobalProductModal() {
  const { customizingProduct, setCustomizingProduct } = useCart();

  return (
    <ProductModal
      product={customizingProduct}
      onClose={() => setCustomizingProduct(null)}
    />
  );
}
