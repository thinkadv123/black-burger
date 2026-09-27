import type { Metadata } from "next";
import { Geist, Geist_Mono, Cairo } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import { MenuProvider } from "@/context/MenuContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { GlobalProductModal } from "@/components/GlobalProductModal";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const cairo = Cairo({
  variable: "--font-cairo",
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const titleFont = localFont({
  src: "../../public/fonts/the-old-navy-grunge-regular.ttf",
  variable: "--font-title",
  display: "swap",
});

export const metadata: Metadata = {
  title: "BLACK BURGER | Smash Burgers Made Different",
  description:
    "Premium urban smash burger restaurant in Faisal. 100% Angus beef smashed to crispy perfection, signature sauces, loaded chaos fries, and online ordering with Cash on Delivery.",
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${titleFont.variable} ${cairo.variable} bg-black text-white antialiased min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white`}
      >
        <LanguageProvider>
          <MenuProvider>
            <CartProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />

              {/* Interactive Modals & Drawers */}
              <GlobalProductModal />
              <CartDrawer />
              <CheckoutModal />

              {/* Toast Notification Provider */}
              <Toaster position="top-center" theme="dark" closeButton />
            </CartProvider>
          </MenuProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
