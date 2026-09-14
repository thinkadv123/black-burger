"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, AdditionItem } from '@/data/menu';
import { toast } from 'sonner';

export interface CartItemOption {
  variant: 'solo' | 'combo'; // combo price calculation: product.comboPrice or solo + 40/50 EGP
  size?: 'Large' | 'X-Large'; // for onion rings: 60 or 80 EGP
  removedIngredients: string[];
  addedAdditions: AdditionItem[];
  selectedSandwiches?: Record<string, string>; // e.g. { 'sandwich-1': 'Ranchavoo', 'sandwich-2': 'Chipotle' }
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // unique key in cart
  product: ProductItem;
  quantity: number;
  options: CartItemOption;
  unitPrice: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductItem, quantity: number, options: CartItemOption) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  totalItemsCount: number;
  subtotalPrice: number;
  deliveryFee: number;
  totalPrice: number;
  customizingProduct: ProductItem | null;
  setCustomizingProduct: (product: ProductItem | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [customizingProduct, setCustomizingProduct] = useState<ProductItem | null>(null);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('black_burger_cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error('Failed to parse cart from local storage', e);
    }
  }, []);

  // Save cart to localStorage on update
  useEffect(() => {
    try {
      localStorage.setItem('black_burger_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to local storage', e);
    }
  }, [cart]);

  const calculateUnitPrice = (product: ProductItem, options: CartItemOption): number => {
    let price = product.soloPrice;

    // Handle Onion Rings sizes
    if (product.id === 'onion-rings' && product.sizePrices) {
      const sizeObj = product.sizePrices.find((s) => s.label === options.size);
      if (sizeObj) price = sizeObj.price;
    } else if (options.variant === 'combo' && product.comboPrice) {
      price = product.comboPrice;
    }

    // Add cost of extra additions
    if (options.addedAdditions && options.addedAdditions.length > 0) {
      const additionsTotal = options.addedAdditions.reduce((sum, add) => sum + add.price, 0);
      price += additionsTotal;
    }

    return price;
  };

  const addToCart = (product: ProductItem, quantity: number, options: CartItemOption) => {
    const unitPrice = calculateUnitPrice(product, options);
    const sandwichesKey = options.selectedSandwiches
      ? Object.entries(options.selectedSandwiches).map(([k, v]) => `${k}:${v}`).sort().join('-')
      : '';
    const cartItemId = `${product.id}-${options.variant}-${options.size || 'reg'}-${options.removedIngredients.sort().join('-')}-${options.addedAdditions.map((a) => a.id).sort().join('-')}-${sandwichesKey}-${options.specialInstructions || ''}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prevCart, { cartItemId, product, quantity, options, unitPrice }];
    });

    toast.success(`Added ${quantity}x ${product.name} to your order!`, {
      style: {
        background: '#121214',
        color: '#FFFFFF',
        border: '1px solid #DC2626',
      },
      icon: '🔥',
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.cartItemId !== cartItemId));
    toast.info('Item removed from order');
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotalPrice = cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
  const deliveryFee = subtotalPrice > 0 ? 30 : 0; // 30 EGP flat delivery fee in Faisal
  const totalPrice = subtotalPrice + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        totalItemsCount,
        subtotalPrice,
        deliveryFee,
        totalPrice,
        customizingProduct,
        setCustomizingProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
