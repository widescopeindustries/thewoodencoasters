'use client';

import Link from 'next/link';
import { ShoppingCart, Menu } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import { useState } from 'react';

export default function Header() {
  const totalItems = useCartStore((state) => state.getTotalItems());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-[var(--color-neutral-200)] sticky top-0 z-50 shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex flex-col">
            <span className="text-2xl font-serif font-medium text-[var(--color-primary-dark)] tracking-tight">
              The Wooden Coasters
            </span>
            <span className="text-xs font-sans font-light text-[var(--color-neutral-800)] tracking-[0.15em] uppercase mt-0.5">
              Handcrafted Excellence
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-10">
            <Link
              href="/"
              className="text-sm font-sans font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)] transition-colors tracking-wide"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-sm font-sans font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)] transition-colors tracking-wide"
            >
              Collection
            </Link>
            <Link
              href="/products?filter=custom"
              className="text-sm font-sans font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)] transition-colors tracking-wide"
            >
              Bespoke
            </Link>
            <Link
              href="/products?filter=bulk"
              className="text-sm font-sans font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)] transition-colors tracking-wide"
            >
              Trade
            </Link>
          </div>

          {/* Cart Button */}
          <Link
            href="/cart"
            className="relative flex items-center justify-center w-11 h-11 rounded-sm bg-[var(--color-neutral-50)] hover:bg-[var(--color-neutral-100)] border border-[var(--color-neutral-200)] transition-all duration-200 hover:shadow-md"
          >
            <ShoppingCart className="text-[var(--color-primary)]" size={20} strokeWidth={1.5} />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[var(--color-primary-dark)] text-white text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[var(--color-primary)]"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} strokeWidth={1.5} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-[var(--color-neutral-200)]">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)]"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="block py-2 text-sm font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)]"
            >
              Collection
            </Link>
            <Link
              href="/products?filter=custom"
              className="block py-2 text-sm font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)]"
            >
              Bespoke
            </Link>
            <Link
              href="/products?filter=bulk"
              className="block py-2 text-sm font-medium text-[var(--color-neutral-800)] hover:text-[var(--color-primary)]"
            >
              Trade
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
