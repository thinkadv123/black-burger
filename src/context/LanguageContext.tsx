"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'en' | 'ar';

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  toggleLang: () => void;
  dir: 'ltr' | 'rtl';
  isAr: boolean;
  t: (key: string) => string;
  getText: (enText?: string, arText?: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navigation
  home: { en: 'Home', ar: 'الرئيسية' },
  menu: { en: 'Menu', ar: 'المنيو' },
  offers: { en: 'Offers', ar: 'العروض' },
  location: { en: 'Location', ar: 'الموقع' },
  orderNow: { en: 'ORDER NOW', ar: 'اطلب الآن' },
  cart: { en: 'Cart', ar: 'السلة' },
  admin: { en: 'Admin', ar: 'اللوحة' },

  // Hero & General
  heroBadge: { en: "Faisal's #1 Angus Smash Burgers", ar: 'أفضل برجر أنجوس في فيصل' },
  heroTitle1: { en: 'SMASHED', ar: 'برجر أنجوس' },
  heroTitle2: { en: 'TO PERFECTION', ar: 'مشوي على الأصول' },
  heroSub: {
    en: '100% Pure Angus Beef smashed on hot flat-tops with caramelized crusts, secret BB sauce & brioche buns.',
    ar: '100% لحم أنجوس صافي مشوي على الصاج الساخن بطبقة مقرمشة، مع صوص بي بي السري وخبز البريوش الطري.',
  },
  exploreMenu: { en: 'EXPLORE MENU', ar: 'استكشف المنيو' },
  callToOrder: { en: 'CALL TO ORDER', ar: 'اتصل للطلب' },
  vatInclusiveNotice: {
    en: 'All prices VAT inclusive • Fast Cash on Delivery across Faisal & Giza',
    ar: 'جميع الأسعار شاملة الضريبة • توصيل سريع والدفع عند الاستلام في فيصل والجيزة',
  },
  officialMenuTitle: { en: 'Official Black Burger Menu', ar: 'منيو بلاك برجر الرسمي' },
  orderOnlineTitle: { en: 'ORDER BLACK BURGER ONLINE', ar: 'اطلب بلاك برجر أونلاين' },
  fastDeliveryNotice: {
    en: 'All displayed prices are VAT inclusive. Fast Cash on Delivery across Faisal & Haram.',
    ar: 'جميع الأسعار المعروضة شاملة الضريبة. توصيل سريع والدفع عند الاستلام في فيصل والهرم.',
  },
  searchPlaceholder: {
    en: 'Search offers, burgers, chicken, sauces, chaos fries...',
    ar: 'ابحث عن العروض، البرجر، الدجاج، الصوصات، بطاطس تشاوس...',
  },
  showing: { en: 'Showing', ar: 'عرض' },
  item: { en: 'item', ar: 'صنف' },
  items: { en: 'items', ar: 'أصناف' },
  noItemsFound: { en: 'No items found matching your search.', ar: 'لم يتم العثور على نتائج تطابق بحثك.' },
  resetFilter: { en: 'Reset Filter', ar: 'إعادة ضبط البحث' },
  preparedFreshNotice: {
    en: 'All displayed prices are VAT inclusive. Prepared fresh upon receiving your order.',
    ar: 'جميع الأسعار المعروضة شاملة الضريبة. يتم تحضير الوجبات طازجة فور استلام طلبك.',
  },

  // Modal / Product Details
  spicy: { en: 'Spicy', ar: 'حار' },
  bestValue: { en: 'BEST VALUE', ar: 'أفضل قيمة' },
  combo: { en: 'COMBO', ar: 'وجبة' },
  solo: { en: 'SOLO', ar: 'ساندوتش' },
  comboDesc: { en: 'Includes fries & soft drink', ar: 'تتضمن بطاطس ومشروب غازي' },
  soloDesc: { en: 'Sandwich only', ar: 'الساندوتش فقط' },
  chooseSize: { en: '1. Choose your size / option', ar: '1. اختر الحجم / الوجبة' },
  choosePattySize: { en: '1. Choose Patty Size', ar: '1. اختر حجم البرجر (عدد الشرائح)' },
  chooseMealOption: { en: '2. Choose Meal Option', ar: '2. اختر الوجبة (ساندوتش أم كومبو؟)' },
  sizeDouble: { en: 'Double', ar: 'دابل' },
  sizeTriple: { en: 'Triple', ar: 'تريبل' },
  sizeQuad: { en: 'Quad', ar: 'كواد' },
  pattyDoubleDesc: { en: '2 Smashed Angus Patties', ar: 'قطعتين لحم أنجوس صافي' },
  pattyTripleDesc: { en: '3 Smashed Angus Patties (+40 EGP)', ar: '3 قطع لحم أنجوس (+40 ج.م)' },
  pattyQuadDesc: { en: '4 Smashed Angus Patties (+80 EGP)', ar: '4 قطع لحم أنجوس (+80 ج.م)' },
  smashSizesBadge: { en: '3 Sizes: Double / Triple / Quad', ar: '3 أحجام: دابل / تريبل / كواد' },
  removeIngredients: { en: '2. Remove ingredients', ar: '2. إزالة المكونات' },
  tapToRemove: { en: "Tap anything you don't want", ar: 'اضغط على أي مكون لا ترغبه' },
  addExtras: { en: '3. Add extras', ar: '3. إضافة إضافات' },
  chooseSandwiches: { en: 'Choose Your Sandwiches', ar: 'اختر الساندوتشات' },
  included: { en: 'Included', ar: 'مشمول' },
  packageIncludes: { en: '📦 Package Includes:', ar: '📦 محتويات العرض:' },
  specialInstructions: { en: 'Comment Box / Special Instructions', ar: 'ملاحظات خاصة / تعليمات للطلب' },
  specialInstructionsPlaceholder: {
    en: 'e.g., Specify chicken choices or sauce preferences...',
    ar: 'مثال: تفضيلات الصوص أو تعليمات التوصيل...',
  },
  addToOrder: { en: 'Add to Order', ar: 'أضف إلى الطلب' },
  required: { en: 'Required', ar: 'مطلوب' },
  removed: { en: 'Removed', ar: 'تم الاستبعاد' },
  from: { en: 'From', ar: 'من' },
  price: { en: 'Price', ar: 'السعر' },
  multipleSizes: { en: 'Multiple Sizes', ar: 'أحجام متعددة' },
  order: { en: 'ORDER', ar: 'اطلب' },
  soldOut: { en: 'Sold Out', ar: 'نفذت الكمية' },
  exclusiveOffer: { en: 'EXCLUSIVE OFFER', ar: 'عرض حصري' },
  twoSizes: { en: '2 Sizes: Solo / Combo', ar: 'حجمين: ساندوتش / وجبة' },
  chooseFlavor: { en: 'Choose Flavor / Level', ar: 'اختر الطعم (عادي / حار)' },
  flavorNormal: { en: 'Normal', ar: 'عادي' },
  flavorSpicy: { en: 'Spicy 🔥', ar: 'حار 🔥' },
  flavorDescNormal: { en: 'Original non-spicy recipe', ar: 'الوصفة الأصلية العادية' },
  flavorDescSpicy: { en: 'Extra spicy kick', ar: 'مع إضافة نكهة حارة' },

  // Cart Drawer & Checkout
  yourOrder: { en: 'Your Order', ar: 'طلباتك' },
  cartEmptyTitle: { en: 'Your Cart is Empty', ar: 'سلتك فارغة' },
  cartEmptySub: {
    en: 'Explore our smash burger menu and stack up your ultimate feast.',
    ar: 'استكشف قائمة البرجر لدينا وجهّز وجبتك المفضلة.',
  },
  subtotal: { en: 'Subtotal (VAT Inclusive)', ar: 'المجموع الفرعي (شامل الضريبة)' },
  deliveryFee: { en: 'Delivery (Faisal Zone)', ar: 'التوصيل (منطقة فيصل)' },
  totalOrder: { en: 'Total Order', ar: 'الإجمالي الكلي' },
  proceedToCheckout: { en: 'PROCEED TO CHECKOUT', ar: 'متابعة لإتمام الطلب' },
  checkoutTitle: { en: 'Checkout & Delivery', ar: 'إتمام الطلب والتوصيل' },
  orderSentTitle: { en: 'Order Sent to WhatsApp', ar: 'تم إرسال الطلب للواتساب' },
  whatsappOpened: { en: 'WHATSAPP ORDER OPENED', ar: 'تم فتح محادثة الواتساب' },
  thankYou: { en: 'Thank you', ar: 'شكراً لك' },
  whatsappRedirectNote: {
    en: 'Your order details have been formatted and passed directly to WhatsApp.',
    ar: 'تم تجهيز تفاصيل طلبك وإرسالها مباشرة إلى الواتساب لمتابعة طلبك.',
  },
  estimatedDelivery: { en: 'Estimated Delivery', ar: 'وقت التوصيل المتوقع' },
  minsRange: { en: '25 – 35 Mins', ar: '25 – 35 دقيقة' },
  paymentMethod: { en: 'Payment Method', ar: 'طريقة الدفع' },
  cashOnDelivery: { en: 'Cash on Delivery', ar: 'الدفع عند الاستلام' },
  reopenWhatsapp: { en: 'Re-open WhatsApp Chat', ar: 'إعادة فتح الواتساب' },
  backToMenu: { en: 'Back to Menu', ar: 'العودة للمنيو' },
  totalToPay: { en: 'Total Amount to Pay', ar: 'المبلغ الإجمالي للدفع' },
  includesDeliveryNotice: { en: 'Includes delivery fee in Faisal', ar: 'شامل رسوم التوصيل في منطقة فيصل' },
  fullName: { en: 'Full Name *', ar: 'الاسم بالكامل *' },
  phoneNumber: { en: 'Phone Number *', ar: 'رقم الهاتف *' },
  address: { en: 'Delivery Address (Faisal Area) *', ar: 'عنوان التوصيل (منطقة فيصل) *' },
  orderNotes: { en: 'Order Notes (Optional)', ar: 'ملاحظات الطلب (اختياري)' },
  whatsappGuarantee: {
    en: 'Your full cart details & delivery address will be sent formatted directly to WhatsApp.',
    ar: 'سيتم إرسال جميع تفاصيل السلة وعنوانك منسقة مباشرة عبر الواتساب.',
  },
  sendToWhatsapp: { en: 'Send Order To Faisal Whatsapp', ar: 'إرسال الطلب لواتساب فرع فيصل' },
  generatingWhatsapp: { en: 'GENERATING WHATSAPP ORDER...', ar: 'جاري تجهيز الطلب للواتساب...' },

  // Category Names
  catOffers: { en: 'Offers', ar: 'العروض' },
  catExclusive: { en: 'Exclusive', ar: 'حصري' },
  catBurgers: { en: 'Smash Burgers', ar: 'برجر أنجوس' },
  catChicken: { en: 'Chicken Collection', ar: 'دجاج كريسبي' },
  catSalads: { en: 'Salads', ar: 'سلطات' },
  catAppetizers: { en: 'Appetizers', ar: 'مقبلات وتشاوس' },
  catSauces: { en: 'Sauces', ar: 'صوصات' },
  catAdditions: { en: 'Additions', ar: 'إضافات' },

  // Footer
  footerTagline: {
    en: 'Faisal’s premier smash burger destination. 100% Angus beef smashed to crispy perfection with proprietary house sauces.',
    ar: 'وجهة البرجر الأولى في فيصل. 100% لحم أنجوس طازج مشوي بطبقة مقرمشة مع صوصاتنا الخاصة.',
  },
  quickLinks: { en: 'Quick Links', ar: 'روابط سريعة' },
  openingHours: { en: 'Opening Hours', ar: 'ساعات العمل' },
  everydayHours: { en: 'Everyday: 4:00 PM – 4:00 AM', ar: 'يومياً: 4:00 عصراً – 4:00 صباحاً' },
  deliveryZone: { en: 'Delivery Zone: Faisal, Haram & Nearby Giza Areas', ar: 'منطقة التوصيل: فيصل، الهرم، والمناطق المجاورة' },
  contactUs: { en: 'Contact Us', ar: 'تواصل معنا' },
  allRightsReserved: { en: 'All Rights Reserved.', ar: 'جميع الحقوق محفوظة.' },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('en');

  useEffect(() => {
    try {
      const saved = localStorage.getItem('black_burger_lang') as Language;
      if (saved === 'en' || saved === 'ar') {
        setLangState(saved);
      }
    } catch (e) {
      console.error('Failed to load saved language', e);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem('black_burger_lang', newLang);
    } catch (e) {
      console.error('Failed to save language', e);
    }
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const dir = lang === 'ar' ? 'rtl' : 'ltr';
  const isAr = lang === 'ar';

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.dir = dir;
      document.documentElement.lang = lang;
      if (isAr) {
        document.documentElement.classList.add('rtl-mode');
      } else {
        document.documentElement.classList.remove('rtl-mode');
      }
    }
  }, [dir, lang, isAr]);

  const t = (key: string): string => {
    if (translations[key]) {
      return translations[key][lang] || translations[key].en;
    }
    return key;
  };

  const getText = (enText?: string, arText?: string): string => {
    if (isAr && arText && arText.trim().length > 0) {
      return arText;
    }
    return enText || '';
  };

  return (
    <LanguageContext.Provider
      value={{
        lang,
        setLang,
        toggleLang,
        dir,
        isAr,
        t,
        getText,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
