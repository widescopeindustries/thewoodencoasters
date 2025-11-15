import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data/products';
import { Star, Truck, Shield, Heart } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-amber-50 to-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold text-black mb-6">
                Premium Wooden Drink Coasters
              </h1>
              <p className="text-xl text-gray-800 mb-8">
                Handcrafted from sustainable wood. Protect your furniture in style with our beautiful,
                durable wooden coasters. Custom engraving available.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/products"
                  className="bg-amber-900 hover:bg-black text-white px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  Shop All Coasters
                </Link>
                <Link
                  href="/products?filter=custom"
                  className="bg-white hover:bg-amber-50 text-black border-2 border-amber-900 px-8 py-4 rounded-lg font-semibold text-center transition-colors"
                >
                  Custom Orders
                </Link>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-9xl">🪵</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 border-2 border-amber-800 p-4 rounded-full">
                  <Star className="text-amber-900" size={32} />
                </div>
              </div>
              <h3 className="font-semibold text-black mb-2">Premium Quality</h3>
              <p className="text-sm text-gray-700">Handcrafted from sustainable hardwood</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 border-2 border-amber-800 p-4 rounded-full">
                  <Heart className="text-amber-900" size={32} />
                </div>
              </div>
              <h3 className="font-semibold text-black mb-2">Custom Engraving</h3>
              <p className="text-sm text-gray-700">Personalize with names, logos, or designs</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 border-2 border-amber-800 p-4 rounded-full">
                  <Truck className="text-amber-900" size={32} />
                </div>
              </div>
              <h3 className="font-semibold text-black mb-2">Free Shipping</h3>
              <p className="text-sm text-gray-700">On orders over $50</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-amber-100 border-2 border-amber-800 p-4 rounded-full">
                  <Shield className="text-amber-900" size={32} />
                </div>
              </div>
              <h3 className="font-semibold text-black mb-2">Quality Guaranteed</h3>
              <p className="text-sm text-gray-700">30-day money back guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-black mb-4">
              Featured Wooden Coasters
            </h2>
            <p className="text-lg text-gray-700">
              Discover our most popular handcrafted wooden drink coasters
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-amber-900 hover:bg-black text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-black mb-12 text-center">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/products?category=round"
              className="group bg-amber-100 border-2 border-amber-800 rounded-lg p-8 text-center hover:bg-amber-200 transition-all"
            >
              <div className="text-6xl mb-4">⭕</div>
              <h3 className="text-xl font-semibold text-black group-hover:text-amber-900">
                Round Coasters
              </h3>
              <p className="text-gray-700 mt-2">Classic circular design</p>
            </Link>

            <Link
              href="/products?category=square"
              className="group bg-amber-100 border-2 border-amber-800 rounded-lg p-8 text-center hover:bg-amber-200 transition-all"
            >
              <div className="text-6xl mb-4">◼️</div>
              <h3 className="text-xl font-semibold text-black group-hover:text-amber-900">
                Square Coasters
              </h3>
              <p className="text-gray-700 mt-2">Modern square style</p>
            </Link>

            <Link
              href="/products?category=heart"
              className="group bg-amber-100 border-2 border-amber-800 rounded-lg p-8 text-center hover:bg-amber-200 transition-all"
            >
              <div className="text-6xl mb-4">❤️</div>
              <h3 className="text-xl font-semibold text-black group-hover:text-amber-900">
                Heart Coasters
              </h3>
              <p className="text-gray-700 mt-2">Perfect for gifts</p>
            </Link>

            <Link
              href="/products?category=custom"
              className="group bg-amber-100 border-2 border-amber-800 rounded-lg p-8 text-center hover:bg-amber-200 transition-all"
            >
              <div className="text-6xl mb-4">✨</div>
              <h3 className="text-xl font-semibold text-black group-hover:text-amber-900">
                Custom Engraved
              </h3>
              <p className="text-gray-700 mt-2">Personalized designs</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-amber-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-4">
            Need Bulk or Wholesale Orders?
          </h2>
          <p className="text-xl mb-8">
            We offer special pricing for bulk orders and wholesale customers.
            Perfect for restaurants, cafes, and events.
          </p>
          <Link
            href="/products?filter=bulk"
            className="inline-block bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-amber-50 border-2 border-white transition-colors"
          >
            View Bulk Options
          </Link>
        </div>
      </section>
    </div>
  );
}
