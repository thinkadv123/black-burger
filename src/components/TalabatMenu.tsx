"use client";

import React, { useState } from 'react';
import {
  CATEGORIES_LIST,
  getProductName,
  getProductDescription,
  getProductIngredients,
  getCategoryDisplayName,
} from '@/data/menu';
import { useMenu } from '@/context/MenuContext';
import { useCart } from '@/context/CartContext';
import { useLanguage } from '@/context/LanguageContext';
import { Search, Flame, Plus, ShieldCheck } from 'lucide-react';

export function TalabatMenu() {
  const { products } = useMenu();
  const { setCustomizingProduct } = useCart();
  const { isAr, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('Offers');
  const [searchQuery, setSearchQuery] = useState('');

  const categoryNotesEn: Record<string, string> = {
    'Offers': 'Special bundled offer deals and boxes, prepared fresh for fast local delivery in Faisal & Haram.',
    'Exclusive': 'Exclusive items and limited special offers created specially for Black Burger fans.',
    'Smash Burgers':
      'Served in a 5-inch brioche bun without sesame. Every beef sandwich contains two 150g pure Angus beef smash patties. Combo includes sandwich, fries, and soft drink.',
    'Chicken Collection':
      'Made with a large crispy fried chicken piece. Combo includes sandwich, fries, and soft drink.',
    'Salads': 'Fresh, crisp salads made to order.',
    'Appetizers': 'Crispy sides and loaded chaos fries.',
    'Sauces': 'Dipper sauce cups made in-house.',
    'Additions': 'Extra toppings and sides.',
    'Online Only Offers':
      'Exclusive combo boxes and special deal meals available for online delivery.',
  };

  const categoryNotesAr: Record<string, string> = {
    'Offers': 'عروض وبوكسات مميزة، يتم تحضيرها طازجة للتوصيل السريع في فيصل والهرم.',
    'Exclusive': 'منتجات وأصناف حصرية مميزة لعشاق بلاك برجر.',
    'Smash Burgers':
      'تقدم في خبز بريوش 5 بوصة بدون سمسم. تحتوي كل ساندوتش على قطعتين لحم أنجوس صافي 150 جرام. الوجبة تشمل ساندوتش، بطاطس ومشروب غازي.',
    'Chicken Collection':
      'مصنوعة من قطعتين دجاج كريسبي مقرمشة. الوجبة تشمل ساندوتش، بطاطس ومشروب غازي.',
    'Salads': 'سلطات طازجة ومعدة فور الطلب.',
    'Appetizers': 'مقبلات مقرمشة وبطاطس تشاوس الغنية.',
    'Sauces': 'عبوات صوصات خاصة مجهزة خصيصاً لكم.',
    'Additions': 'إضافات وتوبينج مميزة لزيادة النكهة.',
    'Online Only Offers':
      'بوكسات وعروض حصيرة متاحة للطلب أونلاين عبر الموقع.',
  };

  // Filter products based on search query AND active category
  const visibleCategories = CATEGORIES_LIST.filter((cat) => {
    if (searchQuery.trim().length > 0) return true;
    return cat === selectedCategory;
  });

  const filteredProducts = products.filter((product) => {
    const pName = getProductName(product, isAr).toLowerCase();
    const pDesc = getProductDescription(product, isAr).toLowerCase();
    const pIngs = getProductIngredients(product, isAr).map((i) => i.toLowerCase());
    const query = searchQuery.toLowerCase();

    const matchesSearch =
      pName.includes(query) ||
      pDesc.includes(query) ||
      pIngs.some((ing) => ing.includes(query)) ||
      product.name.toLowerCase().includes(query);

    if (searchQuery.trim().length > 0) {
      return matchesSearch;
    }
    return product.category === selectedCategory;
  });

  return (
    <section id="menu-section" className="bg-[#0A0A0C] text-white py-6 sm:py-16 border-t border-neutral-800 relative min-h-[80vh] font-sans">
      <div className="max-w-[1500px] mx-auto px-2.5 sm:px-6 lg:px-8 space-y-5 sm:space-y-8">
        
        {/* Section Title Header */}
        <div className="text-center space-y-2.5 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EA1F27]/15 border border-[#EA1F27]/40 text-[#EA1F27] text-xs sm:text-sm font-extrabold tracking-wide uppercase">
            <Flame className="w-4 h-4 text-[#CDB32D]" />
            {t('officialMenuTitle')}
          </div>
          <h2 className="text-2xl sm:text-5xl font-black text-white tracking-normal uppercase">
            {isAr ? (
              <>
                اطلب <span className="text-[#EA1F27]">بلاك برجر</span> أونلاين
              </>
            ) : (
              <>
                ORDER <span className="text-[#EA1F27]">BLACK BURGER</span> ONLINE
              </>
            )}
          </h2>
          <p className="text-neutral-200 text-xs sm:text-base leading-relaxed">
            {t('fastDeliveryNotice')}
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto relative">
          <Search className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 absolute left-3.5 rtl:left-auto rtl:right-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={t('searchPlaceholder')}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-neutral-900 border border-neutral-700 rounded-2xl pl-10 rtl:pl-3 rtl:pr-10 pr-3 py-2.5 sm:py-3.5 text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-none focus:border-red-500 transition-colors shadow-lg"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 rtl:right-auto rtl:left-3.5 top-1/2 -translate-y-1/2 text-xs sm:text-sm font-bold text-neutral-400 hover:text-white"
            >
              {isAr ? 'مسح' : 'Clear'}
            </button>
          )}
        </div>

        {/* Category Filter Bar */}
        <div className="relative z-30 bg-[#0A0A0C] py-2.5 sm:py-4 border-y border-neutral-800 shadow-xl overflow-x-auto custom-scrollbar">
          <div className="flex items-center gap-2 sm:gap-3 px-1 max-w-7xl mx-auto min-w-max">
            {CATEGORIES_LIST.map((cat) => {
              const isSelected = selectedCategory === cat && !searchQuery;
              const displayLabel = getCategoryDisplayName(cat, isAr);

              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory(cat);
                  }}
                  className={`px-3.5 sm:px-6 py-2 sm:py-3.5 rounded-xl sm:rounded-2xl text-xs sm:text-base font-extrabold uppercase transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#EA1F27] text-white shadow-lg shadow-[#EA1F27]/30 scale-105 border border-[#EA1F27]'
                      : 'bg-neutral-900 text-neutral-200 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                  }`}
                >
                  <span>{displayLabel}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Display Filtered Category Items */}
        <div className="space-y-8 sm:space-y-14 pt-1">
          {visibleCategories.map((category) => {
            const rawCategoryProducts = filteredProducts.filter((p) => p.category === category);
            if (rawCategoryProducts.length === 0) return null;

            // Deduplicate products by name / id
            const seenKeys = new Set<string>();
            const categoryProducts = rawCategoryProducts.filter((p) => {
              const key = (p.name || p.name_en || p.id).trim().toUpperCase();
              if (seenKeys.has(key) || seenKeys.has(p.id)) return false;
              seenKeys.add(key);
              seenKeys.add(p.id);
              return true;
            });

            const isOfferCategory = category === 'Offers' || (category as string) === 'Online Only Offers';
            const catNote = isAr ? categoryNotesAr[category] : categoryNotesEn[category];

            return (
              <div key={category} className="space-y-4 sm:space-y-7">
                {/* Category Header */}
                <div className="border-b border-neutral-800 pb-2.5 flex flex-col sm:flex-row sm:items-end justify-between gap-1.5">
                  <div>
                    <h3 className="text-xl sm:text-3xl font-black text-white uppercase tracking-normal flex items-center gap-2">
                      <span className="w-2 sm:w-3 h-5 sm:h-7 bg-[#EA1F27] rounded-sm" />
                      {getCategoryDisplayName(category, isAr)}
                    </h3>
                    {catNote && (
                      <p className="text-xs sm:text-base text-neutral-200 mt-1 sm:mt-2 max-w-3xl leading-relaxed font-sans font-medium">
                        {catNote}
                      </p>
                    )}
                  </div>
                  <span className="text-xs sm:text-sm text-neutral-400 font-bold shrink-0">
                    {t('showing')} {categoryProducts.length} {categoryProducts.length === 1 ? t('item') : t('items')}
                  </span>
                </div>

                {/* Category Items Grid - 2 COLUMNS ON MOBILE */}
                <div className={`grid gap-2.5 sm:gap-6 grid-cols-2 ${
                  isOfferCategory
                    ? 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                    : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }`}>
                  {categoryProducts.map((product) => {
                    const name = getProductName(product, isAr);
                    const desc = getProductDescription(product, isAr);
                    const ings = getProductIngredients(product, isAr);

                    const ingredientsText = ings && ings.length > 0
                      ? ings.join(isAr ? ' • ' : ', ')
                      : desc;

                    const hasVariants = product.comboPrice || product.hasSizes;
                    const startingPriceText = hasVariants
                      ? `${t('from')} ${product.soloPrice} ${isAr ? 'ج.م' : 'EGP'}`
                      : `${product.soloPrice} ${isAr ? 'ج.م' : 'EGP'}`;

                    return (
                      <div
                        key={product.id}
                        onClick={() => product.isAvailable && setCustomizingProduct(product)}
                        className={`bg-neutral-900/95 border rounded-2xl p-2.5 sm:p-5 flex flex-col justify-between transition-all duration-300 hover:border-red-500/70 hover:shadow-2xl hover:shadow-red-950/30 group relative overflow-hidden cursor-pointer ${
                          !product.isAvailable ? 'opacity-50 grayscale border-neutral-800 cursor-not-allowed' : 'border-neutral-800'
                        }`}
                      >
                        <div className="space-y-2 sm:space-y-3.5">
                          {/* Image & Badges */}
                          <div className={`relative w-full rounded-xl overflow-hidden bg-neutral-950 flex items-center justify-center ${
                            isOfferCategory
                              ? 'aspect-[3/4]'
                              : 'aspect-square'
                          }`}>
                            <img
                              src={product.image}
                              alt={name}
                              className={`w-full h-full ${
                                isOfferCategory
                                  ? 'object-contain'
                                  : 'object-cover group-hover:scale-105'
                              } transition-transform duration-500`}
                            />

                            {/* Spicy badge */}
                            {product.spicy && (
                              <div className="absolute top-1.5 left-1.5 rtl:left-auto rtl:right-1.5 bg-[#EA1F27] text-white text-[10px] sm:text-xs font-black px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-full uppercase flex items-center gap-0.5 sm:gap-1 shadow-md z-10">
                                <Flame className="w-2.5 h-2.5 sm:w-3.5 sm:h-3.5 text-[#CDB32D] fill-[#CDB32D]" />
                                {t('spicy')}
                              </div>
                            )}

                            {product.category === 'Smash Burgers' || product.category === 'Exclusive' ? (
                              <div className="absolute top-1.5 right-1.5 rtl:right-auto rtl:left-1.5 bg-neutral-900/95 border border-[#03A0E5]/70 text-[#03A0E5] text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase shadow-md z-10 truncate max-w-[90px] sm:max-w-[140px]">
                                {t('smashSizesBadge')}
                              </div>
                            ) : (product.sizePrices && product.sizePrices.length > 0) || (product.hasSizes && !product.comboPrice) ? (
                              <div className="absolute top-1.5 right-1.5 rtl:right-auto rtl:left-1.5 bg-neutral-900/95 border border-[#03A0E5]/70 text-[#03A0E5] text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase shadow-md z-10 truncate max-w-[90px] sm:max-w-[140px]">
                                {isAr ? 'حجمين' : '2 SIZES'}
                              </div>
                            ) : product.comboPrice ? (
                              <div className="absolute top-1.5 right-1.5 rtl:right-auto rtl:left-1.5 bg-neutral-900/95 border border-[#03A0E5]/70 text-[#03A0E5] text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase shadow-md z-10 truncate max-w-[90px] sm:max-w-[140px]">
                                {t('twoSizes')}
                              </div>
                            ) : null}

                            {isOfferCategory && (
                              <div className="absolute top-1.5 right-1.5 rtl:right-auto rtl:left-1.5 bg-neutral-900/95 border border-[#03A0E5]/80 text-[#03A0E5] text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full uppercase shadow-md z-10 tracking-wide">
                                {t('exclusiveOffer')}
                              </div>
                            )}

                            {!product.isAvailable && (
                              <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10">
                                <span className="bg-red-600 text-white text-xs sm:text-sm font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-md uppercase">
                                  {t('soldOut')}
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product Details */}
                          <div className="space-y-1 sm:space-y-2">
                            <h4 className="font-extrabold text-sm sm:text-xl text-white tracking-normal group-hover:text-red-400 transition-colors leading-snug line-clamp-2">
                              {name}
                            </h4>

                            <p className="text-xs sm:text-base text-neutral-300 font-sans line-clamp-2 leading-tight sm:leading-relaxed font-normal">
                              {ingredientsText}
                            </p>
                          </div>
                        </div>

                        {/* Price & Customize Button Bar */}
                        <div className="pt-2 sm:pt-3.5 mt-2 sm:mt-3.5 border-t border-neutral-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-1.5 sm:gap-3">
                          <div className="min-w-0 flex-1">
                            <span className="text-[10px] sm:text-xs text-neutral-400 block font-semibold truncate">
                              {product.category === 'Smash Burgers' || product.category === 'Exclusive'
                                ? `${t('sizeDouble')} / ${t('sizeTriple')}`
                                : product.comboPrice
                                ? `${t('solo')} / ${t('combo')}`
                                : t('price')}
                            </span>
                            <span className="font-black text-sm sm:text-lg md:text-xl text-[#CDB32D] block truncate">
                              {product.category === 'Smash Burgers' || product.category === 'Exclusive'
                                ? `${t('from')} ${product.soloPrice} ${isAr ? 'ج.م' : 'EGP'}`
                                : product.sizePrices && product.sizePrices.length > 0
                                ? `${product.sizePrices[0]?.price || product.soloPrice} ${isAr ? 'ج.م' : 'EGP'}`
                                : product.comboPrice
                                ? `${product.soloPrice} / ${product.comboPrice} ${isAr ? 'ج.م' : 'EGP'}`
                                : startingPriceText}
                            </span>
                          </div>

                          <button
                            type="button"
                            disabled={!product.isAvailable}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (product.isAvailable) setCustomizingProduct(product);
                            }}
                            className="w-full sm:w-auto bg-[#EA1F27] hover:bg-[#D11820] text-white font-extrabold text-xs sm:text-base uppercase px-2.5 sm:px-5 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all shadow-lg shadow-[#EA1F27]/30 flex items-center justify-center gap-1 active:scale-95 disabled:opacity-50 shrink-0"
                          >
                            <Plus className="w-3.5 h-3.5 sm:w-5 sm:h-5" />
                            <span>{t('order')}</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16 bg-neutral-900/50 rounded-2xl border border-neutral-800">
              <p className="text-neutral-200 text-lg font-medium">{t('noItemsFound')}</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('Offers');
                }}
                className="mt-3 text-base text-red-400 hover:underline font-bold uppercase"
              >
                {t('resetFilter')}
              </button>
            </div>
          )}
        </div>

        {/* VAT Inclusive & Security Notice */}
        <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-center text-xs sm:text-base text-neutral-200 flex flex-col sm:flex-row items-center justify-center gap-2 mt-8 sm:mt-12 font-sans">
          <ShieldCheck className="w-5 h-5 text-green-500 shrink-0" />
          <span>{t('preparedFreshNotice')}</span>
        </div>

      </div>
    </section>
  );
}