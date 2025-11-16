import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "The Wooden Coasters - Handcrafted Excellence",
  description: "Artisan-crafted wooden drink coasters made from sustainably sourced hardwood. Timeless design meets functional elegance. Bespoke engraving and trade orders available.",
  keywords: "artisan wooden coasters, handcrafted coasters, bespoke wooden coasters, luxury drink coasters, sustainable wood coasters, custom engraved coasters, premium coasters",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-[var(--color-neutral-50)] font-sans">
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
