import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black text-gray-300 mt-16 border-t-2 border-amber-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold mb-4 flex items-center gap-2">
              <span className="text-2xl">🪵</span>
              The Wooden Coasters
            </h3>
            <p className="text-sm">
              Handcrafted wooden drink coasters made from premium sustainable wood.
              Perfect for protecting your furniture in style.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products" className="hover:text-amber-300 transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/products?category=round" className="hover:text-amber-300 transition-colors">
                  Round Coasters
                </Link>
              </li>
              <li>
                <Link href="/products?category=square" className="hover:text-amber-300 transition-colors">
                  Square Coasters
                </Link>
              </li>
              <li>
                <Link href="/products?filter=custom" className="hover:text-amber-300 transition-colors">
                  Custom Engraved
                </Link>
              </li>
              <li>
                <Link href="/products?filter=bulk" className="hover:text-amber-300 transition-colors">
                  Bulk Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* About Us */}
          <div>
            <h4 className="text-white font-semibold mb-4">About</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Sustainability
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-amber-300 transition-colors">
                  Wholesale Inquiry
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-sm text-center">
          <p>© {currentYear} The Wooden Coasters. All rights reserved.</p>
          <p className="mt-2">
            Handcrafted wooden drink coasters | Custom engraved coasters | Wholesale available
          </p>
        </div>
      </div>
    </footer>
  );
}
