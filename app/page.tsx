import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { products } from '@/lib/data/products';
import { Star, Truck, Shield, Heart } from 'lucide-react';

export default function Home() {
  const featuredProducts = products.slice(0, 4);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-[var(--color-neutral-50)] border-b border-[var(--color-neutral-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="inline-block text-xs font-sans font-medium text-[var(--color-accent)] tracking-[0.2em] uppercase mb-4">
                Artisan Craftsmanship Since 2024
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-medium text-[var(--color-primary-dark)] mb-8 leading-tight tracking-tight">
              Timeless Elegance for Your Table
            </h1>
            <p className="text-lg md:text-xl font-sans font-light text-[var(--color-neutral-800)] mb-12 leading-relaxed max-w-2xl mx-auto">
              Each coaster is meticulously handcrafted from sustainably sourced hardwood,
              combining functional design with enduring beauty to elevate your everyday moments.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white px-10 py-4 rounded-sm font-sans font-medium text-sm tracking-wide text-center transition-all duration-300 shadow-sm hover:shadow-md"
              >
                Explore Collection
              </Link>
              <Link
                href="/products?filter=custom"
                className="bg-transparent hover:bg-[var(--color-neutral-100)] text-[var(--color-primary-dark)] border border-[var(--color-primary)] px-10 py-4 rounded-sm font-sans font-medium text-sm tracking-wide text-center transition-all duration-300"
              >
                Commission Bespoke
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white border-b border-[var(--color-neutral-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="text-center">
              <div className="flex justify-center mb-5">
                <Star className="text-[var(--color-accent)]" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-[var(--color-primary-dark)] text-lg mb-3">Premium Quality</h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Handcrafted from sustainably sourced hardwood</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <Heart className="text-[var(--color-accent)]" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-[var(--color-primary-dark)] text-lg mb-3">Bespoke Engraving</h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Personalize with monograms, logos, or custom designs</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <Truck className="text-[var(--color-accent)]" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-[var(--color-primary-dark)] text-lg mb-3">Complimentary Delivery</h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">On all orders over $50</p>
            </div>

            <div className="text-center">
              <div className="flex justify-center mb-5">
                <Shield className="text-[var(--color-accent)]" size={28} strokeWidth={1.5} />
              </div>
              <h3 className="font-serif font-medium text-[var(--color-primary-dark)] text-lg mb-3">Quality Assured</h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">30-day satisfaction guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[var(--color-neutral-50)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-primary-dark)] mb-5 tracking-tight">
              Curated Selection
            </h2>
            <p className="text-base font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">
              Explore our most sought-after pieces, each a testament to artisan craftsmanship
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="inline-block bg-[var(--color-primary-dark)] hover:bg-[var(--color-primary)] text-white px-10 py-4 rounded-sm font-sans font-medium text-sm tracking-wide transition-all duration-300 shadow-sm hover:shadow-md"
            >
              View Complete Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 bg-white border-b border-[var(--color-neutral-200)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-serif font-medium text-[var(--color-primary-dark)] mb-16 text-center tracking-tight">
            Explore by Design
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link
              href="/products?category=round"
              className="group bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] rounded-sm p-10 text-center hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 rounded-full border-2 border-[var(--color-accent)] group-hover:border-[var(--color-primary-dark)] transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-serif font-medium text-[var(--color-primary-dark)] mb-3">
                Round
              </h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Classic circular silhouette</p>
            </Link>

            <Link
              href="/products?category=square"
              className="group bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] rounded-sm p-10 text-center hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <div className="w-16 h-16 border-2 border-[var(--color-accent)] group-hover:border-[var(--color-primary-dark)] transition-colors duration-300"></div>
              </div>
              <h3 className="text-xl font-serif font-medium text-[var(--color-primary-dark)] mb-3">
                Square
              </h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Contemporary angular form</p>
            </Link>

            <Link
              href="/products?category=heart"
              className="group bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] rounded-sm p-10 text-center hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <Heart className="text-[var(--color-accent)] group-hover:text-[var(--color-primary-dark)] transition-colors duration-300" size={64} strokeWidth={1.5} fill="none" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[var(--color-primary-dark)] mb-3">
                Heart
              </h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Thoughtful gift selection</p>
            </Link>

            <Link
              href="/products?category=custom"
              className="group bg-[var(--color-neutral-50)] border border-[var(--color-neutral-200)] rounded-sm p-10 text-center hover:border-[var(--color-accent)] hover:shadow-md transition-all duration-300"
            >
              <div className="mb-6 flex justify-center">
                <Star className="text-[var(--color-accent)] group-hover:text-[var(--color-primary-dark)] transition-colors duration-300" size={64} strokeWidth={1.5} fill="none" />
              </div>
              <h3 className="text-xl font-serif font-medium text-[var(--color-primary-dark)] mb-3">
                Engraved
              </h3>
              <p className="text-sm font-sans font-light text-[var(--color-neutral-800)] leading-relaxed">Bespoke personalization</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[var(--color-primary-dark)] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-serif font-medium mb-6 tracking-tight">
            Trade & Wholesale Enquiries
          </h2>
          <p className="text-base md:text-lg font-sans font-light mb-10 leading-relaxed opacity-90">
            We partner with discerning establishments and offer bespoke pricing for volume orders.
            Ideal for hospitality venues, corporate gifting, and special events.
          </p>
          <Link
            href="/products?filter=bulk"
            className="inline-block bg-white text-[var(--color-primary-dark)] px-10 py-4 rounded-sm font-sans font-medium text-sm tracking-wide hover:bg-[var(--color-neutral-100)] border border-white transition-all duration-300 shadow-sm"
          >
            Explore Trade Options
          </Link>
        </div>
      </section>
    </div>
  );
}
