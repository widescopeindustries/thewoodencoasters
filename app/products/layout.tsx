import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shop Wooden Coasters - Round, Square, Custom & Bulk | The Wooden Coasters',
  description: 'Browse our collection of handcrafted wooden drink coasters. Round, square, and heart-shaped designs. Custom engraving available. Bulk and wholesale orders welcome.',
  keywords: 'wooden coasters, round wooden coasters, square wooden coasters, custom wooden coasters, engraved wooden coasters, bulk wooden coasters, wholesale coasters, handmade coasters',
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
