"use client";

import React, { useState } from 'react';
import { useMenu } from '@/context/MenuContext';
import { ProductItem, CATEGORIES_LIST } from '@/data/menu';
import {
  ShieldAlert,
  Edit2,
  Check,
  X,
  Plus,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  DollarSign,
  Flame,
  ArrowLeft,
  Settings,
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const { products, updateProduct, toggleAvailability, addProduct, deleteProduct, resetToDefaultMenu } =
    useMenu();

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // New product initial state
  const [newProd, setNewProd] = useState<Partial<ProductItem>>({
    name: '',
    category: 'Smash Burgers',
    soloPrice: 180,
    comboPrice: 220,
    description: '',
    ingredients: ['Two smash beef patties', 'Lettuce', 'Cheddar sauce', 'Special BB Sauce'],
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
    isAvailable: true,
  });

  const filteredProducts = products.filter((p) =>
    selectedCategory === 'All' ? true : p.category === selectedCategory
  );

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddNewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProd.name && newProd.soloPrice) {
      const created: ProductItem = {
        id: `prod-${Date.now()}`,
        name: newProd.name.toUpperCase(),
        category: (newProd.category as any) || 'Smash Burgers',
        soloPrice: Number(newProd.soloPrice),
        comboPrice: newProd.comboPrice ? Number(newProd.comboPrice) : undefined,
        description: newProd.description || '',
        ingredients: newProd.ingredients || [],
        image: newProd.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
      };
      addProduct(created);
      setIsAddingNew(false);
      setNewProd({
        name: '',
        category: 'Smash Burgers',
        soloPrice: 180,
        comboPrice: 220,
        description: '',
        ingredients: ['Two smash beef patties', 'Lettuce'],
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=1000&auto=format&fit=crop',
        isAvailable: true,
      });
    }
  };

  return (
    <div className="bg-[#0A0A0C] text-white min-h-screen pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-red-500 uppercase tracking-widest">
              <Settings className="w-4 h-4" /> Restaurant Management Dashboard
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-mono uppercase text-white mt-1">
              BLACK BURGER <span className="text-red-600">MENU MANAGER</span>
            </h1>
            <p className="text-xs text-neutral-400 mt-1">
              Real-time database editor. Edit prices, toggle availability, or add items dynamically.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={resetToDefaultMenu}
              className="bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-neutral-300 font-mono text-xs px-4 py-2.5 rounded-xl transition-all flex items-center gap-2"
            >
              <RefreshCw className="w-3.5 h-3.5 text-yellow-400" />
              Reset Official Menu
            </button>

            <button
              type="button"
              onClick={() => setIsAddingNew(true)}
              className="bg-red-600 hover:bg-red-700 text-white font-mono font-bold text-xs uppercase px-4 py-2.5 rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-red-950/50"
            >
              <Plus className="w-4 h-4" /> Add New Item
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 custom-scrollbar">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all ${
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
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold uppercase transition-all whitespace-nowrap ${
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
          <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400 uppercase font-bold">
            <span>Product List</span>
            <span>Availability & Pricing Controls</span>
          </div>

          <div className="divide-y divide-neutral-800/80">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-neutral-900/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-neutral-950 shrink-0 border border-neutral-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    {!product.isAvailable && (
                      <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                        <EyeOff className="w-4 h-4 text-red-500" />
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-mono font-extrabold text-base text-white">
                        {product.name}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-400 uppercase">
                        {product.category}
                      </span>
                      {product.spicy && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-400 border border-red-800 uppercase flex items-center gap-0.5">
                          <Flame className="w-3 h-3 text-red-500" /> Spicy
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5 max-w-lg">
                      {product.ingredients?.join(', ') || product.description}
                    </p>
                  </div>
                </div>

                {/* Pricing & Actions */}
                <div className="flex items-center gap-4 justify-between sm:justify-end">
                  <div className="text-right font-mono">
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
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-colors flex items-center gap-1.5 ${
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

        {/* EDIT MODAL */}
        {editingProduct && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0F0F12] border border-neutral-800 rounded-2xl max-w-xl w-full p-6 space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-white uppercase">
                  Edit {editingProduct.name}
                </h3>
                <button
                  onClick={() => setEditingProduct(null)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Product Name</label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, name: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Solo Price (EGP)</label>
                    <input
                      type="number"
                      value={editingProduct.soloPrice}
                      onChange={(e) =>
                        setEditingProduct({
                          ...editingProduct,
                          soloPrice: Number(e.target.value),
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">
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
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingProduct.image}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, image: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">
                    Ingredients (comma separated)
                  </label>
                  <input
                    type="text"
                    value={editingProduct.ingredients?.join(', ')}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        ingredients: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingProduct(null)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ADD NEW MODAL */}
        {isAddingNew && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-[#0F0F12] border border-neutral-800 rounded-2xl max-w-xl w-full p-6 space-y-4 font-mono">
              <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                <h3 className="text-lg font-bold text-white uppercase">Add New Menu Item</h3>
                <button
                  onClick={() => setIsAddingNew(false)}
                  className="text-neutral-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddNewSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. BB SPECIAL SMASH"
                    value={newProd.name}
                    onChange={(e) => setNewProd({ ...newProd, name: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Category</label>
                  <select
                    value={newProd.category}
                    onChange={(e) => setNewProd({ ...newProd, category: e.target.value as any })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  >
                    {CATEGORIES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-neutral-400 block mb-1">Solo Price (EGP) *</label>
                    <input
                      type="number"
                      required
                      value={newProd.soloPrice}
                      onChange={(e) =>
                        setNewProd({ ...newProd, soloPrice: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-neutral-400 block mb-1">Combo Price (EGP)</label>
                    <input
                      type="number"
                      value={newProd.comboPrice || ''}
                      onChange={(e) =>
                        setNewProd({
                          ...newProd,
                          comboPrice: e.target.value ? Number(e.target.value) : undefined,
                        })
                      }
                      className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">Image URL</label>
                  <input
                    type="text"
                    value={newProd.image}
                    onChange={(e) => setNewProd({ ...newProd, image: e.target.value })}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">
                    Ingredients (comma separated)
                  </label>
                  <input
                    type="text"
                    value={newProd.ingredients?.join(', ')}
                    onChange={(e) =>
                      setNewProd({
                        ...newProd,
                        ingredients: e.target.value.split(',').map((s) => s.trim()),
                      })
                    }
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAddingNew(false)}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-red-600 text-white font-bold"
                  >
                    Add Product
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
