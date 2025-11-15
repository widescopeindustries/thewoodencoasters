'use client';

import { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data/products';
import { Filter } from 'lucide-react';

export default function ProductsPage() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const filterParam = searchParams.get('filter');

  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    categoryParam ? [categoryParam] : []
  );
  const [showCustomizable, setShowCustomizable] = useState(filterParam === 'custom');
  const [showBulk, setShowBulk] = useState(filterParam === 'bulk');
  const [showInStockOnly, setShowInStockOnly] = useState(true);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
        return false;
      }

      // Customizable filter
      if (showCustomizable && !product.customizable) {
        return false;
      }

      // Bulk filter
      if (showBulk && !product.bulk) {
        return false;
      }

      // In stock filter
      if (showInStockOnly && !product.inStock) {
        return false;
      }

      // Price range filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }

      return true;
    });
  }, [selectedCategories, showCustomizable, showBulk, showInStockOnly, priceRange]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const resetFilters = () => {
    setSelectedCategories([]);
    setShowCustomizable(false);
    setShowBulk(false);
    setShowInStockOnly(true);
    setPriceRange([0, 100]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Wooden Drink Coasters
        </h1>
        <p className="text-lg text-gray-600">
          Browse our collection of handcrafted wooden coasters. {filteredProducts.length} products found.
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-4 lg:gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="mb-4 lg:hidden">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="w-full bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center justify-center gap-2"
            >
              <Filter size={18} />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </button>
          </div>

          <div className={`bg-white rounded-lg shadow-md p-6 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              <button
                onClick={resetFilters}
                className="text-sm text-amber-600 hover:text-amber-700"
              >
                Reset
              </button>
            </div>

            {/* Category Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Category</h3>
              <div className="space-y-2">
                {['round', 'square', 'heart', 'custom'].map((category) => (
                  <label key={category} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => toggleCategory(category)}
                      className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span className="ml-2 text-gray-700 capitalize">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Features Filter */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Features</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showCustomizable}
                    onChange={(e) => setShowCustomizable(e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-700">Customizable</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showBulk}
                    onChange={(e) => setShowBulk(e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-700">Bulk Available</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStockOnly}
                    onChange={(e) => setShowInStockOnly(e.target.checked)}
                    className="rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                  />
                  <span className="ml-2 text-gray-700">In Stock Only</span>
                </label>
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="flex justify-between text-sm text-gray-600">
                  <span>$0</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 mt-6 lg:mt-0">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found matching your filters.</p>
              <button
                onClick={resetFilters}
                className="mt-4 text-amber-600 hover:text-amber-700 font-medium"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
