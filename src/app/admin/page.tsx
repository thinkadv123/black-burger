"use client";

import React, { useState, useEffect } from 'react';
import { useMenu } from '@/context/MenuContext';
import { ProductItem, CATEGORIES_LIST, getProductName, getProductDescription } from '@/data/menu';
import {
  Settings,
  LogOut,
  UserCheck,
  Loader2,
  RefreshCw,
  Plus,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  Flame,
  X,
  Globe,
} from 'lucide-react';
import { MediaUploadInput } from '@/components/admin/MediaUploadInput';
import { AdminLogin } from '@/components/admin/AdminLogin';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { toast } from 'sonner';

export default function AdminDashboardPage() {
  const { products, updateProduct, toggleAvailability, addProduct, deleteProduct, resetToDefaultMenu } =
    useMenu();

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product initial state
  const [newProd, setNewProd] = useState<Partial<ProductItem>>({
    name: '',
    name_en: '',
    name_ar: '',
    category: 'Offers',
    soloPrice: 400,
    comboPrice: undefined,
    description: '',
    description_en: '',
    description_ar: '',
    ingredients: [],
    ingredients_en: [],
    ingredients_ar: [],
    image: '/images/offers/triple-king.jpeg',
    isAvailable: true,
  });

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return () => unsub();
  }, []);

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      toast.info('Signed out from Admin Dashboard');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const filteredProducts = products.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      const updated: ProductItem = {
        ...editingProduct,
        name: editingProduct.name_en || editingProduct.name,
        name_en: editingProduct.name_en || editingProduct.name,
        description: editingProduct.description_en || editingProduct.description,
        description_en: editingProduct.description_en || editingProduct.description,
        ingredients: editingProduct.ingredients_en && editingProduct.ingredients_en.length > 0 ? editingProduct.ingredients_en : editingProduct.ingredients,
        ingredients_en: editingProduct.ingredients_en && editingProduct.ingredients_en.length > 0 ? editingProduct.ingredients_en : editingProduct.ingredients,
      };

      updateProduct(updated);
      setEditingProduct(null);
      toast.success('Product updated successfully!');
    }
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const enName = newProd.name_en || newProd.name || '';
    const arName = newProd.name_ar || '';

    if (enName && newProd.soloPrice) {
      const created: ProductItem = {
        id: `prod-${Date.now()}`,
        name: enName.toUpperCase(),
        name_en: enName.toUpperCase(),
        name_ar: arName,
        category: (newProd.category as any) || 'Offers',
        soloPrice: Number(newProd.soloPrice),
        comboPrice: newProd.comboPrice ? Number(newProd.comboPrice) : undefined,
        description: newProd.description_en || newProd.description || '',
        description_en: newProd.description_en || newProd.description || '',
        description_ar: newProd.description_ar || '',
        ingredients: newProd.ingredients_en || newProd.ingredients || [],
        ingredients_en: newProd.ingredients_en || newProd.ingredients || [],
        ingredients_ar: newProd.ingredients_ar || [],
        image: newProd.image || '/images/offers/triple-king.jpeg',
        isAvailable: true,
      };

      addProduct(created);
      setIsAddingNew(false);
      setNewProd({
        name: '',
        name_en: '',
        name_ar: '',
        category: 'Offers',
        soloPrice: 400,
        comboPrice: undefined,
        description: '',
        description_en: '',
        description_ar: '',
        ingredients: [],
        ingredients_en: [],
        ingredients_ar: [],
        image: '/images/offers/triple-king.jpeg',
        isAvailable: true,
      });
      toast.success('New product added!');
    }
  };

  // Auth Loading State
  if (isAuthLoading) {
    return (
      <div className="min-h-screen bg-[#0A0A0C] flex flex-col items-center justify-center text-white font-mono gap-3">
        <Loader2 className="w-8 h-8 animate-spin text-red-600" />
        <p className="text-xs text-neutral-400 uppercase tracking-widest">
          Checking Firebase Admin Credentials...
        </p>
      </div>
    );
  }

  // Render Login Form if User is NOT Authenticated in Firebase Auth
  if (!currentUser) {
    return <AdminLogin onSuccess={() => {}} />;
  }

  // Render Admin Dashboard when User is Authenticated
  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen pt-28 pb-24 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-bold text-red-500 uppercase tracking-widest">
              <Settings className="w-4 h-4" /> Bilingual Product Admin
              <span className="bg-emerald-950/80 border border-emerald-500/60 text-emerald-400 font-extrabold px-2.5 py-0.5 rounded-full text-[10px] flex items-center gap-1.5 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                Firebase DB: blackburger
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase text-white mt-1">
              BLACK BURGER <span className="text-red-600">MENU MANAGER</span>
            </h1>
            <div className="flex items-center gap-2 text-xs text-neutral-400 mt-1">
              <UserCheck className="w-3.5 h-3.5 text-green-400" />
              <span>Logged in as: <strong className="text-white font-mono">{currentUser.email}</strong></span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={handleLogOut}
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-3.5 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" />
              Log Out
            </button>

            <button
              type="button"
              onClick={resetToDefaultMenu}
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              Reset Official Menu
            </button>

            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/50"
            >
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all ${
              selectedCategory === 'All'
                ? 'bg-red-600 text-white'
                : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
            }`}
          >
            All Categories ({products.length})
          </button>
          {CATEGORIES_LIST.map((cat) => {
            const count = products.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-red-600 text-white'
                    : 'bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white'
                }`}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        {/* Products Table / Cards List */}
        <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl overflow-hidden shadow-2xl">
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between text-xs text-neutral-400 uppercase font-bold">
            <span>Product List ({filteredProducts.length} items)</span>
            <span>Bilingual Content & Controls</span>
          </div>

          <div className="divide-y divide-neutral-800/80">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800 flex items-center justify-center">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain"
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <EyeOff className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-base text-white">
                        {product.name_en || product.name}
                      </h3>
                      {product.name_ar && (
                        <span className="text-sm font-bold text-amber-400 bg-amber-950/60 border border-amber-800/60 px-2 py-0.5 rounded">
                          {product.name_ar}
                        </span>
                      )}
                      <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase font-bold">
                        {product.category}
                      </span>
                      {product.spicy && (
                        <span className="text-[10px] px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 uppercase flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-red-500" /> Spicy
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-1 mt-1 max-w-lg font-sans">
                      <strong className="text-zinc-300">EN:</strong> {product.description_en || product.description || product.ingredients?.join(', ')} | <strong className="text-amber-400">AR:</strong> {product.description_ar || product.ingredients_ar?.join(' • ') || '—'}
                    </p>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right">
                    <span className="text-xs text-neutral-400 block">
                      Solo: <strong className="text-yellow-400">{product.soloPrice} EGP</strong>
                    </span>
                    {product.comboPrice && (
                      <span className="text-[11px] text-neutral-500 block">
                        Combo: <strong className="text-red-400">{product.comboPrice} EGP</strong>
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Toggle Availability */}
                    <button
                      type="button"
                      onClick={() => toggleAvailability(product.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-colors flex items-center gap-1.5 ${
                        product.isAvailable
                          ? 'bg-green-950/80 text-green-400 border border-green-800'
                          : 'bg-red-950/80 text-red-400 border border-red-800'
                      }`}
                    >
                      {product.isAvailable ? (
                        <>
                          <Eye className="w-3.5 h-3.5" /> Available
                        </>
                      ) : (
                        <>
                          <EyeOff className="w-3.5 h-3.5" /> Sold Out
                        </>
                      )}
                    </button>

                    {/* Edit button */}
                    <button
                      type="button"
                      onClick={() => setEditingProduct(product)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white transition-colors"
                      aria-label="Edit item"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>

                    {/* Delete button */}
                    <button
                      type="button"
                      onClick={() => deleteProduct(product.id)}
                      className="p-2 rounded-lg bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 transition-colors"
                      aria-label="Delete item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* EDIT BILINGUAL MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0F0F12] border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-amber-400" />
                  <h3 className="text-lg font-bold text-white uppercase">
                    Edit {editingProduct.name_en || editingProduct.name} (Bilingual)
                  </h3>
                </div>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs font-sans">
                {/* Product Name (EN & AR) */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Product Name (English & Arabic)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono font-bold">English Name *</label>
                      <input
                        type="text"
                        required
                        value={editingProduct.name_en || editingProduct.name}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            name: e.target.value,
                            name_en: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono font-bold">Arabic Name (اسم المنتج بالعربية) *</label>
                      <input
                        type="text"
                        required
                        dir="rtl"
                        value={editingProduct.name_ar || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, name_ar: e.target.value })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Prices */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">Category</label>
                    <select
                      value={editingProduct.category}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">Solo Price (EGP) *</label>
                    <input
                      type="number"
                      required
                      value={editingProduct.soloPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          soloPrice: Number(e.target.value),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">
                      Combo Price (EGP, Optional)
                    </label>
                    <input
                      type="number"
                      value={editingProduct.comboPrice || ''}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          comboPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Description (EN & AR) */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs">
                    Description (English & Arabic)
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono">English Description</label>
                      <textarea
                        rows={2}
                        value={editingProduct.description_en || editingProduct.description || ''}
                        onChange={(e) =>
                          setEditingProduct({
                            ...editingProduct,
                            description: e.target.value,
                            description_en: e.target.value,
                          })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono">Arabic Description (الوصف بالعربية)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        value={editingProduct.description_ar || ''}
                        onChange={(e) =>
                          setEditingProduct({ ...editingProduct, description_ar: e.target.value })
                        }
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Media Upload */}
                <MediaUploadInput
                  value={editingProduct.image}
                  onChange={(url) => setEditingProduct({ ...editingProduct, image: url })}
                />

                {/* Ingredients (EN & AR) */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs">
                    Ingredients (Comma Separated)
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono">
                        English Ingredients (comma separated)
                      </label>
                      <input
                        type="text"
                        value={(editingProduct.ingredients_en || editingProduct.ingredients || []).join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value ? e.target.value.split(',').map((s) => s.trim()) : [];
                          setEditingProduct({
                            ...editingProduct,
                            ingredients: arr,
                            ingredients_en: arr,
                          });
                        }}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono">
                        Arabic Ingredients (المكونات بالعربية - مفصولة بفواصل)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        value={(editingProduct.ingredients_ar || []).join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value ? e.target.value.split(',').map((s) => s.trim()) : [];
                          setEditingProduct({
                            ...editingProduct,
                            ingredients_ar: arr,
                          });
                        }}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD NEW BILINGUAL MODAL */}
        {isAddingNew && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-[#0F0F12] border border-neutral-800 rounded-2xl max-w-2xl w-full p-6 space-y-4 my-8 max-h-[90vh] overflow-y-auto custom-scrollbar">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <div className="flex items-center gap-2">
                  <Plus className="w-5 h-5 text-red-500" />
                  <h3 className="text-lg font-bold text-white uppercase font-mono">Add New Item (Bilingual)</h3>
                </div>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="text-neutral-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewSubmit} className="space-y-4 text-xs font-sans">
                {/* Names */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5" /> Product Name (English & Arabic)
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono font-bold">English Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. BB SPECIAL BOX"
                        value={newProd.name_en || newProd.name}
                        onChange={(e) => setNewProd({ ...newProd, name: e.target.value, name_en: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono font-bold">Arabic Name (اسم المنتج بالعربية) *</label>
                      <input
                        type="text"
                        required
                        dir="rtl"
                        placeholder="مثال: بوكس بي بي الخاص"
                        value={newProd.name_ar}
                        onChange={(e) => setNewProd({ ...newProd, name_ar: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans"
                      />
                    </div>
                  </div>
                </div>

                {/* Category & Prices */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">Category</label>
                    <select
                      value={newProd.category}
                      onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    >
                      {CATEGORIES_LIST.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">Solo Price (EGP) *</label>
                    <input
                      type="number"
                      required
                      value={newProd.soloPrice}
                      onChange={(e) =>
                        setNewProd({ ...newProd, soloPrice: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1 font-mono font-bold">Combo Price (EGP)</label>
                    <input
                      type="number"
                      value={newProd.comboPrice || ''}
                      onChange={(e) =>
                        setNewProd({
                          ...newProd,
                          comboPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                {/* Description */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs">
                    Description (English & Arabic)
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono">English Description</label>
                      <textarea
                        rows={2}
                        placeholder="English description or package contents..."
                        value={newProd.description_en || newProd.description || ''}
                        onChange={(e) => setNewProd({ ...newProd, description: e.target.value, description_en: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono">Arabic Description (الوصف بالعربية)</label>
                      <textarea
                        rows={2}
                        dir="rtl"
                        placeholder="الوصف أو محتويات العرض بالعربية..."
                        value={newProd.description_ar || ''}
                        onChange={(e) => setNewProd({ ...newProd, description_ar: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <MediaUploadInput
                  value={newProd.image || '/images/offers/triple-king.jpeg'}
                  onChange={(url) => setNewProd({ ...newProd, image: url })}
                />

                {/* Ingredients */}
                <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-xl space-y-3">
                  <div className="font-mono font-bold text-amber-400 uppercase text-xs">
                    Ingredients (Comma Separated)
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="text-neutral-400 block mb-1 font-mono">
                        English Ingredients (comma separated)
                      </label>
                      <input
                        type="text"
                        placeholder="Patty, Lettuce, Pickle, Sauce..."
                        value={(newProd.ingredients_en || newProd.ingredients || []).join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value ? e.target.value.split(',').map((s) => s.trim()) : [];
                          setNewProd({ ...newProd, ingredients: arr, ingredients_en: arr });
                        }}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-amber-400 block mb-1 font-mono">
                        Arabic Ingredients (المكونات بالعربية - مفصولة بفواصل)
                      </label>
                      <input
                        type="text"
                        dir="rtl"
                        placeholder="برجر، خس، خيار مخلل، صوص..."
                        value={(newProd.ingredients_ar || []).join(', ')}
                        onChange={(e) => {
                          const arr = e.target.value ? e.target.value.split(',').map((s) => s.trim()) : [];
                          setNewProd({ ...newProd, ingredients_ar: arr });
                        }}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2 font-mono">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold"
                  >
                    Add Item
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
