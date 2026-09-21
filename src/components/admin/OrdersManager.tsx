"use client";

import React, { useState, useEffect } from 'react';
import { db } from '@/lib/firebase';
import {
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
} from 'firebase/firestore';
import {
  ShoppingBag,
  Search,
  Phone,
  MapPin,
  Clock,
  Trash2,
  CheckCircle,
  Truck,
  AlertCircle,
  XCircle,
  MessageSquare,
  RefreshCw,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { toast } from 'sonner';

export interface OrderItem {
  id: string;
  name: string;
  name_ar?: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  variant?: string;
  size?: string | null;
  flavor?: string | null;
  selectedSandwiches?: Record<string, string> | null;
  addedAdditions?: { name: string; price: number }[];
  removedIngredients?: string[];
  specialInstructions?: string;
}

export interface AdminOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  customerNotes?: string;
  items: OrderItem[];
  subtotalPrice: number;
  deliveryFee: number;
  totalPrice: number;
  status: 'New' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled';
  createdAt?: string;
  timestamp?: any;
}

const STATUS_OPTIONS: ('New' | 'Preparing' | 'Out for Delivery' | 'Completed' | 'Cancelled')[] = [
  'New',
  'Preparing',
  'Out for Delivery',
  'Completed',
  'Cancelled',
];

export function OrdersManager() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState<AdminOrder | null>(null);

  // Subscribe to real-time updates from Firestore 'orders' collection
  useEffect(() => {
    setIsLoading(true);
    const q = query(collection(db, 'orders'));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const fetchedOrders: AdminOrder[] = [];
        snapshot.forEach((docSnap) => {
          fetchedOrders.push({ id: docSnap.id, ...docSnap.data() } as AdminOrder);
        });

        // Merge with backup orders from localStorage if any exist locally
        try {
          const localBackup = JSON.parse(localStorage.getItem('bb_orders_backup') || '[]');
          localBackup.forEach((bOrder: AdminOrder) => {
            if (!fetchedOrders.some((o) => o.id === bOrder.id)) {
              fetchedOrders.push(bOrder);
            }
          });
        } catch (e) {
          console.error('Error reading local orders backup:', e);
        }

        // Sort desc by creation date/time
        fetchedOrders.sort((a, b) => {
          const timeA = new Date(a.createdAt || 0).getTime();
          const timeB = new Date(b.createdAt || 0).getTime();
          return timeB - timeA;
        });

        setOrders(fetchedOrders);
        setIsLoading(false);
      },
      (error) => {
        console.error('Firestore orders sub error:', error);
        // Fallback to localStorage backup
        try {
          const localBackup = JSON.parse(localStorage.getItem('bb_orders_backup') || '[]');
          setOrders(localBackup);
        } catch (e) {
          console.error('Failed reading backup:', e);
        }
        setIsLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: AdminOrder['status']) => {
    try {
      const orderRef = doc(db, 'orders', orderId);
      await updateDoc(orderRef, { status: newStatus });
      toast.success(`Order #${orderId} status changed to "${newStatus}"`);
    } catch (error) {
      console.error('Error updating status in Firestore:', error);
      // Fallback update in local state and localStorage
      setOrders((prev) =>
        prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o))
      );
      try {
        const localBackup = JSON.parse(localStorage.getItem('bb_orders_backup') || '[]');
        const updatedBackup = localBackup.map((o: AdminOrder) =>
          o.id === orderId ? { ...o, status: newStatus } : o
        );
        localStorage.setItem('bb_orders_backup', JSON.stringify(updatedBackup));
      } catch (e) {}
      toast.info(`Status updated locally to "${newStatus}"`);
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    if (!confirm(`Are you sure you want to delete order #${orderId}?`)) return;

    try {
      await deleteDoc(doc(db, 'orders', orderId));
      toast.success(`Order #${orderId} deleted`);
    } catch (error) {
      console.error('Error deleting order:', error);
    }

    setOrders((prev) => prev.filter((o) => o.id !== orderId));
    try {
      const localBackup = JSON.parse(localStorage.getItem('bb_orders_backup') || '[]');
      const updatedBackup = localBackup.filter((o: AdminOrder) => o.id !== orderId);
      localStorage.setItem('bb_orders_backup', JSON.stringify(updatedBackup));
    } catch (e) {}
  };

  const filteredOrders = orders.filter((order) => {
    const matchesStatus = statusFilter === 'All' ? true : order.status === statusFilter;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query) ||
      order.customerAddress.toLowerCase().includes(query);

    return matchesStatus && matchesSearch;
  });

  const getStatusBadgeClass = (status: AdminOrder['status']) => {
    switch (status) {
      case 'New':
        return 'bg-red-950/90 text-red-400 border-red-600 animate-pulse';
      case 'Preparing':
        return 'bg-amber-950/90 text-amber-400 border-amber-600';
      case 'Out for Delivery':
        return 'bg-blue-950/90 text-blue-400 border-blue-600';
      case 'Completed':
        return 'bg-emerald-950/90 text-emerald-400 border-emerald-600';
      case 'Cancelled':
        return 'bg-zinc-800 text-zinc-500 border-zinc-700';
      default:
        return 'bg-zinc-800 text-zinc-300 border-zinc-700';
    }
  };

  const totalRevenue = orders
    .filter((o) => o.status !== 'Cancelled')
    .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

  const pendingCount = orders.filter((o) => o.status === 'New' || o.status === 'Preparing').length;

  return (
    <div className="space-y-6 font-mono">
      {/* Overview Stats Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs text-neutral-400 uppercase font-bold block">Total Orders</span>
            <span className="text-2xl font-black text-white mt-1 block">{orders.length}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-red-600/20 border border-red-600/40 flex items-center justify-center text-red-500">
            <ShoppingBag className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs text-neutral-400 uppercase font-bold block">Active / Pending</span>
            <span className="text-2xl font-black text-amber-400 mt-1 block">{pendingCount}</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-neutral-900/80 border border-neutral-800 p-4 rounded-2xl flex items-center justify-between shadow-lg">
          <div>
            <span className="text-xs text-neutral-400 uppercase font-bold block">Total Sales Value</span>
            <span className="text-2xl font-black text-emerald-400 mt-1 block">{totalRevenue} EGP</span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <CheckCircle className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 bg-neutral-900/60 p-4 rounded-2xl border border-neutral-800">
        {/* Status Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 custom-scrollbar">
          <button
            onClick={() => setStatusFilter('All')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap ${
              statusFilter === 'All'
                ? 'bg-red-600 text-white shadow-md'
                : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
            }`}
          >
            All ({orders.length})
          </button>
          {STATUS_OPTIONS.map((st) => {
            const count = orders.filter((o) => o.status === st).length;
            return (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                  statusFilter === st
                    ? 'bg-red-600 text-white shadow-md'
                    : 'bg-neutral-950 text-neutral-400 hover:text-white border border-neutral-800'
                }`}
              >
                <span>{st}</span>
                <span className="px-1.5 py-0.2 rounded-full bg-neutral-800 text-[10px]">
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search order ref, name, phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* Orders List Container */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="text-center py-12 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-2">
            <RefreshCw className="w-6 h-6 text-red-500 animate-spin mx-auto" />
            <p className="text-xs text-neutral-400">Loading incoming orders from Firebase...</p>
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-16 bg-neutral-900/40 rounded-2xl border border-neutral-800 space-y-2">
            <ShoppingBag className="w-10 h-10 text-neutral-600 mx-auto" />
            <h3 className="text-base font-bold text-white">No Orders Found</h3>
            <p className="text-xs text-neutral-500">
              {searchQuery || statusFilter !== 'All'
                ? 'Try adjusting your search query or status filter.'
                : 'New customer orders placed on WhatsApp will automatically show here.'}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const dateFormatted = order.createdAt
              ? new Date(order.createdAt).toLocaleString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })
              : 'Recent';

            return (
              <div
                key={order.id}
                className="bg-neutral-900/80 border border-neutral-800 rounded-2xl p-5 space-y-4 hover:border-neutral-700 transition-all shadow-xl"
              >
                {/* Top Row: Order ID, Date, Status Selector, Delete */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-neutral-800 pb-3">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="font-mono font-black text-lg text-white bg-neutral-950 border border-neutral-800 px-3 py-1 rounded-xl">
                      #{order.id}
                    </span>

                    <span className="text-xs text-neutral-400 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-neutral-500" />
                      {dateFormatted}
                    </span>

                    {/* Status badge */}
                    <span
                      className={`text-xs font-black uppercase px-3 py-1 rounded-full border shadow-sm ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status}
                    </span>
                  </div>

                  {/* Right side controls */}
                  <div className="flex items-center gap-2">
                    {/* Change Status Dropdown */}
                    <div className="relative inline-block">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value as AdminOrder['status'])
                        }
                        className="bg-neutral-950 border border-neutral-700 text-xs font-bold text-white rounded-xl px-3 py-1.5 focus:outline-none focus:border-red-600 appearance-none pr-7"
                      >
                        {STATUS_OPTIONS.map((st) => (
                          <option key={st} value={st}>
                            Status: {st}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 text-neutral-400 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => handleDeleteOrder(order.id)}
                      className="p-2 rounded-xl bg-neutral-950 hover:bg-red-950 text-neutral-400 hover:text-red-400 border border-neutral-800 transition-colors"
                      title="Delete Order"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Customer Details Bar */}
                <div className="bg-neutral-950/80 border border-neutral-800/80 p-3.5 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                  {/* Name & Phone */}
                  <div className="space-y-1">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Customer Info</span>
                    <h4 className="font-extrabold text-sm text-white">{order.customerName}</h4>
                    <div className="flex items-center gap-2 pt-0.5">
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="text-amber-400 hover:underline font-bold flex items-center gap-1"
                      >
                        <Phone className="w-3 h-3 text-amber-500" />
                        {order.customerPhone}
                      </a>
                      <a
                        href={`https://wa.me/${order.customerPhone.replace(/[^0-9]/g, '')}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-emerald-400 hover:underline flex items-center gap-0.5 font-bold"
                        title="Chat on WhatsApp"
                      >
                        <MessageSquare className="w-3 h-3" />
                        WhatsApp
                      </a>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="space-y-1 md:col-span-2">
                    <span className="text-[10px] text-neutral-500 uppercase font-bold block">Delivery Address & Notes</span>
                    <div className="flex items-start gap-1.5 text-zinc-300 font-sans">
                      <MapPin className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" />
                      <span>{order.customerAddress}</span>
                    </div>
                    {order.customerNotes && (
                      <p className="text-[11px] text-amber-300/90 font-sans italic pt-1">
                        Note: &quot;{order.customerNotes}&quot;
                      </p>
                    )}
                  </div>
                </div>

                {/* Items Breakdown */}
                <div className="space-y-2">
                  <span className="text-xs text-neutral-400 uppercase font-bold block">
                    Ordered Items ({order.items.reduce((s, i) => s + i.quantity, 0)} items)
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {order.items.map((item, idx) => (
                      <div
                        key={`${item.id}-${idx}`}
                        className="bg-neutral-950 p-3 rounded-xl border border-neutral-800 text-xs space-y-1"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="font-extrabold text-white">
                            {idx + 1}. {item.name_ar || item.name} <span className="text-red-500 font-mono">x{item.quantity}</span>
                          </span>
                          <span className="font-mono font-bold text-yellow-400 shrink-0">
                            {item.totalPrice || item.unitPrice * item.quantity} EGP
                          </span>
                        </div>

                        {/* Options */}
                        <div className="flex flex-wrap gap-1 pt-1 text-[10px] font-sans">
                          {item.variant === 'combo' && (
                            <span className="bg-amber-950 text-amber-400 px-1.5 py-0.2 rounded border border-amber-800">
                              Combo Meal
                            </span>
                          )}
                          {item.size && (
                            <span className="bg-neutral-800 text-zinc-300 px-1.5 py-0.2 rounded">
                              Size: {item.size}
                            </span>
                          )}
                          {item.flavor && (
                            <span className="bg-red-950 text-red-300 px-1.5 py-0.2 rounded border border-red-800">
                              Flavor: {item.flavor}
                            </span>
                          )}
                          {item.addedAdditions?.map((add) => (
                            <span key={add.name} className="bg-red-950 text-red-300 px-1.5 py-0.2 rounded">
                              +{add.name} (+{add.price} EGP)
                            </span>
                          ))}
                          {item.removedIngredients?.map((ing) => (
                            <span key={ing} className="line-through text-red-400 bg-neutral-900 px-1.5 py-0.2 rounded">
                              No {ing}
                            </span>
                          ))}
                        </div>

                        {item.selectedSandwiches && (
                          <p className="text-[10px] text-amber-300 font-sans pt-0.5">
                            Sandwiches: {Object.values(item.selectedSandwiches).join(' + ')}
                          </p>
                        )}

                        {item.specialInstructions && (
                          <p className="text-[10px] text-neutral-400 italic font-sans pt-0.5">
                            &quot;{item.specialInstructions}&quot;
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer Bar: Totals & Quick Status Buttons */}
                <div className="pt-3 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-4 text-xs">
                    <div>
                      <span className="text-neutral-500 block">Subtotal:</span>
                      <strong className="text-white">{order.subtotalPrice} EGP</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Delivery:</span>
                      <strong className="text-white">{order.deliveryFee} EGP</strong>
                    </div>
                    <div>
                      <span className="text-neutral-500 block">Grand Total:</span>
                      <strong className="text-base text-amber-400 font-mono font-black">
                        {order.totalPrice} EGP
                      </strong>
                    </div>
                  </div>

                  {/* Status Action Buttons */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    {order.status === 'New' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Preparing')}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md"
                      >
                        Mark as Preparing
                      </button>
                    )}
                    {order.status === 'Preparing' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Out for Delivery')}
                        className="bg-blue-600 hover:bg-blue-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md"
                      >
                        Out for Delivery
                      </button>
                    )}
                    {(order.status === 'Out for Delivery' || order.status === 'Preparing') && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Completed')}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[11px] px-3 py-1.5 rounded-xl transition-all shadow-md"
                      >
                        Complete Order
                      </button>
                    )}
                    {order.status !== 'Cancelled' && order.status !== 'Completed' && (
                      <button
                        onClick={() => handleStatusChange(order.id, 'Cancelled')}
                        className="bg-neutral-800 hover:bg-red-950 text-neutral-400 hover:text-red-400 font-bold text-[11px] px-2.5 py-1.5 rounded-xl transition-all"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
