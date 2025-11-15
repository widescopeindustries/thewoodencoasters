# The Wooden Coasters - E-commerce Site

A modern e-commerce website for selling handcrafted wooden drink coasters, built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- **Product Catalog** - Browse wooden coasters by category (round, square, heart, custom)
- **Advanced Filtering** - Filter by category, price, customization, and bulk availability
- **Shopping Cart** - Persistent cart with Zustand state management
- **SEO Optimized** - Built with Next.js App Router for optimal SEO performance
- **Responsive Design** - Mobile-first design that works on all devices
- **Custom Engraving** - Support for personalized wooden coasters
- **Bulk Orders** - Wholesale pricing for restaurants, cafes, and events

## Technology Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **UI Components**: Headless UI, Lucide React icons
- **SEO**: Built-in Next.js metadata and sitemap support

## Getting Started

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
thewoodencoasters.com/
├── app/
│   ├── page.tsx           # Homepage
│   ├── products/          # Product listing page with filters
│   ├── cart/              # Shopping cart page
│   ├── layout.tsx         # Root layout with header/footer
│   └── sitemap.ts         # XML sitemap for SEO
├── components/
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   └── ProductCard.tsx    # Product display component
├── lib/
│   ├── types/             # TypeScript interfaces
│   ├── data/              # Product data
│   └── store/             # Zustand cart store
└── public/                # Static assets
```

## SEO Strategy

The site is optimized for these high-value keywords:

- **Primary Keywords**:
  - "wooden drink coasters" (2.2K searches/month)
  - "wooden coasters" (1.9K searches/month)

- **Secondary Keywords**:
  - "custom wooden coasters"
  - "engraved wooden coasters"
  - "round wooden coasters"
  - "square wooden coasters"
  - "bulk wooden coasters"
  - "wholesale wooden coasters"

### SEO Features:
- Semantic HTML structure
- Optimized meta titles and descriptions
- XML sitemap
- robots.txt
- Fast page load times with Next.js
- Mobile responsive design

## Product Categories

1. **Round Coasters** - Classic circular wooden coasters
2. **Square Coasters** - Modern square designs
3. **Heart Coasters** - Perfect for gifts and romantic occasions
4. **Custom Engraved** - Personalized with laser engraving

## Future Enhancements

- [ ] Payment integration (Stripe/PayPal)
- [ ] User authentication and accounts
- [ ] Order history and tracking
- [ ] Product reviews and ratings
- [ ] Email notifications
- [ ] Admin dashboard for product management
- [ ] Real product images
- [ ] Blog for content marketing
- [ ] Customer testimonials
- [ ] Live chat support

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## License

All rights reserved.
