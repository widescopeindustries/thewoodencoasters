'use client';

import Link from 'next/link';
import { Wrench, Menu } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="p-2 bg-amber-600 rounded-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-white">
                AI Auto Mechanic
              </span>
              <span className="text-xs text-gray-400 tracking-wide">
                Powered by Operation CHARM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/diagnosis"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              Start Diagnosis
            </Link>
            <Link
              href="https://charm.li"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-gray-300 hover:text-amber-400 transition-colors"
            >
              CHARM Database
            </Link>
          </div>

          {/* CTA Button */}
          <Link
            href="/diagnosis"
            className="hidden md:flex items-center gap-2 px-6 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors"
          >
            <Wrench className="w-4 h-4" />
            Get Help
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-400"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-800">
            <Link
              href="/"
              className="block py-2 text-sm font-medium text-gray-300 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/diagnosis"
              className="block py-2 text-sm font-medium text-gray-300 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              Start Diagnosis
            </Link>
            <Link
              href="https://charm.li"
              target="_blank"
              rel="noopener noreferrer"
              className="block py-2 text-sm font-medium text-gray-300 hover:text-amber-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              CHARM Database
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
