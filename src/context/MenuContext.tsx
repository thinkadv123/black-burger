"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, AdditionItem, INITIAL_PRODUCTS, INITIAL_ADDITIONS } from '@/data/menu';
import { toast } from 'sonner';

interface MenuContextType {
  products: ProductItem[];
  additions: AdditionItem[];
  updateProduct: (updatedProduct: ProductItem) => void;
  toggleAvailability: (productId: string) => void;
  addProduct: (newProduct: ProductItem) => void;
  deleteProduct: (productId: string) => void;
  resetToDefaultMenu: () => void;
}

const MenuContext = createContext<MenuContextType | undefined>(undefined);

export function MenuProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [additions, setAdditions] = useState<AdditionItem[]>(INITIAL_ADDITIONS);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedProductsStr = localStorage.getItem('black_burger_db_products');
      if (savedProductsStr) {
        const parsed: ProductItem[] = JSON.parse(savedProductsStr);
        // Sync fresh local images from INITIAL_PRODUCTS if previously set to unsplash
        const synced = parsed.map((item) => {
          const init = INITIAL_PRODUCTS.find((p) => p.id === item.id);
          if (init && init.image.startsWith('/images/') && !item.image.startsWith('/images/')) {
            return { ...item, image: init.image };
          }
          return item;
        });
        setProducts(synced);
      }
      const savedAdditions = localStorage.getItem('black_burger_db_additions');
      if (savedAdditions) {
        const parsedAdds: AdditionItem[] = JSON.parse(savedAdditions);
        const syncedAdds = parsedAdds.map((add) => {
          if (add.id === 'extra-crispy-chicken-piece') {
            return { ...add, name: 'CRISPY CHKN PIECE' };
          }
          return add;
        });
        setAdditions(syncedAdds);
      }
    } catch (e) {
      console.error('Error loading menu from local database storage', e);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    try {
      localStorage.setItem('black_burger_db_products', JSON.stringify(products));
      localStorage.setItem('black_burger_db_additions', JSON.stringify(additions));
    } catch (e) {
      console.error('Error saving menu to local database storage', e);
    }
  }, [products, additions]);

  const updateProduct = (updatedProduct: ProductItem) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === updatedProduct.id ? updatedProduct : p))
    );
    toast.success(`Updated ${updatedProduct.name} in menu database!`);
  };

  const toggleAvailability = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const nextState = !p.isAvailable;
          toast.info(
            `${p.name} is now ${nextState ? 'AVAILABLE' : 'SOLD OUT'}`
          );
          return { ...p, isAvailable: nextState };
        }
        return p;
      })
    );
  };

  const addProduct = (newProduct: ProductItem) => {
    setProducts((prev) => [...prev, newProduct]);
    toast.success(`Added new product ${newProduct.name} to menu!`);
  };

  const deleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
    toast.info('Product deleted from menu database');
  };

  const resetToDefaultMenu = () => {
    setProducts(INITIAL_PRODUCTS);
    setAdditions(INITIAL_ADDITIONS);
    localStorage.removeItem('black_burger_db_products');
    localStorage.removeItem('black_burger_db_additions');
    toast.success('Reset menu database to official Black Burger defaults!');
  };

  return (
    <MenuContext.Provider
      value={{
        products,
        additions,
        updateProduct,
        toggleAvailability,
        addProduct,
        deleteProduct,
        resetToDefaultMenu,
      }}
    >
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('useMenu must be used within a MenuProvider');
  }
  return context;
}
