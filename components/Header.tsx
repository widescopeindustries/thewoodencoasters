'use client';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b-2 border-amber-800 sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-3xl">🪵</span>
            <span className="text-xl font-bold text-black">
              The Wooden Coasters
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-amber-900 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-amber-900 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?filter=custom"
              className="text-gray-700 hover:text-amber-900 font-medium transition-colors"
            >
              Custom Orders
            </Link>
            <Link
              href="/products?filter=bulk"
              className="text-gray-700 hover:text-amber-900 font-medium transition-colors"
            >
              Wholesale
            </Link>
          </div>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 hover:bg-amber-200 border border-amber-800 transition-colors"
          >
            <ShoppingCart className="text-amber-900" size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-black"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-amber-200">
            <Link
              href="/"
              className="block py-2 text-gray-700 hover:text-amber-900 font-medium"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-gray-700 hover:text-amber-900 font-medium"
            >
              Products
            </Link>
            <Link
              href="/products?filter=custom"
              className="block py-2 text-gray-700 hover:text-amber-900 font-medium"
            >
              Custom Orders
            </Link>
            <Link
              href="/products?filter=bulk"
              className="block py-2 text-gray-700 hover:text-amber-900 font-medium"
            >
              Wholesale
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
