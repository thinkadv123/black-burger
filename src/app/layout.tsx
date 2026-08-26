import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { MenuProvider } from "@/context/MenuContext";
import { CartProvider } from "@/context/CartContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CartDrawer } from "@/components/CartDrawer";
import { CheckoutModal } from "@/components/CheckoutModal";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased min-h-screen flex flex-col justify-between selection:bg-red-600 selection:text-white`}
      >
        <MenuProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />

            {/* Interactive Modals & Drawers */}
            <CartDrawer />
            <CheckoutModal />

            {/* Toast Notification Provider */}
            <Toaster position="bottom-right" theme="dark" />
          </CartProvider>
        </MenuProvider>
      </body>
    </html>
  );
}
