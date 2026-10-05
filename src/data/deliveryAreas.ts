export interface DeliveryArea {
  id: string;
  name_ar: string;
  name_en: string;
  fee: number;
}

export const FAISAL_DELIVERY_AREAS: DeliveryArea[] = [
  {
    id: 'tawabeq',
    name_ar: 'الطوابق',
    name_en: 'Al-Tawabeq',
    fee: 40,
  },
  {
    id: 'kaabish',
    name_ar: 'كعابيش شارع المنشية الشهيد حمد ياسين الصفا والمروة',
    name_en: 'Kaabish Street, El-Mansheya, Al-Shaheed Hamad Yassin, Al-Safa and Al-Marwa',
    fee: 45,
  },
  {
    id: 'taawun',
    name_ar: 'التعاون فيصل وهرم',
    name_en: 'El-Taawun, Faisal and Haram',
    fee: 45,
  },
  {
    id: 'matbaa',
    name_ar: 'المطبعة فيصل أو الهرم',
    name_en: "El-Matba'a, Faisal or Haram",
    fee: 45,
  },
  {
    id: 'talbiya-faisal',
    name_ar: 'الطلبيه فيصل',
    name_en: 'El-Talbiya, Faisal',
    fee: 50,
  },
  {
    id: 'talbiya-haram',
    name_ar: 'الطلبيه هرم',
    name_en: 'El-Talbiya, Haram',
    fee: 60,
  },
  {
    id: 'eshreen-outside',
    name_ar: 'العشرين فيصل (برا)',
    name_en: 'El-Eshreen, Faisal (outside)',
    fee: 60,
  },
  {
    id: 'eshreen-inside',
    name_ar: 'العشرين فيصل (جوا)',
    name_en: 'El-Eshreen, Faisal (inside)',
    fee: 70,
  },
  {
    id: 'awal-faisal',
    name_ar: 'أول فيصل',
    name_en: 'Awal Faisal',
    fee: 60,
  },
  {
    id: 'awal-haram',
    name_ar: 'أول الهرم',
    name_en: 'Awal Haram',
    fee: 60,
  },
  {
    id: 'akher-faisal',
    name_ar: 'آخر فيصل',
    name_en: 'Akher Faisal',
    fee: 35,
  },
  {
    id: 'sahl-hamza',
    name_ar: 'سهل حمزة',
    name_en: 'Sahl Hamza',
    fee: 35,
  },
  {
    id: 'hospital-street',
    name_ar: 'شارع المستشفى فيصل',
    name_en: 'Hospital Street, Faisal',
    fee: 30,
  },
  {
    id: 'arish-faisal',
    name_ar: 'العريش فيصل',
    name_en: 'El-Arish, Faisal',
    fee: 35,
  },
  {
    id: 'hassan-mohamed',
    name_ar: 'حسن محمد فيصل أو الهرم',
    name_en: 'Hassan Mohamed, Faisal or Haram',
    fee: 50,
  },
  {
    id: 'nabil-taha',
    name_ar: 'نبيل طه',
    name_en: 'Nabil Taha',
    fee: 50,
  },
  {
    id: 'kafr-tohormos',
    name_ar: 'كفر طهرمس',
    name_en: 'Kafr Tohormos',
    fee: 60,
  },
  {
    id: 'tersa',
    name_ar: 'ترسا أولها وآخرها',
    name_en: 'Tersa, beginning and end',
    fee: 45,
  },
  {
    id: 'orouba',
    name_ar: 'عروبة أولها وآخرها',
    name_en: 'Orouba, beginning and end',
    fee: 45,
  },
  {
    id: 'new-talatini',
    name_ar: 'التلاتيني الجديد',
    name_en: 'New El-Talatini',
    fee: 45,
  },
  {
    id: 'mariouteya-haram',
    name_ar: 'مريوطية هرم',
    name_en: 'Mariouteya, Haram',
    fee: 40,
  },
  {
    id: 'mariouteya-faisal',
    name_ar: 'مريوطية فيصل',
    name_en: 'Mariouteya, Faisal',
    fee: 35,
  },
  {
    id: 'lebeini-faisal',
    name_ar: 'لبيني فيصل',
    name_en: 'Lebeini, Faisal',
    fee: 35,
  },
  {
    id: 'lebeini-haram',
    name_ar: 'لبيني هرم',
    name_en: 'Lebeini, Haram',
    fee: 40,
  },
  {
    id: 'magzar',
    name_ar: 'المجزر',
    name_en: 'El-Magzar',
    fee: 45,
  },
  {
    id: 'sisi',
    name_ar: 'السيسي',
    name_en: 'El-Sisi',
    fee: 40,
  },
  {
    id: 'zaghloul',
    name_ar: 'زغلول',
    name_en: 'Zaghloul',
    fee: 45,
  },
  {
    id: 'meshaal',
    name_ar: 'مشعل',
    name_en: 'Meshaal',
    fee: 35,
  },
  {
    id: 'kafr-gabal',
    name_ar: 'كفر الجبل',
    name_en: 'Kafr El-Gabal',
    fee: 50,
  },
  {
    id: 'abu-elhoul',
    name_ar: 'أبو الهول السياحي',
    name_en: 'Tourist Abu El-Houl',
    fee: 45,
  },
  {
    id: 'mansheya-bakary',
    name_ar: 'منشية البكاري',
    name_en: 'Mansheya El-Bakary',
    fee: 45,
  },
  {
    id: 'khatem-morsaleen',
    name_ar: 'خاتم المرسلين',
    name_en: 'Khatem El-Morsaleen',
    fee: 50,
  },
  {
    id: 'omraniya',
    name_ar: 'عمرانية شرقية وغربية',
    name_en: 'Eastern and Western Omraniya',
    fee: 65,
  },
  {
    id: 'old-talatini',
    name_ar: 'التلاتيني القديم',
    name_en: 'Old El-Talatini',
    fee: 65,
  },
  {
    id: 'first-gate',
    name_ar: 'البوابة الأولى',
    name_en: 'First Gate',
    fee: 60,
  },
  {
    id: 'second-gate',
    name_ar: 'البوابة الثانية الجديدة والقديمة',
    name_en: 'Second Gate, new and old',
    fee: 65,
  },
  {
    id: 'third-gate',
    name_ar: 'البوابة الثالثة',
    name_en: 'Third Gate',
    fee: 70,
  },
  {
    id: 'fourth-gate',
    name_ar: 'البوابة الرابعة',
    name_en: 'Fourth Gate',
    fee: 75,
  },
];
