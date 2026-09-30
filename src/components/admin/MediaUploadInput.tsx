"use client";

import React, { useState, useRef } from "react";
import { Upload, Image as ImageIcon, X, Loader2, Check, Grid } from "lucide-react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "@/lib/firebase";
import { toast } from "sonner";

export const PRESET_MEDIA_LIBRARY = [
  // Offers
  { label: "Triple King", url: "/images/offers/triple-king.jpeg", category: "Offers" },
  { label: "BB Duo Box", url: "/images/offers/bb-duo-box.jpeg", category: "Offers" },
  { label: "Premium Box", url: "/images/offers/premium-box.jpeg", category: "Offers" },
  { label: "Hawaiian Family", url: "/images/offers/hawaiian-chicken.jpeg", category: "Offers" },
  { label: "Chicken Box", url: "/images/offers/chicken-box.jpeg", category: "Offers" },

  // Smash Burgers
  { label: "BB Classic", url: "/images/menu/bb-classic.jpeg", category: "Smash Burgers" },
  { label: "Truffle Burger", url: "/images/menu/truffle.jpeg", category: "Smash Burgers" },
  { label: "Chipotle Burger", url: "/images/menu/chipotle.jpeg", category: "Smash Burgers" },
  { label: "Mexicali Burger", url: "/images/menu/mexicali.jpeg", category: "Smash Burgers" },
  { label: "Ranchavoo Burger", url: "/images/menu/ranchavoo.jpeg", category: "Smash Burgers" },

  // Chicken Collection
  { label: "BB Chicken", url: "/images/menu/bb-chicken.jpeg", category: "Chicken Collection" },
  { label: "Buffalo Chicken", url: "/images/menu/buffalo-chicken.jpeg", category: "Chicken Collection" },
  { label: "Chickenito", url: "/images/menu/chickenito.jpeg", category: "Chicken Collection" },

  // Salads & Appetizers
  { label: "BB Salad", url: "/images/menu/bb-salad.jpeg", category: "Salads" },
  { label: "Caesar Salad", url: "/images/menu/caesar-salad.jpeg", category: "Salads" },
  { label: "BB Beef Chaos", url: "/images/menu/bb-beef-chaos.jpeg", category: "Appetizers" },
  { label: "BB Chicken Chaos", url: "/images/menu/bb-chicken-chaos.jpeg", category: "Appetizers" },

  // Sauces
  { label: "BB Sauce", url: "/images/sauces/sauce_bb.jpg", category: "Sauces" },
  { label: "Ranch Sauce", url: "/images/sauces/sauce-ranch.jpg", category: "Sauces" },
  { label: "Buffalo Sauce", url: "/images/sauces/sauce_bufflo.jpg", category: "Sauces" },
  { label: "BBQ Sauce", url: "/images/sauces/sauce-bbq.jpg", category: "Sauces" },
  { label: "Cheddar Sauce", url: "/images/sauces/sauce-cheddar.jpg", category: "Sauces" },
  { label: "Chipotle Sauce", url: "/images/sauces/sauce-chipotle.jpg", category: "Sauces" },
  { label: "Sriracha Sauce", url: "/images/sauces/sauce-siracha.jpg", category: "Sauces" },

  // Additions
  { label: "Extra Chicken", url: "/images/additions/extra-chicken-piece.jpg", category: "Additions" },
  { label: "Extra Cheddar", url: "/images/additions/extra-cheddar.jpg", category: "Additions" },
  { label: "Extra Bacon", url: "/images/additions/extra-bacon.jpeg", category: "Additions" },
  { label: "Extra Jalapeño", url: "/images/additions/extra-jalapeno.jpeg", category: "Additions" },
  { label: "Extra Mushroom", url: "/images/additions/extra-mushroom.jpeg", category: "Additions" },
];

interface MediaUploadInputProps {
  value: string;
  onChange: (url: string) => void;
}

export function MediaUploadInput({ value, onChange }: MediaUploadInputProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showLibraryModal, setShowLibraryModal] = useState(false);
  const [libraryTab, setLibraryTab] = useState<string>("All");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file (PNG, JPG, WEBP, etc.)");
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);

    // Try uploading to Firebase Storage first
    try {
      const storageRef = ref(storage, `blackburger/uploads/${Date.now()}_${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setUploadProgress(progress);
        },
        async (error) => {
          console.warn("Firebase Storage upload fallback to Data URL:", error);
          // Fallback to Base64 Data URL if Firebase Storage is restricted
          const reader = new FileReader();
          reader.onload = () => {
            const result = reader.result as string;
            onChange(result);
            setIsUploading(false);
            toast.success("Image uploaded successfully!");
          };
          reader.readAsDataURL(file);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          onChange(downloadURL);
          setIsUploading(false);
          toast.success("Image uploaded to Firebase Storage!");
        }
      );
    } catch (err) {
      console.warn("Direct upload fallback:", err);
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        onChange(result);
        setIsUploading(false);
        toast.success("Image uploaded successfully!");
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ["All", "Offers", "Exclusive", "Smash Burgers", "Chicken Collection", "Salads", "Appetizers", "Sauces", "Additions"];

  const filteredPresetImages = PRESET_MEDIA_LIBRARY.filter((item) =>
    libraryTab === "All" ? true : item.category === libraryTab
  );

  return (
    <div className="space-y-2 font-mono">
      <div className="flex items-center justify-between">
        <label className="text-neutral-400 text-xs uppercase font-bold tracking-wider flex items-center gap-1.5">
          <ImageIcon className="w-3.5 h-3.5 text-red-500" />
          Product Image
        </label>
        <button
          type="button"
          onClick={() => setShowLibraryModal(true)}
          className="text-xs text-red-400 hover:text-red-300 underline flex items-center gap-1 font-bold"
        >
          <Grid className="w-3 h-3" /> Media Library
        </button>
      </div>

      {/* Upload Box & Image Preview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Thumbnail Preview */}
        <div className="relative aspect-square sm:aspect-auto sm:h-28 rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center group shrink-0">
          {value ? (
            <img
              src={value}
              alt="Preview"
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <div className="text-center text-neutral-600 text-xs p-2">
              <ImageIcon className="w-6 h-6 mx-auto mb-1 opacity-50" />
              No image
            </div>
          )}
        </div>

        {/* Upload Action Area */}
        <div className="sm:col-span-2 flex flex-col justify-between space-y-2">
          {/* File Input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          <div className="flex gap-2">
            <button
              type="button"
              disabled={isUploading}
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 border border-red-500/30 disabled:opacity-50"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  Uploading ({uploadProgress}%)...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4" />
                  Upload From My Files
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => setShowLibraryModal(true)}
              className="bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-bold px-3 py-2.5 rounded-xl border border-neutral-700 transition-all flex items-center gap-1.5"
            >
              <Grid className="w-4 h-4" />
              Library
            </button>
          </div>

          {/* Text URL input */}
          <input
            type="text"
            placeholder="Or paste direct image URL (/images/... or https://...)"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-red-600"
          />
        </div>
      </div>

      {/* MEDIA LIBRARY POPUP MODAL */}
      {showLibraryModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0F0F12] border border-neutral-800 rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col overflow-hidden shadow-2xl font-mono">
            {/* Header */}
            <div className="p-4 bg-neutral-900 border-b border-neutral-800 flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white uppercase">
                <Grid className="w-4 h-4 text-red-500" />
                Select Image From Media Library
              </div>
              <button
                type="button"
                onClick={() => setShowLibraryModal(false)}
                className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-neutral-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Category Filter Tabs */}
            <div className="p-3 bg-neutral-950 border-b border-neutral-800 flex items-center gap-1.5 overflow-x-auto custom-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setLibraryTab(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs uppercase whitespace-nowrap font-bold transition-all ${
                    libraryTab === cat
                      ? "bg-red-600 text-white shadow-md"
                      : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Images Grid */}
            <div className="p-4 overflow-y-auto flex-1 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {filteredPresetImages.map((item) => {
                const isSelected = value === item.url;
                return (
                  <button
                    key={item.label}
                    type="button"
                    onClick={() => {
                      onChange(item.url);
                      setShowLibraryModal(false);
                      toast.success(`Selected ${item.label} image!`);
                    }}
                    className={`group relative rounded-xl border p-2 flex flex-col items-center justify-between text-center transition-all bg-neutral-900/80 hover:bg-neutral-800 ${
                      isSelected
                        ? "border-red-500 ring-2 ring-red-600 shadow-lg shadow-red-950/50"
                        : "border-neutral-800 hover:border-neutral-700"
                    }`}
                  >
                    <div className="relative w-full aspect-square rounded-lg overflow-hidden bg-neutral-950 mb-2 flex items-center justify-center">
                      <img
                        src={item.url}
                        alt={item.label}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                      />
                      {isSelected && (
                        <div className="absolute top-1.5 right-1.5 bg-red-600 text-white rounded-full p-0.5">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </div>
                    <span className="text-[11px] font-bold text-white uppercase tracking-tight line-clamp-1">
                      {item.label}
                    </span>
                    <span className="text-[9px] text-neutral-500 uppercase mt-0.5">
                      {item.category}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="p-3 bg-neutral-900 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
              <span>Showing {filteredPresetImages.length} media assets</span>
              <button
                type="button"
                onClick={() => {
                  setShowLibraryModal(false);
                  fileInputRef.current?.click();
                }}
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload New Image File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
