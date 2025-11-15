import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shopping Cart | The Wooden Coasters',
  description: 'Review your wooden coaster order. Free shipping on orders over $50. Secure checkout.',
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
