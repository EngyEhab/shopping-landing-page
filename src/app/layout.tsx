"use client";

import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import Header from "@/components/Header";
import ProductsProvider from "@/context/ProductsContext";
import CartProvider from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <Providers>
          <ProductsProvider>
            <CartProvider>
              <Header />
              {children}
            </CartProvider>
          </ProductsProvider>
        </Providers>
      </body>
    </html>
  );
}
