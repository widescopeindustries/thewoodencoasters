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
    <div className="group bg-white border border-[var(--color-neutral-200)] rounded-sm overflow-hidden hover:border-[var(--color-accent)] transition-all duration-300 elegant-shadow hover:elegant-shadow-lg">
      <div className="relative h-72 bg-[var(--color-neutral-100)] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        {product.customizable && (
          <div className="absolute top-3 left-3 bg-[var(--color-primary-dark)] text-white text-[10px] px-3 py-1.5 rounded-sm z-10 font-sans font-medium tracking-wider uppercase">
            Bespoke
          </div>
        )}
        {product.bulk && (
          <div className="absolute top-3 right-3 bg-[var(--color-accent)] text-white text-[10px] px-3 py-1.5 rounded-sm z-10 font-sans font-medium tracking-wider uppercase">
            Trade
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-[var(--color-primary-dark)] bg-opacity-80 flex items-center justify-center z-10">
            <span className="text-white text-lg font-serif font-medium tracking-wide">Sold Out</span>
          </div>
        )}
      </div>

      <div className="p-5">
        <h3 className="text-lg font-serif font-medium text-[var(--color-primary-dark)] mb-2 line-clamp-2 leading-snug">
          {product.name}
        </h3>

        <p className="text-xs font-sans font-light text-[var(--color-neutral-800)] mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {product.features.slice(0, 2).map((feature, index) => (
            <span
              key={index}
              className="text-[10px] font-sans font-medium bg-[var(--color-neutral-50)] text-[var(--color-accent)] px-2 py-1 rounded-sm border border-[var(--color-neutral-200)] tracking-wide uppercase"
            >
              {feature}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between mb-4 pb-4 border-b border-[var(--color-neutral-200)]">
          <span className="text-2xl font-serif font-medium text-[var(--color-primary-dark)]">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-xs font-sans font-light text-[var(--color-neutral-800)] tracking-wide uppercase">{product.material}</span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="flex-1 bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white px-4 py-3 rounded-sm font-sans font-medium text-xs tracking-wide flex items-center justify-center gap-2 transition-all duration-300 disabled:bg-[var(--color-neutral-300)] disabled:cursor-not-allowed uppercase"
          >
            <ShoppingCart size={16} strokeWidth={1.5} />
            Add to Cart
          </button>
          <button className="bg-[var(--color-neutral-50)] hover:bg-[var(--color-neutral-100)] text-[var(--color-accent)] border border-[var(--color-neutral-200)] p-3 rounded-sm transition-all duration-300">
            <Heart size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
