'use client';

import { Product } from '@/lib/types';
import { ShoppingCart, Heart } from 'lucide-react';
import { useCartStore } from '@/lib/store/cart';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem(product);
  };

  return (
    <div className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-64 bg-gradient-to-br from-amber-100 to-orange-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.customizable && (
          <div className="absolute top-2 left-2 bg-amber-900 text-white text-xs px-2 py-1 rounded z-10 font-semibold">
            Customizable
          </div>
        )}
        {product.bulk && (
          <div className="absolute top-2 right-2 bg-amber-800 text-white text-xs px-2 py-1 rounded z-10 font-semibold">
            Bulk Available
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center z-10">
            <span className="text-white text-xl font-bold">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-xs bg-amber-50 text-amber-900 px-2 py-1 rounded border border-amber-200"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-2xl font-bold text-black">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-600">{product.material}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-amber-800 hover:bg-amber-900 text-white px-4 py-2 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
          <button className="bg-white hover:bg-amber-50 text-amber-900 border border-amber-200 p-2 rounded-lg transition-colors">
            <Heart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
