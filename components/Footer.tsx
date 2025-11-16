import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--color-primary-dark)] text-[var(--color-neutral-200)] border-t border-[var(--color-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* About */}
          <div>
            <h3 className="text-white font-serif font-medium text-xl mb-5 tracking-tight">
              The Wooden Coasters
            </h3>
            <p className="text-sm font-sans font-light leading-relaxed opacity-90">
              Artisan-crafted wooden drink coasters made from sustainably sourced hardwood.
              Timeless design meets functional elegance.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-sans font-medium text-sm mb-5 tracking-wider uppercase">Collection</h4>
            <ul className="space-y-3 text-sm font-sans font-light">
              <li>
                <Link href="/products" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  View All
                </Link>
              </li>
              <li>
                <Link href="/products?category=round" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Round
                </Link>
              </li>
              <li>
                <Link href="/products?category=square" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Square
                </Link>
              </li>
              <li>
                <Link href="/products?filter=custom" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Bespoke Engraving
                </Link>
              </li>
              <li>
                <Link href="/products?filter=bulk" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Trade Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-sans font-medium text-sm mb-5 tracking-wider uppercase">Service</h4>
            <ul className="space-y-3 text-sm font-sans font-light">
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Delivery Information
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Frequently Asked
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Get in Touch
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-sans font-medium text-sm mb-5 tracking-wider uppercase">Atelier</h4>
            <ul className="space-y-3 text-sm font-sans font-light">
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Our Craftsmanship
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Sustainable Practices
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-[var(--color-accent-light)] transition-colors duration-200">
                  Trade Partnerships
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[var(--color-primary)] mt-12 pt-8 text-xs text-center font-sans font-light opacity-80">
          <p className="tracking-wide">© {currentYear} The Wooden Coasters. All Rights Reserved.</p>
          <p className="mt-3 tracking-wide">
            Handcrafted Excellence • Bespoke Engraving • Trade Enquiries Welcome
          </p>
        </div>
      </div>
    </footer>
  );
}
