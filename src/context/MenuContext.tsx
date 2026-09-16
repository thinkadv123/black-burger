"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ProductItem, AdditionItem, INITIAL_PRODUCTS, INITIAL_ADDITIONS } from '@/data/menu';
import { doc, setDoc, onSnapshot, deleteDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { toast } from 'sonner';

interface MenuContextType {
  products: ProductItem[];
  additions: AdditionItem[];
  isLoadingFirebase: boolean;
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
  const [isLoadingFirebase, setIsLoadingFirebase] = useState<boolean>(true);

  // Helper to sync state to Firebase Firestore under database/collection "blackburger"
  const syncToFirebase = async (newProds: ProductItem[], newAdds: AdditionItem[]) => {
    try {
      // Clean undefined fields so Firestore JS SDK doesn't throw "Unsupported field value: undefined"
      const cleanProds = JSON.parse(JSON.stringify(newProds));
      const cleanAdds = JSON.parse(JSON.stringify(newAdds));

      // 1. Save master menu snapshot document
      await setDoc(doc(db, 'blackburger', 'menu'), {
        products: cleanProds,
        additions: cleanAdds,
        updatedAt: new Date().toISOString(),
      });

      // 2. Save each product as an individual document in collection "blackburger"
      for (const prod of cleanProds) {
        await setDoc(doc(db, 'blackburger', prod.id), {
          ...prod,
          updatedAt: new Date().toISOString(),
        });
      }
    } catch (err: any) {
      console.error('Error syncing menu to Firebase Firestore "blackburger":', err);
      toast.error(`Firebase error: ${err?.message || 'Could not sync to Firebase.'}`);
    }
  };

  // Real-time synchronization with Firebase Firestore "blackburger"
  useEffect(() => {
    let unsub: (() => void) | null = null;

    try {
      // Subscribe to real-time updates from document "blackburger/menu"
      unsub = onSnapshot(
        doc(db, 'blackburger', 'menu'),
        (snapshot) => {
          if (snapshot.exists()) {
            const data = snapshot.data();
            if (data && Array.isArray(data.products)) {
              // Merge with local images to ensure fast rendering
              const firebaseProds: ProductItem[] = data.products;
              const mergedProducts = INITIAL_PRODUCTS.map((init) => {
                const found = firebaseProds.find((p) => p.id === init.id);
                if (found) {
                  return {
                    ...init,
                    ...found,
                    name_ar: found.name_ar || init.name_ar,
                    name_en: found.name_en || init.name_en || init.name,
                    description_ar: found.description_ar || init.description_ar,
                    description_en: found.description_en || init.description_en || init.description,
                    ingredients_ar: (found.ingredients_ar && found.ingredients_ar.length > 0) ? found.ingredients_ar : init.ingredients_ar,
                    ingredients_en: (found.ingredients_en && found.ingredients_en.length > 0) ? found.ingredients_en : (init.ingredients_en || init.ingredients),
                    bundleChoices: found.bundleChoices || init.bundleChoices,
                    // Keep original local image path if firebase image is missing
                    image: found.image || init.image,
                  };
                }
                return init;
              });

              // Also include any custom products added via admin that aren't in INITIAL_PRODUCTS
              const initialIds = new Set(INITIAL_PRODUCTS.map((p) => p.id));
              const customProds = firebaseProds.filter((p) => !initialIds.has(p.id));

              setProducts([...mergedProducts, ...customProds]);
            }

            if (data && Array.isArray(data.additions)) {
              const firebaseAdds: AdditionItem[] = data.additions;
              const mergedAdds = INITIAL_ADDITIONS.map((init) => {
                const found = firebaseAdds.find((a) => a.id === init.id || a.name === init.name);
                if (found) {
                  return {
                    ...init,
                    ...found,
                    name_ar: found.name_ar || init.name_ar,
                  };
                }
                return init;
              });
              const initAddIds = new Set(INITIAL_ADDITIONS.map((a) => a.id));
              const customAdds = firebaseAdds.filter((a) => !initAddIds.has(a.id));
              setAdditions([...mergedAdds, ...customAdds]);
            }
          } else {
            // First time setup: Seed Firebase "blackburger" database with products
            console.log('Seeding initial products into Firebase "blackburger" database...');
            const savedProductsStr = typeof window !== 'undefined' ? localStorage.getItem('black_burger_db_products') : null;
            let initialProdsToSeed = INITIAL_PRODUCTS;
            if (savedProductsStr) {
              try {
                const parsed = JSON.parse(savedProductsStr);
                if (Array.isArray(parsed) && parsed.length > 0) {
                  initialProdsToSeed = parsed;
                }
              } catch (e) {}
            }
            syncToFirebase(initialProdsToSeed, INITIAL_ADDITIONS);
          }
          setIsLoadingFirebase(false);
        },
        (error) => {
          console.warn('Firebase connection issue, using local storage fallback:', error);
          loadFromLocalStorage();
          setIsLoadingFirebase(false);
        }
      );
    } catch (e) {
      console.error('Failed to connect to Firebase:', e);
      loadFromLocalStorage();
      setIsLoadingFirebase(false);
    }

    return () => {
      if (unsub) unsub();
    };
  }, []);

  const loadFromLocalStorage = () => {
    try {
      const savedProductsStr = localStorage.getItem('black_burger_db_products');
      if (savedProductsStr) {
        const parsed: ProductItem[] = JSON.parse(savedProductsStr);
        setProducts(parsed);
      }
      const savedAdditionsStr = localStorage.getItem('black_burger_db_additions');
      if (savedAdditionsStr) {
        const parsedAdds: AdditionItem[] = JSON.parse(savedAdditionsStr);
        const mergedAdds = INITIAL_ADDITIONS.map((init) => {
          const found = parsedAdds.find((a) => a.id === init.id || a.name === init.name);
          if (found) {
            return {
              ...init,
              ...found,
              name_ar: found.name_ar || init.name_ar,
            };
          }
          return init;
        });
        const initAddIds = new Set(INITIAL_ADDITIONS.map((a) => a.id));
        const customAdds = parsedAdds.filter((a) => !initAddIds.has(a.id));
        setAdditions([...mergedAdds, ...customAdds]);
      }
    } catch (e) {
      console.error('LocalStorage read error:', e);
    }
  };

  // Sync to local storage for backup
  useEffect(() => {
    try {
      localStorage.setItem('black_burger_db_products', JSON.stringify(products));
      localStorage.setItem('black_burger_db_additions', JSON.stringify(additions));
    } catch (e) {
      console.error('Error writing local backup:', e);
    }
  }, [products, additions]);

  const updateProduct = (updatedProduct: ProductItem) => {
    const updated = products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
    setProducts(updated);
    syncToFirebase(updated, additions);
    toast.success(`Updated ${updatedProduct.name} in Black Burger Firebase database!`);
  };

  const toggleAvailability = (productId: string) => {
    let changedName = '';
    let nextState = false;

    const updated = products.map((p) => {
      if (p.id === productId) {
        changedName = p.name;
        nextState = !p.isAvailable;
        return { ...p, isAvailable: nextState };
      }
      return p;
    });

    setProducts(updated);
    syncToFirebase(updated, additions);
    toast.info(`${changedName} is now ${nextState ? 'AVAILABLE' : 'SOLD OUT'}`);
  };

  const addProduct = (newProduct: ProductItem) => {
    const updated = [...products, newProduct];
    setProducts(updated);
    try {
      localStorage.setItem('black_burger_db_products', JSON.stringify(updated));
    } catch (e) {
      console.error('Error writing to localStorage:', e);
    }
    syncToFirebase(updated, additions);
    toast.success(`Added ${newProduct.name} to Black Burger Firebase database!`);
  };

  const deleteProduct = (productId: string) => {
    const updated = products.filter((p) => p.id !== productId);
    setProducts(updated);
    syncToFirebase(updated, additions);

    // Also delete individual document from collection
    try {
      deleteDoc(doc(db, 'blackburger', productId));
    } catch (e) {
      console.error('Error deleting product document from Firebase:', e);
    }

    toast.info('Product deleted from Black Burger database');
  };

  const resetToDefaultMenu = () => {
    setProducts(INITIAL_PRODUCTS);
    setAdditions(INITIAL_ADDITIONS);
    localStorage.removeItem('black_burger_db_products');
    localStorage.removeItem('black_burger_db_additions');
    syncToFirebase(INITIAL_PRODUCTS, INITIAL_ADDITIONS);
    toast.success('Reset database to official Black Burger defaults!');
  };

  return (
    <MenuContext.Provider
      value={{
        products,
        additions,
        isLoadingFirebase,
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
