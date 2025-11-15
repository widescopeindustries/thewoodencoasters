'use client';

import { useCartStore } from '@/lib/store/cart';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getTotalPrice, clearCart } = useCartStore();

  const totalPrice = getTotalPrice();
  const shipping = totalPrice > 50 ? 0 : 5.99;
  const tax = totalPrice * 0.08;
  const finalTotal = totalPrice + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <ShoppingBag className="mx-auto text-gray-400 mb-4" size={64} />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-8">
            Add some beautiful wooden coasters to your cart!
          </p>
          <Link
            href="/products"
            className="inline-block bg-amber-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition-colors"
          >
            Shop Wooden Coasters
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.id}-${item.customization || 'default'}`}
              className="bg-white rounded-lg shadow-md p-6"
            >
              <div className="flex gap-4">
                {/* Product Image */}
                <div className="relative w-24 h-24 bg-gradient-to-br from-amber-100 to-orange-100 rounded-lg flex-shrink-0 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>

                {/* Product Details */}
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {item.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.material}</p>

                  {item.customization && (
                    <p className="text-sm text-blue-600 mb-2">
                      Custom: {item.customization}
                    </p>
                  )}

                  <div className="flex items-center gap-4">
                    <p className="text-lg font-bold text-gray-900">
                      ${item.price.toFixed(2)}
                    </p>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center font-medium">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="bg-gray-100 hover:bg-gray-200 p-1 rounded transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-auto text-red-600 hover:text-red-700 p-2"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={clearCart}
            className="text-red-600 hover:text-red-700 font-medium"
          >
            Clear Cart
          </button>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? (
                    <span className="text-green-600 font-medium">FREE</span>
                  ) : (
                    `$${shipping.toFixed(2)}`
                  )}
                </span>
              </div>

              {totalPrice < 50 && shipping > 0 && (
                <p className="text-sm text-amber-900 font-medium">
                  Add ${(50 - totalPrice).toFixed(2)} more for free shipping!
                </p>
              )}

              <div className="flex justify-between text-gray-700">
                <span>Tax (8%)</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="border-t border-amber-800 pt-3">
                <div className="flex justify-between text-lg font-bold text-black">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button className="w-full bg-amber-900 hover:bg-black text-white py-3 rounded-lg font-semibold mb-3 transition-colors">
              Proceed to Checkout
            </button>

            <Link
              href="/products"
              className="block w-full text-center bg-white hover:bg-amber-50 text-black border-2 border-amber-800 py-3 rounded-lg font-semibold transition-colors"
            >
              Continue Shopping
            </Link>

            <div className="mt-6 text-sm text-gray-600 space-y-2">
              <p className="flex items-start gap-2">
                <span>✓</span>
                <span>Free shipping on orders over $50</span>
              </p>
              <p className="flex items-start gap-2">
                <span>✓</span>
                <span>30-day money back guarantee</span>
              </p>
              <p className="flex items-start gap-2">
                <span>✓</span>
                <span>Secure checkout</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
